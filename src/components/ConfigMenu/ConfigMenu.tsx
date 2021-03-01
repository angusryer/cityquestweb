import React from "react";
import Button from "react-bootstrap/Button";
import { useAtom } from "jotai";
import {
	activePlayerAtom,
	gameStateComputed,
	toggleConfigMenu,
	globalPrefsAtom,
	gameIdAtom,
	gameStartTimeAtom
} from "../../gameActions";

const ConfigMenu = () => {
	const [toggleConfMenu, setToggleConfMenu] = useAtom(toggleConfigMenu);
	const [gameState] = useAtom(gameStateComputed);
	const [activePlayer] = useAtom(activePlayerAtom);
	const [globalPrefs] = useAtom(globalPrefsAtom);
	const [gameId] = useAtom(gameIdAtom);
	const [gameStartTime] = useAtom(gameStartTimeAtom);
	
	return (
		<div className='configmenu'>
			<Button variant='dark' onClick={() => setToggleConfMenu(!toggleConfMenu)}>
				Show Config Menu
			</Button>
			<ul>
				<li>Game ID: {gameId}</li>
				<li>Game Started: {gameStartTime}</li>
				<li>Active Player: {JSON.stringify(activePlayer, null, " ")}</li>
				<li>Global Config: {JSON.stringify(globalPrefs, null, " ")}</li>
				<li>Latest Snapshot: {JSON.stringify(gameState, null, " ")}</li>
			</ul>
		</div>
	);
};

export default ConfigMenu;
