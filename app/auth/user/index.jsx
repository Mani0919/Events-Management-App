import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { supabase } from "../../../utlis/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

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
  return (
    <SafeAreaView className="flex-1">
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={async () => {
            try {
              console.log("start");
              await GoogleSignin.hasPlayServices();
              const userInfo = await GoogleSignin.signIn();
              console.log("middle", userInfo);
              if (userInfo.data.idToken) {
                const { data, error } = await supabase.auth.signInWithIdToken({
                  provider: "google",
                  token: userInfo.data.idToken,
                });

                if (userInfo.type === "success") {
                  AsyncStorage.setItem("isAdmin", "false");
                  try {
                    let { data, error } = await supabase
                      .from("users")
                      .select("*")
                      .eq("email", userInfo?.data?.user?.email);
                    console.log("dataaaaa", data);
                    if (Array.isArray(data) && data.length === 0) {
                      let { data, error } = await supabase
                        .from("users")
                        .insert([
                          {
                            email: userInfo?.data?.user?.email,
                            name: userInfo?.data?.user?.name,
                            photo: userInfo?.data?.user?.photo,
                            isAdmin: false,
                          },
                        ]);
                      console.log("data", data, error);
                      router.push("/(usertabs)");
                    } else {
                      router.push("/(usertabs)");
                    }
                  } catch (error) {
                    console.log("error", error);
                  }
                  // router.push({
                  //   pathname: "/auth/profile",
                  //   params: {
                  //     useremail: userInfo?.data?.user?.email,
                  //     name: userInfo?.data?.user?.name,
                  //     photo: userInfo?.data?.user?.photo,
                  //   },
                  // });
                }
              } else {
                throw new Error("no ID token present!");
              }
              console.log("end", userInfo);
            } catch (error) {
              if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                console.log("cancelled");
              } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
                console.log("in progress");
              } else if (
                error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
              ) {
                // play services not available or outdated
                console.log("play services not available");
              } else {
                // some other error happened
                console.log("error", error);
              }
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
}
