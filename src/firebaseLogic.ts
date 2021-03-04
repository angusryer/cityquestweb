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

// TODO replace all instances of getPlayerData in codebase with getAndSetPlayerData
export const getAndSetPlayerData = async (
	playerId: string,
	setPlayerData: Hookback<PlayerData>
): Promise<void> => {
	const data = await (await db.collection("users").doc(playerId).get()).data();
	setPlayerData({
		playerData: data?.playerData,
		lastGameState: data?.lastGameState
	});
};

// ! don't replace the name of this function as the above TODO suggests
export const getPlayerData = async (
	playerId: string,
): Promise<PlayerData | null> => {
	const data = await (await db.collection("users").doc(playerId).get()).data();
	if (data) return data.playerData;
	return null;
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
