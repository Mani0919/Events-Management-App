import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { supabase } from "../../../utlis/supabase";
import { router } from "expo-router";
export default function Searchevent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all"); // 'all', 'city', 'event'

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      let query = supabase.from("events").select("*");

      if (filter === "city") {
        query = query.ilike("city", `%${searchQuery}%`);
      } else if (filter === "event") {
        query = query.ilike("eventname", `%${searchQuery}%`);
      } else {
        query = query.or(
          `(city.ilike.%${searchQuery}%,eventname.ilike.%${searchQuery}%)`
        );
      }

      const { data, error } = await query;
      console.log("ccccc", data);
      if (error) throw error;
      setEvents(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const EventCard = ({ event }) => (
    <TouchableOpacity
      className="bg-white p-4 rounded-xl mb-3 shadow-sm"
      onPress={() =>
        router.push({
          pathname: "/(usertabs)/events/singleevent",
          params: { id: event.id },
        })
      }
    >
      <Text className="text-lg font-semibold">{event.eventname}</Text>
      <View className="flex-row items-center mt-2">
        <MaterialIcons name="location-on" size={16} color="#4B5563" />
        <Text className="text-gray-600 ml-1">{event.city}</Text>
      </View>
      <Text className="text-gray-500 mt-2">{event.desc}</Text>
      <View className="flex-row justify-between items-center mt-3">
        <Text className="text-blue-600 font-medium">
          {formatDate(event.startdate)}
        </Text>
        <Text className="text-gray-500">{formatDate(event.enddate)}</Text>
      </View>
    </TouchableOpacity>
  );
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };
  return (
    <View className="flex-1 bg-gray-50">
      <View className="p-4 bg-white shadow-sm">
        <View className="flex-row space-x-2 mb-4">
          {["all", "city", "event"].map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => setFilter(item)}
              className={`px-4 py-2 rounded-full ${
                filter === item ? "bg-blue-500" : "bg-gray-200"
              }`}
            >
              <Text
                className={filter === item ? "text-white" : "text-gray-700"}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="flex-row items-center bg-gray-100 rounded-xl px-4">
          <MaterialIcons name="search" size={24} color="#9CA3AF" />
          <TextInput
            className="flex-1 py-3 px-2 text-base"
            placeholder={`Search by ${filter}...`}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
          />
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#3B82F6" className="mt-4" />
      ) : (
        <FlatList
          data={events}
          renderItem={({ item }) => <EventCard event={item} />}
          keyExtractor={(item) => item.id}
          contentContainerClassName="p-4"
          ListEmptyComponent={
            <Text className="text-center text-gray-500 mt-4">
              No events found
            </Text>
          }
        />
      )}
    </View>
  );
}
