import { useState } from "react";
import { v4 as uuid } from "uuid";
import Game from "../ui/logicContainers/Game";

type Props = {
	gameConfig: GameConfig;
	signOutHandler: (isComingFromGame?: boolean) => void;
	setIsComingFromGame: Hookback<boolean>;
};

export default function GameManager({
	signOutHandler,
	gameConfig,
	setIsComingFromGame
}: Props) {
	const [gameState, setGameState] = useState<InitialGameState>({
		gameId: uuid(),
		gameConfig,
		gameStartTime: Date.now(),
		gameStateSnapshot: {}
	});

	return (
		<Game
			signOutHandler={signOutHandler}
			gameState={gameState}
			setGameState={setGameState}
			setIsComingFromGame={setIsComingFromGame}
		/>
	);
}
