import { View, Text } from "react-native";
import React from "react";
import { Redirect, Stack } from "expo-router";
import { Tabs } from "expo-router";
import { useAdminContext } from "../../context/authcontext";

export default function Root() {
  return (
    <>
      <Tabs>
        <Tabs.Screen name="index" />
      </Tabs>
    </>
  );
}
