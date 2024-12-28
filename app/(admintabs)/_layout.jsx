import { View, Text, Platform } from "react-native";
import React from "react";
import { Redirect, Stack } from "expo-router";
import { Tabs } from "expo-router";
import { useAdminContext } from "../../context/authcontext";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
const TabBarIcon = ({ name, color, size, isActive }) => {
  return (
    <View
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: isActive ? "gray" : "transparent",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {name === "home" ? (
        <AntDesign
          name="home"
          size={24}
          color={`${isActive ? "#fff" : "rgba(255, 255, 255, 0.5)"}`}
        />
      ) : name === "profile" ? (
        <Ionicons
          name="person-outline"
          size={24}
          color={`${isActive ? "#fff" : "rgba(255, 255, 255, 0.5)"}`}
        />
      ) : name === "Admincontrol" ? (
        <MaterialIcons
          name="admin-panel-settings"
          size={24}
          color={`${isActive ? "#fff" : "rgba(255, 255, 255, 0.5)"}`}
        />
      ) : (
        ""
      )}
    </View>
  );
};
export default function Root() {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "gray",
            height: Platform.OS === "ios" ? 100 : 60,
            padding: Platform.OS === "ios" ? 10 : 0,
          },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "rgba(255, 255, 255, 0.5)",
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "bold",
            marginBottom: 5,
          },
          tabBarIconStyle: {
            marginTop: 8,
          },
          tabBarHideOnKeyboard: true,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Admin",
            tabBarIcon: ({ color, size, focused }) => (
              <TabBarIcon
                name="home"
                color={color}
                size={size}
                isActive={focused}
              />
            ),
            tabBarLabel: "Home",
          }}
        />
        <Tabs.Screen
          name="events"
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <TabBarIcon
                name="Admincontrol"
                color={color}
                size={size}
                isActive={focused}
              />
            ),
            tabBarLabel: "Events",
          }}
        />
        <Tabs.Screen
          name="admincontrol"
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <TabBarIcon
                name="Admincontrol"
                color={color}
                size={size}
                isActive={focused}
              />
            ),
            tabBarLabel: "Admincontrol",
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <TabBarIcon
                name="profile"
                color={color}
                size={size}
                isActive={focused}
              />
            ),
            tabBarLabel: "Profile",
          }}
        />
      </Tabs>
    </>
  );
}
