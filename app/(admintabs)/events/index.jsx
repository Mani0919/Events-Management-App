import { View, Text, TouchableOpacity, Image, ScrollView, TextInput } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router, useFocusEffect } from "expo-router";
import { supabase } from "../../../utlis/supabase";

export default function Index() {
  const { bottom } = useSafeAreaInsets();
  const [eventsdata, setEventsdata] = useState([]);
  useFocusEffect(
    useCallback(() => {
      fun();
    }, [])
  );
  useEffect(() => {
    fun();
  }, []);
  async function fun() {
    try {
      let { data, error } = await supabase.from("events").select("*");
      setEventsdata(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    const hours = date.getHours() % 12 || 12;
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const period = date.getHours() >= 12 ? "PM" : "AM";
    return `${day}-${month}-${year} ${hours}:${minutes} ${period}`;
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const filterEvents = () => {
    let filtered = eventsdata;
    
    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(event => 
        event.eventname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.city.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Date filter
    const today = new Date();
    if (filterType === 'upcoming') {
      filtered = filtered.filter(event => new Date(event.startdate) >= today);
    } else if (filterType === 'past') {
      filtered = filtered.filter(event => new Date(event.enddate) < today);
    }

    return filtered;
  };

  const FilterButton = ({ title, type }) => (
    <TouchableOpacity
      onPress={() => setFilterType(type)}
      className={`px-4 py-2 rounded-full mr-2 ${
        filterType === type 
          ? 'bg-indigo-600' 
          : 'bg-gray-200'
      }`}
    >
      <Text className={`${
        filterType === type 
          ? 'text-white' 
          : 'text-gray-600'
      } font-medium`}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
    {/* Search and Filter Section */}
    <View className="px-4 pt-4 pb-2 bg-white shadow-sm">
      <View className="flex-row items-center bg-gray-100 px-4 py-2 rounded-xl mb-4">
        <AntDesign name="search1" size={20} color="gray" />
        <TextInput
          className="flex-1 ml-2 text-base"
          placeholder="Search events..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-2">
        <FilterButton title="All Events" type="all" />
        <FilterButton title="Upcoming" type="upcoming" />
        <FilterButton title="Past" type="past" />
      </ScrollView>
    </View>

    {/* Events List with Bottom Padding for Tab Bar */}
    <ScrollView 
      className="flex-1" 
      contentContainerStyle={{ paddingBottom: 120 }} // Added extra padding for tab bar
    >
      {filterEvents().map((item, index) => (
        <TouchableOpacity
          key={index}
          className="bg-white mx-4 mb-4 rounded-xl overflow-hidden shadow-sm border border-gray-100"
          onPress={() =>
            router.push({
              pathname: "/(admintabs)/events/singleevent",
              params: { id: item.id },
            })
          }
        >
          <View className="flex-row p-3">
            <View className="flex-1 pr-4">
              <Text className="text-lg font-bold text-gray-800">
                {item.eventname}
              </Text>
              <View className="flex-row items-center mt-1">
                <AntDesign name="enviromento" size={16} color="#4B5563" />
                <Text className="ml-1 text-gray-600">{item.city}</Text>
              </View>
              <Text className="text-gray-500 text-sm mt-2 mb-2" numberOfLines={2}>
                {item.desc}
              </Text>
              <View className="border-t border-gray-100 pt-2">
                <View className="flex-row items-center">
                  <Text className="text-sm font-medium text-gray-700">Start:</Text>
                  <Text className="text-sm text-gray-600 ml-1">
                    {formatDate(item.startdate)}
                  </Text>
                </View>
                <View className="flex-row items-center mt-1">
                  <Text className="text-sm font-medium text-gray-700">End:</Text>
                  <Text className="text-sm text-gray-600 ml-1">
                    {formatDate(item.enddate)}
                  </Text>
                </View>
              </View>
            </View>
            <Image
              source={{ uri: item.photo }}
              className="w-28 h-28 rounded-lg"
            />
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>

    {/* Add Event Button positioned above tab bar */}
    <TouchableOpacity
      className="absolute right-6 bottom-20 bg-indigo-600 w-14 h-14 rounded-full items-center justify-center shadow-lg"
      onPress={() => router.push("/events/addupdateevent")}
      style={{
        shadowColor: '#6366F1',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 6
      }}
    >
      <AntDesign name="plus" size={30} color="white" />
    </TouchableOpacity>
  </SafeAreaView>
  );
}
