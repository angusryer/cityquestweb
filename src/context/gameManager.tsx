import { createContext, ReactNode } from "react";
import { v4 as uuid } from "uuid";
import {
	getCurrentLocation,
	userAgreesToShareLocation
} from "../logic/game/gameLogic";
import { signOut } from "../logic/auth/firebaseAuthApis";

let gameStateObject: GameState = [{}];

export const GameContext: React.Context<any> = createContext(gameStateObject);

export const configureGameManager = async (
	gameConfig: GameConfig
): Promise<void> => {
	const currentLocation: Coordinates = userAgreesToShareLocation(gameConfig)
		? await getCurrentLocation()
		: [0, 0];
	gameStateObject = [
		{
			gameId: uuid(),
			gameConfig,
			gameStartTime: Date.now(),
			gameElapsedTime: 0,
			playerItems: [],
			playerLocation: currentLocation
		}
	];
	return;
};

const actions = {
	signOut: () => signOut()
};

type Props = {
	children: ReactNode;
};

export default function GameManager({ children }: Props) {
	// ! atomisize various game state ACTIONS using useState,
	// ! memoize them, assemble them into a single game state
	// ! snapshot and pass it into the Provider below.
	// ? Will an update to a single item within this object
	// ? cause a rerender of ALL components that consume
	// ? any part of the context object?
	// ? How to test this?

	return (
		<GameContext.Provider value={{ ...gameStateObject[0], ...actions }}>
			{children}
		</GameContext.Provider>
	);
}
