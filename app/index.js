import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Redirect, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function index() {
  useEffect(() => {
    async function fun() {
      try {
        const res = await AsyncStorage.getItem("usertoken");
        if (res) {
          router.replace("/(usertabs)");
        } else {
          router.replace("/auth");
        }
      } catch (error) {
        console.log(error);
      }
    }
    fun();
  }, []);
  return <Redirect href={"/auth"} />;
}
