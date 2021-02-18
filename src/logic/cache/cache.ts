import { ActivePlayer } from "../../models/player";

export async function loadPlayerFromStorage(
	playerId: string
): Promise<ActivePlayer | string> {
	return new Promise((resolve, _reject) => {
		setTimeout(() => {
			resolve({
				playerId: playerId,
				displayName: "Test",
				createdAt: 123456,
				clues: [],
				location: [0, 0],
				tools: []
			} as ActivePlayer);
		}, 3000);
	});
}
