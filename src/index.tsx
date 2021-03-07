import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "jotai";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { analytics } from "./firebaseConfig";
import ErrorBoundary from "./ErrorComponent";
import Init from "./Init";
import Splash from "./screens/Splash";
import "./globalStyles/reset.scss";
import "./globalStyles/base.scss";

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

serviceWorkerRegistration.register();
reportWebVitals(analytics.logEvent); // Pass in Google Analytics endpoint here (https://bit.ly/CRA-vitals)
