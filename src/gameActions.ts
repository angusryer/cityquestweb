import { useState, useEffect } from "react";
import { atom } from "jotai";
import { v4 as uuid } from "uuid";
import { getPlayerData, signOut, storeGameInDb } from "./firebaseLogic";
import { LoadType, Screen, EventType } from "./enums";

// *** Set up game state atoms (get & set), actions (set) and aggregates (get) here
export const activePlayerAtom = atom<ActivePlayer | null>(null);
export const playerDataAtom = atom<PlayerData | null>(null);
export const activeScreenAtom = atom<number>(Screen.AUTH);
export const isLoadingGameOfTypeAtom = atom<number>(LoadType.NEW);
export const eventTriggeredOfTypeAtom = atom<number>(EventType.NONE);
export const toggleConfigMenuAtom = atom<boolean>(false);
export const toggleInGameMenuAtom = atom<boolean>(false);
export const timerActiveToggleAtom = atom<boolean>(false);

//** Screen routing states */
export const endGameAtom = atom<boolean>(false);
export const itemMenuAtom = atom<boolean>(false);
export const itemMenuMediaAtom = atom<boolean>(false);
export const winGameAtom = atom<boolean>(false);
export const fullScreenMediaAtom = atom<boolean>(false);

//** In-game state atoms--add these to all the save and load actions below */
export const gameIdAtom = atom<string | undefined>("");
export const gameStartTimeAtom = atom<number>(0);
export const gameElapsedTimeAtom = atom<number>(0);
export const gameLastStartTimeAtom = atom<number>(0);
export const playerEnergyAtom = atom<number | undefined>(100);
export const playerScoreAtom = atom<number | undefined>(100);
export const playerLocationAtom = atom<Coordinates | undefined>([0, 0]);
export const playerItemsAtom = atom<Array<GameObject> | undefined>([
	{ id: "1", name: "Museum Hours", type: "Clue" }
]);

//** KEEP UPDATING AS NEW ATOMS ARE ADDED */
export const loadSavedGameAction = atom(null, async (get, set) => {
	const playerData = get(playerDataAtom);
	if (playerData) {
		// TODO get from cache or server depending if online and/or which is newer
		// TODO trigger a cache-to-server sync
		if (playerData && Object.keys(playerData?.lastGameState).length > 0) {
			const { lastGameState } = playerData; // was 'data' before
			set(gameIdAtom, lastGameState.gameId);
			set(gameStartTimeAtom, lastGameState.gameStartTime || 0);
			set(gameLastStartTimeAtom, lastGameState.gameLastStartTime || 0);
			set(gameElapsedTimeAtom, lastGameState.gameElapsedTime || 0);
			set(playerLocationAtom, lastGameState.playerLocation);
			set(playerEnergyAtom, lastGameState.playerEnergy);
			set(playerScoreAtom, lastGameState.playerScore);
			set(playerItemsAtom, lastGameState.playerItems);
		} else {
			set(createNewGameAction, null);
		}
	}
});

//** KEEP UPDATING AS NEW ATOMS ARE ADDED */
export const createNewGameAction = atom(null, (_get, set) => {
	set(gameIdAtom, uuid());
	set(gameStartTimeAtom, Date.now());
	set(gameLastStartTimeAtom, Date.now());
	set(gameElapsedTimeAtom, 0);
	set(playerLocationAtom, [0, 0]);
	set(playerEnergyAtom, 100);
	set(playerScoreAtom, 100);
	set(playerItemsAtom, [{ id: "1", name: "Museum Hours", type: "Clue" }]);
});

//** KEEP UPDATING AS NEW ATOMS ARE ADDED */
export const saveGameStateAction = atom({} as GameState, (get, set) => {
	const activePlayer = get(activePlayerAtom);
	const snapshot: GameState = {
		gameId: get(gameIdAtom),
		gameStartTime: get(gameStartTimeAtom),
		gameLastStartTime: get(gameLastStartTimeAtom),
		gameElapsedTime: get(gameElapsedTimeAtom),
		playerLocation: get(playerLocationAtom),
		playerEnergy: get(playerEnergyAtom),
		playerScore: get(playerScoreAtom),
		playerItems: get(playerItemsAtom)
	};
	if (activePlayer) {
		// TODO send to cache or server depending if online
		// TODO trigger a cache-to-server sync
		storeGameInDb(snapshot, activePlayer.playerId);
	}
});

export const playerAgreesToShareLocation = atom(
	false as boolean,
	(_get, set) => {
		// ask if user will share location
		set(playerAgreesToShareLocation, true);
	}
);

