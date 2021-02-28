import { useState, useEffect } from "react";
import { atom } from "jotai";

// *** Set up game state atoms here
// export const playerLocation = atom<Coordinates>((get) => return getPlayerLocation())

// ? Try react-query for managing cache and db data syncronization
// *** Allow caching of gamestate for later retrieval
export function useCachedState() {
	const [cachedGameState, setCachedGameState] = useState(
		(): GameState => JSON.parse(localStorage.getItem("CQ_SAVE") || "{}")
	);

	useEffect(() => {
		localStorage.setItem(`CQ_SAVE`, JSON.stringify(cachedGameState));
	}, [cachedGameState]);

	return [cachedGameState, setCachedGameState] as const;
}

// *** Allow fast and continual building of gamestate locally
export function useGameState() {
	const [gameState, setGameState] = useState({});
	return [
		gameState,
		(gameStateArg: any) => {
			setGameState({
				...gameState,
				[gameStateArg]: gameStateArg
			});
		}
	] as const;
}

// const computedValueAtom = atom(null, (get, set) => {
//   const valueFromCache = get(queryDataAtom)
//   const valueFromAnotherAtom = get(anotherValueAtom)
//   const computedValue = computeValue(valueFromCache, valueFromAnotherAtom)
//   set(computedValue)
// })

// const saveGameState = atom(null, (get, set) => {
// 	const playerEnergy = get(energyLevel);
// 	const playerGrade = get(playerGrade);
//    const computedValue = computeValue(valueFromCache, valueFromAnotherAtom)

// 	const gameSnapshot = {
// 		playerLocation: [0, 0],
// 		playerEnergy,
// 		playerGrade
// 	} as GameState;

// 	set(gameSnapshot,);
// });


// const useSyncQueryValue = () => {
//   const [value, setValue] = useAtom(queryDataAtom)
//   useEffect(() => {
//     return queryCache.subscribe(() => {
//       setValue(queryCache.getQueryData(queryKey))
//     })
//   })
// }

export const toggleConfigMenu = atom<boolean>(false);
export const toggleInGameMenu = atom<boolean>(false);
export const energyLevel = atom<number>(100);
export const playerGrade = atom<string>("A+");
