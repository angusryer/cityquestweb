import { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { onUserStateChange, onPlayerDataChange } from "./firebaseLogic";
import {
	activePlayerAtom,
	playerDataAtom,
	playerPermissionsAction
} from "./gameActions";
import ScreenManager from "./screens/ScreenManager";
import Auth from "./screens/Auth";
import Splash from "./screens/Splash";

function Init() {
	const [activePlayer, setActivePlayer] = useAtom(activePlayerAtom);
	const [playerData, setPlayerData] = useAtom(playerDataAtom);
	const [, getPlayerPermissions] = useAtom(playerPermissionsAction);

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

	const getPlayerPermissionsRef = useRef(getPlayerPermissions);
	useEffect(() => {
		if (playerData) {
			getPlayerPermissionsRef.current();
		}
	}, [playerData]);

	if (!activePlayer) return <Auth />;
	if (activePlayer && playerData) return <ScreenManager />;
	return <Splash />;
}

export default Init;
