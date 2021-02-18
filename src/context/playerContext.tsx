import React from "react";
import { createContext } from "react";
import { Coordinates, GameObject, GameResponse } from "../models/types";
import usePlayer, {
	signOutAction,
	deleteAccountAction,
	changeDisplayNameAction,
	updateLocationAction,
	addGameObjectAction,
	removeGameObjectAction
} from "../logic/reducers/playerReducers";

export const PlayerContext = createContext<any>(null);

function PlayerProvider({ children }: any) {
	const [player, dispatch] = usePlayer();

	const actions = {
		/** 
		 * Sign the player out globally
		 * @returnType GameResponse
		*/
		signOut() {
			dispatch(signOutAction());
		},

		/** 
		 * Delete the player account from all backend resources
		 * and sign the player out globally
		 * @returnType GameResponse
		*/
		deleteAccount() {
			dispatch(deleteAccountAction());
		},

		/** 
		 * Modify the player's display name
		 * @returnType GamePlayer
		*/
		changeDisplayName(displayName: string) {
			dispatch(changeDisplayNameAction(displayName));
		},
		updateLocation(locationXYArray: Coordinates) {
			dispatch(updateLocationAction(locationXYArray));
		},
		addGameObject(gameObject: GameObject) {
			dispatch(addGameObjectAction(gameObject));
		},
		removeGameObject(gameObjectId: string) {
			dispatch(removeGameObjectAction(gameObjectId));
		}
	};

	// const newPlayer = (playerName: string) => {
	// 	const player: Player = {
	// 		playerId: uuid(),
	// 		createdAt: Date.now(),
	// 		isActive: true,
	// 		playerName: playerName
	// 	};
	// 	dispatch(NEW, player);
	// };

	// const loadPlayer = async (playerId: string): Promise<Player | Error> => {
	// 	// search for player id in local cache
	// 	// if not found then search on remote db
	// 	// if not found then user not found and
	// 	// redirect to capture player name to create
	// 	// a new player.
	// 	// TODO Implement above functionality instead of error below
	// 	const playerFound: Player | string = await loadPlayerFromStorage(playerId);
	// 	if (typeof playerFound === "string")
	// 		return new Error(
	// 			`Couldn't find a player with playerId ${playerId}. Error: ${playerFound}`
	// 		);
	// 	return playerFound;
	// };

	// const toggleActiveStatus = () => {
	// 	if (player) {
	// 		const newStatus: Player = {
	// 			...player,
	// 			isActive: !player.isActive
	// 		};
	// 		setPlayer(newStatus);
	// 	}
	// };

	// const updatePlayerAttribute = (attribute: string, value: any) => {
	// 	const updatedPlayer: Player = {
	// 		...player,
	// 		[attribute]: value
	// 	};
	// 	setPlayer(updatedPlayer);
	// };

	// const deletePlayer = () => {
	// 	setPlayer(guestPlayer);
	// };

	return (
		<PlayerContext.Provider value={{ ...player, ...actions }}>
			{children}
		</PlayerContext.Provider>
	);
}

export default PlayerProvider;
