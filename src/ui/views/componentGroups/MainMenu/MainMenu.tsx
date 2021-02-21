import React from "react";
import Button from "react-bootstrap/Button";
import "./MainMenu.scss";

const MainMenu = () => {
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
};

export default MainMenu;
