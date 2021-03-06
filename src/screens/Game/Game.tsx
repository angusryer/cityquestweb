import { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import {
	playerEnergyAtom,
	toggleInGameMenuAtom,
	toggleConfigMenuAtom,
	isLoadingGameOfTypeAtom,
	loadSavedGameAction,
	createNewGameAction,
	gameLastStartTimeAtom
} from "../../gameActions";
import { LoadType } from "../../enums";
import InGameMenu from "../../components/InGameMenu";
import EnergyLevel from "../../components/EnergyLevel";
import Grade from "../../components/Grade";
import SvgIcon from "@material-ui/icons/Settings";
import "./Game.scss";

export default function Game() {
	const [inGameMenu, toggleInGameMenu] = useAtom(toggleInGameMenuAtom);
	const [isLoadingGameOfType] = useAtom(isLoadingGameOfTypeAtom);
	const [, loadSavedGame] = useAtom(loadSavedGameAction);
	const [, createNewGame] = useAtom(createNewGameAction);
	const [, toggleConfigMenu] = useAtom(toggleConfigMenuAtom);
	const [, setGameLastStartTime] = useAtom(gameLastStartTimeAtom);

	const [playerEnergy, setPlayerEnergy] = useAtom(playerEnergyAtom);

	const loadSavedGameRef = useRef(loadSavedGame);
	const createNewGameRef = useRef(createNewGame);
	useEffect(() => {
		if (isLoadingGameOfType === LoadType.SAVED) loadSavedGameRef.current();
		if (isLoadingGameOfType === LoadType.NEW) createNewGameRef.current();
	}, [isLoadingGameOfType]);

	// TODO need this to run whenever <Game /> is active, not just when it is mounted initially...
	// TODO but then again, it appears to work??? 
	useEffect(() => {
		console.log(Date.now())
		setGameLastStartTime(Date.now());
	}, [setGameLastStartTime]);

	// TODO set up a setInterval and a corresponding cleanup that checks every few seconds and 
	// TODO sets player energy as well as warns as time gets close to 0 

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
						setPlayerEnergy(
							playerEnergy === 100 ? 100 : (playerEnergy || 100) + 1
						)
					}
				>
					Increase Energy
				</button>
				<button
					type='button'
					onClick={() =>
						setPlayerEnergy(playerEnergy === 0 ? 0 : (playerEnergy || 100) - 1)
					}
				>
					Decrease Energy
				</button>
			</section>
		</main>
	);
}
