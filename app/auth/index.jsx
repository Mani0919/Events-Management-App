import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { supabase } from "../../utlis/supabase";
import { Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
export default function Login() {


  useEffect(() => {
    async function fun() {
      const res = await AsyncStorage.getItem("isAdmin");
      console.log("res", res);
    }
    fun();
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    
      <TouchableOpacity
        className="p-2 border-[0.9px] border-gray-400 rounded-xl px-10 py-4"
        onPress={() => router.push("/auth/admin")}
      >
        <Text className="text-[19px]">SignIn as a Admin</Text>
      </TouchableOpacity>
      <TouchableOpacity className="p-2 border-[0.9px] border-gray-400 rounded-xl px-10 py-4 mt-5"
      onPress={()=>router.push("/auth/user")}>
        <Text className="text-[19px]">Sign in as a user</Text>
      </TouchableOpacity>
    </View>
  );
}
