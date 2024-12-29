import { View, Text } from "react-native";
import React from "react";
import { Redirect, Stack, Tabs } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAdminContext } from "../../context/authcontext";

export default function Root() {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
          },
          tabBarActiveTintColor: '#9718DD', // Purple color for active tab
          tabBarInactiveTintColor: '#2C3550', // Gray color for inactive tabs
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Explore",
            tabBarIcon: ({ focused, color }) => (
              <View className={`items-center justify-center ${focused ? 'opacity-100' : 'opacity-70'}`}>
                <MaterialCommunityIcons
                  name="compass-outline"
                  size={24}
                  color={color}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="events"
          options={{
            title: "Events",
            tabBarIcon: ({ focused, color }) => (
              <View className={`items-center justify-center ${focused ? 'opacity-100' : 'opacity-70'}`}>
                <MaterialCommunityIcons
                  name="calendar-blank-outline"
                  size={24}
                  color={color}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="map"
          options={{
            title: "Map",
            tabBarIcon: ({ focused, color }) => (
              <View className={`items-center justify-center ${focused ? 'opacity-100' : 'opacity-70'}`}>
                <Ionicons
                  name="location-outline"
                  size={24}
                  color={color}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ focused, color }) => (
              <View className={`items-center justify-center ${focused ? 'opacity-100' : 'opacity-70'}`}>
                <Ionicons
                  name="person-outline"
                  size={24}
                  color={color}
                />
              </View>
            ),
          }}
        />
      </Tabs>
    </>
  );
}