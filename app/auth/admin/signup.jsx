import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../../../utlis/supabase";
import { router } from "expo-router";

export default function SignOut() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const handleSubmit = async () => {
    if (!Email && !Password && !Name) {
      Alert.alert("All feilds are required");
    } else {
      try {
        let { data, error } = await supabase.from("Admin").select("*");
        console.log(data);
        if (data.length > 0) {
          let { data, error } = await supabase
            .from("Admin")
            .select("*")
            .eq("Email", Email);
          if (data.length === 0) {
            const { data, error } = await supabase
              .from("Admin")
              .insert([
                {
                  Name: Name,
                  Email: Email,
                  password: Password,
                  AdminType: "default",
                  isAdmin: true,
                },
              ])
              .select();
            console.log(data);
          } else {
            Alert.alert("Admin Already Exist");
          }
        } else {
          const { data, error } = await supabase
            .from("Admin")
            .insert([
              {
                Name: Name,
                Email: Email,
                password: Password,
                AdminType: "hero",
                isAdmin: true,
              },
            ])
            .select();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center px-6">
        {/* Header */}
        <View className="mb-10">
          <Text className="text-3xl font-bold text-gray-800 mb-2">
            Create Account
          </Text>
          <Text className="text-gray-500">Sign up to get started</Text>
        </View>

        {/* Form */}
        <View className="space-y-4">
          {/* Name Input */}
          <View className="space-y-2">
            <Text className="text-gray-700 text-sm font-medium ml-1">
              Full Name
            </Text>
            <View className="bg-gray-50 rounded-xl overflow-hidden">
              <TextInput
                className="px-4 py-3 text-gray-700"
                placeholder="Enter your full name"
                placeholderTextColor="#9CA3AF"
                value={Name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>
          </View>

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
                placeholder="Create a password"
                placeholderTextColor="#9CA3AF"
                value={Password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
          </View>

          {/* Terms and Conditions */}
          <Text className="text-gray-500 text-sm text-center">
            By signing up, you agree to our{" "}
            <Text className="text-blue-500">Terms of Service</Text> and{" "}
            <Text className="text-blue-500">Privacy Policy</Text>
          </Text>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            className="bg-blue-500 py-4 rounded-xl mt-4"
          >
            <Text className="text-white text-center font-semibold text-lg">
              Create Account
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View className="flex-row justify-center mt-8">
          <Text className="text-gray-500">Already have an account? </Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text className="text-blue-500 font-medium">Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
