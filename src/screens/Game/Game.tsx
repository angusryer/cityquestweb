import React, { useRef, useEffect } from "react";
import { useAtom } from "jotai";
import { v4 as uuid } from "uuid";
import {
	playerEnergyAtom,
	toggleInGameMenu,
	gameIdAtom,
	gameStartTimeAtom,
	isNewGameAtom
} from "../../gameActions";
import InGameMenu from "../../components/InGameMenu";
import EnergyLevel from "../../components/EnergyLevel";
import Grade from "../../components/Grade";
import SvgIcon from "@material-ui/icons/Settings";
import "./Game.scss";

export default function Game() {
	const [inGameMenu, setInGameMenu] = useAtom(toggleInGameMenu);
	const [isNewGame] = useAtom(isNewGameAtom);
	const [, setGameId] = useAtom(gameIdAtom);
	const [, setGameStartTime] = useAtom(gameStartTimeAtom);

	const setGameIdRef = useRef(setGameId);
	const setGameStartTimeRef = useRef(setGameStartTime);

	useEffect(() => {
		if (isNewGame) {
			setGameIdRef.current(uuid());
			setGameStartTimeRef.current(Date.now());
		}
	}, [isNewGame]);

	// ! temporary for save game and load game testing
	const [playerEnergy, setPlayerEnergy] = useAtom(playerEnergyAtom);

	if (inGameMenu)
		return (
			<div className='game__modal'>
				<SvgIcon
					onClick={() => setInGameMenu(false)}
					className='game__modal-icon'
				/>
				<InGameMenu />
			</div>
		);

	return (
		<main className='game'>
			<div className='game__hud'>
				<EnergyLevel />
				{/* <ItemsListButton>
					<ItemsList items={items} />
				</ItemsListButton> */}
				<Grade />
				<SvgIcon
					onClick={() => setInGameMenu(true)}
					className='game__hud-icon'
				/>
			</div>
			<div className='game__media'></div>
			{/**
			 * <MediaContainer />
			 * <InfoBar />
			 * <Map />
			 */}
			<div className='game__info'></div>
			<div className='game__map'>
				<button type='button' onClick={() => setPlayerEnergy(playerEnergy + 1)}>
					Increase Energy
				</button>
				<button type='button' onClick={() => setPlayerEnergy(playerEnergy - 1)}>
					Decrease Energy
				</button>
			</div>
		</main>
	);
}