export const globalSignOutAction = atom(null, (_get, set) => {
	set(activePlayerAtom, null);
	set(playerDataAtom, null);
	set(isLoadingGameOfTypeAtom, LoadType.NEW);
	set(toggleConfigMenuAtom, false);
	set(activeScreenAtom, Screen.AUTH);
	signOut();
});

export const startNewGameAction = atom(null, (_get, set) => {
	set(resetDefaultGameState, null);
	set(isLoadingGameOfTypeAtom, LoadType.NEW);
});

export const loadLastGameAction = atom(null, (_get, set) => {
	set(resetDefaultGameState, null);
	set(isLoadingGameOfTypeAtom, LoadType.SAVED);
});

//** Must keep these updated as Screen Routing Atoms are added */
const resetDefaultGameState = atom(null, (_get, set) => {
	set(itemMenuAtom, false);
	set(itemMenuMediaAtom, false);
	set(winGameAtom, false);
	set(fullScreenMediaAtom, false);
	set(toggleConfigMenuAtom, false);
	set(toggleInGameMenuAtom, false);
	set(endGameAtom, false);
	set(eventTriggeredOfTypeAtom, EventType.NONE);
	set(activeScreenAtom, Screen.GAME);
});

export const computedGradeAndColor = atom(
	{ letter: "A", color: "green" } as GradeAndColor,
	(get, set) => {
		let score = get(playerScoreAtom);
		if (score === undefined) score = 100;
		switch (true) {
			case score <= 15:
				set(computedGradeAndColor, {
					letter: "F",
					color: "red"
				} as GradeAndColor);
				break;
			case score > 15 && score <= 30:
				set(computedGradeAndColor, {
					letter: "E",
					color: "gold"
				} as GradeAndColor);
				break;
			case score > 30 && score <= 50:
				set(computedGradeAndColor, {
					letter: "D",
					color: "orange"
				} as GradeAndColor);
				break;
			case score > 50 && score <= 70:
				set(computedGradeAndColor, {
					letter: "C",
					color: "lightorange"
				} as GradeAndColor);
				break;
			case score > 70 && score <= 90:
				set(computedGradeAndColor, {
					letter: "B",
					color: "yellow"
				} as GradeAndColor);
				break;
			default:
				set(computedGradeAndColor, {
					letter: "A",
					color: "green"
				} as GradeAndColor);
		}
	}
);

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

export const getCurrentLocation = (): Coordinates => {
	// TODO get and return current user location
	return [43, 78];
};

export const shouldSkipMainMenu = (data: PlayerData): boolean => {
	if (data?.playerData.skipMenu === true) return true;
	return false;
};

export const useGameTimer = () => {
	const [isActive, toggleTimer] = useState(false);
	const [time, setTimeValue] = useState(0);
	const resetTimer = () => {
		toggleTimer(false);
		setTimeValue(0);
	};

	useEffect(() => {
		if (isActive) {
			setInterval(() => {
				setTimeValue((time) => time + 1);
			}, 1000);
		}
		return () => clearInterval();
	});

	return [time, toggleTimer, resetTimer] as const;
};

//** KEEP SYNC WITH CACHE USING REACT-QUERY */

// const useSyncQueryValue = () => {
//   const [value, setValue] = useAtom(queryDataAtom)
//   useEffect(() => {
//     return queryCache.subscribe(() => {
//       setValue(queryCache.getQueryData(queryKey))
//     })
//   })
// }

//** SUBSCRIBE ATOMS TO DATA SOURCE  */

// https://ask.csdn.net/questions/6203199
// // define an atom
// const dataAtom = atom(null)
// // define an atom initializer

// const initializeDataAtom = async (set) => {
//   const unsubscribe = subscribeToData(set)
//   (async () => { set(await fetchData()) })()
//   return unsubscribe
// }

// // list all atoms with initializer
// const atomsWithInitializer = [
//   [dataAtom, initializeDataAtom]
// ]

// // internal component
// const InitializeAtom = ({ atom, initialize }) => {
//   const [value, setValue] = useAtom(atom)
//   useEffect(() => {
//     return initialize(setValue)
//   }, [setValue])
//   return null
// }

// // component to initialize atoms recursively
// const InitializeAtoms = ({ atoms, children }) =>
//   atoms.reduceRight(a, [atom, initialize] =>
//     React.createElement(InitializeAtom, { atom, initialize }, a),
//     children,
//   }

// // How to use
// const App = () => (
//   <provider>
//     <initializeatoms atoms="{atomsWithInitializer}">
//       <mainlayout></mainlayout>
//     </initializeatoms>
//   </provider>
// )
