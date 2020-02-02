import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { BookList } from "./BookList";

// describe("App", () => {
//   it("renders without crashing given the required props", () => {
//     const props = {
//       isFetching: true,
//       dispatch: jest.fn(),
//       selectedSubreddit: "reactjs",
//       books: []
//     };
//     const wrapper = shallow(<BookList {...props} />);
//     wrapper.update();
//     console.log(wrapper);
//     expect(toJson(wrapper)).toMatchSnapshot();
//   });
// });

describe("Test Button component", () => {
  it("Test click event", () => {
    const mockCallBack = jest.fn();

    const div = shallow(<BookList onClick={mockCallBack}>Ok!</BookList>);
    div.find("book-box").simulate("click");
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});
