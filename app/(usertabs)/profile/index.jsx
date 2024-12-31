import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const ProfileScreen = ({ navigation }) => {
  const handleLogout = () => {
    // Add your logout logic here
    router.push("/auth")
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 bg-gray-50" >
        {/* Profile Header with Background */}
        <View className="h-60">
          <ImageBackground
            source={{ uri: "https://via.placeholder.com/800x400" }}
            className="h-full w-full"
            style={{ backgroundColor: "rgba(79, 70, 229, 0.9)" }}
          >
            <View className="absolute inset-0 bg-indigo-600/100" />
            <View className="items-center justify-end h-full pb-20">
              <View className="relative">
                <Image
                  source={{ uri: "https://via.placeholder.com/150" }}
                  className="w-28 h-28 rounded-full border-4 border-white"
                />
                <TouchableOpacity
                  className="absolute bottom-0 right-0 bg-indigo-500 p-3 rounded-full border-4 border-white"
                  onPress={() => navigation.navigate("UploadProfile")}
                >
                  <MaterialCommunityIcons
                    name="camera"
                    size={20}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>

        {/* User Info Card */}
        <View className="bg-white -mt-10 mx-4 rounded-xl shadow-lg p-6">
          <View className="items-center">
            <Text className="text-2xl font-bold text-gray-800">John Doe</Text>
            <Text className="text-gray-500 mt-1">john.doe@example.com</Text>
          
          </View>
        </View>

        {/* Profile Options */}
        <View className="mt-6 mx-4">
          <TouchableOpacity
            className="flex-row items-center bg-white p-4 rounded-xl mb-3 shadow-sm"
            onPress={() => navigation.navigate("EditProfile")}
          >
            <View className="bg-indigo-100 p-3 rounded-lg">
              <MaterialCommunityIcons
                name="account-edit"
                size={24}
                color="#4f46e5"
              />
            </View>
            <View className="flex-1 ml-4">
              <Text className="text-gray-800 font-semibold text-lg">
                Edit Profile
              </Text>
              <Text className="text-gray-500 text-sm">
                Update your personal details
              </Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color="#9ca3af"
            />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center bg-white p-4 rounded-xl mb-3 shadow-sm"
            onPress={() => navigation.navigate("Feedback")}
          >
            <View className="bg-purple-100 p-3 rounded-lg">
              <MaterialCommunityIcons
                name="message-text"
                size={24}
                color="#7c3aed"
              />
            </View>
            <View className="flex-1 ml-4">
              <Text className="text-gray-800 font-semibold text-lg">
                Feedback
              </Text>
              <Text className="text-gray-500 text-sm">
                Share your thoughts with us
              </Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color="#9ca3af"
            />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center bg-white p-4 rounded-xl mb-3 shadow-sm"
            onPress={() => navigation.navigate("Rating")}
          >
            <View className="bg-yellow-100 p-3 rounded-lg">
              <MaterialCommunityIcons name="star" size={24} color="#eab308" />
            </View>
            <View className="flex-1 ml-4">
              <Text className="text-gray-800 font-semibold text-lg">
                Rate Us
              </Text>
              <Text className="text-gray-500 text-sm">
                Tell us how we're doing
              </Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color="#9ca3af"
            />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <View className="px-4 mt-4 mb-8 ">
          <TouchableOpacity
            className="  py-4 "
            onPress={handleLogout}
          >
            <View className="flex-row items-center justify-center">
              <MaterialCommunityIcons name="logout" size={24} color="red" />
              <Text className="ml-2 text-black font-bold text-lg">Logout</Text>
            </View>
          </TouchableOpacity>

          <Text className="text-center text-gray-400 text-sm mt-6">
            Version 1.0.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
