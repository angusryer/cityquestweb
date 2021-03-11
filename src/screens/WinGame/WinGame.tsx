import React from "react";
import { useAtom } from "jotai";
import Button from "react-bootstrap/Button";
import { EventType, Screen } from "../../enums";
import { activeScreenAtom, eventTriggeredOfTypeAtom } from "../../gameActions";
import "./WinGame.scss";

const WinGame = () => {
	const [, setEventTriggeredOfType] = useAtom(eventTriggeredOfTypeAtom);
	const [, setActiveScreen] = useAtom(activeScreenAtom);

	const goBackToMainMenu = () => {
		setEventTriggeredOfType(EventType.NONE);
		setActiveScreen(Screen.NONE);
	};

	return (
		<div className='wingame'>
			<span>You win!</span>{" "}
			<Button variant='dark' onClick={goBackToMainMenu}>
				Head Home
			</Button>
		</div>
	);
};

export default React.memo(WinGame);
