import { createContext } from "react";

export const LoginContext = createContext({
  loginState: {
    loggedIn: false,
    userName: "",
    userPassword: "",
  },
  setLoginState: () => undefined,
});
