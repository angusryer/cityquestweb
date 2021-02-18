import React from "react";

type ErrorProps = {
	message?: string;
};

export default function LoadingError({ message }: ErrorProps) {
	return (
		<div>
			<h2>{message}</h2>
		</div>
	);
}
