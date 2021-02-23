import React, { useState, useEffect } from "react";
import Splash from "./ui/logicContainers/Splash";
import Auth from "./ui/logicContainers/Auth";
import Menu from "./ui/logicContainers/Menu";
import Game from "./ui/logicContainers/Game";
import { onUserStateChange } from "./logic/auth/firebaseAuthApis";
import { getGlobalPreferences } from "./logic/db/firebaseDbApis";
import { setupGameEnvironment } from "./context/gameManager";

export default function Init() {
	const [activePlayer, setActivePlayer] = useState<ActivePlayer | null>(null);
	const [globalPrefs, setGlobalPrefs] = useState<GlobalPreferences>({});
	const [appIsReady, setAppIsReady] = useState<boolean>(false);

	const initializeData = async (): Promise<void> => {
		await onUserStateChange(setActivePlayer as Function);
		await getGlobalPreferences(setGlobalPrefs as Function);
	};

	useEffect(() => {
		initializeData();
	}, []);

	useEffect(() => {
		const gameConfig: GameConfig = {
			activePlayer,
			globalPrefs
		};
		setupGameEnvironment(gameConfig, setAppIsReady);
	}, [activePlayer, globalPrefs]);

	if (appIsReady) return <Game />;
	if (!activePlayer) return <Auth setActivePlayer={setActivePlayer} />;
	if (!!activePlayer && !globalPrefs.skipMenu)
		return (
			<Menu setActivePlayer={setActivePlayer} setAppIsReady={setAppIsReady} />
		);
	return <Splash />;
}
