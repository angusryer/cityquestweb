import React from "react";
import"./Splash.scss";
// import { useContext } from "react";
// import { PlayerContext } from "../../../context/playerContext";

export default function Splash() {
	// const { playerName, dispatch } = useContext(PlayerContext);
	// const createNewPlayer = () => {
	// 	console.log(playerName);
	// 	dispatch({ type: "new_player", payload: "BOB" })
	// };
	// const deletePlayer = () => {
	// 	dispatch({ type: "delete_player", payload: "BOB" })
	// };

	return (
		<section className="splash">
			<h1 className="splash__title">This is the Splash screen</h1>
			{/* <Button title='New Player' onPress={createNewPlayer}>
				New player!
			</Button>
			<Button title='Delete Player' onPress={deletePlayer}>
				Delete player!
			</Button> */}
		</section>
	);
}
