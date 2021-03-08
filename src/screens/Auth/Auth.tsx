import React from "react";
import Button from "react-bootstrap/Button";
import Spacer from "../../components/Spacer";
import { signInWithPopup } from "../../firebaseLogic";
import "./Auth.scss";

function Auth() {
	return (
		<main className='auth'>
			<h1 className='auth__title'>You must authenticate.</h1>
			<Spacer />
			<Button
				variant='dark'
				className='auth__btn'
				onClick={() => signInWithPopup()}
			>
				Authenticate with Google
			</Button>
		</main>
	);
}

export default React.memo(Auth);
