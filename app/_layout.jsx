import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { Context } from "../context/authcontext";

export default function Root() {
  return (
    <>
      <Context>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="auth"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(admintabs)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(usertabs)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="allusers"
            options={{
              headerShown: true,
              title: "Users",
            }}
          />
        </Stack>
      </Context>
    </>
  );
}
