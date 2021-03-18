import React, { useEffect } from "react";
import { useAtom } from "jotai";
import ReactMapGL, { Marker } from "react-map-gl";
import {
	playerLocationAtom,
	mapStateAtom,
	gameLocationsAtom
} from "../../gameActions";
import { useLocationWatcher } from "../../helpers";
import "mapbox-gl/dist/mapbox-gl.css";
import { getGameLocations } from "../../firebaseLogic";

function Map() {
	const [playerLocation, setPlayerLocation] = useAtom(playerLocationAtom);
	const [gameLocations, setGameLocations] = useAtom(gameLocationsAtom);
	const [mapState, setMapState] = useAtom(mapStateAtom);

	// Watch players location
	useLocationWatcher(setPlayerLocation);

	useEffect(() => {
		getGameLocations();
	}, []);

	const updateViewport = (viewData: MapState) => {
		setMapState({
			...mapState,
			zoom: viewData.zoom,
			latitude: viewData.latitude,
			longitude: viewData.longitude
		});
	};

	return (
		<ReactMapGL
			mapboxApiAccessToken={process.env.REACT_APP_MBK}
			width='100%'
			height='100%'
			latitude={!mapState.latitude ? playerLocation?.lat : mapState.latitude}
			longitude={
				!mapState.longitude ? playerLocation?.long : mapState.longitude
			}
			zoom={mapState.zoom || 13}
			className='map'
			mapStyle={process.env.REACT_APP_MBS}
			attributionControl={false}
			onViewportChange={(viewData: MapState) => updateViewport(viewData)}
		>
			<Marker
				key={1}
				latitude={playerLocation?.lat || 0}
				longitude={playerLocation?.long || 0}
			>
				🤺
			</Marker>
		</ReactMapGL>
	);
}

export default React.memo(Map);
