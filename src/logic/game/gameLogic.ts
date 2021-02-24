export const getCurrentLocation = (): Coordinates => {
	// TODO get and return current user location
	return [43, 78];
};

export const shouldShowMainMenu = (globalPrefs: GlobalPreferences): boolean => {
	if (globalPrefs?.skipMenu) return false;
	return true;
};

export const userAgreesToShareLocation = (gameConfig: GameConfig): boolean => {
	if (gameConfig?.globalPrefs?.userAgreesToShareLocation !== undefined) {
		return gameConfig.globalPrefs.userAgreesToShareLocation;
	} else {
		// TODO get the user's permission to access their location
		return true;
	}
};
