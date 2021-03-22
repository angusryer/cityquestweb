import React, { useCallback, useEffect } from "react";
import { useAtom } from "jotai";
import { v4 as uuid } from "uuid";
import { TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import {
	LatLngBoundsExpression,
	LatLngExpression,
	LatLngBoundsLiteral,
	Point,
	latLngBounds
} from "leaflet";
import {
	playerLocationAtom,
	mapStateAtom,
	gameLocationsAtom
} from "../../gameActions";
import { useLocationWatcher } from "../../helpers";
import { getGameLocations } from "../../firebaseLogic";
import "./MapContents.scss";
import { makeHull, getAntiPodalPair, PointArray } from "../../mapFunctions";

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

	const getBoundingBox = useCallback((): LatLngBoundsExpression => {
		if (gameLocations.length !== 0) {
			let gameLocationsArray = gameLocations.map((loc) => {
				return [loc.location[0], loc.location[1]];
			});
			gameLocationsArray.push([
				playerLocation?.lat || 0,
				playerLocation?.long || 0
			]);
			const hull = makeHull(gameLocationsArray as PointArray[]);
			// TODO for fun: implement anti podal point calc myself
			const antiPodalPair = latLngBounds(hull);
			// const antiPodalPair = getAntiPodalPair(hull) as LatLngBoundsLiteral;
			// console.log(antiPodalPair);
			return antiPodalPair;
		}
		return [
			[playerLocation?.lat || 0, playerLocation?.long || 0],
			[playerLocation?.lat || 0, playerLocation?.long || 0]
		] as LatLngBoundsLiteral;
	}, [playerLocation, gameLocations]);

	// Watch players location
	useLocationWatcher(setPlayerLocation);

	useEffect(() => {
		getGameLocations(setGameLocations);
	}, [setGameLocations]);

	useEffect(() => {
		// mapContext.setView([
		// 	playerLocation?.lat || 0,
		// 	playerLocation?.long || 0
		// ] as LatLngExpression);
		if (gameLocations) {
			const boundingBox: LatLngBoundsExpression = getBoundingBox();
			mapContext.fitBounds(boundingBox, { padding: new Point(0.1, 0.1) });
		}
	}, [playerLocation, mapContext, gameLocations, getBoundingBox]);

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
