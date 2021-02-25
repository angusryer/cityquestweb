import React from "react";
import Button from "react-bootstrap/Button";
import { useAtom } from "jotai";
import { toggleConfigMenu } from "../../../../context/gameActions";

type Props = {
	gameState: InitialGameState;
};

const ConfigMenu = ({ gameState }: Props) => {
	const [toggleConfMenu, setToggleConfMenu] = useAtom(toggleConfigMenu);
	return (
		<div className='configmenu'>
			<Button variant='dark' onClick={() => setToggleConfMenu(!toggleConfMenu)}>
				Show Config Menu
			</Button>
			<ul>
				<li>Game ID: {gameState.gameId}</li>
				<li>Game Started: {gameState.gameStartTime}</li>
				<li>
					Active Player:{" "}
					{JSON.stringify(gameState.gameConfig?.activePlayer, null, " ")}
				</li>
				<li>
					Global Config:{" "}
					{JSON.stringify(gameState.gameConfig?.globalPrefs, null, " ")}
				</li>
				<li>
					Latest Snapshot:{" "}
					{gameState.gameStateSnapshot
						? JSON.stringify(gameState.gameStateSnapshot, null, " ")
						: null}
				</li>
			</ul>
		</div>
	);
};

export default ConfigMenu;
