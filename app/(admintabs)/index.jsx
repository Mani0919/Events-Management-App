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
  const stats = [
    {
      icon: <FontAwesome6 name="users" size={32} color="#6366F1" />,
      count: 10,
      label: "Users",
      route: "/allusers"
    },
    {
      icon: <MaterialIcons name="event" size={32} color="#8B5CF6" />,
      count: 10,
      label: "Events",
      route: "/(admintabs)/events"
    },
    {
      icon: <MaterialIcons name="reviews" size={32} color="#EC4899" />,
      count: 10,
      label: "Testimonials",
      route: "/allusers/testimonals"
    }
  ];
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header Section with Gradient */}
      <View className="bg-gradient-to-r from-indigo-500 to-purple-500 h-[140px] rounded-b-[40px]">
        <View className="flex-1 px-6 justify-center">
          <View className="flex flex-row items-center justify-between">
            {/* Profile Information */}
            <View className="flex-1">
              <Text className="text-lg text-black">Welcome back 👋</Text>
              <Text className="text-2xl font-bold text-black mt-1">
                {profiledata?.Name}
              </Text>
              <View className="flex flex-row items-center gap-x-2 mt-2">
                <View className="w-2.5 h-2.5 bg-green-400 rounded-full" />
                <Text className="text-sm text-black">Admin</Text>
              </View>
            </View>

            {/* Profile Image */}
            <View className="w-16 h-16 rounded-full border-2 border-white/20 overflow-hidden bg-white/10">
              <Image
                source={{ uri: profiledata?.photo }}
                className="w-full h-full"
              />
            </View>
          </View>
        </View>
      </View>

      {/* Main Content */}
      <View className="px-6 -mt-6">
        {/* Stats Grid */}
        <View className="flex flex-row flex-wrap gap-4">
          {stats.map((stat, index) => (
            <TouchableOpacity
              key={index}
              className="flex-1 min-w-[45%] bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 2
              }}
              onPress={() => router.push(stat.route)}
            >
              <View className="bg-gray-50/80 w-12 h-12 rounded-full items-center justify-center mb-3">
                {stat.icon}
              </View>
              <Text className="text-2xl font-bold text-gray-800">
                {stat.count}
              </Text>
              <Text className="text-sm text-gray-500 mt-1">
                {stat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}
