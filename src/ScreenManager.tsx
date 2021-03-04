import { ReactElement, Suspense } from "react";
import { useAtom } from "jotai";
import Game from "./screens/Game";
import Menu from "./screens/Menu";
import { playerDataAtom, activeScreenAtom } from "./gameActions";
import { Screen } from "./enums";

export default function ScreenManager(): ReactElement {
	const [user] = useAtom(playerDataAtom);
	const [activeScreen] = useAtom(activeScreenAtom);

	if (activeScreen === Screen.AUTH)
		user?.playerData.skipMenu ? <Game /> : <Menu />;
	if (activeScreen === Screen.GAME) return <Game />;
	return <Menu />;
}
