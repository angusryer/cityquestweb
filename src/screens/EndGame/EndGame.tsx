import React from 'react';
import { useAtom } from "jotai";
import Button from "react-bootstrap/Button";
import { EventType, Screen } from "../../enums";
import { activeScreenAtom, eventTriggeredOfTypeAtom } from "../../gameActions";
import "./EndGame.scss";

const EndGame = () => {
	const [, setEventTriggeredOfType] = useAtom(eventTriggeredOfTypeAtom);
	const [, setActiveScreen] = useAtom(activeScreenAtom);

	return (
		<div className="endgame">
			<span>You Lose</span>{" "}
			<Button
				variant='dark'
				onClick={() => {
					setEventTriggeredOfType(EventType.NONE);
					setActiveScreen(Screen.NONE);
				}}
			>
				Head Home
			</Button>
		</div>
	);
};

export default React.memo(EndGame);
