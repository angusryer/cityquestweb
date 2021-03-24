import { useContext, CSSProperties } from "react";
import { MapContext } from "react-map-gl";
import getIconImage from "./mapIcons";

interface Props {
	type: string;
	lat: number;
	lng: number;
}

const MapMarker = (props: Props) => {
	const context = useContext(MapContext);
	const { type, lng, lat } = props;
	const [x, y] =
		context.viewport !== undefined
			? context.viewport.project([lng, lat])
			: [0, 0];

	const markerStyle: CSSProperties = {
		position: "absolute",
		background: type === "player" ? "orange" : "red",
        opacity: 0.5,
        width: "24px",
        height: "24px",
        borderRadius: "99px",
		left: x,
		top: y
	};

	return <div style={markerStyle}>
        <img src={getIconImage(type)} alt={type} />
    </div>;
};

export default MapMarker;