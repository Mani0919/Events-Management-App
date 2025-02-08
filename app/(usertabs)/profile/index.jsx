import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAdminContext } from "../../../context/authcontext";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "../../../utlis/supabase";
import { UploadToCloudinary } from "../../../ui/cloduinaryimage";
import img from "../../../assets/images/profile.png";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
const MenuButton = ({
  icon,
  title,
  subtitle,
  onPress,
  color = "#4B5563",
  bgColor = "bg-gray-50",
}) => (
  <TouchableOpacity
    className="flex flex-row justify-between items-center p-4 bg-white rounded-xl mb-3 shadow-sm"
    onPress={onPress}
  >
    <View className="flex flex-row items-center space-x-4">
      <View
        className={`w-12 h-12 ${bgColor} rounded-full items-center justify-center`}
      >
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <View>
        <Text className="text-gray-800 text-lg font-medium">{title}</Text>
        {subtitle && <Text className="text-gray-500 text-sm">{subtitle}</Text>}
      </View>
    </View>
    <MaterialIcons name="arrow-forward-ios" size={20} color={color} />
  </TouchableOpacity>
);

export default function UserProfile() {
  const router = useRouter();
  const { userProfile, profiledetails } = useAdminContext();
  const [userRating, setUserRating] = useState(0);

  const handleLogout = async () => {
    await GoogleSignin.signOut()
    await AsyncStorage.removeItem("userEmail");
    await AsyncStorage.removeItem("usertoken")
    router.push("/auth");
  };

  const openImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0]?.uri;
      const imageUrl = await UploadToCloudinary(uri);
      console.log("email", userProfile.email);
      if (imageUrl) {
        try {
          const { data, error } = await supabase
            .from("users")
            .update({ photo: imageUrl })
            .eq("email", userProfile.email)
            .select();
          console.log(data, error);
          await profiledetails(userProfile.email);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        {/* Hero Section with Background */}
        <View className="bg-blue-400 h-48">
          <View className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 to-transparent" />
        </View>

        {/* Profile Info Section */}
        <View className="px-4 -mt-20">
          <View className="bg-white rounded-2xl p-6 shadow-lg">
            <View className="items-center">
              <View className="relative">
                <View className="w-24 h-24 rounded-full border-4 border-white shadow-md">
                  {userProfile?.photo ? (
                    <Image
                      source={{ uri: userProfile?.photo }}
                      className="w-full h-full rounded-full"
                    />
                  ) : (
                    <Image
                      source={img}
                      className="w-full h-full rounded-full"
                    />
                  )}
                </View>
                <TouchableOpacity
                  className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2"
                  onPress={openImagePicker}
                >
                  <MaterialIcons name="photo-camera" size={18} color="white" />
                </TouchableOpacity>
              </View>

              <Text className="text-2xl font-bold text-gray-800 mt-4">
                {userProfile?.name}
              </Text>
              <Text className="text-gray-500 text-lg">
                {userProfile?.email}
              </Text>
            </View>
          </View>
        </View>

        {/* Menu Sections */}
        <View className="px-4 mt-6">
          {/* Account Section */}
          <Text className="text-lg font-bold text-gray-800 mb-3 px-1">
            Account Settings
          </Text>
          <MenuButton
            icon="person"
            title=" Update Profile Photo"
            subtitle="Update your personal information"
            onPress={openImagePicker}
            color="#3B82F6"
            bgColor="bg-blue-50"
          />
          <MenuButton
            icon="star"
            title="My Feedback"
            subtitle="Give feddback and ratings"
            onPress={() => router.push("/(usertabs)/profile/feedback")}
            color="#F59E0B"
            bgColor="bg-yellow-50"
          />
          <MenuButton
            icon="heart"
            title="Wishlist"
            subtitle="Your saved items"
            onPress={() => router.push("/(usertabs)/profile/whislist")}
            color="#EF4444"
            bgColor="bg-red-50"
          />

          {/* Support Section */}
          <Text className="text-lg font-bold text-gray-800 mb-3 mt-6 px-1">
            Support
          </Text>
          <MenuButton
            icon="help-circle"
            title="Help Center"
            subtitle="Get help with your purchases"
            onPress={() => router.push("/(usertabs)/profile/helpcenter")}
            color="#8B5CF6"
            bgColor="bg-purple-50"
          />
          <MenuButton
            icon="chatbox"
            title="Contact Us"
            subtitle="Reach out to our support team"
            onPress={() => router.push("/(usertabs)/profile/contact")}
            color="#F59E0B"
            bgColor="bg-yellow-50"
          />

          {/* Logout Button */}
          <View className="mt-6 mb-8">
            <TouchableOpacity
              className="bg-white p-4 rounded-xl flex-row items-center justify-between shadow-sm"
              onPress={handleLogout}
            >
              <View className="flex-row items-center space-x-4">
                <View className="w-12 h-12 bg-red-50 rounded-full items-center justify-center">
                  <Ionicons name="log-out" size={24} color="#EF4444" />
                </View>
                <View>
                  <Text className="text-red-500 text-lg font-medium">
                    Logout
                  </Text>
                  <Text className="text-gray-500 text-sm">
                    Sign out of your account
                  </Text>
                </View>
              </View>
              <MaterialIcons
                name="arrow-forward-ios"
                size={20}
                color="#EF4444"
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
