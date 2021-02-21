import { GameResponse } from "../../models/types";
import { UserStatus } from "../../models/statusEnums";
import { initializeGame } from "./gameLogic";

describe("initializeGame()", () => {
	it("returns correct user auth state given", async () => {
		// ! This is smelly code; no mocks allowed
		const mockResponse: GameResponse = {
			success: true,
			message: "Everything is ready",
			type: UserStatus.AUTHENTICATED
		};
		expect.assertions(1);
		const response = await initializeGame();
		return expect(response).toBeInstanceOf(mockResponse);
	});
});
