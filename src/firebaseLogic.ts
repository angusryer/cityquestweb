import { firebase, auth, db } from "./firebaseConfig";

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
	auth.onAuthStateChanged((user: firebase.User | null) => {
		if (user !== null) {
			setCallback(formatUserObject(user));
		} else setCallback(null);
	});
}

export async function getCurrentUser(): Promise<ActivePlayer | null> {
	const user: firebase.User | null = await auth.currentUser;
	if (user !== null) return formatUserObject(user);
	return null;
}

export const signInWithPopup = async (): Promise<void> => {
	const authProvider = new firebase.auth.GoogleAuthProvider();
	const user = await auth.signInWithPopup(authProvider);
	if (user) {
		const userFound = await db.collection("users").doc(user.user?.uid).get();
		if (!userFound.exists) {
			await db
				.collection("users")
				.doc(user.user?.uid)
				.set({
					playerData: {
						playerDisplayName: user.user?.displayName,
						playerId: user.user?.uid
					},
					lastGameState: {}
				});
		} else {
			await db
				.collection("users")
				.doc(user.user?.uid)
				.update({
					playerData: {
						playerDisplayName: user.user?.displayName
					}
				});
		}
	}
};

export const signOut = async (): Promise<void> => {
	await auth.signOut();
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

export const getPlayerData = async (
	playerId: string
): Promise<PlayerData | null> => {
	const data = await (await db.collection("users").doc(playerId).get()).data();
	if (data) return data as PlayerData;
	return null;
};

export const storeGameInDb = async (
	gameStateObject: GameState,
	playerId: string
): Promise<void> => {
	await db
		.collection("users")
		.doc(playerId)
		.update({
			lastGameState: { ...gameStateObject }
		});
};
