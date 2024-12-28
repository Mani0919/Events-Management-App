import { View, Text, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../../../utlis/supabase";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Index() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const handleSubmit = async () => {
    try {
      let { data, error } = await supabase
        .from("Admin")
        .select("*")
        .eq("Email", Email)
        .eq("password", Password);
      console.log(data);
      if (data.length > 0) {
        console.log("Admin Found");
        AsyncStorage.setItem("isAdmin", "false");
        AsyncStorage.setItem("adminEmail", Email);
        router.push("/(admintabs)");
      } else {
        router.push("/auth/admin/signup");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <TextInput
          placeholder="Enter Email"
          value={Email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Enter Password"
          value={Password}
          onChangeText={setPassword}
        />
      </View>
      <Button title="Submit" onPress={handleSubmit} />
    </SafeAreaView>
  );
}
