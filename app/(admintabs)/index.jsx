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
export default function Index() {
  const { bottom } = useSafeAreaInsets();
  const { profiledata } = useAdminContext();
  console.log("home", profiledata);
  return (
    <SafeAreaView className="flex-1">
      <View
        style={{
          shadowOffset: { width: -2, height: 4 },
          shadowColor: "#171717",
          shadowOpacity: 0.2,
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
          shadowRadius: 3,
        }}
        className="bg-gray-400 h-[90px] border-b-[0.9px] border-l-[0.9px] border-gray-400"
      >
        <View className="flex flex-row items-center justify-between">
          <View className="mt-6 px-4">
            <Text>Hii 👋</Text>
            <Text className="text-[19px]">{profiledata.Name}</Text>
            <View className="flex flex-row items-center gap-x-1">
              <View className="w-2 h-2 bg-green-500 rounded-full"></View>
              <Text>Admin</Text>
            </View>
          </View>
          <View className="w-14 h-14  boder-[0.9px] border-gray-400 rounded-full mr-4 mt-3">
            <Image
              source={{ uri: profiledata.photo }}
              className="w-full h-full rounded-full object-cover"
            />
          </View>
        </View>
      </View>
      <View className="p-3 mt-4">
        <Text className="text-[20px] font-bold">Dashborad</Text>
      </View>
      <View className="p-3 flex flex-wrap flex-row items-center justify-start gap-x-3 gap-y-3">
        <TouchableOpacity className="flex flex-row px-4 py-3  rounded-xl bg-gray-400  justify-center items-center">
          <View className="mr-3">
            <FontAwesome6 name="users" size={32} color="black" />
          </View>
          <View className="flex flex-col justify-center items-center">
            <Text className="text-[18px]">10</Text>
            <Text className="text-[20px]">Users</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex flex-row px-4 py-3  rounded-xl bg-gray-400  justify-center items-center"
          onPress={() => router.push("/(admintabs)/events")}
        >
          <View className="mr-3">
            <MaterialIcons name="event" size={32} color="black" />
          </View>
          <View className="flex flex-col justify-center items-center">
            <Text className="text-[18px]">10</Text>
            <Text className="text-[20px]">Events</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity className="flex flex-row px-4 py-3  rounded-xl bg-gray-400  justify-center items-center">
          <View className="mr-3">
            <MaterialIcons name="reviews" size={32} color="black" />
          </View>
          <View className="flex flex-col justify-center items-center">
            <Text className="text-[18px]">10</Text>
            <Text className="text-[20px]">Testimonals</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
