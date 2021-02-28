import React from "react";
import { useAtom } from "jotai";
import {
	playerEnergyAtom,
	toggleInGameMenu
} from "../../../context/gameActions";
import InGameMenu from "./InGameMenu";
import EnergyLevel from "./EnergyLevel";
import Grade from "./Grade";
import SvgIcon from "@material-ui/icons/Settings";
import "./Game.scss";

type Props = {
	signOutHandler: () => void;
	gameState: GameState;
	setIsComingFromGame: Hookback<boolean>;
};

export default function Game({
	signOutHandler,
	gameState,
	setIsComingFromGame
}: Props) {
	const [inGameMenu, setInGameMenu] = useAtom(toggleInGameMenu);

	// ! temporary for save game and load game testing
	const [playerEnergy, setPlayerEnergy] = useAtom(playerEnergyAtom);

	if (inGameMenu)
		return (
			<div className='game__modal'>
				<SvgIcon
					onClick={() => setInGameMenu(false)}
					className='game__modal-icon'
				/>
				<InGameMenu
					signOutHandler={signOutHandler}
					gameState={gameState}
					setIsComingFromGame={setIsComingFromGame}
				/>
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
