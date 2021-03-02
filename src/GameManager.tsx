import { ReactElement, useRef, useEffect } from "react";
import { useAtom } from "jotai";
import Game from "./screens/Game";
import Menu from "./screens/Menu";
import { globalPrefsAtom, originatingScreenAtom } from "./gameActions";
import { Screen } from "./enums";

export default function GameManager(): ReactElement {
	const [globalPrefs] = useAtom(globalPrefsAtom);
	const [originatingScreen] = useAtom(originatingScreenAtom);

	if (originatingScreen === Screen.AUTH) {
		return globalPrefs.skipMenu ? <Game /> : <Menu />;
	}
	return originatingScreen === Screen.MENU ? <Game /> : <Menu />;
}
