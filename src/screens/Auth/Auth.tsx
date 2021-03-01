import { useAtom } from "jotai";
import Button from "react-bootstrap/Button";
import Spacer from "../../components/Spacer";
import { signInWithPopup } from "../../firebaseLogic";
import "./Auth.scss";
import { activePlayerAtom } from "../../gameActions";

export default function Auth() {
	const [, setActivePlayer] = useAtom(activePlayerAtom)
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
