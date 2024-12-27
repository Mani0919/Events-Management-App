import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
export default function Index() {
  const { bottom } = useSafeAreaInsets();
  return (
    <SafeAreaView className="flex-1">
      <View>
        <Text>adminIndex</Text>
      </View>
      <TouchableOpacity
        className="absolute self-end bottom-0 py-4 px-4"
        onPress={() => router.push("/events")}
      >
        <AntDesign name="pluscircle" size={40} color="gray" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
