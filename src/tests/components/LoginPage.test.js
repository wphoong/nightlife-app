import React from "react";
import { shallow } from "enzyme";
import { LoginPage } from "../../components/LoginPage.js";

test("should render Login page", () => {
  const wrapper = shallow(<LoginPage />);
  expect(wrapper).toMatchSnapshot();
});

test("should render Login page", () => {
  const startLogInSpy = jest.fn();
  const wrapper = shallow(<LoginPage startLogin={startLogInSpy} />);
  wrapper.find("button").simulate("click");
  expect(startLogInSpy).toHaveBeenCalled();
});