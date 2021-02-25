import { atom } from 'jotai';

// *** Set up game state atoms here
// export const playerLocation = atom<Coordinates>((get) => return getPlayerLocation())

export const toggleConfigMenu = atom<boolean>(false);
export const toggleInGameMenu = atom<boolean>(false);