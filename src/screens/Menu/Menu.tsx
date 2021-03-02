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
	const [, startNewGame] = useAtom(startNewGameAction);
	const [, loadLastGame] = useAtom(loadLastGameAction);
	return (
		<main className='menu'>
			<h1 className='menu__title'>City Quest</h1>
			<div>
				{isComingFromGame && (
					<Button
						variant='dark'
						className='menu__btn'
						onClick={() => setIsComingFromGame(!isComingFromGame)}
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
				<Button
					variant='dark'
					className='menu__btn'
					onClick={() => {
						console.log(
							"https://console.firebase.google.com/u/0/project/city-quest-native/overview"
						);
					}}
				>
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
