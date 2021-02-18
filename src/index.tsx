import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import Init from "./Init";

ReactDOM.render(
	<React.StrictMode>
		<Init />
	</React.StrictMode>,
	document.getElementById("root")
);

reportWebVitals(console.log); // Pass in Google Analytics endpoint here (https://bit.ly/CRA-vitals)
