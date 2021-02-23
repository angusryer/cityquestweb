import React from "react";
import { FunctionComponent, SyntheticEvent } from "react";
import Button from "react-bootstrap/Button";
import Spacer from "../../components/Spacer";
import "./SignIn.scss";

const SignIn: FunctionComponent<Hookback<ActivePlayer>> = ({
	callback
}: Hookback<ActivePlayer>) => {
	return (
		<main className='signin'>
			<h1 className='signin__title'>You must authenticate.</h1>
			<Spacer />
			<Button
				variant='dark'
				className='signin__btn'
				onClick={(e: SyntheticEvent) => callback(e)}
			>
				Authenticate with Google
			</Button>
		</main>
	);
};

export default SignIn;
