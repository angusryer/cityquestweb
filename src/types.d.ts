type GameResponse = {
	success: boolean;
	message: string;
	payload?: Array<any>;
	type?: string | number;
};

type GameObject = {
	id: string;
	name: string;
	type: string;
	description?: string;
};

type ActivePlayer = {
	playerId: string;
	playerDisplayName: string;
	playerEmail: string;
};

type PlayerData = {
	playerData: ActivePlayer & {
		skipMenu?: boolean;
		cacheVideos?: boolean;
		audioVolume?: number;
		userAgreesToShareLocation?: boolean;
	};
	lastGameState: GameState;
};

type GameState = object & {
	gameId?: string;
	gameStartTime?: number;
	playerLocation?: Coordinates;
	playerEnergy?: number;
	playerScore?: number;
	playerItems?: Array<GameObject>;
};

type GradeAndColor = {
	letter: string;
	color: string;
};

type Hookback<T> = Dispatch<SetStateAction<T>>;

type Coordinates = [number, number];
type UpdateLocation = (coords: Coordinates) => Coordinates;
type Items = Array<GameObject>;
type AddItem = (item: GameObject) => GameResponse;
type RemoveItem = (itemId: string) => GameResponse;
type ChangeDisplayName = (displayName: string) => void;
type VoidAction = () => void;