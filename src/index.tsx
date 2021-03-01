import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'jotai';
import reportWebVitals from "./reportWebVitals";
import Init from "./Init";
import firebase from "./firebaseConfig";
import "./globalStyles/reset.scss";
import "./globalStyles/base.scss";
import ErrorBoundary from "./ErrorComponent";

const analytics: firebase.analytics.Analytics = firebase.analytics();

ReactDOM.render(
	<React.StrictMode>
		<ErrorBoundary>
			<Provider>
				<Init />
			</Provider>
		</ErrorBoundary>
	</React.StrictMode>,
	document.getElementById("root")
);

reportWebVitals(analytics.logEvent); // Pass in Google Analytics endpoint here (https://bit.ly/CRA-vitals)
