import authReducer from "../../reducers/auth.js";

test("should render login action", () => {
  const action = {
    type: "LOGIN",
    uid: 322
  };
  const state = authReducer({}, action);
  expect(state.uid).toBe(action.uid);
});

test("should render logout action", () => {
  const action = {
    type: "LOGOUT"
  };
  const state = authReducer({uid: 123} , action);
  expect(state.uid).toBe();
});