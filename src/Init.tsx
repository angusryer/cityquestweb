import React, { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { onUserStateChange } from "./firebaseLogic";
import { activePlayerAtom } from "./gameActions";
import GameManager from "./GameManager";
import Auth from "./screens/Auth";
import Splash from "./screens/Splash";

export default function Init() {
	const [activePlayer, setActivePlayer] = useAtom(activePlayerAtom);
	const setActivePlayerRef = useRef(setActivePlayer);

	useEffect(() => {
		onUserStateChange(setActivePlayerRef.current);
	}, []);

	if (!activePlayer) return <Auth />;
	if (activePlayer) return <GameManager />;
	return <Splash />;
}
