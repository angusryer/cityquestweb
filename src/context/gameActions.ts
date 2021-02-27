import { useState, useEffect } from "react";
import { atom } from "jotai";

// *** Set up game state atoms here
// export const playerLocation = atom<Coordinates>((get) => return getPlayerLocation())

// ! Try react-query for managing cache and db data syncronization
export function useCachedState(gameStateObject: GameState = {}) {
	const [cachedGameState, setCachedGameState] = useState<GameState>(
		(): GameState =>
			JSON.parse(localStorage.getItem("CQ_SAVE") || "{}") || gameStateObject
	);

	useEffect(() => {
		localStorage.setItem(`CQ_SAVE`, JSON.stringify(cachedGameState))
	}, [cachedGameState]);

	return [cachedGameState, setCachedGameState];
}

// function usePersistedState(key, defaultValue) {
// 	const [state, setState] = useState(
// 		() => JSON.parse(localStorage.getItem(key)) || defaultValue
// 	);
// 	useEffect(() => {
// 		localStorage.setItem(key, JSON.stringify(state));
// 	}, [key, state]);
// 	return [state, setState];
// }

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
	];
}

export const toggleConfigMenu = atom<boolean>(false);
export const toggleInGameMenu = atom<boolean>(false);
