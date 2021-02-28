import React, { Dispatch, SetStateAction } from "react";
import { v4 as uuid } from "uuid";
import { useCachedState } from "./gameActions";
import Game from "../ui/logicContainers/Game";

type Props = {
	signOutHandler: (isComingFromGame?: boolean) => void;
	gameConfig: GameConfig;
	setIsComingFromGame: Dispatch<SetStateAction<boolean>>;
	newGame: boolean;
};

export default function GameManager({
	signOutHandler,
	gameConfig,
	setIsComingFromGame,
	newGame
}: Props) {
	const [cachedGameState] = useCachedState();

	const createGameStateObject = (): GameState => {
		if (newGame) {
			return {
				gameId: uuid(),
				gameConfig,
				gameStartTime: Date.now(),
				gameStateSnapshot: {}
			};
		}
		return {
			gameId: cachedGameState.gameId,
			gameConfig: cachedGameState.gameConfig,
			gameStartTime: cachedGameState.gameStartTime,
			gameStateSnapshot: cachedGameState.gameStateSnapshot
		};
	};

	return (
		<Game
			signOutHandler={signOutHandler}
			gameState={createGameStateObject()}
			setIsComingFromGame={setIsComingFromGame}
		/>
	);
}
