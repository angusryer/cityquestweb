import React from "react";
import Button from "react-bootstrap/Button";
import { useAtom } from "jotai";
import {
	globalSignOutAction,
	startNewGameAction,
	loadLastGameAction,
	activeScreenAtom,
	toggleConfigMenuAtom,
	toggleInGameMenuAtom,
	isLoadingGameOfTypeAtom,
	playerDataAtom
} from "../../gameActions";
import { LoadType, Screen } from "../../enums";

function Menu() {
	const [activeScreen, setActiveScreen] = useAtom(activeScreenAtom);
	const [playerData] = useAtom(playerDataAtom);
	const [, setIsLoadingGameOfType] = useAtom(isLoadingGameOfTypeAtom);
	const [, toggleInGameMenu] = useAtom(toggleInGameMenuAtom);
	const [, toggleConfigMenu] = useAtom(toggleConfigMenuAtom);
	const [, signOutHandler] = useAtom(globalSignOutAction);
	const [, startNewGame] = useAtom(startNewGameAction);
	const [, loadLastGame] = useAtom(loadLastGameAction);

	const backToGamePlay = () => {
		toggleConfigMenu(false);
		toggleInGameMenu(false);
		setIsLoadingGameOfType(LoadType.NONE);
		setActiveScreen(Screen.GAME);
	};

	return (
		<main className='menu'>
			<h1 className='menu__title'>City Quest</h1>
			<div>
				{activeScreen === Screen.MENU && (
					<Button variant='dark' className='menu__btn' onClick={backToGamePlay}>
						Back to Gameplay
					</Button>
				)}
				<Button variant='dark' className='menu__btn' onClick={startNewGame}>
					New Game
				</Button>
				{Object.keys(playerData?.lastGameState || {}).length > 0 && (
					<Button variant='dark' className='menu__btn' onClick={loadLastGame}>
						Load Last Game
					</Button>
				)}
				<Button variant='dark' className='menu__btn'>
					Learn
				</Button>
				<Button variant='dark' className='menu__btn' onClick={signOutHandler}>
					Sign Out
				</Button>
			</div>
		</main>
	);
}

export default React.memo(Menu);
