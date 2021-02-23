// import firebase from '../../firebaseConfig';

export const getGlobalPreferences = async (setGlobalPreferences: Function): Promise<void> => {
	// await firebase.firestore().collection()
	setGlobalPreferences({
		skipMenu: false
	} as GlobalPreferences);
};
