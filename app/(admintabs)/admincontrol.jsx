import { View, Text, Alert } from "react-native";
import React, { useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../../utlis/supabase";
import { router, useFocusEffect } from "expo-router";

export default function Admincontrol() {
  useFocusEffect(
    useCallback(() => {
      fun();
    }, [])
  );
  async function fun() {
    try {
      const res = await AsyncStorage.getItem("adminEmail");
      let { data, error } = await supabase
        .from("Admin")
        .select("*")
        .eq("Email", res);
      console.log(data);
      if (data[0].AdminType !== "hero") {
        Alert.alert("You don't have access");
        router.back();
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View className="flex-1 justify-center items-center">
      <Text>Admincontrol</Text>
    </View>
  );
}
