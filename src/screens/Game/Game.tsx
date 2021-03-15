import React from "react";
import { useAtom } from "jotai";
import {
	toggleInGameMenuAtom,
	toggleDebugMenuAtom,
	isLoadingGameOfTypeAtom,
	gameElapsedTimeAtom,
	eventTriggeredOfTypeAtom,
	shouldTimerBePausedAction,
	shouldTriggerEndGameAction
} from "../../gameActions";
import { LoadType, EventType } from "../../enums";
import InGameMenu from "../../components/InGameMenu";
import EnergyLevel from "../../components/EnergyLevel";
import Grade from "../../components/Grade";
import Map from "../../components/Map";
import LevelUp from "../LevelUp";
import WinGame from "../WinGame";
import EndGame from "../EndGame";
import DebugMenu from "../DebugMenu";
import Intro from "../Intro";
import SvgIcon from "@material-ui/icons/Settings";
import { useInterval, getElapsedTimeString } from "../../helpers";
import "./Game.scss";

function Game() {
	const [debugMenu, toggleDebugMenu] = useAtom(toggleDebugMenuAtom);
	const [inGameMenu, toggleInGameMenu] = useAtom(toggleInGameMenuAtom);
	const [isLoadingGameOfType] = useAtom(isLoadingGameOfTypeAtom);
	const [eventTriggeredOfType] = useAtom(eventTriggeredOfTypeAtom);
	const [gameElapsedTime, setGameElapsedTime] = useAtom(gameElapsedTimeAtom);
	const [shouldTriggerEndGame] = useAtom(shouldTriggerEndGameAction);
	const [shouldTimerBePaused] = useAtom(shouldTimerBePausedAction);

	// In-game timer
	useInterval(
		() => {
			setGameElapsedTime((time) => time + 1);
		},
		inGameMenu || shouldTimerBePaused ? null : 1000
	);

	const toggleMenu = () => {
		toggleInGameMenu(!inGameMenu);
	};

	const toggleDebug = () => {
		toggleDebugMenu(!debugMenu);
	};

	if (isLoadingGameOfType === LoadType.NEW) return <Intro />;
	if (eventTriggeredOfType === EventType.LEVEL_UP) return <LevelUp />;
	if (eventTriggeredOfType === EventType.WIN_GAME) return <WinGame />;

	return (
		<main className='game'>
			<SvgIcon className='game__modal-icon' onClick={toggleMenu} />
			{inGameMenu && <InGameMenu />}
			{shouldTriggerEndGame && <EndGame />}
			<section className='game__hud'>
				<EnergyLevel />
				{getElapsedTimeString(gameElapsedTime)}
				<Grade />
			</section>
			<section className='game__media'></section>
			<section className='game__info'></section>
			<section className='game__map'>
				<Map />
			</section>
			<SvgIcon className='base__debug' onClick={toggleDebug} />
			{debugMenu && <DebugMenu />}
		</main>
	);
}

export default React.memo(Game);
