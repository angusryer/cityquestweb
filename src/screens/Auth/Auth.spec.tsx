import React from "react";
import renderer from "react-test-renderer";
import Auth from "./Auth";

describe("Auth screen", () => {
	it("<Auth /> matches previous snapshot", () => {
		const tree: any = renderer.create(<Auth />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
