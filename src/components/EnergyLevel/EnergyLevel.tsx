import React, { useState, useEffect, useCallback } from "react";
import { useAtom } from "jotai";
import {
	eventTriggeredOfTypeAtom,
	gameElapsedTimeAtom,
	playerEnergyAtom
} from "../../gameActions";
import "./EnergyLevel.scss";
import { EventType } from "../../enums";

const EnergyLevel = () => {
	const [energy, setPlayerEnergy] = useAtom(playerEnergyAtom);
	const [elapsedGameTime] = useAtom(gameElapsedTimeAtom);
	const [, setEventTriggeredOfType] = useAtom(eventTriggeredOfTypeAtom);

	const [missionTime] = useState<number>(30);

	// TODO When active objectives are fetched and set from db,
	// + the maximum energy time will be used to calculate
	// + percentage of energy consumed. For now, we'll hardcode it.

	const widthValue = 100;
	const widthUnit = "px";

	const getWidthAsPercentageOfContainer = () => {
		return getRemainingEnergyPercentage() * widthValue;
	};

	const getRemainingEnergyPercentage = () => {
		const energyRemaining = (missionTime - elapsedGameTime) / missionTime;
		if (energyRemaining <= 0) return 0;
		return energyRemaining;
	};

	const remainingEnergyCallback = useCallback(getRemainingEnergyPercentage, [
		elapsedGameTime,
		missionTime
	]);

	useEffect(() => {
		if (typeof energy === "number" && energy <= 0)
			setEventTriggeredOfType(EventType.NO_ENERGY);
	}, [energy, setEventTriggeredOfType]);

	useEffect(() => {
		setPlayerEnergy(remainingEnergyCallback() * 100);
	}, [elapsedGameTime, setPlayerEnergy, remainingEnergyCallback]);

	const criticalityColor = () => {
		if (energy) {
			if (energy <= 15) {
				return "red";
			} else if (energy > 15 && energy <= 45) {
				return "orange";
			} else if (energy > 45 && energy <= 65) {
				return "yellow";
			} else {
				return "green";
			}
		}
	};

	return (
		<div className='energylevel' style={{ width: `${widthValue}${widthUnit}` }}>
			<div
				className='energylevel__bar'
				style={{
					backgroundColor: criticalityColor(),
					width: `${getWidthAsPercentageOfContainer()}px`
				}}
			></div>
		</div>
	);
};

export default React.memo(EnergyLevel);
