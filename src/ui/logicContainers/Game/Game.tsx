import React from "react";
import { useAtom } from "jotai";
import { toggleInGameMenu } from "../../../context/gameActions";
import InGameMenu from "./InGameMenu";
import EnergyLevel from "./EnergyLevel";
import Grade from "./Grade";
import SvgIcon from "@material-ui/icons/Settings";
import "./Game.scss";

type Props = {
	signOutHandler: () => void;
	gameState: GameState;
	setIsComingFromGame: Hookback<boolean>;
};

export default function Game({
	signOutHandler,
	gameState,
	setIsComingFromGame
}: Props) {
	const [inGameMenu, setInGameMenu] = useAtom(toggleInGameMenu);

	if (inGameMenu)
		return (
			<div className='game__modal'>
				<SvgIcon
					onClick={() => setInGameMenu(false)}
					className='game__modal-icon'
				/>
				<InGameMenu
					signOutHandler={signOutHandler}
					gameState={gameState}
					setIsComingFromGame={setIsComingFromGame}
				/>
			</div>
		);

	return (
		<main className='game'>
			<div className='game__hud'>
				<EnergyLevel />
				{/* <ItemsListButton>
					<ItemsList items={items} />
				</ItemsListButton> */}
				<Grade />
				<SvgIcon
					onClick={() => setInGameMenu(true)}
					className='game__hud-icon'
				/>
			</div>
			<div className='game__media'></div>
			{/**
			 * <MediaContainer />
			 * <InfoBar />
			 * <Map />
			 */}
		</main>
	);
}
