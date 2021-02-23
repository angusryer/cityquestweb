import React, { ReactNode } from "react";
import "./MainMenu.scss";

const MainMenu: React.FC<ReactNode> = ({ children }) => {
	return (
		<main className='mainmenu'>
			<h1 className='menu__title'>City Quest</h1>
			<div>{children}</div>
		</main>
	);
};

export default MainMenu;
