import Button from "react-bootstrap/Button";
import Spacer from "../../views/components/Spacer";
import { signInWithPopup } from "../../../logic/auth/firebaseAuthApis";
import "./Auth.scss";

export default function Auth({ setActivePlayer }: Hookback<ActivePlayer>) {
	return (
		<main className='auth'>
			<h1 className='auth__title'>You must authenticate.</h1>
			<Spacer />
			<Button
				variant='dark'
				className='auth__btn'
				onClick={() => signInWithPopup(setActivePlayer)}
			>
				Authenticate with Google
			</Button>
		</main>
	);
}
