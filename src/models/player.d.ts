import type { GameResponse, Coordinates, GameObject } from "./types";

type ActivePlayer = {
	playerId: string;
	createdAt: number;
	displayName: string;
	location: Coordinates;
	tools: Array<GameObject>;
	clues: Array<GameObject>;
}

type updateLocation = (coords: Coordinates) => Coordinates;
type addTool =  (tool: GameObject) => GameResponse;
type removeTool = (toolId: string) => GameResponse;
type addClue = (clue: GameObject) => GameResponse;
type removeClue = (clueId: GameObject) => GameResponse;
type changeDisplayName = (displayName: string) => void;
type signOut = () => ?GameResponse;
type deleteAccount = () => ?GameResponse;