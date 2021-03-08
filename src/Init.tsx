import React, { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { onUserStateChange, onPlayerDataChange } from "./firebaseLogic";
import { activePlayerAtom, playerDataAtom } from "./gameActions";
import ScreenManager from "./ScreenManager";
import Auth from "./screens/Auth";
import Splash from "./screens/Splash";

function Init() {
	const [activePlayer, setActivePlayer] = useAtom(activePlayerAtom);
	const [playerData, setPlayerData] = useAtom(playerDataAtom);

	const setActivePlayerRef = useRef(setActivePlayer);
	useEffect(() => {
		onUserStateChange(setActivePlayerRef.current);
	}, []);

	const setPlayerDataRef = useRef(setPlayerData);
	useEffect(() => {
		if (activePlayer) {
			onPlayerDataChange(activePlayer.playerId, setPlayerDataRef.current);
		}
	}, [activePlayer]);

	if (!activePlayer) return <Auth />;
	if (activePlayer && playerData) return <ScreenManager />;
	return <Splash />;
}

export default React.memo(Init);