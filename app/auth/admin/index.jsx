import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../../../utlis/supabase";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Index() {
  const [Email, setEmail] = useState("crazymani4321@gmail.com");
  const [Password, setPassword] = useState("Nani@123");
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
        AsyncStorage.setItem("isAdmin", "true");
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
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center px-6">
        {/* Header */}
        <View className="mb-10">
          <Text className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back
          </Text>
          <Text className="text-gray-500">Please sign in to continue</Text>
        </View>

        {/* Form */}
        <View className="space-y-4">
          {/* Email Input */}
          <View className="space-y-2">
            <Text className="text-gray-700 text-sm font-medium ml-1">
              Email
            </Text>
            <View className="bg-gray-50 rounded-xl overflow-hidden">
              <TextInput
                className="px-4 py-3 text-gray-700"
                placeholder="Enter your email"
                placeholderTextColor="#9CA3AF"
                value={Email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Password Input */}
          <View className="space-y-2">
            <Text className="text-gray-700 text-sm font-medium ml-1">
              Password
            </Text>
            <View className="bg-gray-50 rounded-xl overflow-hidden">
              <TextInput
                className="px-4 py-3 text-gray-700"
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                value={Password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity className="self-end">
            <Text className="text-blue-500 font-medium">Forgot Password?</Text>
          </TouchableOpacity>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            className="bg-blue-500 py-4 rounded-xl mt-4"
          >
            <Text className="text-white text-center font-semibold text-lg">
              Sign In
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View className="flex-row justify-center mt-8">
          <Text className="text-gray-500">Don't have an account? </Text>
          <TouchableOpacity onPress={()=>router.push("/auth/admin/signup")}>
            <Text className="text-blue-500 font-medium">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
