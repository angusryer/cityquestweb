import React, { useContext } from "react";
import GameManager, { GameContext } from "../../../context/gameManager";

export default function Game() {
	const { gameId } = useContext(GameContext);
	// to reach this component, user should be authenticated
	// and will have selected Start Game on main menu
	return (
		<GameManager>
			{/* All game views implemented according to logic above? */}
			<p>Main Game: {gameId}</p>
		</GameManager>
	);
}
