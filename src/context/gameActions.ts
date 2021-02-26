import { useState } from "react";
import { atom } from "jotai";

// *** Set up game state atoms here
// export const playerLocation = atom<Coordinates>((get) => return getPlayerLocation())

export function useCachedState() {
	return [
		(): object => JSON.parse(localStorage.getItem(`CQ_SAVE`) || "{}"),
		(value: object) => localStorage.setItem(`CQ_SAVE`, JSON.stringify(value))
	];
}

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
