import { View, Text, Platform } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { AntDesign, Ionicons, MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";

const TabBarIcon = ({ name, color, isActive }) => {
  return (
    <View
      className={`w-10 h-10 rounded-full justify-center items-center
      ${isActive ? 'bg-blue-500 shadow-lg' : 'bg-transparent'}`}
    >
      {name === "home" ? (
        <AntDesign
          name="home"
          size={24}
          color={isActive ? "#ffffff" : "#64748b"}
        />
      ) : name === "profile" ? (
        <Ionicons
          name="person-outline"
          size={24}
          color={isActive ? "#ffffff" : "#64748b"}
        />
      ) : name === "Admincontrol" ? (
        <MaterialIcons
          name="admin-panel-settings"
          size={24}
          color={isActive ? "#ffffff" : "#64748b"}
        />
      ) : name === "event" ? (
        <SimpleLineIcons
          name="event"
          size={24}
          color={isActive ? "#ffffff" : "#64748b"}
        />
      ) : null}
      
      {isActive && (
        <View className="absolute -top-1 w-2 h-2 rounded-full bg-blue-500" />
      )}
    </View>
  );
};

export default function Root() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'white',
          height: Platform.OS === "ios" ? 90 : 70,
          paddingBottom: Platform.OS === "ios" ? 30 : 10,
          paddingTop: 10,
          borderTopWidth: 1,
          borderTopColor: '#f1f5f9',
          elevation: 0,
          shadowOpacity: 0,
          position: 'absolute',
        },
        tabBarActiveTintColor: "#3b82f6",
        tabBarInactiveTintColor: "#64748b",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginTop: 5,
        },
        tabBarIconStyle: {
          marginTop: 5,
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name="home"
              color={color}
              isActive={focused}
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="events"
        options={{
          title: "Events",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name="event"
              color={color}
              isActive={focused}
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="admincontrol"
        options={{
          title: "Admin Control",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name="Admincontrol"
              color={color}
              isActive={focused}
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name="profile"
              color={color}
              isActive={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}