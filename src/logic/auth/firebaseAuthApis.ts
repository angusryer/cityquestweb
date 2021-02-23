import firebase from "../../firebaseConfig";
import { GameError } from "../error/exceptionLogic";

const formatUserObject = (user: firebase.User): ActivePlayer => {
	return {
		playerId: user.uid,
		playerDisplayName: user.displayName || "Anonymous",
		playerEmail: user.email || "---"
	};
};

export const onUserStateChange = async (
	setCallback: Function
): Promise<ActivePlayer | null | void> => {
	try {
		firebase.auth().onAuthStateChanged((user: firebase.User | null): void => {
			if (user) setCallback(formatUserObject(user));
		});
	} catch (err) {
		GameError.logToLocalConsole(err);
	}
};

export const signInWithPopup = async () => {
	const authProvider = new firebase.auth.GoogleAuthProvider();
	const { user } = await firebase.auth().signInWithPopup(authProvider);
	if (user) return formatUserObject(user);
};

export const signOut = async (): Promise<void> => {
	await firebase.auth().signOut();
};
