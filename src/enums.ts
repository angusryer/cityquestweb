export enum Screen {
	AUTH,
	GAME,
	MENU
}

export enum LoadType {
	NONE,
	NEW,
	SAVED
}

export enum EventType {
	NONE,
	END_GAME,
	NO_ENERGY = END_GAME,
	CLUE_FOUND,
	IN_BLAST = END_GAME,
	LEVEL_UP,
	WIN_GAME
}
