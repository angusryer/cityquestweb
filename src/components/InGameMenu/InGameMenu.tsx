import { useAtom } from "jotai";
import Button from "react-bootstrap/Button";
import {
	activePlayerAtom,
	globalSignOutAction,
	isComingFromGameAtom,
	toggleConfigMenu,
	gameStateComputed
} from "../../gameActions";
import ConfigMenu from "../ConfigMenu";
import "./InGameMenu.scss";

const InGameMenu: React.FC = () => {
	const [toggleConfMenu, setToggleConfMenu] = useAtom(toggleConfigMenu);
	const [gameState, computeGameState] = useAtom(gameStateComputed);
	const [activePlayer] = useAtom(activePlayerAtom);
	const [, setIsComingFromGame] = useAtom(isComingFromGameAtom);
	const [, signOutHandler] = useAtom(globalSignOutAction);

	return (
		<div className='ingamemenu'>
			{toggleConfMenu ? (
				<ConfigMenu />
			) : (
				<>
					<p className='ingamemenu__heading'>
						Current Player: {activePlayer?.playerDisplayName}
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
						onClick={() => computeGameState()}
						className='ingamemenu__btn'
					>
						Save Game
					</Button>
					<Button
						variant='dark'
						onClick={() => console.log(gameState)}
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
