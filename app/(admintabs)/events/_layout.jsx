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
            headerShown: true,
            title: "Events",
          }}
        />
        <Stack.Screen name="addupdateevent" />
        <Stack.Screen name="singleevent"/>
      </Stack>
    </>
  );
}
