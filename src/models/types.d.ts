type GameResponse = {
	success: boolean;
	message: string;
	payload?: Array<any>;
	type?: string | number;
};

type GameObject = {
	id: string;
	name: string;
	description?: string;
};

type ActivePlayer = {
	playerId: string;
	playerDisplayName: string;
	playerEmail: string;
};

type GlobalPreferences = {
	skipMenu?: boolean;
	cacheVideos?: boolean;
	audioVolume?: number;
	userAgreesToShareLocation?: boolean;
};

type GameConfig = {
	activePlayer: ActivePlayer | null;
	globalPrefs: GlobalPreferences;
};

type InitialGameState = {
	gameId?: string;
	gameConfig?: GameConfig;
	gameStartTime?: number;
	gameStateSnapshot?: SnapShot;
};

type SnapShot = {
	playerLocation?: Coordinates;
	items?: Array<GameObject>;
	clues?: Array<GameObject>;
};

type Hookback<T> = Dispatch<SetStateAction<T>>;

type Coordinates = [number, number];
type UpdateLocation = (coords: Coordinates) => Coordinates;
type Items = Array<GameObject>;
type AddItem = (item: GameObject) => GameResponse;
type RemoveItem = (itemId: string) => GameResponse;
type ChangeDisplayName = (displayName: string) => void;
type VoidAction = () => void;
