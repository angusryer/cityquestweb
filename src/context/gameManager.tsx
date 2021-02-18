import PlayerProvider from "./playerContext";

export default function GameManager({ children }: any) {
	return <PlayerProvider>{children}</PlayerProvider>;
}
