import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { supabase } from "../../../utlis/supabase";

export default function SignUpScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [useremail, setUseremail] = useState("");
  const [name, setName] = useState("");
  const [password, setUserpassword] = useState("");
  const handleSignUp = async () => {
    try {
      let { data: users, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", useremail);
      console.log(users);
      if (users.length !== 0) {
        Alert.alert("User already exist");
      } else {
        await supabase.from("users").insert([
          {
            email: useremail,
            name: name,
            password: password,
            isAdmin: false,
          },
        ]);
        router.back()
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-white justify-center py-14">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="flex-1 justify-center items-center px-6 py-8">
          {/* Header Section */}
          <View className="items-center mb-8">
            <View className="w-20 h-20 mb-6 bg-blue-50 rounded-full items-center justify-center">
              <MaterialIcons name="person-add" size={40} color="#2563EB" />
            </View>
            <Text className="text-3xl font-bold text-gray-800 mb-2">
              Create Account
            </Text>
            <Text className="text-gray-500 text-center">
              Sign up to get started with Event App
            </Text>
          </View>

          {/* Sign Up Form */}
          <View className="w-full max-w-sm space-y-4 mb-6">
            {/* Full Name Input */}
            <View className="space-y-2">
              <Text className="text-gray-700 font-medium ml-1">Full Name</Text>
              <View className="flex-row items-center border border-gray-300 rounded-xl px-4 py-3 bg-gray-50">
                <MaterialIcons
                  name="person-outline"
                  size={20}
                  color="#6B7280"
                />
                <TextInput
                  className="flex-1 ml-3 text-gray-800"
                  placeholder="Enter your full name"
                  placeholderTextColor="#9CA3AF"
                  autoCapitalize="words"
                  value={name}
                  onChangeText={setName}
                />
              </View>
            </View>

            {/* Email Input */}
            <View className="space-y-2">
              <Text className="text-gray-700 font-medium ml-1">Email</Text>
              <View className="flex-row items-center border border-gray-300 rounded-xl px-4 py-3 bg-gray-50">
                <MaterialIcons name="email" size={20} color="#6B7280" />
                <TextInput
                  className="flex-1 ml-3 text-gray-800"
                  placeholder="Enter your email"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={useremail}
                  onChangeText={setUseremail}
                />
              </View>
            </View>

            {/* Password Input */}
            <View className="space-y-2">
              <Text className="text-gray-700 font-medium ml-1">Password</Text>
              <View className="flex-row items-center border border-gray-300 rounded-xl px-4 py-3 bg-gray-50">
                <MaterialIcons name="lock-outline" size={20} color="#6B7280" />
                <TextInput
                  className="flex-1 ml-3 text-gray-800"
                  placeholder="Create a password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry
                  value={password}
                  onChangeText={setUserpassword}
                />
              </View>
              <Text className="text-xs text-gray-500 ml-1">
                Must be at least 8 characters long
              </Text>
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity
              className="bg-blue-600 rounded-xl p-4 items-center mt-4"
              onPress={handleSignUp}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-semibold text-lg">
                  Create Account
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Error Message */}
          {error && (
            <View className="mt-4 bg-red-50 p-3 rounded-lg w-full max-w-sm">
              <Text className="text-red-600 text-center">{error}</Text>
            </View>
          )}

          <View className="mt-3">
            <View className="flex flex-row items-center">
              <Text className="text-gray-500 text-center text-sm">
                Already have an account?
              </Text>
              <TouchableOpacity onPress={() => router.back()}>
                <Text className="text-blue-600 font-medium">Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
