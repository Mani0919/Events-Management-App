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
            title:"Add Event"
          }}
        />
      </Stack>
    </>
  );
}
