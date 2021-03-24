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

export default function Map(): JSX.Element {
	const [viewport, setViewport] = useState<Viewport>(initialViewport);
	const { height, width, ref } = useDimensions<HTMLDivElement>();
	const [playerLocation, setPlayerLocation] = useAtom(playerLocationAtom);
	const [gameLocations, setGameLocations] = useAtom(gameLocationsAtom);

	// set up a watch for player's location
	useLocationWatcher(setPlayerLocation);

	// get all gameplay locations from server
	useEffect(() => {
		getGameLocations(setGameLocations);
	}, [setGameLocations]);

	// TODO memoize the result of getBoundsExpression
	//** Remember to return LONG, LAT instead of LAT, LONG for the BoundsExpression */
	const getBoundsExpression = (): BoundsExpression => {
		let gameLocationsArray: Array<LocationTuple> = [
			[playerLocation?.long || 0, playerLocation?.lat || 0]
		];
		if (gameLocations.length !== 0) {
			let otherLocationsArray: Array<LocationTuple> = gameLocations.map(
				(loc) => {
					return [loc.location[1], loc.location[0]];
				}
			);
			gameLocationsArray.push(...otherLocationsArray);
			// TODO must get the two points between which there is the greatest distance and return that
			// const antipodalPoints: BoundsExpression = getAntipodalPoints(gameLocationsArray);
			return [gameLocationsArray[0], gameLocationsArray[2]] as BoundsExpression;
		}
		// TODO must get the two points between which there is the greatest distance and return that
		// const antipodalPoints: BoundsExpression = getAntipodalPoints(gameLocationsArray);
		return [gameLocationsArray[0], gameLocationsArray[0]] as BoundsExpression;
	};

	const updateViewport = (freshViewport: Viewport): void => {
		setViewport((previousViewport) => ({
			...previousViewport,
			...freshViewport
		}));
	};

	// set up bounding box
	useEffect(() => {
		const boundsExpression: BoundsExpression = getBoundsExpression();
		// TODO if memoized result of boundsExpression is the same as previous, skip this
		const { longitude, latitude, zoom } = new WebMercatorViewport(
			viewport
		).fitBounds(boundsExpression, { padding: 10 });
		if (viewport.latitude !== latitude || viewport.longitude !== longitude) {
			updateViewport({
				...viewport,
				longitude,
				latitude,
				zoom
			});
		}
		//+ TODO check if statement to make sure viewport is being properly checked
		//+ before adding it to the dependency array; add getBoundsExpression as well
	}, [playerLocation, gameLocations]);

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
								type='trigger'
								lat={loc?.location[0] || 0}
								lng={loc?.location[1] || 0}
							/>
						);
					})}
			</ReactMapGL>
		</div>
	);
}
