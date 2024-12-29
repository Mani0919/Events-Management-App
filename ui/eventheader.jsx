import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
const EventsHeader = ({ onBackPress, showicon,onClick }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <TouchableOpacity onPress={onBackPress}>
          <Ionicons name="chevron-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: "600", color: "#111827" }}>
          Events
        </Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
        <TouchableOpacity onPress={onClick}>
          {showicon ? (
            <Ionicons name="search" size={22} color="#4B5563" />
          ) : (
            <Entypo name="cross" size={24} color="black" />
          )}
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={22} color="#4B5563" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EventsHeader;
