import { View, Text, Animated } from "react-native";
import React, { useRef, useEffect } from "react";
import { Redirect, Stack, Tabs } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useAdminContext } from "../../context/authcontext";

const TabIcon = ({ focused, color, children }) => {
  const scaleAnimation = useRef(new Animated.Value(1)).current;
  const opacityAnimation = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnimation, {
        toValue: focused ? 1.2 : 1,
        useNativeDriver: true,
        friction: 8,
      }),
      Animated.timing(opacityAnimation, {
        toValue: focused ? 1 : 0.7,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [focused]);

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleAnimation }],
        opacity: opacityAnimation,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </Animated.View>
  );
};

export default function Root() {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            height: 65,
            paddingBottom: 10,
            paddingTop: 10,
            backgroundColor: "#FFFFFF",
            borderTopWidth: 1,
            borderTopColor: "rgba(0, 0, 0, 0.1)",
            elevation: 8,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: -2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 3,
          },
          tabBarActiveTintColor: "#9718DD",
          tabBarInactiveTintColor: "#2C3550",
          headerShown: false,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "500",
            marginTop: 4,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Explore",
            tabBarIcon: ({ focused, color }) => (
              <TabIcon focused={focused} color={color}>
                <MaterialCommunityIcons
                  name="compass-outline"
                  size={24}
                  color={color}
                />
              </TabIcon>
            ),
          }}
        />
        <Tabs.Screen
          name="events"
          options={{
            title: "Events",
            tabBarIcon: ({ focused, color }) => (
              <TabIcon focused={focused} color={color}>
                <MaterialCommunityIcons
                  name="calendar-blank-outline"
                  size={24}
                  color={color}
                />
              </TabIcon>
            ),
          }}
        />
        <Tabs.Screen
          name="wishlist"
          options={{
            title: "Wishlists",
            tabBarIcon: ({ focused, color }) => (
              <TabIcon focused={focused} color={color}>
                <MaterialCommunityIcons
                  name="heart-outline"
                  size={24}
                  color={color}
                />
              </TabIcon>
            ),
          }}
        />
        <Tabs.Screen
          name="map"
          options={{
            title: "Map",
            tabBarIcon: ({ focused, color }) => (
              <TabIcon focused={focused} color={color}>
                <Ionicons name="location-outline" size={24} color={color} />
              </TabIcon>
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ focused, color }) => (
              <TabIcon focused={focused} color={color}>
                <Ionicons name="person-outline" size={24} color={color} />
              </TabIcon>
            ),
          }}
        />
      </Tabs>
    </>
  );
}
