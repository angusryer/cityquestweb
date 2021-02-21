import React, { useState, useEffect, useContext } from "react";
import { useAtom } from "jotai";
import { UserStatus } from "./models/statusEnums";
import Splash from "./ui/logicContainers/Splash";
import Auth from "./ui/logicContainers/Auth";
import { initializeGame } from "./logic/game/gameLogic";
import { GameError } from "./logic/error/exceptionLogic";
import { setupAuthListener } from "./logic/auth/auth";
import Game from "./ui/logicContainers/Game/Game";
import Menu from "./ui/logicContainers/Menu";
import player from "./context/playerContext";

export default function Init() {
	const [activePlayer] = useAtom(player);
	const [appReadyGoToMenu, setAppReadyGoToMenu] = useState<boolean>(false);
	const [appReadyGoToGame, setAppReadyGoToGame] = useState<boolean>(false);
	const [authIsNeeded, setAuthIsNeeded] = useState<boolean>(
		activePlayer.displayName === "Guest Player"
	);

	// const prepareAppResources = async (): Promise<void> => {
	// 	const response = await initializeGame();
	// 	switch (response?.type) {
	// 		case UserStatus.NOT_AUTHENTICATED:
	// 			setAuthIsNeeded(true);
	// 			break;
	// 		case UserStatus.AUTHENTICATED:
	// 			setAppReadyGoToGame(true);
	// 			setAppReadyGoToMenu(true);
	// 			break;
	// 		default:
	// 			throw new GameError(response?.message).logError();
	// 	}
	// };

	useEffect(() => {
		setupAuthListener();
	}, []);

	if (authIsNeeded) return <Auth />;
	if (appReadyGoToMenu) return <Menu />;
	if (appReadyGoToGame) return <Game />;
	return <Splash />;
}
