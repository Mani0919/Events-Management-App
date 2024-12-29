import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../utlis/supabase";
import { router } from "expo-router";

export const AuthContext = createContext();
export const useAdminContext = () => useContext(AuthContext);
export const Context = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState("");
  const [profiledata, setProfileData] = useState({});
  useEffect(() => {
    async function getIsAdmin() {
      const res = await AsyncStorage.getItem("isAdmin");
      const ress = await AsyncStorage.getItem("adminEmail");
      console.log("context data", res);
      profiledetails(ress);
      setIsAdmin(res);
    }
    getIsAdmin();
  }, []);
  async function profiledetails(email) {
    try {
      let { data, error } = await supabase
        .from("Admin")
        .select("*")
        .eq("Email", email);
      console.log("profile data", data);
      setProfileData(data[0]);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <AuthContext.Provider value={{ isAdmin, profiledata,profiledetails }}>
      {children}
    </AuthContext.Provider>
  );
};
