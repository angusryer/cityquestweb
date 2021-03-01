import React, { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { onUserStateChange, getGlobalPreferences } from "./firebaseLogic";
import Auth from "./screens/Auth";
import Menu from "./screens/Menu";
import Splash from "./screens/Splash";
import Game from "./screens/Game";
import {
	activePlayerAtom,
	globalPrefsAtom,
	isComingFromGameAtom,
	appIsReadyAtom
} from "./gameActions";

export default function Init() {
	const [activePlayer, setActivePlayer] = useAtom(activePlayerAtom);
	const [globalPrefs, setGlobalPrefs] = useAtom(globalPrefsAtom);
	const [appIsReady, setAppIsReady] = useAtom(appIsReadyAtom);
	const [isComingFromGame] = useAtom(isComingFromGameAtom);

	const setActivePlayerRef = useRef(setActivePlayer);
	const setGlobalPrefsRef = useRef(setGlobalPrefs);
	const setAppIsReadyRef = useRef(setAppIsReady);

	useEffect(() => {
		(async () => {
			const user = await onUserStateChange();
			setActivePlayerRef.current(user);
		})();
	}, []);

	useEffect(() => {
		if (activePlayer)
			getGlobalPreferences(activePlayer.playerId, setGlobalPrefsRef.current);
	}, [activePlayer]);

	useEffect(() => {
		if (globalPrefs) setAppIsReadyRef.current(true);
	}, [globalPrefs]);

	if (!activePlayer) return <Auth />;
	if (
		isComingFromGame ||
		(activePlayer && !globalPrefs.skipMenu && !appIsReady)
	) {
		return <Menu />;
	}
	if (appIsReady) {
		return <Game />;
	}
	return <Splash />;
}
