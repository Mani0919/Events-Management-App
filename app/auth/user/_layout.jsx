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
          }}
        />
        <Stack.Screen
          name="cityselection"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="usersignUp"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
}
