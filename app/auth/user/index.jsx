import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { supabase } from "../../../utlis/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useRouter } from "expo-router";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
export default function Index() {
  GoogleSignin.configure({
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    webClientId:
      "117182283713-ifijrcph2riubp47d6jlif77uhqcef10.apps.googleusercontent.com",
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    forceCodeForRefreshToken: false,
    iosClientId:
      "117182283713-ufnuj8q7hveldrhu8euqmfh4kjo89k5m.apps.googleusercontent.com",
  });

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError(null);

      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      if (userInfo.data.idToken) {
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: "google",
          token: userInfo.data.idToken,
        });

        if (userInfo.type === "success") {
          await AsyncStorage.setItem("isAdmin", "false");

          try {
            let { data: userData, error: userError } = await supabase
              .from("users")
              .select("*")
              .eq("email", userInfo?.data?.user?.email);

            if (Array.isArray(userData) && userData.length === 0) {
              await supabase.from("users").insert([
                {
                  email: userInfo?.data?.user?.email,
                  name: userInfo?.data?.user?.name,
                  photo: userInfo?.data?.user?.photo,
                  isAdmin: false,
                },
              ]);
            }
            // AsyncStorage.setItem("name", userInfo?.data?.user?.name);
            AsyncStorage.setItem("userEmail", userInfo?.data?.user?.email);
            router.push("/auth/user/cityselection");
          } catch (error) {
            setError("Failed to create user profile");
            console.log("error", error);
          }
        }
      }
    } catch (error) {
      let errorMessage = "Something went wrong";

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        errorMessage = "Sign in was cancelled";
      } else if (error.code === statusCodes.IN_PROGRESS) {
        errorMessage = "Sign in is already in progress";
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        errorMessage = "Play Services are not available";
      }

      setError(errorMessage);
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center px-6">
        {/* Header Section with Icon */}
        <View className="items-center mb-12">
          <View className="w-20 h-20 mb-6 bg-blue-50 rounded-full items-center justify-center">
            <MaterialIcons name="lock" size={40} color="#2563EB" />
          </View>
          <Text className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back
          </Text>
          <Text className="text-gray-500 text-center">
            Continue with Google to access your account
          </Text>
        </View>

        {/* Sign In Button Section */}
        <View className="w-full max-w-sm">
          {isLoading ? (
            <View className="bg-gray-50 rounded-xl p-4 items-center">
              <ActivityIndicator size="large" color="#4285F4" />
              <Text className="mt-2 text-gray-600">Signing you in...</Text>
            </View>
          ) : (
            <TouchableOpacity
              className="bg-white border border-gray-300 rounded-xl p-4 flex-row items-center justify-center shadow-sm"
              onPress={handleGoogleSignIn}
            >
              <FontAwesome
                name="google"
                size={24}
                color="#4285F4"
                style={{ marginRight: 12 }}
              />
              <Text className="text-gray-700 font-semibold text-lg">
                Continue with Google
              </Text>
            </TouchableOpacity>
          )}

          {/* Error Message */}
          {error && (
            <View className="mt-4 bg-red-50 p-3 rounded-lg">
              <Text className="text-red-600 text-center">{error}</Text>
            </View>
          )}
        </View>

        {/* Footer Section */}
        <View className="mt-12">
          <Text className="text-gray-500 text-center text-sm">
            By continuing, you agree to our{"\n"}
            <Text className="text-blue-500">Terms of Service</Text> and{" "}
            <Text className="text-blue-500">Privacy Policy</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
