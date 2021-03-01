import React from "react";
import Button from "react-bootstrap/Button";
import { useAtom } from "jotai";
import {
	globalSignOutAction,
	isComingFromGameAtom,
	startNewGameAction,
	loadLastGameAction
} from "../../gameActions";

export default function Menu() {
	const [isComingFromGame, setIsComingFromGame] = useAtom(isComingFromGameAtom);
	const [, signOutHandler] = useAtom(globalSignOutAction);
	const [, loadLastGame] = useAtom(loadLastGameAction);
	const [, startNewGame] = useAtom(startNewGameAction);
	return (
		<main className='menu'>
			<h1 className='menu__title'>City Quest</h1>
			<div>
				{isComingFromGame && (
					<Button
						variant='dark'
						className='menu__btn'
						onClick={() => setIsComingFromGame(false)}
					>
						Back to Gameplay
					</Button>
				)}
				<Button
					variant='dark'
					className='menu__btn'
					onClick={() => startNewGame()}
				>
					New Game
				</Button>
				<Button
					variant='dark'
					className='menu__btn'
					onClick={() => loadLastGame()}
				>
					Load Last Game
				</Button>
				<Button variant='dark' className='menu__btn'>
					Learn
				</Button>
				<Button
					variant='dark'
					className='menu__btn'
					onClick={() => signOutHandler()}
				>
					Sign Out
				</Button>
			</div>
		</main>
	);
}
