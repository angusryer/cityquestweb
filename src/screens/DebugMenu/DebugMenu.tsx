import { useAtom } from "jotai";
import { v4 as uuid } from "uuid";
import Button from "react-bootstrap/Button";
import {
	accumulatedEnergyAction,
	eventTriggeredOfTypeAtom,
	missionTimeAtom,
	gameElapsedTimeAtom,
	activePlayerAtom,
	saveGameStateAction,
	playerDataAtom
} from "../../gameActions";
import { EventType } from "../../enums";
import { flatten, useHorizontalScroll } from "../../helpers";
import "./DebugMenu.scss";

const debugControlsBtnClass = "debugmenu__controls-btn";

type FunctionObject = {
	name: string;
	func: () => void;
};

const DebugMenu = () => {
	const [, setEventTriggeredOfType] = useAtom(eventTriggeredOfTypeAtom);
	const [, setElapsedTime] = useAtom(gameElapsedTimeAtom);
	const [missionTime, modifyMissionTime] = useAtom(missionTimeAtom);
	const [gameState] = useAtom(saveGameStateAction);
	const [activePlayer] = useAtom(activePlayerAtom);
	const [playerData] = useAtom(playerDataAtom);
	const [accumulatedEnergy, modifyAccumulatedEnergy] = useAtom(
		accumulatedEnergyAction
	);
	const scrollRef = useHorizontalScroll();

	const listedProperties = (obj: any) => {
		const entries = flatten(obj);
		const elements = Object.entries(entries).map(([key, value]) => {
			return (
				<li
					key={uuid()}
					className='debugmenu__ul-li'
				>{`${key} ==> ${value}`}</li>
			);
		});
		return elements;
	};

	const functionList: Array<FunctionObject> = [
		{
			name: "e+",
			func: () => {
				modifyAccumulatedEnergy(10);
			}
		},
		{
			name: "e-",
			func: () => {
				modifyAccumulatedEnergy(-10);
			}
		},
		{
			name: "eres",
			func: () => {
				modifyAccumulatedEnergy(-(accumulatedEnergy || 0));
			}
		},

		{
			name: "t+",
			func: () => {
				modifyMissionTime((missionTime || 0) + 10);
			}
		},

		{
			name: "t-",
			func: () => {
				modifyMissionTime((missionTime || 0) - 10);
			}
		},

		{
			name: "tres",
			func: () => {
				setElapsedTime(0);
			}
		},

		{
			name: "l+",
			func: () => {
				setEventTriggeredOfType(EventType.LEVEL_UP);
			}
		},

		{
			name: "l-",
			func: () => {
				setEventTriggeredOfType(EventType.LEVEL_DOWN);
			}
		},

		{
			name: "win",
			func: () => {
				setEventTriggeredOfType(EventType.WIN_GAME);
			}
		},

		{
			name: "lose",
			func: () => {
				setEventTriggeredOfType(EventType.END_GAME);
			}
		}
	];

	return (
		<div className='debugmenu'>
			<ul className='debugmenu__ul'>
				{listedProperties(activePlayer)}
				{listedProperties(playerData)}
				{listedProperties(gameState)}
			</ul>
			<div className='debugmenu__controls' ref={scrollRef}>
				{functionList.map((functionObj: FunctionObject) => (
					<Button
						key={uuid()}
						variant='dark'
						className={debugControlsBtnClass}
						onClick={functionObj.func}
					>
						{functionObj.name}
					</Button>
				))}
			</div>
		</div>
	);
};

export default DebugMenu;
