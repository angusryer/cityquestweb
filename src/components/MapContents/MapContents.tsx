import React, { useCallback, useEffect } from "react";
import { useAtom } from "jotai";
import { TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import { v4 as uuid } from "uuid";
import {
	playerLocationAtom,
	mapStateAtom,
	gameLocationsAtom
} from "../../gameActions";
import { useLocationWatcher } from "../../helpers";
import { getGameLocations } from "../../firebaseLogic";
import "./MapContents.scss";
import {
	LatLngBoundsExpression,
	LatLngExpression,
	LatLngBoundsLiteral,
	Point
} from "leaflet";

function MapContents() {
	const [playerLocation, setPlayerLocation] = useAtom(playerLocationAtom);
	const [gameLocations, setGameLocations] = useAtom(gameLocationsAtom);
	const [mapState, setMapState] = useAtom(mapStateAtom);
	const mapContext = useMap();
	const mapEvents = useMapEvents({
		locationfound: (loc) => {
			mapContext.setView(loc.latlng);
		}
	});

	const getLargestDistance = useCallback((): LatLngBoundsExpression => {
		return [
			[playerLocation?.lat || 0, playerLocation?.long || 0],
			[44.4828059, -77.682261]
		] as LatLngBoundsLiteral;
	}, [playerLocation]);

	// Watch players location
	useLocationWatcher(setPlayerLocation);

	useEffect(() => {
		getGameLocations(setGameLocations);
	}, [setGameLocations]);

	useEffect(() => {
		mapContext.setView([
			playerLocation?.lat || 0,
			playerLocation?.long || 0
		] as LatLngExpression);
		if (gameLocations) {
			const largestDistance: LatLngBoundsExpression = getLargestDistance();
			mapContext.fitBounds(largestDistance, { padding: new Point(20, 20) });
		}
	}, [playerLocation, mapContext, gameLocations, getLargestDistance]);

	return (
		<>
			<TileLayer
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
			/>
			<Marker position={[playerLocation?.lat || 0, playerLocation?.long || 0]}>
				<Popup>YOU</Popup>
			</Marker>
			{gameLocations &&
				gameLocations.map((point) => {
					return (
						<Marker key={uuid()} position={point.location}>
							<Popup>{point.name}</Popup>
						</Marker>
					);
				})}
		</>
	);
}

export default React.memo(MapContents);

// 44.4828059
// -77.682261
