import {
  View,
  Text,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../../utlis/supabase";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import Carousel from "react-native-reanimated-carousel";
import { router } from "expo-router";

export default function Index() {
  const [data, setData] = useState([]);
  const { width } = Dimensions.get("window");

  useEffect(() => {
    async function fetchEvents() {
      try {
        let { data: events, error } = await supabase
          .from("events")
          .select("*")
          .gt("startdate", new Date().toISOString())
          .limit(5)
          .order("startdate", { ascending: true });

        if (error) throw error;
        setData(events);
      } catch (error) {
        console.log("Error fetching events:", error);
      }
    }
    fetchEvents();
  }, []);

  const renderCarouselItem = ({ item }) => (
    <View className="mx-4 h-[200px] relative">
      <Image
        source={{ uri: item.photo }}
        className="h-full w-full rounded-3xl"
        style={{
          borderRadius: 24,
        }}
      />
      <View className="absolute inset-0 rounded-3xl bg-black/40" />
      <View className="absolute bottom-0 w-full p-4">
        <Text className="text-white text-xl font-bold mb-1">
          {item.eventname}
        </Text>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Ionicons name="location-outline" size={16} color="white" />
            <Text className="text-white ml-1">{item.city}</Text>
          </View>
          <View className="flex-row items-center">
            <AntDesign name="calendar" size={16} color="white" />
            <Text className="text-white ml-1">
              {new Date(item.startdate).toLocaleDateString()}
            </Text>
          </View>
        </View>
      </View>
    
    </View>
  );

  const renderEventCard = (item) => (
    <TouchableOpacity
      key={item.id}
      className="flex-row bg-white p-3 rounded-xl mb-3 mx-3 shadow-sm"
    >
      <Image source={{ uri: item.photo }} className="w-24 h-24 rounded-xl" />
      <View className="flex-1 ml-3 justify-between">
        <View>
          <Text className="text-[#403C56] text-lg font-semibold">
            {item.eventname}
          </Text>
          <View className="flex-row items-center mt-1">
            <Ionicons name="location-outline" size={14} color="#666" />
            <Text className="text-gray-600 ml-1 text-sm">{item.location}({item.city})</Text>
          </View>
        </View>
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <AntDesign name="calendar" size={14} color="#666" />
            <Text className="text-gray-600 ml-1 text-sm">
              {new Date(item.startdate).toLocaleDateString()}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View className="mx-3 mt-10">
          <View className="flex-row items-center bg-gray-100 px-4 py-3 rounded-xl mb-4 shadow-sm">
            <AntDesign name="search1" size={20} color="gray" />
            <TextInput
              className="flex-1 ml-2 text-base"
              placeholder="Search events..."
              placeholderTextColor="#666"
            />
          </View>
        </View>

        {/* Carousel */}
        <View className="mt-2">
          <Carousel
            loop
            width={width}
            height={220}
            autoPlay={true}
            data={data}
            scrollAnimationDuration={3000}
            renderItem={renderCarouselItem}
          />
        </View>

        {/* Events For You Section */}
        <View className="mt-6">
          <View className="flex-row justify-between items-center mx-3 mb-4">
            <Text className="text-[#403C56] text-[17px] font-semibold">
              Events For You
            </Text>
            <TouchableOpacity onPress={()=>router.push("/(usertabs)/events")}>
              <Text className="text-[#9718DD]">View all</Text>
            </TouchableOpacity>
          </View>

          {/* Event Cards */}
          <View>{data.map(renderEventCard)}</View>
        </View>

        {/* Bottom Padding */}
        <View className="h-6" />
      </ScrollView>
    </SafeAreaView>
  );
}
