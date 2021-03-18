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

export function useInterval(
	callback: React.EffectCallback,
	delay: number | null
): React.MutableRefObject<number | null> {
	const intervalRef = useRef<number | null>(null);
	const callbackRef = useRef(callback);

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	useEffect(() => {
		if (typeof delay === "number") {
			intervalRef.current = window.setInterval(
				() => callbackRef.current(),
				delay
			);

			return () => window.clearInterval(intervalRef.current || 0);
		}
	}, [delay]);

	return intervalRef;
}

export function useLocationWatcher(callback: (position?: Coordinates) => void) {
	const watchIdRef = useRef<number | null>(null);
	const callbackRef = useRef(callback);

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	useEffect(() => {
		watchIdRef.current = navigator.geolocation.watchPosition((data) => {
			const locationData: Coordinates = {
				acc: data.coords.accuracy,
				lat: data.coords.latitude,
				long: data.coords.longitude
			};
			callbackRef.current(locationData);
		});
		return () => navigator.geolocation.clearWatch(watchIdRef.current || 0);
	}, []);

	return watchIdRef.current;
}

export function useHorizontalScroll() {
	const elementRef = useRef<any>();
	useEffect(() => {
		const element = elementRef.current;
		if (element) {
			const onWheel = (event: any) => {
				if (event.deltaY === 0) return;
				event.preventDefault();
				element.scrollTo({
					left: element.scrollLeft + event.deltaY,
					behavior: "smooth"
				});
			};
			element.addEventListener("wheel", onWheel);
			return () => element.removeEventListener("wheel", onWheel);
		}
	}, []);
	return elementRef;
}
