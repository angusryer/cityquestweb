import { useState, useEffect, useRef } from "react";
import { atom } from "jotai";
import { v4 as uuid } from "uuid";
import { signOut, storeGameInDb } from "./firebaseLogic";
import { Screen } from "./enums";

// *** Set up game state atoms (get & set), actions (set) and aggregates (get) here
// export const playerLocation = atom<Coordinates>((get) => return getPlayerLocation())
export const activePlayerAtom = atom<ActivePlayer | null>(null);
export const playerDataAtom = atom<PlayerData | null>(null);
export const activeScreenAtom = atom<number>(Screen.AUTH);
export const isNewGameAtom = atom<boolean>(true);
export const toggleConfigMenuAtom = atom<boolean>(false);
export const toggleInGameMenuAtom = atom<boolean>(false);

//** In-game state atoms--add these to all the save and load actions below */
export const gameIdAtom = atom<string>("");
export const gameStartTimeAtom = atom<number>(0);
export const gameTimerAtom = atom<number>(0);
export const playerEnergyAtom = atom<number>(100);
export const playerScoreAtom = atom<number>(100);
export const playerLocationAtom = atom<Coordinates>([0, 0]);
export const playerItemsAtom = atom<Array<GameObject>>([
	{ id: "1", name: "Museum Hours", type: "Clue" }
]);

//** KEEP UPDATING AS NEW ATOMS ARE ADDED */
// TODO Maybe I can implement useAtomCallback from https://github.com/pmndrs/jotai/issues/60#issuecomment-707385930 or https://github.com/pmndrs/jotai/pull/140
// export const loadGameStateActionNew = useAtomCallback((get, set, setGameStateCallback) => {???????????????????????????????????????

// })
export const loadGameStateAction = atom(null, (get, set) => {
		const isNewGame = get(isNewGameAtom);
		const playerData = get(playerDataAtom);
		const getAndSetSavedGame = async () => {
			if (playerData) {
				const { lastGameState } = playerData;
				set(gameIdAtom, isNewGame ? uuid() : lastGameState.gameId || uuid());
				set(gameStartTimeAtom, isNewGame ? Date.now() : lastGameState.gameStartTime || Date.now());
				set(playerLocationAtom, isNewGame ? [0, 0] : lastGameState.playerLocation || [0, 0]);
				set(playerEnergyAtom, isNewGame ? 100 : lastGameState.playerEnergy || 100);
				set(playerScoreAtom, isNewGame ? 100 : lastGameState.playerScore || 100);
				set(playerItemsAtom, isNewGame
						? [{ id: "1", name: "Museum Hours", type: "Clue" }]
						: lastGameState.playerItems || [{ id: "1", name: "Museum Hours", type: "Clue" }]
				);
			}
		}
		getAndSetSavedGame();
	}
);

const fetchCountAtom = atom(
	get => get(countAtom),
	(_get, set, url) => {
	  const fetchData = async () => {
		const response = await fetch(url)
		set(countAtom, (await response.json()).count)
	  }
	  fetchData()
	}
  )

//** KEEP UPDATING AS NEW ATOMS ARE ADDED */
export const saveGameStateAction = atom({} as GameState, (get, set) => {
	const activePlayer = get(activePlayerAtom);
	const snapshot: GameState = {
		gameId: get(gameIdAtom),
		gameStartTime: get(gameStartTimeAtom),
		playerLocation: get(playerLocationAtom),
		playerEnergy: get(playerEnergyAtom),
		playerScore: get(playerScoreAtom),
		playerItems: get(playerItemsAtom)
	};
	if (activePlayer) {
		storeGameInDb(snapshot, activePlayer.playerId);
	}
	set(saveGameStateAction, snapshot);
});

export const playerAgreesToShareLocation = atom(
	false as boolean,
	(get, set) => {
		// ask if user will share location
		set(playerAgreesToShareLocation, true);
	}
);

export const globalSignOutAction = atom(null, (_get, set) => {
	set(activePlayerAtom, null);
	set(playerDataAtom, null);
	set(isNewGameAtom, true);
	set(toggleConfigMenuAtom, false);
	set(activeScreenAtom, Screen.AUTH);
	signOut();
});

export const startNewGameAction = atom(null, (_get, set) => {
	set(isNewGameAtom, true);
	set(toggleConfigMenuAtom, false);
	set(toggleInGameMenuAtom, false);
	set(activeScreenAtom, Screen.GAME);
});

export const loadLastGameAction = atom(null, (_get, set) => {
	set(isNewGameAtom, false);
	set(toggleConfigMenuAtom, false);
	set(toggleInGameMenuAtom, false);
	set(activeScreenAtom, Screen.GAME);
});

export const computedGradeAndColor = atom(
	{ letter: "A", color: "green" } as GradeAndColor,
	(get, set) => {
		const score = get(playerScoreAtom);
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

// ? //** SET UP A TIMER HOOK BELOW */
//** https://css-tricks.com/using-requestanimationframe-with-react-hooks/ */

export const useAnimationFrame = (callback: any) => {
	// Use useRef for mutable variables that we want to persist
	// without triggering a re-render on their change
	const requestRef = useRef<number>(0);
	const previousTimeRef = useRef<number>(0);

	const animate = (time: number) => {
		if (previousTimeRef.current !== undefined) {
			const deltaTime = time - previousTimeRef.current;
			callback(deltaTime);
		}
		previousTimeRef.current = time;
		requestRef.current = requestAnimationFrame(animate);
	};

	useEffect(() => {
		requestRef.current = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(requestRef.current);
	}, []); // Make sure the effect runs only once
};

//** GET USER LOCATION PERMISSION AND LOCATION  */

// export const userAgreesToShareLocation = (gameConfig: GameConfig): boolean => {
// 	if (gameConfig?.playerData?.userAgreesToShareLocation !== undefined) {
// 		return gameConfig.playerData.userAgreesToShareLocation;
// 	} else {
// 		// TODO get the user's permission to access their location
// 		return true;
// 	}
// };

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
