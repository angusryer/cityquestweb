import { LocationSearching } from "@material-ui/icons";
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
						playerId: user.user?.uid,
						playerDisplayName: user.user?.displayName,
						playerEmail: user.user?.email
					},
					lastGameState: {}
				});
		} else {
			await db
				.collection("users")
				.doc(user.user?.uid)
				.update({
					playerData: {
						playerId: user.user?.uid,
						playerDisplayName: user.user?.displayName,
						playerEmail: user.user?.email
					}
				});
		}
	}
};

export const signOut = async (): Promise<void> => {
	await auth.signOut();
};

//** Firebase Firestore Operations */

export const onPlayerDataChange = async (
	playerId: string,
	setPlayerData: Hookback<PlayerData>
): Promise<void> => {
	db.collection("users")
		.doc(playerId)
		.onSnapshot({
			next: (updatedDoc) => {
				const data = updatedDoc.data();
				setPlayerData({
					playerData: data?.playerData,
					lastGameState: data?.lastGameState
				});
			},
			error: (err) => console.error(err)
		});
};

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

export const getGameLocations = async (callback: Hookback<GameLocations>) => {
	let locations: Array<any> = [];
	await db
		.collection("locations")
		.get()
		.then((snapshot) => {
			snapshot.forEach((doc) => {
				locations.push(doc.data());
			});
		});
	callback(locations);
};
