import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();
export const useAdminContext = () => useContext(AuthContext);
export const Context = ({ children  }) => {
  const [isAdmin, setIsAdmin] = useState("");
  useEffect(() => {
    async function getIsAdmin() {
      const res = await AsyncStorage.getItem("isAdmin");
      console.log("context data",res)
      setIsAdmin(res);
    }
    getIsAdmin();
  }, []);
  return (
    <AuthContext.Provider value={{isAdmin}}>{children }</AuthContext.Provider>
  );
};
