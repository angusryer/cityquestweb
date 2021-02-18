import React, { ReactEventHandler, useContext } from "react";
import Button from "react-bootstrap/Button";
import "./Auth.scss";

// function AuthLogic() {
//     // const {} = useContext()
//     const dummy: Function = (e: ReactEventHandler) => {
//         console.log(e)
//     }

//     return <Auth callback={dummy} />
// }

export default function Auth() {
	return (
		<main className='auth'>
			<h1 className='auth__title'>Login or Signup</h1>
			<Button variant='dark' className='auth__btn' onClick={console.log}>
				Let Google Do It
			</Button>
		</main>
	);
}
