import { useState, useEffect } from "react";
import ReactMapGL, {
	WebMercatorViewport,
	FlyToInterpolator
} from "react-map-gl";
import { useAtom } from "jotai";
import { v4 as uuid } from "uuid";
import useDimensions from "react-cool-dimensions";
import { getGameLocations } from "../../firebaseLogic";
import { playerLocationAtom, gameLocationsAtom } from "../../gameActions";
import {
	playerOutOfBounds,
	getBoundsExpression,
	getAllLocations
} from "./mapFunctions";
import { useLocationWatcher } from "../../helpers";
import MapMarker from "./MapMarker";
import "mapbox-gl/dist/mapbox-gl.css";
import "./GameMap.scss";
import mapStyle from "./mapStyle/style.json";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN || "";
const initialViewport = {
	height: 200,
	width: 200,
	mapStyle: mapStyle,
	latitude: 0,
	longitude: 0,
	zoom: 12,
	transitionDuration: 2000,
	transitionInterpolator: new FlyToInterpolator()
};
type Viewport = typeof initialViewport;
const initialBounds: BoundsExpression = [
	[0, 0],
	[10, 10]
];

export default function Map(): JSX.Element {
	const [viewport, setViewport] = useState<Viewport>(initialViewport);
	const [bounds, setBounds] = useState<BoundsExpression>(initialBounds);
	const { height, width, ref } = useDimensions<HTMLDivElement>();
	const [playerLocation, setPlayerLocation] = useAtom(playerLocationAtom);
	const [gameLocations, setGameLocations] = useAtom(gameLocationsAtom);

	useLocationWatcher(setPlayerLocation);

	useEffect(() => {
		getGameLocations(setGameLocations);
	}, [gameLocations, setGameLocations]);

	const updateViewport = (freshViewport: Viewport): void => {
		setViewport((previousViewport) => ({
			...previousViewport,
			...freshViewport
		}));
	};

	useEffect(() => {
		if (playerLocation !== undefined && gameLocations !== undefined) {
			if (bounds === initialBounds) {
				const boundsExpression = getBoundsExpression(
					getAllLocations(playerLocation, gameLocations, true)
				);
				setBounds(boundsExpression);
				return;
			}
			if (playerOutOfBounds(bounds, playerLocation)) {
				const boundsExpression = getBoundsExpression(
					getAllLocations(playerLocation, gameLocations, true)
				);
				setBounds(boundsExpression);
				return;
			}
		}
	}, [playerLocation]);

	useEffect(() => {
		const { longitude, latitude, zoom } = new WebMercatorViewport(
			viewport
		).fitBounds(bounds || initialBounds, { padding: 40 });
		// if (viewport.latitude !== latitude || viewport.longitude !== longitude) {
		updateViewport({
			...viewport,
			longitude,
			latitude,
			zoom
		});
		// }
	}, [bounds]);

	return (
		<div ref={ref} className='gamemap'>
			<ReactMapGL
				{...viewport}
				height={height}
				width={width}
				mapboxApiAccessToken={MAPBOX_TOKEN}
				onViewportChange={(freshViewport: Viewport) =>
					updateViewport(freshViewport)
				}
			>
				{playerLocation && (
					<MapMarker
						type='player'
						lat={playerLocation?.lat || 0}
						lng={playerLocation?.long || 0}
					/>
				)}
				{gameLocations &&
					gameLocations.map((loc) => {
						return (
							<MapMarker
								key={uuid()}
								type={loc?.type || ""}
								lat={loc?.location[0] || 0}
								lng={loc?.location[1] || 0}
							/>
						);
					})}
			</ReactMapGL>
		</div>
	);
}
