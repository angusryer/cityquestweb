import React, { useRef, useEffect, useState } from "react";
import { useAtom } from "jotai";
import { playerLocationAtom } from "../../gameActions";
import { useLocationWatcher } from "../../helpers";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
// eslint-disable-next-line import/no-webpack-loader-syntax
// import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";

// mapboxgl. = MapboxWorker;
mapboxgl.accessToken =
	"pk.eyJ1IjoiYW5ndXNyeWVyIiwiYSI6ImNrbTZ0MTFtczByZmgyd3Fzc2FsdzBxa2gifQ.Ut7GNNPcjAyyCWR0NP8LXA";

function Map() {
	const [playerLocation, setPlayerLocation] = useAtom(playerLocationAtom);
	const mapContainerRef = useRef<any>("");
	const [zoom, setZoom] = useState(15);

	// Watch players location
	useLocationWatcher(setPlayerLocation);

	useEffect(() => {
		const map = new mapboxgl.Map({
			container: mapContainerRef.current,
			style: "mapbox://styles/mapbox/dark-v10",
			center: [playerLocation?.long || 0, playerLocation?.lat || 0],
			zoom: zoom
		});

		return () => map.remove();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div
			style={{
				position: "absolute",
				top: 0,
				bottom: 0,
				left: 0,
				right: 0
			}}
			ref={mapContainerRef}
		/>
	);
}

export default React.memo(Map);
