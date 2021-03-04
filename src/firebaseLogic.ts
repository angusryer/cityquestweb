import firebase from "./firebaseConfig";
import { activePlayerAtom } from "./gameActions";

const db = firebase.firestore();

//** Firebase Auth Operations */

const formatUserObject = (user: firebase.User): ActivePlayer => {
	return {
		playerId: user.uid,
		playerDisplayName: user.displayName || "Anonymous",
		playerEmail: user.email || "---"
	};
};

export async function onUserStateChange(
	setCallback: Hookback<ActivePlayer | null>
): Promise<ActivePlayer | void> {
	firebase.auth().onAuthStateChanged((user: firebase.User | null) => {
		if (user !== null) {
			setCallback(formatUserObject(user));
		} else setCallback(null);
	});
}

export async function getCurrentUser(): Promise<ActivePlayer | null> {
	const user: firebase.User | null = await firebase.auth().currentUser;
	if (user !== null) return formatUserObject(user);
	return null;
}

export const signInWithPopup = async (): Promise<void> => {
	const authProvider = new firebase.auth.GoogleAuthProvider();
	await firebase.auth().signInWithPopup(authProvider);
};

export const signOut = async (): Promise<void> => {
	await firebase.auth().signOut();
};

//** Firebase Firestore Operations */

export const getPlayerData = async (
	playerId: string,
	setPlayerData: Hookback<PlayerData>
): Promise<void> => {
	const data = await (await db.collection("users").doc(playerId).get()).data();
	setPlayerData({
		playerData: data?.playerData,
		lastGameState: data?.lastGameState
	});
};

export const storeGameInDb = async (
	gameStateObject: GameState,
	playerId: string
): Promise<void> => {
	const playerData = await (
		await db.collection("users").doc(playerId).get()
	).data();
	playerData?.update({
		lastGameState: { ...gameStateObject }
	});
};
