import { createContext } from "react";

export const LoginContext = createContext({
  loginState: {
    name: "",
    gender: "",
    school: "",
    loggedIn: false,
    userName: "",
    userPassword: "",
    scores: [],
  },
  setLoginState: () => undefined,
});
