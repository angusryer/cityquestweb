import React, { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

export default function Menu({ children }: Props) {
	return (
		<main className='mainmenu'>
			<h1 className='menu__title'>City Quest</h1>
			<div>{children}</div>
		</main>
	);
}
