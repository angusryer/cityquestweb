import React from "react";
import SplashSvg from "./SplashSvg";
import "./Splash.scss";

const Splash = () => {
	return (
		<main className='splash'>
			<div className='splash__logo'>
				<SplashSvg />
			</div>
		</main>
	);
};

export default React.memo(Splash);
