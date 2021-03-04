import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "jotai";
import registerServiceWorker from "./serviceWorker";
import reportWebVitals from "./reportWebVitals";
import firebase from "./firebaseConfig";
import Init from "./Init";
import ErrorBoundary from "./ErrorComponent";
import "./globalStyles/reset.scss";
import "./globalStyles/base.scss";
import Splash from "./screens/Splash";

const analytics: firebase.analytics.Analytics = firebase.analytics();

ReactDOM.render(
	<React.StrictMode>
		<ErrorBoundary>
			<Provider>
				<Suspense fallback={<Splash />}>
					<Init />
				</Suspense>
			</Provider>
		</ErrorBoundary>
	</React.StrictMode>,
	document.getElementById("root")
);

registerServiceWorker();
reportWebVitals(analytics.logEvent); // Pass in Google Analytics endpoint here (https://bit.ly/CRA-vitals)
