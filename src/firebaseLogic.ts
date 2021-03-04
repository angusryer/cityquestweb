import firebase from "./firebaseConfig";

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
	const querySnapshotData = await db.collection("users").get();
	querySnapshotData.forEach((doc) => {
		if (doc.id === playerId) {
			const docData = doc.data();
			setPlayerData({
				playerData: docData.playerData,
				lastGameState: docData.lastGameState
			});
		}
	});
};

export const storeGameInDb = async (
	gameStateObject: GameState,
	playerId: string
): Promise<void> => {
	const querySnapshotData = await db.collection("users").get();
	querySnapshotData.forEach((doc) => {
		if (doc.id === playerId) {
			db.collection("users")
				.doc(doc.id)
				.update({
					lastGameState: { ...gameStateObject }
				});
		}
	});
};
