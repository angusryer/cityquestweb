import { useAtom } from "jotai";
import Button from "react-bootstrap/Button";
import { Screen } from "../../enums";
import {
	activePlayerAtom,
	globalSignOutAction,
	toggleConfigMenuAtom,
	saveGameStateAction,
	activeScreenAtom
} from "../../gameActions";
import ConfigMenu from "../ConfigMenu";
import "./InGameMenu.scss";

const InGameMenu: React.FC = () => {
	const [configMenu, toggleConfigMenu] = useAtom(toggleConfigMenuAtom);
	const [activePlayer] = useAtom(activePlayerAtom);
	const [, saveGameState] = useAtom(saveGameStateAction);
	const [, setActiveScreen] = useAtom(activeScreenAtom);
	const [, signOutHandler] = useAtom(globalSignOutAction);

	return (
		<div className='ingamemenu'>
			{configMenu && <ConfigMenu />}
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
				onClick={() => {
					setActiveScreen(Screen.MENU);
				}}
				className='ingamemenu__btn'
			>
				Main Menu
			</Button>
			<Button
				variant='dark'
				onClick={() => saveGameState()}
				className='ingamemenu__btn'
			>
				Save Game
			</Button>
			<Button
				variant='dark'
				onClick={() => toggleConfigMenu(!configMenu)}
				className='ingamemenu__btn'
			>
				Show Config Menu
			</Button>
		</div>
	);
};

export default InGameMenu;