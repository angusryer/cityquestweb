import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import Init from "./Init";
import firebase from "./firebaseConfig";
import "./ui/globalStyles/reset.scss";
import "./ui/globalStyles/base.scss";
import ErrorBoundary from "./logic/error/ErrorComponent";

const analytics: firebase.analytics.Analytics = firebase.analytics();

ReactDOM.render(
	<React.StrictMode>
		<ErrorBoundary>
			<Init />
		</ErrorBoundary>
	</React.StrictMode>,
	document.getElementById("root")
);

reportWebVitals(analytics.logEvent); // Pass in Google Analytics endpoint here (https://bit.ly/CRA-vitals)
