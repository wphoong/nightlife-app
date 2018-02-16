import React from "react";
import { shallow } from "enzyme";
import DashboardPage from "../../components/DashboardPage.js";

test("should render expense dashboard page correctly", ()=> {
  const wrapper = shallow(<DashboardPage />);
  expect(wrapper).toMatchSnapshot();
});