import { ReactElement, useRef, useEffect } from "react";
import { useAtom } from "jotai";
import { getGlobalPreferences } from "./firebaseLogic";
import Game from "./screens/Game";
import Menu from "./screens/Menu";
import Splash from "./screens/Splash";
import {
	activePlayerAtom,
	globalPrefsAtom,
	isComingFromGameAtom,
	isComingFromAuthAtom,
	appIsReadyAtom
} from "./gameActions";

export default function GameManager(): ReactElement {
	const [activePlayer] = useAtom(activePlayerAtom);
	const [globalPrefs, setGlobalPrefs] = useAtom(globalPrefsAtom);
	const [appIsReady, setAppIsReady] = useAtom(appIsReadyAtom);
	const [isComingFromAuth, setIsComingFromAuth] = useAtom(isComingFromAuthAtom);
	const [isComingFromGame] = useAtom(isComingFromGameAtom);

	const setGlobalPrefsRef = useRef(setGlobalPrefs);
	useEffect(() => {
		if (activePlayer)
			getGlobalPreferences(activePlayer.playerId, setGlobalPrefsRef.current);
	}, [activePlayer]);

	const setAppIsReadyRef = useRef(setAppIsReady);
	useEffect(() => {
		if (globalPrefs._isLoaded) setAppIsReadyRef.current(true);
	}, [globalPrefs]);

	const setIsComingFromAuthRef = useRef(setIsComingFromAuth);

	if (appIsReady) {
		if (isComingFromAuth) {
			setIsComingFromAuthRef.current(false);
			return globalPrefs.skipMenu ? <Game /> : <Menu />;
		}
		return isComingFromGame ? <Menu /> : <Game />;
	}
	return <Splash />;
}
