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
        <Stack.Screen name="feedback" options={{
          headerShown: true,
          title: "",
        }}/>
         <Stack.Screen name="helpcenter" options={{
          headerShown: true,
          title: "",
        }}/>
           <Stack.Screen name="contact" options={{
          headerShown: true,
          title: "Contact Us",
        }}/>
      </Stack>
    </>
  );
}
