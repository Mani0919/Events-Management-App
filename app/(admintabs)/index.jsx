import { View, Text, TouchableOpacity } from "react-native";
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
export default function Index() {
  const { bottom } = useSafeAreaInsets();

  return (
    <SafeAreaView className="flex-1">
      <View className="">
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
        <TouchableOpacity className="flex flex-row px-4 py-3  rounded-xl bg-gray-400  justify-center items-center"
        onPress={()=>router.push("/(admintabs)/events")}>
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
