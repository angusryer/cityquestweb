import React from "react";
import Button from "react-bootstrap/Button";
import { useAtom } from "jotai";
import {
	activePlayerAtom,
	saveGameStateAction,
	toggleConfigMenuAtom,
	playerDataAtom,
} from "../../gameActions";
import { flatten } from "../../helpers";
import "./ConfigMenu.scss";

const ConfigMenu = () => {
	const [configMenu, toggleConfigMenu] = useAtom(toggleConfigMenuAtom);
	const [gameState] = useAtom(saveGameStateAction);
	const [activePlayer] = useAtom(activePlayerAtom);
	const [playerData] = useAtom(playerDataAtom);

	const listedProperties = (obj: any) => {
		const entries = flatten(obj);
		const elements = Object.entries(entries).map(([key, value], i) => {
			return <li key={i} className="configmenu__li">{`${key} ==> ${value}`}</li>;
		});
		return elements;
	};

	return (
		<div className='configmenu'>
			<Button variant='dark' onClick={() => toggleConfigMenu(!configMenu)}>
				Toggle Debug Menu
			</Button>
			<ul className="configmenu__ul">
				{listedProperties(activePlayer)}
				{listedProperties(playerData)}
				{listedProperties(gameState)}
			</ul>
		</div>
	);
};

export default ConfigMenu;
