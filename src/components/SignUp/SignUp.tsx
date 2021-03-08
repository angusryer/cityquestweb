import React from "react";
import { FunctionComponent, SyntheticEvent } from "react";
import Button from "react-bootstrap/Button";
import Spacer from "../Spacer";
import './SignUp.scss';

type ViewProps = {
	callback: <T = unknown, R = unknown>(args?: T) => R;
}

const SignUp: FunctionComponent<ViewProps> = ({ callback }: ViewProps) => {
	return (
		<main className='signup'>
			<h1 className='signup__title'>You must authenticate.</h1>
			<Spacer />
			<Button
				variant='dark'
				className='signup__btn'
				onClick={(e: SyntheticEvent) => callback(e)}
			>
				Authenticate with Google
			</Button>
		</main>
	);
};

export default React.memo(SignUp);
