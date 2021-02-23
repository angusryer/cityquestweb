import React from "react";
import Button from "react-bootstrap/Button";
import { signOut } from "../../../logic/auth/firebaseAuthApis";
import MainMenu from "../../views/componentGroups/MainMenu";

export default function Menu({
	setActivePlayer,
	setAppIsReady
}: Hookback<ActivePlayer>) {
	const signOutCallback = async (): Promise<void> => {
		await signOut();
		setActivePlayer(null);
	};

	const setApp = () => {
		console.log("This was called");
		setAppIsReady(true);
	};

	return (
		<MainMenu>
			<Button variant='dark' className='menu__btn' onClick={setApp}>
				Begin
			</Button>
			<Button variant='dark' className='menu__btn'>
				Learn
			</Button>
			<Button variant='dark' className='menu__btn' onClick={signOutCallback}>
				Sign Out
			</Button>
		</MainMenu>
	);
}
