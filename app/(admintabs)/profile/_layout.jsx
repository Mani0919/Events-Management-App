import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function Root() {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            title: "Events",
          }}
        />
        <Stack.Screen
          name="profileupdate"
          options={{
            headerShown: true,
            title: "Profile Update",
          }}
        />
        <Stack.Screen name="supportmessges" options={{
          headerShown:true,
          title:null
        }}/>
      </Stack>
    </>
  );
}
