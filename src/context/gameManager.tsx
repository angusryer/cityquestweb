import { createContext } from "react";

// TODO Refactor this:
// get rid of <any>
// set up appropriate GameState type

let gameStateObject = { gameId: "GAME-001" };
export const GameContext: React.Context<any> = createContext(gameStateObject);

export const setupGameEnvironment = async (
	gameConfig: GameConfig,
	callback: Hookback<any>
): Promise<void> => {
	if (!!gameConfig.activePlayer && gameConfig.globalPrefs.skipMenu) {
		await initializeGameManager(
			gameConfig.activePlayer,
			gameConfig.globalPrefs
		);
		callback(true);
	}
};

export function initializeGameManager(
	activePlayer: ActivePlayer | null,
	globalPrefs: GlobalPreferences
) {
	console.log("INIT GAME MANAGER ===> ", activePlayer, globalPrefs);
	gameStateObject = {
		gameId: gameStateObject.gameId,
		...activePlayer,
		...globalPrefs
	};
	return;
}

export default function GameManager({ children }: any) {
	// atomisize various game state parameters using useState,
	// memoize them, assemble them into a single game state
	// snapshot and pass it into the Provider below.
	// ? Will an update to a single item within this object
	// ? cause a rerender of ALL components that consume
	// ? any part of the context object?
	// ? How to test this?

	return (
		<GameContext.Provider value={gameStateObject}>
			{children}
		</GameContext.Provider>
	);
}
