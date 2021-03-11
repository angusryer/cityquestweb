export enum Screen {
	NONE,
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
	WIN_GAME,
	NO_ENERGY,
	IN_BLAST,
	CLUE_FOUND,
	LEVEL_UP,
	LEVEL_DOWN
}

export enum EnergyColors {
	NONE = "grey",
	CRITICAL = "red",
	LOW = "orange",
	MEDIUM = "gold",
	HIGH = "green"
}

export enum EnergyThresholds {
	CRITICAL = 20,
	LOW = 40,
	MEDIUM = 60,
	HIGH = 80
}