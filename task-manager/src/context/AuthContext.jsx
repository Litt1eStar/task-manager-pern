import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = Cookies.get("token");
    setUser(token);
  }, []);
  console.log(user);
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
