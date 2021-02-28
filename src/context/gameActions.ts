import { useState, useEffect } from "react";
import { atom } from "jotai";

// *** Set up game state atoms here
// export const playerLocation = atom<Coordinates>((get) => return getPlayerLocation())
export const toggleConfigMenu = atom<boolean>(false);
export const toggleInGameMenu = atom<boolean>(false);
export const playerEnergyAtom = atom<number>(100);
export const playerGradeAtom = atom<string>("A+");
export const playerLocationAtom = atom<Coordinates>([0, 0]);

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

export const saveGameStateAtom = atom(null, (get, set) => {
	const playerEnergy = get(playerEnergyAtom);
	const playerGrade = get(playerGradeAtom);
	const playerLocation = get(playerLocationAtom);

	const gameSnapshot = {
		playerLocation,
		playerEnergy,
		playerGrade
	} as GameState;

	set(saveGameStateAtom, gameSnapshot);
});

// const useSyncQueryValue = () => {
//   const [value, setValue] = useAtom(queryDataAtom)
//   useEffect(() => {
//     return queryCache.subscribe(() => {
//       setValue(queryCache.getQueryData(queryKey))
//     })
//   })
// }
