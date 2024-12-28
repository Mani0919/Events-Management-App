import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../../../utlis/supabase";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
export default function profileupdate() {
  const [adminmail, setData] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    async function fun() {
      try {
        const res = await AsyncStorage.getItem("adminEmail");
        console.log(res);
        setData(res);
        let { data, error } = await supabase
          .from("Admin")
          .select("*")
          .eq("Email", res);
        console.log(data);
        setName(data[0].Name);
        setEmail(data[0].Email);
        setPassword(data[0].password);
      } catch (error) {
        console.log(error);
      }
    }
    fun();
  }, []);
  const updateProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("Admin")
        .update({ Name: name, Email: email, password: password })
        .eq("Email", adminmail)
        .select();
        console.log(data)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView className="flex-1">
      <View className="mx-3">
        <Text className="font-semibold">Name</Text>
        <TextInput
          placeholder="Enter Name"
          className="bg-gray-300 p-2 rounded-lg mt-1"
          value={name}
          onChangeText={setName}
        />
      </View>
      <View className="mt-3 mx-3">
        <Text className="font-semibold">Email</Text>
        <TextInput
          placeholder="Enter Email"
          className="bg-gray-300 p-2 rounded-lg mt-1"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View className="mt-3 mx-3">
        <Text className="font-semibold">Password</Text>
        <View className="mt-1 flex flex-row justify-between items-center bg-gray-300 p-2 rounded-lg">
          <TextInput
            placeholder="Enter Email"
            className="  w-[90%]"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          {showPassword ? (
            <Ionicons
              name="eye"
              size={24}
              color="black"
              onPress={() => setShowPassword(false)}
            />
          ) : (
            <Ionicons
              name="eye-off-outline"
              size={24}
              color="black"
              onPress={() => setShowPassword(true)}
            />
          )}
        </View>
      </View>
      <TouchableOpacity
        className="bg-blue-300 p-2 mx-3 mt-10 rounded-xl"
        onPress={updateProfile}
      >
        <Text className="text-white font-bold self-center text-[18px]">
          Update Profile
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
