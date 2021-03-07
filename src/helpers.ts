import React, { useEffect, useRef } from "react";

export function flatten<T extends Record<string, any>>(
	object: T,
	path: string | null = null,
	separator = "."
): T {
	return Object.keys(object).reduce((acc: T, key: string): T => {
		const value = object[key];

		const newPath = [path, key].filter(Boolean).join(separator);

		const isObject = [
			typeof value === "object",
			value !== null,
			!(value instanceof Date),
			!(value instanceof RegExp),
			!(Array.isArray(value) && value.length === 0)
		].every(Boolean);

		return isObject
			? { ...acc, ...flatten(value, newPath, separator) }
			: { ...acc, [newPath]: value };
	}, {} as T);
}

export function getElapsedTimeString(timeInSeconds: number): string {
	const minutes = Math.trunc(timeInSeconds / 60);
	const seconds = Math.round(
		timeInSeconds / 60 < 1 ? timeInSeconds : timeInSeconds % 60
	);
	const twoDigitSeconds = seconds < 10 ? `0${seconds}` : seconds;
	return `${minutes}:${twoDigitSeconds}`;
}

/**
 * Use setInterval with Hooks in a declarative way.
 *
 * @see https://stackoverflow.com/a/59274004/3723993
 * @see https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 */
export function useInterval(
	callback: React.EffectCallback,
	delay: number | null
): React.MutableRefObject<number | null> {
	const intervalRef = useRef<number | null>(null);
	const callbackRef = useRef(callback);

	// Remember the latest callback:
	//
	// Without this, if you change the callback, when setInterval ticks again, it
	// will still call your old callback.
	//
	// If you add `callback` to useEffect's deps, it will work fine but the
	// interval will be reset.

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	// Set up the interval:

	useEffect(() => {
		if (typeof delay === "number") {
			intervalRef.current = window.setInterval(
				() => callbackRef.current(),
				delay
			);

			// Clear interval if the components is unmounted or the delay changes:
			return () => window.clearInterval(intervalRef.current || 0);
		}
	}, [delay]);

	// In case you want to manually clear the interval from the consuming component...:
	return intervalRef;
}
