import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Splash from "./ui/logicContainers/Splash";
import Auth from "./ui/logicContainers/Auth";
import Menu from "./ui/logicContainers/Menu";
import Game from "./ui/logicContainers/Game";
import { onUserStateChange, signOut } from "./logic/auth/firebaseAuthApis";
import { getGlobalPreferences } from "./logic/db/firebaseDbApis";
import { configureGameManager } from "./context/gameManager";
import { shouldShowMainMenu } from "./logic/game/gameLogic";

export default function Init() {
	const [activePlayer, setActivePlayer] = useState<ActivePlayer | null>(null);
	const [globalPrefs, setGlobalPrefs] = useState<GlobalPreferences>({});
	const [appIsReady, setAppIsReady] = useState<boolean>(false);

	const initialize = async (): Promise<void> => {
		await onUserStateChange(setActivePlayer as Function);
		await getGlobalPreferences(setGlobalPrefs as Function);
	};

	const signOutHandler = async (): Promise<void> => {
		await signOut();
		setActivePlayer(null);
	};

	const startGame = async (): Promise<void> => {
		const gameConfig: GameConfig = {
			activePlayer,
			globalPrefs
		};
		await configureGameManager(gameConfig);
		setAppIsReady(true);
	};
	
	const startGameRef = useRef(startGame);

	useEffect(() => {
		initialize();
	}, []);

	useEffect(() => {
		if (activePlayer && globalPrefs) {
			startGameRef.current();
		}
	}, [activePlayer, globalPrefs]);

	if (appIsReady) return <Game />;
	if (!activePlayer) return <Auth setActivePlayer={setActivePlayer} />;
	if (activePlayer && shouldShowMainMenu(globalPrefs))
		return (
			<Menu>
				<Button variant='dark' className='menu__btn' onClick={startGame}>
					Begin
				</Button>
				<Button variant='dark' className='menu__btn'>
					Learn
				</Button>
				<Button variant='dark' className='menu__btn' onClick={signOutHandler}>
					Sign Out
				</Button>
			</Menu>
		);
	return <Splash />;
}
