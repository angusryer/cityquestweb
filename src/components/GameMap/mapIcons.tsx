import targetIcon from "../../assets/connection.svg";
import blastIcon from "../../assets/target.svg";
import playerIcon from "../../assets/person.svg";
import errorIcon from "../../assets/error.svg";

export const PLAYER: string = "player";
export const TARGET: string = "target";
export const BLAST: string = "blast";

export default function getIconImage(type?: string): string {
	if (type === PLAYER) return playerIcon;
	if (type === TARGET) return targetIcon;
	if (type === BLAST) return blastIcon;
	return errorIcon;
}
