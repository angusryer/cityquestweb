import { useAtom } from "jotai";
import { computedGradeAndColor } from "../../gameActions";
import "./Grade.scss";

const Grade = () => {
	const [gradeAndColor] = useAtom(computedGradeAndColor);
	return (
		<div className='grade'>
			<span className='grade__letter' style={{ color: gradeAndColor.color }}>
				{gradeAndColor.letter}
			</span>
		</div>
	);
};

export default Grade;
