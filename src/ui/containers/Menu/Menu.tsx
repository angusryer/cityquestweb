import React from "react";
import Button from "react-bootstrap/Button";
import "./Menu.scss";

export default function Menu() {
	// const { playerName, dispatch } = useContext(PlayerContext);
	// const createNewPlayer = () => {
	// 	console.log(playerName);
	// 	dispatch({ type: "new_player", payload: "BOB" })
	// };
	// const deletePlayer = () => {
	// 	dispatch({ type: "delete_player", payload: "BOB" })
	// };
	return (
		<main className='menu'>
			<h1 className='menu__title'>City Quest</h1>
			<div>
				<Button variant='dark' className='menu__btn'>
					Begin
				</Button>
				<Button variant='dark' className='menu__btn'>
					Learn
				</Button>
				<Button variant='dark' className='menu__btn'>
					Quit
				</Button>
			</div>
		</main>
	);
}
