import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router, useFocusEffect } from "expo-router";
import { supabase } from "../../utlis/supabase";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useAdminContext } from "../../context/authcontext";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Index() {
  const { bottom } = useSafeAreaInsets();
  const { profiledata } = useAdminContext();
  console.log("home", profiledata);
  useEffect(() => {
    async function fun() {
      const res = await AsyncStorage.getItem("isAdmin");
      console.log("uskjhdjhgjdghj", res);
    }
    fun();
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Header Section */}
      <View
        style={{
          shadowOffset: { width: 0, height: 4 },
          shadowColor: "#000",
          shadowOpacity: 0.2,
          shadowRadius: 4,
        }}
        className="bg-gray-400 h-[110px] rounded-b-3xl border-b border-gray-300"
      >
        <View className="flex flex-row items-center justify-between px-4 mt-6">
          {/* Profile Information */}
          <View>
            <Text className="text-lg text-gray-700">Hi 👋</Text>
            <Text className="text-xl font-semibold text-gray-800">
              {profiledata.Name}
            </Text>
            <View className="flex flex-row items-center gap-x-2 mt-1">
              <View className="w-3 h-3 bg-green-500 rounded-full"></View>
              <Text className="text-sm text-gray-600">Admin</Text>
            </View>
          </View>
          {/* Profile Image */}
          <View className="w-16 h-16 border border-gray-300 rounded-full overflow-hidden">
            <Image
              source={{ uri: profiledata.photo }}
              className="w-full h-full object-cover"
            />
          </View>
        </View>
      </View>

      {/* Dashboard Title */}
      <View className="px-4 mt-6">
        <Text className="text-2xl font-bold text-gray-800">Dashboard</Text>
      </View>

      {/* Cards Section */}
      <View className="p-4 flex flex-wrap flex-row items-center justify-start gap-4">
        {/* Users Card */}
        <TouchableOpacity
          className="flex flex-row px-5 py-4 rounded-xl bg-white shadow-md justify-center items-center"
          onPress={() => router.push("/allusers")}
        >
          <View className="mr-4">
            <FontAwesome6 name="users" size={32} color="#4B5563" />
          </View>
          <View className="flex flex-col justify-center items-center">
            <Text className="text-xl font-bold text-gray-800">10</Text>
            <Text className="text-lg text-gray-600">Users</Text>
          </View>
        </TouchableOpacity>

        {/* Events Card */}
        <TouchableOpacity
          className="flex flex-row px-5 py-4 rounded-xl bg-white shadow-md justify-center items-center"
          onPress={() => router.push("/(admintabs)/events")}
        >
          <View className="mr-4">
            <MaterialIcons name="event" size={32} color="#4B5563" />
          </View>
          <View className="flex flex-col justify-center items-center">
            <Text className="text-xl font-bold text-gray-800">10</Text>
            <Text className="text-lg text-gray-600">Events</Text>
          </View>
        </TouchableOpacity>

        {/* Testimonials Card */}
        <TouchableOpacity
          className="flex flex-row px-5 py-4 rounded-xl bg-white shadow-md justify-center items-center"
          onPress={() => router.push("/allusers/testimonals")}
        >
          <View className="mr-4">
            <MaterialIcons name="reviews" size={32} color="#4B5563" />
          </View>
          <View className="flex flex-col justify-center items-center">
            <Text className="text-xl font-bold text-gray-800">10</Text>
            <Text className="text-lg text-gray-600">Testimonials</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
