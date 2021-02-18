type GameResponse = {
	success: boolean;
	message: string;
	payload?: Array<any>;
	type?: string | number;
};

type Coordinates = [number, number];

type GameObject = {
	id: string;
	name: string;
	description?: string;
};

export type { GameResponse, Coordinates, GameObject };
