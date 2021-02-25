import firebase from "../../firebaseConfig";

const formatUserObject = (user: firebase.User): ActivePlayer => {
	return {
		playerId: user.uid,
		playerDisplayName: user.displayName || "Anonymous",
		playerEmail: user.email || "---"
	};
};

export async function onUserStateChange(
	setCallback: Hookback<ActivePlayer | null>
): Promise<void> {
	firebase.auth().onAuthStateChanged((user: firebase.User | null) => {
		if (user) {
			const player = formatUserObject(user);
			setCallback(player);
		}
	});
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
