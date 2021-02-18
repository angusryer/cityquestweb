import { UserStatus } from "../../models/statusEnums";
import { GameResponse } from "../../models/types";

export async function initializeGame(): Promise<GameResponse> {
	const checkResponse = await checkUserAuthStateAndCachedData();
	return checkResponse;
}

function checkUserAuthStateAndCachedData(): Promise<GameResponse> {
	return new Promise((resolve) => {
		const mockResponse = {
			success: true,
			message: "Everything is ready",
			type: UserStatus.AUTHENTICATED
		};
		setTimeout(() => resolve(mockResponse), 2000);
	});
}
