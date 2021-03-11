import React, { useEffect, useCallback, useRef } from "react";
import { useAtom } from "jotai";
import {
	eventTriggeredOfTypeAtom,
	gameElapsedTimeAtom,
	playerEnergyAtom,
	missionTimeAtom,
	accumulatedEnergyAction
} from "../../gameActions";
import "./EnergyLevel.scss";
import { EnergyThresholds, EnergyColors, EventType } from "../../enums";

const EnergyLevel = () => {
	const [energy, setPlayerEnergy] = useAtom(playerEnergyAtom);
	const [missionTime] = useAtom(missionTimeAtom);
	const [accumulatedEnergy] = useAtom(accumulatedEnergyAction);
	const [elapsedGameTime] = useAtom(gameElapsedTimeAtom);
	const [, setEventTriggeredOfType] = useAtom(eventTriggeredOfTypeAtom);

	// TODO When active objectives are fetched and set from db,
	// + the maximum energy time will be used to calculate
	// + percentage of energy consumed. For now, we'll hardcode it.

	const widthValue = 100;
	const widthUnit = "px";

	const getEnergyBarWidth = () => {
		return ((energy || 100) / 100) * widthValue;
	};

	const getRemainingEnergy = () => {
		let energyRemaining = (missionTime - elapsedGameTime) / missionTime;
		energyRemaining = energyRemaining * 100 + (accumulatedEnergy || 0);
		if (energyRemaining <= 0) return 0;
		if (energyRemaining >= 100) return 100;
		return energyRemaining;
	};

	const remainingEnergyCallback = useCallback(getRemainingEnergy, [
		elapsedGameTime,
		missionTime,
		accumulatedEnergy
	]);

	const setEventTriggeredOfTypeRef = useRef(setEventTriggeredOfType);
	useEffect(() => {
		if (typeof energy === "number" && energy <= 0)
			setEventTriggeredOfTypeRef.current(EventType.NO_ENERGY);
	}, [energy]);

	const setPlayerEnergyRef = useRef(setPlayerEnergy);
	useEffect(() => {
		setPlayerEnergyRef.current(remainingEnergyCallback);
	}, [elapsedGameTime, remainingEnergyCallback]);

	const getEnergyColor = (value: number | undefined): string => {
		if (value) {
			if (value <= EnergyThresholds.CRITICAL) {
				return EnergyColors.CRITICAL;
			} else if (
				value > EnergyThresholds.CRITICAL &&
				value <= EnergyThresholds.LOW
			) {
				return EnergyColors.LOW;
			} else if (
				value > EnergyThresholds.LOW &&
				value <= EnergyThresholds.MEDIUM
			) {
				return EnergyColors.MEDIUM;
			} else {
				return EnergyColors.HIGH;
			}
		} else {
			return EnergyColors.NONE;
		}
	};

	return (
		<div className='energylevel' style={{ width: `${widthValue}${widthUnit}` }}>
			<div
				className='energylevel__bar'
				style={{
					backgroundColor: `${getEnergyColor(energy)}`,
					width: `${getEnergyBarWidth()}px`
				}}
			></div>
		</div>
	);
};

export default React.memo(EnergyLevel);
