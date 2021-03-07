import { useAtom } from "jotai";
import { LoadType } from "../../enums";
import { isLoadingGameOfTypeAtom } from "../../gameActions";
import "./Intro.scss";

const Intro = () => {
	const [, setIsLoadingGameOfType] = useAtom(isLoadingGameOfTypeAtom);

	return (
		<main className='intro'>
			<span>
				This is the intro. Play some videos. Say some things. Then
				setIsLoadingGameOfType = LoadType.NONE
			</span>
			<button
				type='button'
				onClick={() => setIsLoadingGameOfType(LoadType.NONE)}
			>
				Begin
			</button>
		</main>
	);
};

export default Intro;
