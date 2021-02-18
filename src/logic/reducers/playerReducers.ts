import { useReducer } from "react";
import { Coordinates, GameObject } from "../../models/types";
import { ActivePlayer } from "../../models/player";

export const guestPlayer: ActivePlayer = {
	playerId: "0110011101110101011001010111001101110100",
	createdAt: 0,
	displayName: "Guest Player",
	tools: [],
	location: [0, 0],
	clues: []
};

// Set up Action Types
type Action = ReturnType<
	| typeof signOutAction
	| typeof deleteAccountAction
	| typeof changeDisplayNameAction
	| typeof updateLocationAction
	| typeof addGameObjectAction
	| typeof removeGameObjectAction
>;

// Set up Actions
const SIGN_OUT = "sign_out";
const DELETE_ACCOUNT = "delete_account";
const CHANGE_DISPLAY_NAME = "change_display_name";
const UPDATE_LOCATION = "update_location";
const ADD_GAME_OBJECT = "add_game_object";
const REMOVE_GAME_OBJECT = "remove_game_object";

export function signOutAction() {
	return <const>{
		type: SIGN_OUT
	};
}

export function deleteAccountAction() {
	return <const>{
		type: DELETE_ACCOUNT
	};
}

export function changeDisplayNameAction(displayName: string) {
	return <const>{
		type: CHANGE_DISPLAY_NAME,
		payload: displayName
	};
}

export function updateLocationAction(locationXYArray: Coordinates) {
	return <const>{
		type: UPDATE_LOCATION,
		payload: locationXYArray
	};
}

export function addGameObjectAction(gameObject: GameObject) {
	return <const>{
		type: ADD_GAME_OBJECT,
		payload: gameObject
	};
}

export function removeGameObjectAction(gameObjectId: string) {
	return <const>{
		type: REMOVE_GAME_OBJECT,
		payload: gameObjectId
	};
}

export function playerReducer(player: ActivePlayer, action: Action) {
	switch (action.type) {
		case SIGN_OUT:
			return guestPlayer; // TODO update cache, sign out remote, return guestPlayer
		case DELETE_ACCOUNT:
			return guestPlayer; // TODO delete user from cache, sign out remote, delete remote, return guestPlayer;
		case CHANGE_DISPLAY_NAME:
			return { ...player, displayName: action.payload }; // TODO update cache, remote, and return updated player
		case UPDATE_LOCATION:
			return { ...player, location: action.payload };
		case ADD_GAME_OBJECT:
			return { ...player, tools: [...player.tools, action.payload] };
		case REMOVE_GAME_OBJECT:
			return {
				...player,
				tools: player.tools.filter(
					(item: GameObject) => item.id !== action.payload
				)
			};
		default:
			return player;
	}
}

export default function usePlayer(player = guestPlayer) {
	return useReducer(playerReducer, player);
}
