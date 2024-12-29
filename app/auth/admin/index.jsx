import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  Modal,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../../../utlis/supabase";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";
export default function Index() {
  const [Email, setEmail] = useState("crazymani4321@gmail.com");
  const [Password, setPassword] = useState("Nani@123");
  const [isVisible, setIsVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async () => {
    try {
      let { data, error } = await supabase
        .from("Admin")
        .select("*")
        .eq("Email", Email)
        .eq("password", Password);
      console.log(data);
      if (
        data.length > 0 &&
        (data[0].AdminType === "admin" || data[0].AdminType === "hero")
      ) {
        console.log("Admin Found");
        AsyncStorage.setItem("isAdmin", "true");
        AsyncStorage.setItem("adminEmail", Email);
        router.push("/(admintabs)");
      } else {
        // router.push("/auth/admin/signup");
        // Alert.alert("you don't have access")
        showAlert();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const showAlert = () => {
    setIsVisible(true);
  };

  const closeAlert = () => {
    setIsVisible(false);
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
                className="px-3 py-3 text-gray-700"
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
            <View className="px-3 bg-gray-50 rounded-xl overflow-hidden flex flex-row justify-between items-center">
              <TextInput
                className=" py-3 text-gray-700"
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                value={Password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
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
          <TouchableOpacity onPress={() => router.push("/auth/admin/signup")}>
            <Text className="text-blue-500 font-medium">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isVisible}
        onRequestClose={closeAlert}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Access Request Sent</Text>
            <Text style={styles.modalMessage}>
              Your request for admin access has been sent. Please wait until you
              are granted access.
            </Text>
            <TouchableOpacity style={styles.closeButton} onPress={closeAlert}>
              <Text style={styles.closeButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2C3E50",
  },
  modalMessage: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#34495E",
  },
  closeButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
