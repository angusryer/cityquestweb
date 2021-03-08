import React, { FunctionComponent } from "react";

type ViewProps = {
	className?: string;
	sizeAndUnit?: string;
};

const Spacer: FunctionComponent<ViewProps> = ({
	className,
	sizeAndUnit
}: ViewProps) => {
	return (
		<div
			className={`spacer ${className}`}
			style={{ height: sizeAndUnit || "1rem" }}
		></div>
	);
};

export default React.memo(Spacer);
