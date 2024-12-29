import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "../../../utlis/supabase";
import { useAdminContext } from "../../../context/authcontext";
export default function Screen1() {
  const [email, setEmail] = useState("");
  const { profiledata, profiledetails } = useAdminContext();
  useEffect(() => {
    async function fun() {
      const res = await AsyncStorage.getItem("adminEmail");
      setEmail(res);
    }
    fun();
  }, []);
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera permissions to make this work!");
      }
    })();
  }, []);
  const openCamera = async () => {
    try {
      // Open Image Picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      // If user selects an image
      if (!result.canceled) {
        const uri = result.assets[0]?.uri; // File URI
        console.log(uri);
        // setImage(uri);
        console.log(email);
        try {
          const { data, error } = await supabase
            .from("Admin")
            .update({ photo: uri })
            .eq("Email", email)
            .select();
          console.log(data, error);
          await profiledetails(email);
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.error("Error uploading profile photo:", error.response || error);
    }
  };

  const MenuButton = ({ icon, title, onPress }) => (
    <TouchableOpacity
      className="flex flex-row justify-between items-center p-4 bg-white rounded-xl mb-2 shadow-sm"
      onPress={onPress}
    >
      <View className="flex flex-row items-center space-x-3">
        <View className="w-10 h-10 bg-gray-50 rounded-full items-center justify-center">
          <Ionicons name={icon} size={22} color="#4B5563" />
        </View>
        <Text className="text-gray-800 text-lg font-medium">{title}</Text>
      </View>
      <MaterialIcons name="arrow-forward-ios" size={20} color="#9CA3AF" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 px-4 pt-6">
        {/* Profile Header */}
        <View className="bg-white rounded-2xl p-4 mb-6 shadow-sm">
          <View className="flex flex-row items-center space-x-4">
            <View className="relative">
              <View className="w-20 h-20 rounded-full border-2 border-blue-500 p-1">
                <Image
                  source={{ uri: profiledata.photo }}
                  className="w-full h-full rounded-full"
                />
              </View>
              <TouchableOpacity
                className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1.5"
                onPress={openCamera}
              >
                <MaterialIcons name="photo-camera" size={16} color="white" />
              </TouchableOpacity>
            </View>
            <View>
              <Text className="text-2xl font-bold text-gray-800">
                {profiledata.Name}
              </Text>
              <Text className="text-gray-500">View and edit profile</Text>
            </View>
          </View>
        </View>

        {/* Menu Section */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-3 px-1">
            Account Settings
          </Text>
          <MenuButton
            icon="person-outline"
            title="Profile"
            onPress={() => router.push("/(admintabs)/profile/profileupdate")}
          />
          <MenuButton
            icon="camera-outline"
            title="Update Profile Photo"
            onPress={openCamera}
          />
          <MenuButton
            icon="star-outline"
            title="Testimonials"
            onPress={() => {}}
          />
        </View>

        {/* Other Section */}
        <View>
          <Text className="text-lg font-bold text-gray-800 mb-3 px-1">
            Other
          </Text>
          <TouchableOpacity
            className="bg-white p-4 rounded-xl flex-row items-center justify-between shadow-sm"
            onPress={async () => {
              await AsyncStorage.removeItem("isAdmin");
              router.push("/auth");
            }}
          >
            <View className="flex flex-row items-center space-x-3">
              <View className="w-10 h-10 bg-red-50 rounded-full items-center justify-center">
                <Ionicons name="log-out-outline" size={22} color="#EF4444" />
              </View>
              <Text className="text-red-500 text-lg font-medium">Logout</Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={20} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
