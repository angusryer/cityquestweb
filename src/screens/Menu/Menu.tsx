import React from "react";
import Button from "react-bootstrap/Button";
import { useAtom } from "jotai";
import {
	globalSignOutAction,
	startNewGameAction,
	loadLastGameAction,
	activeScreenAtom,
	toggleConfigMenuAtom,
	toggleInGameMenuAtom
} from "../../gameActions";
import { Screen } from "../../enums";

export default function Menu() {
	const [activeScreen, setActiveScreen] = useAtom(activeScreenAtom);
	const [, toggleInGameMenu] = useAtom(toggleInGameMenuAtom);
	const [, toggleConfigMenu] = useAtom(toggleConfigMenuAtom);
	const [, signOutHandler] = useAtom(globalSignOutAction);
	const [, startNewGame] = useAtom(startNewGameAction);
	const [, loadLastGame] = useAtom(loadLastGameAction);

	return (
		<main className='menu'>
			<h1 className='menu__title'>City Quest</h1>
			<div>
				{activeScreen === Screen.MENU && (
					<Button
						variant='dark'
						className='menu__btn'
						onClick={() => {
							toggleConfigMenu(false);
							toggleInGameMenu(false);
							setActiveScreen(Screen.GAME);
						}}
					>
						Back to Gameplay
					</Button>
				)}
				<Button
					variant='dark'
					className='menu__btn'
					onClick={() => startNewGame()}
				>
					New Game
				</Button>
				<Button
					variant='dark'
					className='menu__btn'
					onClick={() => loadLastGame()}
				>
					Load Last Game
				</Button>
				<Button
					variant='dark'
					className='menu__btn'
					onClick={() => {
						console.log(
							"https://console.firebase.google.com/u/0/project/city-quest-native/overview"
						);
					}}
				>
					Learn
				</Button>
				<Button
					variant='dark'
					className='menu__btn'
					onClick={() => signOutHandler()}
				>
					Sign Out
				</Button>
			</div>
		</main>
	);
}
