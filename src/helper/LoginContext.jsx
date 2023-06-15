import { createContext } from "react";

export const LoginContext = createContext({
  loginState: false,
  setLoginState: () => undefined,
});
