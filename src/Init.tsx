import { Provider } from "jotai";
import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import GameManager from "./context/gameManager";
import { onUserStateChange, signOut } from "./logic/auth/firebaseAuthApis";
import { getGlobalPreferences } from "./logic/db/firebaseDbApis";
import { shouldSkipMainMenu } from "./logic/game/gameLogic";
import Auth from "./ui/logicContainers/Auth";
import Menu from "./ui/logicContainers/Menu";
import Splash from "./ui/logicContainers/Splash";

export default function Init() {
	const [activePlayer, setActivePlayer] = useState<ActivePlayer | null>(null);
	const [globalPrefs, setGlobalPrefs] = useState<GlobalPreferences>({});
	const [appIsReady, setAppIsReady] = useState<boolean>(false);
	const [isComingFromGame, setIsComingFromGame] = useState<boolean>(false);

	const signOutHandler = (): void => {
		signOut();
		setAppIsReady(false);
		setActivePlayer(null);
		setGlobalPrefs({});
	};

	const toggleGamePlay = () => {
		if (isComingFromGame) setIsComingFromGame(false)
		setAppIsReady(true)
	}

	useEffect(() => {
		(async () => await onUserStateChange(setActivePlayer))();
	}, []);

	useEffect(() => {
		if (activePlayer !== null)
			getGlobalPreferences(activePlayer.playerId, setGlobalPrefs);
	}, [activePlayer]);

	useEffect(() => {
		if (shouldSkipMainMenu(globalPrefs) === true) setAppIsReady(true);
	}, [globalPrefs]);

	if (activePlayer === null) return <Auth setActivePlayer={setActivePlayer} />;
	if (
		isComingFromGame ||
		(activePlayer !== null &&
			shouldSkipMainMenu(globalPrefs) === false &&
			appIsReady === false)
	) {
		return (
			<Menu>
				<Button
					variant='dark'
					className='menu__btn'
					onClick={() => toggleGamePlay()}
				>
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
	if (appIsReady) {
		return (
			<Provider>
				<GameManager
					gameConfig={{
						activePlayer,
						globalPrefs
					}}
					signOutHandler={signOutHandler}
					setIsComingFromGame={setIsComingFromGame}
				/>
			</Provider>
		);
	}
	return <Splash />;
}
