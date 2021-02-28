import { ReactElement } from "react";
import { useAtom } from "jotai";
import Button from "react-bootstrap/Button";
import { toggleConfigMenu } from "../../../../context/gameActions";
import {
	// currentGameStateAtom,
	saveGameStateAtom
} from "../../../../context/gameActions";
import ConfigMenu from "../../../views/componentGroups/ConfigMenu";
import "./InGameMenu.scss";

type MenuProps = {
	signOutHandler: () => void;
	gameState: GameState;
	setIsComingFromGame: Hookback<boolean>;
};

const InGameMenu: React.FC<MenuProps> = ({
	signOutHandler,
	gameState,
	setIsComingFromGame
}): ReactElement<MenuProps> => {
	const [toggleConfMenu, setToggleConfMenu] = useAtom(toggleConfigMenu);
	const [saveGameState, setSaveGameState] = useAtom(saveGameStateAtom);

	return (
		<div className='ingamemenu'>
			{toggleConfMenu ? (
				<ConfigMenu gameState={gameState} />
			) : (
				<>
					<p className='ingamemenu__heading'>
						Current Player:{" "}
						{gameState.gameConfig?.activePlayer?.playerDisplayName}
					</p>
					<Button
						variant='dark'
						onClick={() => signOutHandler()}
						className='ingamemenu__btn'
					>
						Sign Out
					</Button>
					<Button
						variant='dark'
						onClick={() => setIsComingFromGame(true)}
						className='ingamemenu__btn'
					>
						Main Menu
					</Button>
					<Button
						variant='dark'
						onClick={() => setSaveGameState()}
						className='ingamemenu__btn'
					>
						Save Game
					</Button>
					<Button
						variant='dark'
						onClick={() => console.log(saveGameState)}
						className='ingamemenu__btn'
					>
						Load Last Saved Game
					</Button>
					<Button
						variant='dark'
						onClick={() => setToggleConfMenu(!toggleConfMenu)}
						className='ingamemenu__btn'
					>
						Show Config Menu
					</Button>
				</>
			)}
		</div>
	);
};

export default InGameMenu;
