export type PointArray = [number, number];

export type AntiPodalPair = [PointArray, PointArray];

export function getAntiPodalPairDistance(antiPodalPair: AntiPodalPair): number {
	const [[x1, y1], [x2, y2]] = antiPodalPair;
	const distance: number = Math.abs(
		Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
	);
	return distance;
}

// I need to return the two coordinates from an arbitrarily long array of coordinates
// that are at a greater distance from each other than any other two coordinates
// in the array.

// get the convex hull
// 


export function getAntiPodalPair(
	hullPoints: PointArray[]
): AntiPodalPair | undefined {
	const n = hullPoints.length;
	let i: number = 0;
	let j: number = i + 1;

	if (n > 2) {
        console.log("First IF")
		while (
			getAreaOfTriangle(hullPoints[i], hullPoints[i + 1], hullPoints[j + 1]) >
			getAreaOfTriangle(hullPoints[i], hullPoints[i + 1], hullPoints[j])
		) {
			j = j + 1;
			let jRef = j;

			while (j < n) {
				console.log("Second WHILE");
				i = i + 1;
				// return [
				// 	hullPoints[i] as PointArray,
				// 	hullPoints[j] as PointArray
				// ] as AntiPodalPair;

				while (
					getAreaOfTriangle(
						hullPoints[i],
						hullPoints[i + 1],
						hullPoints[j + 1]
					) > getAreaOfTriangle(hullPoints[i], hullPoints[i + 1], hullPoints[j])
				) {
					console.log("Third WHILE");
					j = j + 1;
					if (i !== jRef && j !== n) {
						return [
							hullPoints[i] as PointArray,
							hullPoints[j] as PointArray
						] as AntiPodalPair;
					} else {
						// return;
					}

					if (
						getAreaOfTriangle(
							hullPoints[i],
							hullPoints[i + 1],
							hullPoints[j + 1]
						) ===
						getAreaOfTriangle(hullPoints[i], hullPoints[i + 1], hullPoints[j])
					) {
						if (i !== jRef && j !== n) {
							return [
								hullPoints[i] as PointArray,
								hullPoints[j + 1] as PointArray
							] as AntiPodalPair;
						} else {
							return [
								hullPoints[i + 1] as PointArray,
								hullPoints[j] as PointArray
							] as AntiPodalPair;
						}
					}
				}
			}
		}
	} else {
		return [
			hullPoints[0] as PointArray,
			hullPoints[1] as PointArray
		] as AntiPodalPair;
	}
}

function getAreaOfTriangle(
	i: PointArray,
	i2: PointArray,
	j2: PointArray
): number {
	let j0 = j2 === undefined ? ([0, 0] as PointArray) : j2;
	return (
		(i[0] * (i2[1] - j0[1]) + i2[0] * (j0[1] - i[1]) + j0[0] * (i[1] - i2[0])) /
		2
	);
}

// Returns a new array of points representing the convex hull of
// the given set of points. The convex hull excludes collinear points.
// This algorithm runs in O(n log n) time.
export function makeHull<P extends PointArray>(points: Array<P>): Array<P> {
	let newPoints: Array<P> = points.slice();
	newPoints.sort(POINT_COMPARATOR);
	return makeHullPresorted(newPoints);
}

// Returns the convex hull, assuming that each points[i] <= points[i + 1]. Runs in O(n) time.
export function makeHullPresorted<P extends PointArray>(
	points: Array<P>
): Array<P> {
	if (points.length <= 1) return points.slice();

	// Andrew's monotone chain algorithm. Positive y coordinates correspond to "up"
	// as per the mathematical convention, instead of "down" as per the computer
	// graphics convention. This doesn't affect the correctness of the result.

	let upperHull: Array<P> = [];
	for (let i = 0; i < points.length; i++) {
		const p: P = points[i];
		while (upperHull.length >= 2) {
			const q: P = upperHull[upperHull.length - 1];
			const r: P = upperHull[upperHull.length - 2];
			if ((q[0] - r[0]) * (p[1] - r[1]) >= (q[1] - r[1]) * (p[0] - r[0]))
				upperHull.pop();
			else break;
		}
		upperHull.push(p);
	}
	upperHull.pop();

	let lowerHull: Array<P> = [];
	for (let i = points.length - 1; i >= 0; i--) {
		const p: P = points[i];
		while (lowerHull.length >= 2) {
			const q: P = lowerHull[lowerHull.length - 1];
			const r: P = lowerHull[lowerHull.length - 2];
			if ((q[0] - r[0]) * (p[1] - r[1]) >= (q[1] - r[1]) * (p[0] - r[0]))
				lowerHull.pop();
			else break;
		}
		lowerHull.push(p);
	}
	lowerHull.pop();

	if (
		upperHull.length === 1 &&
		lowerHull.length === 1 &&
		upperHull[0][0] === lowerHull[0][0] &&
		upperHull[0][1] === lowerHull[0][1]
	)
		return upperHull;
	else return upperHull.concat(lowerHull);
}

export function POINT_COMPARATOR(a: PointArray, b: PointArray): number {
	if (a[0] < b[0]) return -1;
	else if (a[0] > b[0]) return +1;
	else if (a[1] < b[1]) return -1;
	else if (a[1] > b[1]) return +1;
	else return 0;
}
