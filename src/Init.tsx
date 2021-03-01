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
	shouldShowMenuComputed,
	appIsReadyComputed
} from "./gameActions";

export default function Init() {
	const [activePlayer, setActivePlayer] = useAtom(activePlayerAtom);
	const [globalPrefs, setGlobalPrefs] = useAtom(globalPrefsAtom);
	const [appIsReady, setAppIsReady] = useAtom(appIsReadyComputed);
	const [shouldShowMenu] = useAtom(shouldShowMenuComputed);

	const setActivePlayerRef = useRef(setActivePlayer);
	const setGlobalPrefsRef = useRef(setGlobalPrefs);
	const setAppIsReadyRef = useRef(setAppIsReady);

	useEffect(() => {
		onUserStateChange(setActivePlayerRef.current);
	}, []);

	useEffect(() => {
		if (activePlayer)
			getGlobalPreferences(activePlayer.playerId, setGlobalPrefsRef.current);
	}, [activePlayer]);

	useEffect(() => {
		if (globalPrefs._isLoaded) setAppIsReadyRef.current(true);
	}, [globalPrefs]);

	if (!activePlayer) return <Auth />;
	// maybe a GameManager here to switch between Menu and Game, and appIsReady belongs to GameManager, and then shouldShowMenu should go inside of Menu
	if (shouldShowMenu) return <Menu />;
	if (appIsReady) return <Game />; // see if I can render this outside of Init... not from Menu, but Menu and Game should be siblings
	return <Splash />;
}
