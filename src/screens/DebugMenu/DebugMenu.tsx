import { useAtom } from "jotai";
import Button from "react-bootstrap/Button";
import {
	accumulatedEnergyAction,
	eventTriggeredOfTypeAtom,
	missionTimeAtom,
	gameElapsedTimeAtom,
	activePlayerAtom,
	saveGameStateAction,
	playerDataAtom
} from "../../gameActions";
import { EventType } from "../../enums";
import { flatten } from "../../helpers";
import "./DebugMenu.scss";

const debugControlsBtnClass = "debugmenu__controls-btn";

const DebugMenu = () => {
	const [, setEventTriggeredOfType] = useAtom(eventTriggeredOfTypeAtom);
	const [, setElapsedTime] = useAtom(gameElapsedTimeAtom);
	const [missionTime, modifyMissionTime] = useAtom(missionTimeAtom);
	const [gameState] = useAtom(saveGameStateAction);
	const [activePlayer] = useAtom(activePlayerAtom);
	const [playerData] = useAtom(playerDataAtom);
	const [accumulatedEnergy, modifyAccumulatedEnergy] = useAtom(
		accumulatedEnergyAction
	);

	const listedProperties = (obj: any) => {
		const entries = flatten(obj);
		const elements = Object.entries(entries).map(([key, value], i) => {
			return (
				<li key={i} className='debugmenu__info-li'>{`${key} ==> ${value}`}</li>
			);
		});
		return elements;
	};

	const energyUp = () => {
		modifyAccumulatedEnergy(10);
	};

	const energyDown = () => {
		modifyAccumulatedEnergy(-10);
	};

	const resetAccumulatedEnergy = () => {
		modifyAccumulatedEnergy(-(accumulatedEnergy || 0));
		console.log(accumulatedEnergy);
	};

	const timeUp = () => {
		modifyMissionTime((missionTime || 0) + 10);
		console.log(missionTime);
	};

	const timeDown = () => {
		modifyMissionTime((missionTime || 0) - 10);
		console.log(missionTime);
	};

	const resetElapsed = () => {
		setElapsedTime(0);
		console.log(missionTime);
	};

	const lvlUp = () => {
		setEventTriggeredOfType(EventType.LEVEL_UP);
	};

	const lvlDn = () => {
		setEventTriggeredOfType(EventType.LEVEL_DOWN);
	};

	const win = () => {
		setEventTriggeredOfType(EventType.WIN_GAME);
	};

	const lose = () => {
		setEventTriggeredOfType(EventType.END_GAME);
	};

	return (
		<div className='debugmenu'>
			<div className='debugmenu__info'>
				<ul className='debugmenu__info-ul'>
					{listedProperties(activePlayer)}
					{listedProperties(playerData)}
					{listedProperties(gameState)}
				</ul>
			</div>
			<div className='debugmenu__controls'>
				<Button
					variant='dark'
					className={debugControlsBtnClass}
					onClick={energyUp}
				>
					+e
				</Button>
				<Button
					variant='dark'
					className={debugControlsBtnClass}
					onClick={energyDown}
				>
					-e
				</Button>
				<Button
					variant='dark'
					className={debugControlsBtnClass}
					onClick={resetAccumulatedEnergy}
				>
					eReset
				</Button>
				<Button
					variant='dark'
					className={debugControlsBtnClass}
					onClick={timeUp}
				>
					+mt
				</Button>
				<Button
					variant='dark'
					className={debugControlsBtnClass}
					onClick={timeDown}
				>
					-mt
				</Button>
				<Button
					variant='dark'
					className={debugControlsBtnClass}
					onClick={resetElapsed}
				>
					etReset
				</Button>
				<Button
					variant='dark'
					className={debugControlsBtnClass}
					onClick={lvlUp}
				>
					LvlUp
				</Button>
				<Button
					variant='dark'
					className={debugControlsBtnClass}
					onClick={lvlDn}
				>
					LvlDn
				</Button>
				<Button variant='dark' className={debugControlsBtnClass} onClick={win}>
					Win
				</Button>
				<Button variant='dark' className={debugControlsBtnClass} onClick={lose}>
					Lose
				</Button>
			</div>
		</div>
	);
};

export default DebugMenu;
