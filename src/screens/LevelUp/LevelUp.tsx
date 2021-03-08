import React from "react";
import { useAtom } from "jotai";
import Button from "react-bootstrap/Button";
import { EventType } from "../../enums";
import { eventTriggeredOfTypeAtom } from "../../gameActions";
import "./LevelUp.scss";

const LevelUp = () => {
	const [, setEventTriggeredOfType] = useAtom(eventTriggeredOfTypeAtom);

	return (
		<div>
			<span>Level Up!</span>{" "}
			<Button
				variant='dark'
				onClick={() => {
					setEventTriggeredOfType(EventType.NONE);
				}}
			>
				Continue!
			</Button>
		</div>
	);
};

export default LevelUp;
