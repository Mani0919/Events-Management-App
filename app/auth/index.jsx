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
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
export default function Login() {
  useEffect(() => {
    async function fun() {
      const res = await AsyncStorage.getItem("isAdmin");
      console.log("res", res);
    }
    fun();
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center px-6">
        {/* Header Section */}
        <View className="items-center mb-12">
          <View className="w-20 h-20 mb-6 bg-blue-50 rounded-full items-center justify-center">
            <MaterialIcons name="verified-user" size={40} color="#2563EB" />
          </View>
          <Text className="text-3xl font-bold text-gray-800 mb-2">Welcome</Text>
          <Text className="text-gray-500 text-center">
            Choose how you want to sign in
          </Text>
        </View>

        {/* Role Selection Buttons */}
        <View className="w-full max-w-sm space-y-4">
          {/* Admin Button */}
          <TouchableOpacity
            className="bg-blue-500 rounded-xl p-6 flex-row items-center justify-between shadow-sm active:bg-blue-600"
            onPress={() => router.push("/auth/admin")}
          >
            <View className="flex-row items-center">
              <View className="bg-blue-400 p-2 rounded-lg mr-4">
                <MaterialIcons
                  name="admin-panel-settings"
                  size={24}
                  color="white"
                />
              </View>
              <View>
                <Text className="text-white text-xl font-semibold">
                  Admin Sign In
                </Text>
                <Text className="text-blue-100 text-sm">
                  Access administrative features
                </Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="white" />
          </TouchableOpacity>

          {/* User Button */}
          <TouchableOpacity
            className="bg-white border border-gray-200 rounded-xl p-6 flex-row items-center justify-between shadow-sm active:bg-gray-50"
            onPress={() => router.push("/auth/user")}
          >
            <View className="flex-row items-center">
              <View className="bg-gray-100 p-2 rounded-lg mr-4">
                <MaterialIcons name="person" size={24} color="#4B5563" />
              </View>
              <View>
                <Text className="text-gray-800 text-xl font-semibold">
                  User Sign In
                </Text>
                <Text className="text-gray-500 text-sm">
                  Access your personal account
                </Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#4B5563" />
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View className="mt-12 flex flex-row ">
          <Text className="text-gray-500 text-center text-sm">Need help? </Text>
          <TouchableOpacity onPress={()=>router.push("/auth/support")}>
            <Text className="text-blue-500 font-medium">Contact Support</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
