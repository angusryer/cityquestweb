import React from "react";
import renderer from "react-test-renderer";
import Menu from "./MainMenu";

describe("Main Menu screen", () => {
	it("<Menu /> matches previous snapshot", () => {
		const tree: any = renderer.create(<Menu />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
