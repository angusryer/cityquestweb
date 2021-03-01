import React from "react";
import Spinner from "react-bootstrap/Spinner";
import "./Splash.scss";

const Splash = () => {
	return (
		<main className='splash'>
			<div className='splash__spinnergrp'>
				<Spinner animation='grow' className='splash__spinnergrp-spinner' />
				<Spinner animation='grow' className='splash__spinnergrp-spinner' />
				<Spinner animation='grow' className='splash__spinnergrp-spinner' />
			</div>
		</main>
	);
};

export default Splash;
