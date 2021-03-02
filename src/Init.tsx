import React, { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { onUserStateChange, getGlobalPreferences } from "./firebaseLogic";
import { activePlayerAtom, globalPrefsAtom } from "./gameActions";
import GameManager from "./GameManager";
import Auth from "./screens/Auth";
import Splash from "./screens/Splash";

export default function Init() {
	const [activePlayer, setActivePlayer] = useAtom(activePlayerAtom);
	const [globalPrefs, setGlobalPrefs] = useAtom(globalPrefsAtom);
	
	const setActivePlayerRef = useRef(setActivePlayer);
	useEffect(() => {
		onUserStateChange(setActivePlayerRef.current);
	}, []);

	const setGlobalPrefsRef = useRef(setGlobalPrefs);
	useEffect(() => {
		if (activePlayer)
			getGlobalPreferences(activePlayer.playerId, setGlobalPrefsRef.current);
	}, [activePlayer]);

	if (!activePlayer) return <Auth />;
	if (activePlayer && globalPrefs._isLoaded) return <GameManager />;
	return <Splash />;
}
