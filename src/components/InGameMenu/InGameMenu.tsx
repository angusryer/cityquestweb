import { useState, useEffect, useRef } from "react";
import { useAtom } from "jotai";
import Button from "react-bootstrap/Button";
import { EventType, Screen } from "../../enums";
import {
	activePlayerAtom,
	globalSignOutAction,
	toggleConfigMenuAtom,
	saveGameStateAction,
	activeScreenAtom,
	gameElapsedTimeAtom,
	eventTriggeredOfTypeAtom
} from "../../gameActions";
import { getElapsedTimeString } from "../../helpers";
import ConfigMenu from "../ConfigMenu";
import "./InGameMenu.scss";

const InGameMenu: React.FC = () => {
	const [message, setMessage] = useState<string>("");
	const [configMenu, toggleConfigMenu] = useAtom(toggleConfigMenuAtom);
	const [activePlayer] = useAtom(activePlayerAtom);
	const [gameElapsedTime] = useAtom(gameElapsedTimeAtom);
	const [eventTriggeredOfType, setEventTriggeredOfType] = useAtom(
		eventTriggeredOfTypeAtom
	);
	const [, saveGameState] = useAtom(saveGameStateAction);
	const [, setActiveScreen] = useAtom(activeScreenAtom);
	const [, signOutHandler] = useAtom(globalSignOutAction);

	const timerId = useRef<number>(0);
	useEffect(() => {
		timerId.current = window.setTimeout(() => {
			setMessage("");
		}, 2000);
		return () => {
			clearTimeout(timerId.current);
		};
	}, [message]);

	return (
		<div className='ingamemenu'>
			{configMenu && <ConfigMenu />}
			<span className='ingamemenu__message'>{message}</span>
			<span className='ingamemenu__heading'>
				Current Player: {activePlayer?.playerDisplayName}
			</span>
			<span className='ingamemenu__heading'>
				Elapsed Time: {getElapsedTimeString(gameElapsedTime)}
			</span>
			<Button
				variant='dark'
				onClick={() => signOutHandler()}
				className='ingamemenu__btn'
			>
				Sign Out
			</Button>
			<Button
				variant='dark'
				onClick={() => {
					setActiveScreen(Screen.MENU);
				}}
				className='ingamemenu__btn'
			>
				Main Menu
			</Button>
			{eventTriggeredOfType === EventType.END_GAME && (
				<Button
					variant='dark'
					onClick={() => {
						saveGameState();
						setMessage("Game saved!");
					}}
					className='ingamemenu__btn'
				>
					Save Game
				</Button>
			)}
			<Button
				variant='dark'
				onClick={() => toggleConfigMenu(!configMenu)}
				className='ingamemenu__btn'
			>
				Toggle Dev Menu
			</Button>
		</div>
	);
};

export default InGameMenu;
