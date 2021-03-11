import React from "react";
import { useAtom } from "jotai";
import Button from "react-bootstrap/Button";
import {
	accumulatedEnergyAction,
	eventTriggeredOfTypeAtom,
	missionTimeAtom,
	gameElapsedTimeAtom
} from "../../gameActions";
import { EventType } from "../../enums";
import "./DebugMenu.scss";

const DebugMenu = () => {
	const [, setEventTriggeredOfType] = useAtom(eventTriggeredOfTypeAtom);
	const [accumulatedEnergy, modifyAccumulatedEnergy] = useAtom(
		accumulatedEnergyAction
	);
	const [missionTime, modifyMissionTime] = useAtom(missionTimeAtom);
	const [, setElapsedTime] = useAtom(gameElapsedTimeAtom);

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
			<Button variant='dark' className='debugmenu__btn' onClick={energyUp}>
				+e
			</Button>
			<Button variant='dark' className='debugmenu__btn' onClick={energyDown}>
				-e
			</Button>
			<Button
				variant='dark'
				className='debugmenu__btn'
				onClick={resetAccumulatedEnergy}
			>
				eReset
			</Button>
			<Button variant='dark' className='debugmenu__btn' onClick={timeUp}>
				+mt
			</Button>
			<Button variant='dark' className='debugmenu__btn' onClick={timeDown}>
				-mt
			</Button>
			<Button variant='dark' className='debugmenu__btn' onClick={resetElapsed}>
				etReset
			</Button>
			<Button variant='dark' className='debugmenu__btn' onClick={lvlUp}>
				LvlUp
			</Button>
			<Button variant='dark' className='debugmenu__btn' onClick={lvlDn}>
				LvlDn
			</Button>
			<Button variant='dark' className='debugmenu__btn' onClick={win}>
				Win
			</Button>
			<Button variant='dark' className='debugmenu__btn' onClick={lose}>
				Lose
			</Button>
		</div>
	);
};

export default DebugMenu;
