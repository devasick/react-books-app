import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { BookList } from "./BookList";

describe("App", () => {
  it("renders without crashing given the required props", () => {
    const props = {
      isFetching: false,
      dispatch: jest.fn(),
      selectedSubreddit: "reactjs",
      books: []
    };
    const wrapper = shallow(<BookList {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
