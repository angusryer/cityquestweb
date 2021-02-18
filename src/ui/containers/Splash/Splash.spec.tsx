import React from "react";
import renderer from "react-test-renderer";
import Splash from "./Splash";

describe("Splash screen", () => {
    it("<Splash /> matches previous snapshot", () => {
        const tree: any = renderer.create(<Splash />).toJSON();
        expect(tree).toMatchSnapshot();
    })
})