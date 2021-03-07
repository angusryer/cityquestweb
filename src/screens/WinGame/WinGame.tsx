import { useAtom } from "jotai";
import React from "react";
import { EventType } from "../../enums";
import { eventTriggeredOfTypeAtom } from "../../gameActions";
import "./WinGame.scss";

const WinGame = () => {
	const [, setEventTriggeredOfType] = useAtom(eventTriggeredOfTypeAtom);

	return (
		<div>
			<span>You win!</span>
			<button
				type='button'
				onClick={() => setEventTriggeredOfType(EventType.NONE)}
			>
				Begin
			</button>
		</div>
	);
};

export default WinGame;
