import { login, startLogin, logout, startLogOut } from "../../actions/auth.js";

test("should generate login action", () => {
  const uid = 322
  const action = login(uid);
  expect(action).toEqual({
    type: "LOGIN",
    uid
  });
});

test("should generate logout action", () => {
  const uid = 322
  const action = logout();
  expect(action).toEqual({
  type: "LOGOUT"
  });
});