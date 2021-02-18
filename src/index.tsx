import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import Init from "./Init";
import firebase from './firebaseConfig';
import './ui/styles/reset.scss'
import './ui/styles/base.scss'

const analytics: firebase.analytics.Analytics = firebase.analytics();

ReactDOM.render(
	<React.StrictMode>
		<Init />
	</React.StrictMode>,
	document.getElementById("root")
);

reportWebVitals(analytics.logEvent); // Pass in Google Analytics endpoint here (https://bit.ly/CRA-vitals)
