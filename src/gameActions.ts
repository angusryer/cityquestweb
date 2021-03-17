import { useState, useEffect } from "react";
import { atom } from "jotai";
import { v4 as uuid } from "uuid";
import { signOut, storeGameInDb } from "./firebaseLogic";
import { LoadType, Screen, EventType } from "./enums";
import { SetAtom } from "jotai/core/types";

// *** Set up game state atoms (get & set), actions (set) and aggregates (get) here
export const activePlayerAtom = atom<ActivePlayer | null>(null);
export const playerDataAtom = atom<PlayerData | null>(null);
export const activeScreenAtom = atom<number>(Screen.AUTH);
export const isLoadingGameOfTypeAtom = atom<number>(LoadType.NONE);
export const eventTriggeredOfTypeAtom = atom<number>(EventType.NONE);
export const toggleConfigMenuAtom = atom<boolean>(false);
export const toggleInGameMenuAtom = atom<boolean>(false);
export const toggleDebugMenuAtom = atom<boolean>(false);
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
export const playerAccumulatedEnergyAtom = atom<number | undefined>(0);
export const playerScoreAtom = atom<number | undefined>(100);
export const playerLocationAtom = atom<Coordinates | undefined>({});
export const mapStateAtom = atom<MapState>({});
export const playerItemsAtom = atom<Array<GameObject> | undefined>([
	{ id: "1", name: "Museum Hours", type: "Clue" }
]);
export const missionTimeAtom = atom<number>(60);

//** Must keep these updated as Screen Routing Atoms are added */
const resetDefaultGameState = atom(null, (get, set) => {
	set(itemMenuAtom, false);
	set(itemMenuMediaAtom, false);
	set(fullScreenMediaAtom, false);
	set(toggleConfigMenuAtom, false);
	set(toggleInGameMenuAtom, false);
	set(toggleDebugMenuAtom, false);
	set(eventTriggeredOfTypeAtom, EventType.NONE);
	set(activeScreenAtom, Screen.GAME);
});

export const shouldTimerBePausedAction = atom((get) => {
	const eventTriggeredOfType = get(eventTriggeredOfTypeAtom);
	const isLoadingGameOfType = get(isLoadingGameOfTypeAtom);
	return [
		eventTriggeredOfType === EventType.END_GAME,
		eventTriggeredOfType === EventType.LEVEL_UP,
		eventTriggeredOfType === EventType.WIN_GAME,
		eventTriggeredOfType === EventType.NO_ENERGY,
		isLoadingGameOfType === LoadType.NEW
	].some((item) => item === true);
});

export const shouldTriggerEndGameAction = atom((get) => {
	const eventTriggeredOfType = get(eventTriggeredOfTypeAtom);
	return [
		eventTriggeredOfType === EventType.END_GAME,
		eventTriggeredOfType === EventType.WIN_GAME,
		eventTriggeredOfType === EventType.NO_ENERGY
	].some((triggerState: boolean): boolean => triggerState === true);
});

export const accumulatedEnergyAction = atom(
	(get) => get(playerAccumulatedEnergyAtom),
	(get, set, modifierValue: number) => {
		const currentAccumulatedEnergy = get(playerAccumulatedEnergyAtom);
		set(
			playerAccumulatedEnergyAtom,
			(currentAccumulatedEnergy || 0) + modifierValue
		);
	}
);

//** KEEP UPDATING AS NEW ATOMS ARE ADDED */
export const saveGameStateAction = atom({} as GameState, (get, _set) => {
	const activePlayer = get(activePlayerAtom);
	const snapshot: GameState = {
		gameId: get(gameIdAtom),
		gameStartTime: get(gameStartTimeAtom),
		gameLastStartTime: get(gameLastStartTimeAtom),
		gameElapsedTime: get(gameElapsedTimeAtom),
		playerLocation: get(playerLocationAtom),
		playerEnergy: get(playerEnergyAtom),
		playerAccumulatedEnergy: get(playerAccumulatedEnergyAtom),
		playerScore: get(playerScoreAtom),
		playerItems: get(playerItemsAtom)
	};
	if (activePlayer) {
		// TODO send to cache or server depending if online
		// TODO trigger a cache-to-server sync
		storeGameInDb(snapshot, activePlayer.playerId);
	}
});

//** KEEP UPDATING AS NEW ATOMS ARE ADDED */
export const startNewGameAction = atom(null, (_get, set) => {
	set(resetDefaultGameState, null);
	set(gameIdAtom, uuid());
	set(gameStartTimeAtom, Date.now());
	set(gameLastStartTimeAtom, Date.now());
	set(gameElapsedTimeAtom, 0);
	set(playerLocationAtom, {});
	set(playerEnergyAtom, 100);
	set(playerAccumulatedEnergyAtom, 0);
	set(playerScoreAtom, 100);
	set(playerItemsAtom, [{ id: "1", name: "Museum Hours", type: "Clue" }]);
	set(isLoadingGameOfTypeAtom, LoadType.NEW);
});

//** KEEP UPDATING AS NEW ATOMS ARE ADDED */
export const loadLastGameAction = atom(null, (get, set) => {
	const playerData = get(playerDataAtom);
	if (playerData) {
		// TODO get from cache or server depending if online and/or which is newer
		// TODO trigger a cache-to-server sync
		set(resetDefaultGameState, null);
		if (playerData && Object.keys(playerData?.lastGameState).length > 0) {
			const { lastGameState } = playerData;
			set(gameIdAtom, lastGameState.gameId);
			set(gameStartTimeAtom, lastGameState.gameStartTime || 0);
			set(gameLastStartTimeAtom, lastGameState.gameLastStartTime || 0);
			set(gameElapsedTimeAtom, lastGameState.gameElapsedTime || 0);
			set(playerLocationAtom, lastGameState.playerLocation);
			set(playerEnergyAtom, lastGameState.playerEnergy);
			set(playerAccumulatedEnergyAtom, lastGameState.playerAccumulatedEnergy);
			set(playerScoreAtom, lastGameState.playerScore);
			set(playerItemsAtom, lastGameState.playerItems);
		}
	} else {
		throw new Error("gameActions Error: Unable to find playerData object.");
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
	set(toggleConfigMenuAtom, false);
	set(toggleDebugMenuAtom, false);
	set(isLoadingGameOfTypeAtom, LoadType.NONE);
	set(activeScreenAtom, Screen.AUTH);
	signOut();
});

export const onPlayerLocationChange = async (
	setPlayerLocation: SetAtom<Coordinates>
): Promise<number> => {
	if (window !== undefined) {
		return await navigator.geolocation.watchPosition((position) => {
			console.log(position.coords);
			setPlayerLocation({
				acc: position.coords.accuracy,
				lat: position.coords.latitude,
				long: position.coords.longitude
			});
		});
	}
	return 0;
};

const getCameraPermissions = async () => {
	if (window !== undefined) {
		console.log("navigator.mediaDevices ==> ", navigator.mediaDevices);
	}
};

const getLocalStoragePermissions = async () => {
	if (window !== undefined) {
		console.log("navigator.permissions ==> ", navigator.permissions);
	}
};

export const playerPermissionsAction = atom(null, async (get, set) => {
	const data = get(playerDataAtom);
	if (!data?.playerData?.permissions) {
		await getCameraPermissions();
		await getLocalStoragePermissions();
	}
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
