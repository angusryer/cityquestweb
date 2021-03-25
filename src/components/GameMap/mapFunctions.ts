import { applyToArray } from "../../helpers";

export const playerOutOfBounds = (
	bounds: BoundsExpression,
	player: Coordinates
): boolean => {
	let isOutOfBounds: boolean = false;
	const longBoundsDifference = Math.abs(bounds[1][0] - bounds[0][0]);
	const latBoundsDifference = Math.abs(bounds[1][1] - bounds[0][1]);
	if (player?.long !== undefined || player?.lat !== undefined) {
		if ((player?.long || 0) > longBoundsDifference) isOutOfBounds = true;
		if ((player?.lat || 0) > latBoundsDifference) isOutOfBounds = true;
	}
	return isOutOfBounds;
};

export const getBoundsExpression = (
	allLocations: Array<LocationTuple>
): BoundsExpression => {
	const locationLongs: Array<number> = allLocations.map(
		(loc): number => loc[0] as number
	);
	const locationLats: Array<number> = allLocations.map(
		(loc): number => loc[1] as number
	);
	return [
		[
			applyToArray(Math.min, locationLongs),
			applyToArray(Math.min, locationLats)
		],
		[
			applyToArray(Math.max, locationLongs),
			applyToArray(Math.max, locationLats)
		]
	] as BoundsExpression;
};

export const getAllLocations = (
	player: Coordinates,
	locations: GameLocations,
	lngLatFormat: boolean = false
): Array<LocationTuple> => {
	let allLocationsArray: Array<LocationTuple> = [
		lngLatFormat
			? [player?.long || 0, player?.lat || 0]
			: [player?.lat || 0, player?.long || 0]
	];
	if (locations.length !== 0) {
		let nonPlayerLocationsArray: Array<LocationTuple> = locations.map((loc) => {
			return [
				loc.location[lngLatFormat ? 1 : 0],
				loc.location[lngLatFormat ? 0 : 1]
			];
		});
		return [...allLocationsArray, ...nonPlayerLocationsArray];
	}
	return allLocationsArray;
};
