import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import GameManager, { GameContext } from "../../../context/gameManager";

type Props = {
	signOutHandler: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

export default function Game({ signOutHandler }: Props) {
	const initialGameState = useContext(GameContext)[0];
	return (
		<GameManager>
			<p>
				Current Player:{" "}
				{initialGameState.gameConfig?.activePlayer?.playerDisplayName}
			</p>
			<Button variant='dark' onClick={signOutHandler}>
				Sign Out
			</Button>
		</GameManager>
	);
}
