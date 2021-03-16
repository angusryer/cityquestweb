import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { Loader } from "@googlemaps/js-api-loader";
import { playerLocationAtom } from "../../gameActions";
import { useLocationWatcher } from "../../helpers";
import { rgbToHex } from "@material-ui/core";

const loader = new Loader({
	apiKey: process.env.REACT_APP_GOOGLEMAPSKEY || "",
	version: "beta"
});

function Map() {
	const [playerLocation, setPlayerLocation] = useAtom(playerLocationAtom);

	// Watch players location
	useLocationWatcher(setPlayerLocation);

	useEffect(() => {
		loader.load().then(() => {
			new google.maps.Map(document.getElementById("map") as HTMLElement, {
				center: {
					lat: playerLocation?.lat || 0,
					lng: playerLocation?.long || 0
				},
				zoom: 12,
                disableDefaultUI: true,
			});
		});
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div
			id='map'
			style={{
				position: "absolute",
				top: 0,
				bottom: 0,
				left: 0,
				right: 0
			}}
		/>
	);
}

export default React.memo(Map);
