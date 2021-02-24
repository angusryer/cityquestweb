import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Splash from "./ui/logicContainers/Splash";
import Auth from "./ui/logicContainers/Auth";
import Menu from "./ui/logicContainers/Menu";
import Game from "./ui/logicContainers/Game";
import { onUserStateChange, signOut } from "./logic/auth/firebaseAuthApis";
import { getGlobalPreferences } from "./logic/db/firebaseDbApis";
import GameManager, { configureGameManager } from "./context/gameManager";
import { shouldShowMainMenu } from "./logic/game/gameLogic";

export default function Init() {
	const [activePlayer, setActivePlayer] = useState<ActivePlayer | null>(null);
	const [globalPrefs, setGlobalPrefs] = useState<GlobalPreferences>({});
	const [appIsReady, setAppIsReady] = useState<boolean>(false);
	const [isComingFromGame, setIsComingFromGame] = useState<boolean>(false);

	const initialize = async (): Promise<void> => {
		await onUserStateChange(setActivePlayer as Function);
		await getGlobalPreferences(setGlobalPrefs as Function); // TODO This is a stub
	};

	const signOutHandler = async (
		isComingFromGame: boolean = false
	): Promise<void> => {
		console.log("INIT ==> ", isComingFromGame);
		await signOut();
		if (isComingFromGame) setIsComingFromGame(true);
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

	if (appIsReady)
		return (
			<GameManager>
				<Game signOutHandler={() => signOutHandler(true)} />
			</GameManager>
		);
	if ((!!activePlayer && shouldShowMainMenu(globalPrefs)) || isComingFromGame) {
		// fix above is short circuiting and isComingFromGame is never evaluated
		return (
			<Menu>
				<Button variant='dark' className='menu__btn' onClick={startGame}>
					Begin
				</Button>
				<Button variant='dark' className='menu__btn'>
					Learn
				</Button>
				<Button
					variant='dark'
					className='menu__btn'
					onClick={() => signOutHandler()}
				>
					Sign Out
				</Button>
			</Menu>
		);
	}
	if (!activePlayer) return <Auth setActivePlayer={setActivePlayer} />;
	return <Splash />;
}
