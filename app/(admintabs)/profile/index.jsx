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
  return (
    <SafeAreaView className="flex-1">
      <View className="flwx-1 p-3 mt-2">
        <View className="flex flex-row items-center gap-x-2 mt-7">
          <View className="w-16 h-16 bg-gray-500 boder-[0.9px] border-gray-400 rounded-full">
            <Image
              source={{ uri: profiledata.photo }}
              className="w-full h-full rounded-full object-cover"
            />
          </View>
          <View>
            <Text className="text-[20px]"> {profiledata.Name}</Text>
          </View>
        </View>
        <View className="border-b-[1.9px] border-gray-300 my-2"></View>
        <TouchableOpacity
          className="mb-1 flex flex-row justify-between items-center p-3 "
          onPress={() => router.push("/(admintabs)/profile/profileupdate")}
        >
          <View className="flex flex-row gap-x-2 items-center">
            <Ionicons name="person-outline" size={22} color="black" />
            <Text className="text-[18px] font-pregular">Profile</Text>
          </View>
          <MaterialIcons name="arrow-forward-ios" size={22} color="#090A0A" />
        </TouchableOpacity>
        <TouchableOpacity
          className="mb-1 flex flex-row justify-between items-center p-3 "
          onPress={openCamera}
        >
          <View className="flex flex-row gap-x-2 items-center">
            <Ionicons name="person-outline" size={22} color="black" />
            <Text className="text-[18px] font-pregular">
              Update Profile Photo
            </Text>
          </View>
          <MaterialIcons name="arrow-forward-ios" size={22} color="#090A0A" />
        </TouchableOpacity>
        <TouchableOpacity className="mb-1 flex flex-row justify-between items-center p-3 ">
          <View className="flex flex-row gap-x-2 items-center">
            <Ionicons name="person-outline" size={22} color="black" />
            <Text className="text-[18px] font-pregular">Testimonals</Text>
          </View>
          <MaterialIcons name="arrow-forward-ios" size={22} color="#090A0A" />
        </TouchableOpacity>
        <View className="my-7">
          <View className=" p-3 flex flex-col gap-y-2">
            <Text className="text-[20px] font-psemibold">Other</Text>

            <TouchableOpacity
              className=""
              onPress={() => {
                AsyncStorage.removeItem("isAdmin")
                router.push("/auth");
              }}
            >
              <Text className=" text-[18px] font-bold">Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
