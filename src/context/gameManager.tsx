import { createContext, ReactNode } from "react";
import { v4 as uuid } from "uuid";
import { Provider as GameContextProvider } from "jotai";

let initialGameState: InitialGameState = [{}];

export const GameContext: React.Context<InitialGameState> = createContext(
	initialGameState
);

export const configureGameManager = async (
	gameConfig: GameConfig
): Promise<any> => {
	initialGameState = [
		{
			gameId: uuid(),
			gameConfig,
			gameStartTime: Date.now(),
			timeLastStoppedAt: 0,
			gameStateSnapshot: {}
		}
	];
	return;
};

type Props = {
	children: ReactNode;
};

export default function GameManager({ children }: Props) {
	// const gameConfig = atom(gameStateObject);
	// const playerLocation = atom(async (get) => get(await getCurrentLocation()));

	// ! atomisize various game state ACTIONS using useState,
	// ! memoize them, assemble them into a single game state
	// ! snapshot and pass it into the Provider below.
	// ? Will an update to a single item within this object
	// ? cause a rerender of ALL components that consume
	// ? any part of the context object?
	// ? How to test this?

	return <GameContextProvider>{children}</GameContextProvider>;
}
