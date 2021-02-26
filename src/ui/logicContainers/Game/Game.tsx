import React from "react";
import { useAtom } from "jotai";
import { toggleInGameMenu } from "../../../context/gameActions";
import InGameMenu from "./InGameMenu";
import SvgIcon from "@material-ui/icons/Settings";
import "./styles/gear.scss";

type Props = {
	signOutHandler: () => void;
	gameState: InitialGameState;
	saveGameState: () => void;
	loadGameState: () => React.CElement<{}, React.Component<{}, any, any>>;
	setIsComingFromGame: Hookback<boolean>;
};

export default function Game({
	signOutHandler,
	gameState,
	saveGameState,
	loadGameState,
	setIsComingFromGame
}: Props) {
	const [inGameMenu, setInGameMenu] = useAtom(toggleInGameMenu);

	return (
		<>
			<div className='gear'>
				<SvgIcon
					onClick={() => setInGameMenu(!inGameMenu)}
					className='gear__icon'
				/>
				{inGameMenu && (
					<InGameMenu
						signOutHandler={signOutHandler}
						gameState={gameState}
						saveGameState={saveGameState}
						loadGameState={loadGameState}
						setIsComingFromGame={setIsComingFromGame}
					/>
				)}
			</div>
			<p>The Actual Game</p>
		</>
	);
}
