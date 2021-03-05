import { ReactElement } from "react";
import { useAtom } from "jotai";
import Game from "./screens/Game";
import Menu from "./screens/Menu";
import {
	playerDataAtom,
	activeScreenAtom,
	isLoadingGameOfTypeAtom
} from "./gameActions";
import { LoadType, Screen } from "./enums";

export default function ScreenManager(): ReactElement {
	const [user] = useAtom(playerDataAtom);
	const [activeScreen] = useAtom(activeScreenAtom);
	const [, setIsLoadingGameOfType] = useAtom(isLoadingGameOfTypeAtom);

	if (activeScreen === Screen.AUTH)
		if (user?.playerData.skipMenu) {
			setIsLoadingGameOfType(LoadType.SAVED);
			return <Game />;
		} else return <Menu />;
	if (activeScreen === Screen.GAME) return <Game />;
	return <Menu />;
}