import { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import {
	playerEnergyAtom,
	toggleInGameMenuAtom,
	toggleConfigMenuAtom,
	isLoadingGameOfTypeAtom,
	loadSavedGameAction,
	createNewGameAction,
	gameElapsedTimeAtom,
	eventTriggeredOfTypeAtom
} from "../../gameActions";
import { LoadType, EventType } from "../../enums";
import InGameMenu from "../../components/InGameMenu";
import EnergyLevel from "../../components/EnergyLevel";
import Grade from "../../components/Grade";
import LevelUp from "../LevelUp";
import WinGame from "../WinGame";
import EndGame from "../EndGame";
import Intro from "../Intro";
import SvgIcon from "@material-ui/icons/Settings";
import { useInterval, getElapsedTimeString } from "../../helpers";
import "./Game.scss";

export default function Game() {
	const [inGameMenu, toggleInGameMenu] = useAtom(toggleInGameMenuAtom);
	const [isLoadingGameOfType] = useAtom(isLoadingGameOfTypeAtom);
	const [eventTriggeredOfType, setEventTriggeredOfType] = useAtom(
		eventTriggeredOfTypeAtom
	);
	const [gameElapsedTime, setGameElapsedTime] = useAtom(gameElapsedTimeAtom);
	const [, setPlayerEnergy] = useAtom(playerEnergyAtom);
	const [, loadSavedGame] = useAtom(loadSavedGameAction);
	const [, createNewGame] = useAtom(createNewGameAction);
	const [, toggleConfigMenu] = useAtom(toggleConfigMenuAtom);

	const loadSavedGameRef = useRef(loadSavedGame);
	const createNewGameRef = useRef(createNewGame);
	useEffect(() => {
		if (isLoadingGameOfType === LoadType.SAVED) loadSavedGameRef.current();
		if (isLoadingGameOfType === LoadType.NEW) createNewGameRef.current();
	}, [isLoadingGameOfType]);

	useInterval(
		() => {
			setGameElapsedTime(gameElapsedTime + 1);
		},
		inGameMenu || eventTriggeredOfType === EventType.NO_ENERGY ? null : 1000
	);

	const toggleMenu = () => {
		toggleInGameMenu(!inGameMenu);
		toggleConfigMenu(false);
	};

	const triggerEnergyLost = () => {
		setPlayerEnergy(0);
		setEventTriggeredOfType(EventType.NO_ENERGY);
	};

	const triggerWinGame = () => {
		setEventTriggeredOfType(EventType.WIN_GAME);
	};

	const triggerLevelUp = () => {
		setEventTriggeredOfType(EventType.LEVEL_UP);
	};

	if (isLoadingGameOfType === LoadType.NEW) return <Intro />;
	if (eventTriggeredOfType === EventType.LEVEL_UP) return <LevelUp />;
	if (eventTriggeredOfType === EventType.WIN_GAME) return <WinGame />;
	if (eventTriggeredOfType === EventType.END_GAME) return <EndGame />;

	return (
		<main className='game'>
			<SvgIcon className='game__modal-icon' onClick={toggleMenu} />
			{inGameMenu && <InGameMenu />}
			<section className='game__hud'>
				<EnergyLevel />
				{getElapsedTimeString(gameElapsedTime)}
				<Grade />
			</section>
			<section className='game__media'></section>
			<section className='game__info'></section>
			<section className='game__map'>
				<button type='button' onClick={triggerEnergyLost}>
					Lose All Energy! (Just for Testing)
				</button>
				<button type='button' onClick={triggerWinGame}>
					Go for the win!
				</button>
			</section>
		</main>
	);
}
