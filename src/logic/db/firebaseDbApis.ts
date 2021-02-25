import firebase from "../../firebaseConfig";

const db = firebase.firestore();

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
