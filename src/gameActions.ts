import { useState, useEffect } from "react";
import { atom } from "jotai";
import { signOut } from "./firebaseLogic";

// *** Set up game state atoms (get & set), actions (set) and aggregates (get) here
// export const playerLocation = atom<Coordinates>((get) => return getPlayerLocation())
export const gameIdAtom = atom<string>("");
export const gameStartTimeAtom = atom<number>(0);
export const activePlayerAtom = atom<ActivePlayer | null>(null);
export const globalPrefsAtom = atom<GlobalPreferences>({});
export const appIsReadyAtom = atom<boolean>(false);
export const isComingFromGameAtom = atom<boolean>(false);
export const isNewGameAtom = atom<boolean>(true);
export const toggleConfigMenu = atom<boolean>(false);
export const toggleInGameMenu = atom<boolean>(false);
export const playerEnergyAtom = atom<number>(100);
export const playerScoreAtom = atom<number>(100);
export const playerLocationAtom = atom<Coordinates>([0, 0]);
export const playerItemsAtom = atom<Array<GameObject>>([
	{ id: "1", name: "Museum Hours", type: "Clue" }
]);

export const playerAgreesToShareLocation = atom(
	false as boolean,
	(get, set) => {
		// ask if user will share location
		set(playerAgreesToShareLocation, true);
	}
);

export const globalSignOutAction = atom(null, (_get, set) => {
	set(appIsReadyAtom, false);
	set(activePlayerAtom, null);
	set(globalPrefsAtom, {});
	set(isNewGameAtom, true);
	signOut();
});

export const appIsReadyComputed = atom(false as boolean, (get, set) => {
	const appIsReady = get(appIsReadyAtom);
	const activePlayer = get(activePlayerAtom);
	const globalPrefs = get(globalPrefsAtom);
	set(
		appIsReadyComputed,
		appIsReady || (!!activePlayer && !!globalPrefs.skipMenu)
	);
});

export const startNewGameAction = atom(null, (get, set) => {
	set(isNewGameAtom, true);
	set(appIsReadyAtom, true);
});

export const loadLastGameAction = atom(null, (get, set) => {
	set(isNewGameAtom, false);
	set(appIsReadyAtom, true);
});

export const gameStateComputed = atom({} as GameState, (get, set) => {
	const snapshot: GameState = {
		gameId: get(gameIdAtom),
		gameStartTime: get(gameStartTimeAtom),
		playerLocation: get(playerLocationAtom),
		playerEnergy: get(playerEnergyAtom),
		playerScore: get(playerScoreAtom),
		playerItems: get(playerItemsAtom)
	};
	set(gameStateComputed, snapshot);
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

export const shouldSkipMainMenu = (globalPrefs: GlobalPreferences): boolean => {
	if (globalPrefs?.skipMenu === true) return true;
	return false;
};


//** SET UP A TIMER HOOK BELOW */
//** https://css-tricks.com/using-requestanimationframe-with-react-hooks/ */

// const useAnimationFrame = callback => {
// 	// Use useRef for mutable variables that we want to persist
// 	// without triggering a re-render on their change
// 	const requestRef = React.useRef();
// 	const previousTimeRef = React.useRef();
	
// 	const animate = time => {
// 	  if (previousTimeRef.current != undefined) {
// 		const deltaTime = time - previousTimeRef.current;
// 		callback(deltaTime)
// 	  }
// 	  previousTimeRef.current = time;
// 	  requestRef.current = requestAnimationFrame(animate);
// 	}
	
// 	React.useEffect(() => {
// 	  requestRef.current = requestAnimationFrame(animate);
// 	  return () => cancelAnimationFrame(requestRef.current);
// 	}, []); // Make sure the effect runs only once
//   }
  
//   const Counter = () => {
// 	const [count, setCount] = React.useState(0)
	
// 	useAnimationFrame(deltaTime => {
// 	  // Pass on a function to the setter of the state
// 	  // to make sure we always have the latest state
// 	  setCount(prevCount => (prevCount + deltaTime * 0.01) % 100)
// 	})
	  
// 	return <div>{Math.round(count)}</div>
//   }


//** GET USER LOCATION PERMISSION AND LOCATION  */

// export const userAgreesToShareLocation = (gameConfig: GameConfig): boolean => {
// 	if (gameConfig?.globalPrefs?.userAgreesToShareLocation !== undefined) {
// 		return gameConfig.globalPrefs.userAgreesToShareLocation;
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
