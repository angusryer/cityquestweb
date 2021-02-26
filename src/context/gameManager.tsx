import React from "react";
import { v4 as uuid } from "uuid";
import { useCachedState } from "./gameActions";
import Game from "../ui/logicContainers/Game";

type Props = {
	signOutHandler: (isComingFromGame?: boolean) => void;
	gameConfig: GameConfig;
	setIsComingFromGame: Hookback<boolean>;
	newGame: boolean;
};

export default function GameManager({
	signOutHandler,
	gameConfig,
	setIsComingFromGame,
	newGame
}: Props) {
	const [cachedGameState, setCachedGameState] = useCachedState();
	const createGameStateObject: any = () => {
		if (newGame) {
			return {
				gameId: uuid(),
				gameConfig,
				gameStartTime: Date.now(),
				gameStateSnapshot: {}
			};
		}
		return {
			gameId: "",
			gameConfig,
			gameStartTime: 123,
			gameStateSnapshot: cachedGameState()
		};
	};

	return (
		<Game
			signOutHandler={signOutHandler}
			gameState={createGameStateObject()}
			saveGameState={saveGameState}
			loadGameState={loadGameState}
			setIsComingFromGame={setIsComingFromGame}
		/>
	);
}
