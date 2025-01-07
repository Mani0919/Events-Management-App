import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  Animated,
} from "react-native";
import { supabase } from "../../../utlis/supabase";
import EventsHeader from "../../../ui/eventheader";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useFocusEffect } from "expo-router";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EventsScreen() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showicon, setShowicon] = useState(true);

  // Animation setup
  const searchBarHeight = useRef(new Animated.Value(0)).current;
  const searchBarOpacity = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    useCallback(() => {
      getCity();
    }, [])
  );
  async function getCity() {
    const res = await AsyncStorage.getItem("city");
    console.log(res);
    getEvents(res);
  }

  // Animation functions
  const animateSearchBar = (show) => {
    Animated.parallel([
      Animated.timing(searchBarHeight, {
        toValue: show ? 60 : 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(searchBarOpacity, {
        toValue: show ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const ToggleIcon = () => {
    setShowicon((prev) => {
      const newValue = !prev;
      animateSearchBar(!newValue);
      return newValue;
    });
  };

  // Filter function
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredData(data);
      return;
    }

    const filtered = data.filter((item) => {
      const searchableText = `${item.eventname.toLowerCase()} ${item.city.toLowerCase()}`;
      return searchableText.includes(query.toLowerCase());
    });
    setFilteredData(filtered);
  };

  async function getEvents(city) {
    try {
      console.log(city);
      let { data: events, error } = await supabase
        .from("events")
        .select("*")
        .eq("city", city);
      console.log(events);
      if (error) throw error;
      setData(events);
      setFilteredData(events);
    } catch (error) {
      console.log(error);
    }
  }

  const handleBackPress = () => {
    router.back();
  };

  const renderEventItem = ({ item }) => (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        padding: 12,
        marginBottom: 16,
        backgroundColor: "white",
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginHorizontal: 16,
      }}
      onPress={() =>
        router.push({
          pathname: "/(usertabs)/events/usersingleevent",
          params: { id: item.id },
        })
      }
    >
      <Image
        source={{ uri: item.photo }}
        style={{
          width: 80,
          height: 80,
          borderRadius: 8,
        }}
      />
      <View style={{ flex: 1, marginLeft: 12, justifyContent: "center" }}>
        <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 6 }}>
          {item.eventname}
        </Text>
        <Text style={{ fontSize: 14, color: "#666", marginBottom: 4 }}>
          {item.startdate}
        </Text>
        <View
          className="flex-row items-center"
          style={{ fontSize: 14, color: "#666", marginBottom: 4 }}
        >
          <Ionicons name="location-outline" size={16} color="#666" />
          <Text className="text-[#666] ml-1">{item.city}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  const EmptyState = () => (
    <View className="flex-1 justify-center items-center px-4 mt-20">
      <MaterialIcons name="event-busy" size={80} color="#CBD5E1" />
      <Text className="text-xl font-semibold text-gray-700 mt-4">
        No Events Found
      </Text>
      <Text className="text-gray-500 text-center mt-2">
        There are no upcoming events in your city right now. Please check back
        later!
      </Text>
    </View>
  );
  const renderListEmptyComponent = () => {
    if (searchQuery) {
      return (
        <View className="flex-1 justify-center items-center px-4 mt-10">
          <MaterialIcons name="search-off" size={80} color="#CBD5E1" />
          <Text className="text-xl font-semibold text-gray-700 mt-4">
            No Results Found
          </Text>
          <Text className="text-gray-500 text-center mt-2">
            No events match your search "{searchQuery}". Try different keywords.
          </Text>
        </View>
      );
    }
    return <EmptyState />;
  };
  return (
    <SafeAreaView className="flex-1">
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <EventsHeader
          onBackPress={handleBackPress}
          showicon={showicon}
          onClick={ToggleIcon}
        />
        <Animated.View
          style={{
            height: searchBarHeight,
            opacity: searchBarOpacity,
            overflow: "hidden",
          }}
        >
          <View className="mx-3 mt-1">
            <View className="flex-row items-center bg-gray-100 px-4 py-3 rounded-xl mb-4 shadow-sm">
              <AntDesign name="search1" size={20} color="gray" />
              <TextInput
                className="flex-1 ml-2 text-base"
                placeholder="Search events..."
                placeholderTextColor="#666"
                value={searchQuery}
                onChangeText={handleSearch}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => handleSearch("")}>
                  <AntDesign name="close" size={20} color="gray" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Animated.View>
        <FlatList
          data={filteredData}
          renderItem={renderEventItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingTop: 16, flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderListEmptyComponent}
        />
      </View>
    </SafeAreaView>
  );
}
