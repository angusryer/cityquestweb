import { useAtom } from "jotai";
import { playerGradeAtom } from "../../../../context/gameActions";
import "./Grade.scss";

const Grade = () => {
	const [grade] = useAtom(playerGradeAtom);
	const gradeColor = () => {
		switch (grade) {
			case "F":
				return "red";
			case "E":
				return "gold";
			case "D":
				return "orange";
			case "C":
				return "lightorange";
			case "B":
				return "yellow";
			default:
				return "green";
		}
	};
	return (
		<div className='grade'>
			<span className='grade__letter' style={{ color: gradeColor() }}>
				{grade}
			</span>
		</div>
	);
};

export default Grade;
