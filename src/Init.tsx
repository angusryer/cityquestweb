import React, { useState, useEffect } from "react";
import { UserStatus } from "./models/statusEnums";
import { Splash } from "./ui/containers/Splash";
import { Menu } from "./ui/containers/Menu";
import { Auth } from "./ui/containers/Auth";
import { initializeGame } from "./logic/init/gameLogic";
import { GameError } from "./logic/error/exceptionLogic";

export default function Init() {
	const [appIsReady, setAppIsReady] = useState<boolean>(false);
	const [authIsNeeded, setAuthIsNeeded] = useState<boolean>(false);

	const prepareAppResources = async (): Promise<void> => {
		const response = await initializeGame();
		switch (response?.type) {
			case UserStatus.NOT_AUTHENTICATED:
				setAuthIsNeeded(true);
				break;
			case UserStatus.AUTHENTICATED:
				setAppIsReady(true);
				break;
			default:
				throw new GameError(response?.message).logError();
		}
	};

	useEffect(() => {
		prepareAppResources();
	}, []);

	if (authIsNeeded) return <Auth />;
	if (appIsReady) return <Menu />;
	else return <Splash />;
}
