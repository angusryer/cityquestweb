import { useAtom } from "jotai";
import { playerEnergyAtom } from "../../gameActions";
import "./EnergyLevel.scss";

const EnergyLevel = () => {
	const [energy] = useAtom(playerEnergyAtom);
	const criticalityColor = () => {
		if (energy <= 15) {
			return "red";
		} else if (energy > 15 && energy <= 45) {
			return "orange";
		} else if (energy > 45 && energy <= 75) {
			return "yellow";
		} else {
			return "green";
		}
	};
	return (
		<div className='energylevel'>
			<div
				className='energylevel__bar'
				style={{ backgroundColor: criticalityColor(), width: `${energy}px` }}
			></div>
		</div>
	);
};

export default EnergyLevel;
