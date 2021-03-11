import { ReactElement } from "react";
import { useAtom } from "jotai";
import Game from "./Game";
import Menu from "./Menu";
import { playerDataAtom, activeScreenAtom } from "../gameActions";
import { Screen } from "../enums";

export default function ScreenManager(): ReactElement {
	const [user] = useAtom(playerDataAtom);
	const [activeScreen] = useAtom(activeScreenAtom);

	if (
		(activeScreen === Screen.AUTH && user?.playerData?.skipMenu) ||
		activeScreen === Screen.GAME
	)
		return <Game />;
	return <Menu />;
}
