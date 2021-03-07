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
	eventTriggeredOfTypeAtom,
	endGameAtom
} from "../../gameActions";
import { LoadType, EventType } from "../../enums";
import InGameMenu from "../../components/InGameMenu";
import EnergyLevel from "../../components/EnergyLevel";
import Grade from "../../components/Grade";
import EndGame from "../EndGame";
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
	const [endGame, setEndGame] = useAtom(endGameAtom);
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

	useEffect(() => {
		if (eventTriggeredOfType === EventType.NO_ENERGY) setEndGame(true);
	}, [eventTriggeredOfType, setEndGame]);

	useInterval(
		() => {
			setGameElapsedTime(gameElapsedTime + 1);
		},
		inGameMenu || eventTriggeredOfType === EventType.NO_ENERGY ? null : 1000
	);

	return (
		<main className='game'>
			{endGame && <EndGame />}
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
				{getElapsedTimeString(gameElapsedTime)}
				<Grade />
			</section>
			<section className='game__media'></section>
			<section className='game__info'></section>
			<section className='game__map'>
				<button
					type='button'
					onClick={() => {
						setPlayerEnergy(0);
						setEventTriggeredOfType(EventType.NO_ENERGY);
					}}
				>
					Lose All Energy! (Just for Testing)
				</button>
				{/* <button
					type='button'
					onClick={() =>
						setPlayerEnergy(playerEnergy === 0 ? 0 : (playerEnergy || 100) - 1)
					}
				>
					Decrease Energy
				</button> */}
			</section>
		</main>
	);
}
