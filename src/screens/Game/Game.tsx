import React, { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import {
	playerEnergyAtom,
	toggleInGameMenuAtom,
	toggleConfigMenuAtom,
	isNewGameAtom,
	loadGameStateAction
} from "../../gameActions";
import InGameMenu from "../../components/InGameMenu";
import EnergyLevel from "../../components/EnergyLevel";
import Grade from "../../components/Grade";
import SvgIcon from "@material-ui/icons/Settings";
import "./Game.scss";

export default function Game() {
	const [inGameMenu, toggleInGameMenu] = useAtom(toggleInGameMenuAtom);
	const [isNewGame] = useAtom(isNewGameAtom);
	const [, loadGameState] = useAtom(loadGameStateAction);
	const [, toggleConfigMenu] = useAtom(toggleConfigMenuAtom);

	const [playerEnergy, setPlayerEnergy] = useAtom(playerEnergyAtom);

	const loadGameStateRef = useRef(loadGameState);
	useEffect(() => {
		loadGameStateRef.current();
		console.log(playerEnergy)
	}, [isNewGame]);

	return (
		<main className='game'>
			<SvgIcon
				className='game__modal-icon'
				onClick={() => {
					toggleInGameMenu(!inGameMenu);
					toggleConfigMenu(false);
				}}
			/>
			{inGameMenu && <InGameMenu />}
			<section className='game__hud'>
				<EnergyLevel />
				{/* <ItemsListButton>
					<ItemsList items={items} />
				</ItemsListButton> */}
				<Grade />
			</section>
			<section className='game__media'></section>
			{/**
			 * <MediaContainer />
			 * <InfoBar />
			 * <Map />
			 */}
			<section className='game__info'></section>
			<section className='game__map'>
				<button
					type='button'
					onClick={() =>
						setPlayerEnergy(playerEnergy === 100 ? 100 : playerEnergy + 1)
					}
				>
					Increase Energy
				</button>
				<button
					type='button'
					onClick={() =>
						setPlayerEnergy(playerEnergy === 0 ? 0 : playerEnergy - 1)
					}
				>
					Decrease Energy
				</button>
			</section>
		</main>
	);
}
