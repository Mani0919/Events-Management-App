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
        <Stack.Screen name="addupdateevent" options={{
          headerShown:false
        }}/>
        <Stack.Screen name="singleevent"/>
      </Stack>
    </>
  );
}
