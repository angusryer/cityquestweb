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

export async function onUserStateChange(): Promise<ActivePlayer | null> {
	firebase.auth().onAuthStateChanged((user: firebase.User | null) => {
		if (user !== null) {
			return formatUserObject(user);
		} else return null;
	});
	return null;
}

export async function getCurrentUser(): Promise<ActivePlayer | null> {
	const user: firebase.User | null = await firebase.auth().currentUser;
	if (user !== null) return formatUserObject(user);
	return null;
}

export const signInWithPopup = async (
	setCallback: Hookback<ActivePlayer | null>
) => {
	const authProvider = new firebase.auth.GoogleAuthProvider();
	const response = await firebase.auth().signInWithPopup(authProvider);
	if (response?.user !== null) setCallback(formatUserObject(response.user));
};

export const signOut = async (): Promise<void> => {
	await firebase.auth().signOut();
};


//** Firebase Firestore Operations */

export const getGlobalPreferences = async (
	playerId: string,
	setGlobalPreferences: Hookback<GlobalPreferences>
): Promise<void> => {
	const querySnapshotData = await db.collection("users").get();
	querySnapshotData.forEach((doc) => {
		if (doc.id === playerId) {
			const docData = doc.data();
			setGlobalPreferences({
				...docData.globalPrefs
			});
		}
	});
};