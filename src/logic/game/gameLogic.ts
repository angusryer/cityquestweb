import { UserStatus } from "../../models/statusEnums";

export async function initializeGame(): Promise<GameResponse> {
	const checkResponse = await checkUserAuthStateAndCachedData();
	return checkResponse;
}

function checkUserAuthStateAndCachedData(): Promise<GameResponse> {
	return new Promise((resolve) => {
		const mockResponse = {
			success: true,
			message: "Everything is ready",
			type: UserStatus.NOT_AUTHENTICATED
		};
		setTimeout(() => resolve(mockResponse), 2000);
	});
}

export const getCurrentLocation = (): Coordinates => {
	// TODO get and return current user location
	return [43, 78];
};

export const shouldShowMainMenu = (
	globalPrefs: GlobalPreferences,
	comingFromGame: boolean = false
): boolean => {
	if (comingFromGame) return true;
	if (!comingFromGame && !globalPrefs.skipMenu) return true;
	return false;
};

export const userAgreesToShareLocation = (gameConfig: GameConfig): boolean => {
	if (gameConfig?.globalPrefs?.userAgreesToShareLocation !== undefined) {
		return gameConfig.globalPrefs.userAgreesToShareLocation;
	} else {
		// TODO get the user's permission to access their location
		return true;
	}
};
