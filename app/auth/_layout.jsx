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
          name="admin"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="user"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="support"
          options={{
            title:"Support",
            headerShown: true,
          }}
        />
      </Stack>
    </>
  );
}
