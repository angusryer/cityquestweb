import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import GameManager, { GameContext } from "../../../context/gameManager";

export default function Game() {
	const gameState = useContext(GameContext);
	return (
		<GameManager>
			<p>
				Current Player: {gameState.gameConfig?.activePlayer?.playerDisplayName}
			</p>
			<Button variant='dark' onClick={gameState.signOut}>
				Sign Out
			</Button>
		</GameManager>
	);
}
