import { useAtom } from "jotai";
import Button from "react-bootstrap/Button";
import { EventType, Screen } from "../../enums";
import { activeScreenAtom, eventTriggeredOfTypeAtom } from "../../gameActions";
import "./WinGame.scss";

const WinGame = () => {
	const [, setEventTriggeredOfType] = useAtom(eventTriggeredOfTypeAtom);
	const [, setActiveScreen] = useAtom(activeScreenAtom);

	return (
		<div>
			<span>You win!</span>
			<Button
				variant='dark'
				onClick={() => {
					setEventTriggeredOfType(EventType.NONE);
					setActiveScreen(Screen.END_GAME);
				}}
			>
				Head Home
			</Button>
		</div>
	);
};

export default WinGame;
