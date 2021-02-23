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
