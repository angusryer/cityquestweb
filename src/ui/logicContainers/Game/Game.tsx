import React from "react";
import Button from "react-bootstrap/Button";
import { useAtom } from "jotai";
import { toggleConfigMenu } from "../../../context/gameActions";
import { toggleInGameMenu } from "../../../context/gameActions";
import ConfigMenu from "../../views/componentGroups/ConfigMenu";
import SvgIcon from "@material-ui/icons/Settings";
import "./styles/gear.scss";

type Props = {
	signOutHandler: () => void;
	gameState: InitialGameState;
	setGameState: Hookback<InitialGameState>;
	setIsComingFromGame: Hookback<boolean>;
};

export default function Game({
	signOutHandler,
	gameState,
	setGameState,
	setIsComingFromGame
}: Props) {
	const [toggleConfMenu, setToggleConfMenu] = useAtom(toggleConfigMenu);
	const [inGameMenu, setInGameMenu] = useAtom(toggleInGameMenu);

	if (toggleConfMenu) return <ConfigMenu gameState={gameState} />;

	return (
		<>
			<div className="gear">
				<SvgIcon onClick={() => setInGameMenu(!inGameMenu)} className='gear__icon' />
				{inGameMenu && (
					<div className='gear__menu'>
						<p>
							Current Player:{" "}
							{gameState.gameConfig?.activePlayer?.playerDisplayName}
						</p>
						<Button variant='dark' onClick={() => signOutHandler()}>
							Sign Out
						</Button>
						<Button variant='dark' onClick={() => setIsComingFromGame(true)}>
							Main Menu
						</Button>
						<Button
							variant='dark'
							onClick={() => setToggleConfMenu(!toggleConfMenu)}
						>
							Show Config Menu
						</Button>
					</div>
				)}
			</div>
			<p>Other Stuff</p>
		</>
	);
}
