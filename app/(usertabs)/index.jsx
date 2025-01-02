import {
  View,
  Text,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../../utlis/supabase";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import Carousel from "react-native-reanimated-carousel";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Notification from "../../ui/bell";
import Bell from "../../ui/notificationicon";

export default function Index() {
  const [data, setData] = useState([]);
  const { width } = Dimensions.get("window");
  const [selectedCity, setSelectedCity] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");
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
    getCity();
    getCities();
  }, []);
  async function getCities() {
    try {
      let { data, error } = await supabase.from("cities").select("*");
      console.log(data);
      setCities(data);
    } catch (error) {
      console.log(error);
    }
  }
  async function getCity() {
    try {
      const res = await AsyncStorage.getItem("city");
      if (res) {
        setSelectedCity(res);
      }
    } catch (error) {
      console.log("Error fetching city:", error);
    }
  }
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
            <Text className="text-gray-600 ml-1 text-sm">
              {item.location}({item.city})
            </Text>
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
  const filteredCities = cities.filter((item) =>
    item.cityname.toLowerCase().includes(city?.toLowerCase())
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <View className="bg-white shadow-sm">
          <View className="flex-row justify-between items-center px-4 py-3">
            <TouchableOpacity className="w-10 h-10 items-center justify-center">
              <MaterialIcons name="menu" size={28} color="#1F2937" />
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 mx-4"
              onPress={() => setModalVisible(true)}
            >
              <Text className="text-gray-500 text-sm font-medium text-center">
                Current Location
              </Text>
              <View className="flex-row items-center justify-center space-x-1">
                <Text className="text-lg font-semibold text-gray-900">
                  {selectedCity}, India
                </Text>
                <FontAwesome name="angle-down" size={20} color="#4B5563" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity className="w-12 h-12 items-center justify-center rounded-full bg-gray-50">
              {/* <MaterialIcons name="notifications" size={24} color="#1F2937" /> */}
              <Bell/>
            </TouchableOpacity>
          </View>
        </View>
       
        <View className="mx-3 mt-2">
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
            <TouchableOpacity onPress={() => router.push("/(usertabs)/events")}>
              <Text className="text-[#9718DD]">View all</Text>
            </TouchableOpacity>
          </View>

          {/* Event Cards */}
          <View>{data.map(renderEventCard)}</View>
        </View>

        {/* Bottom Padding */}
        <View className="h-6" />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View className="flex-1 bg-black/50">
            <View className="mt-20 bg-white rounded-t-3xl flex-1 p-4">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-xl font-semibold">Select City</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <MaterialIcons name="close" size={24} color="#374151" />
                </TouchableOpacity>
              </View>

              <View className="flex-row items-center bg-gray-100 rounded-xl px-4 mb-4">
                <MaterialIcons name="search" size={24} color="#9CA3AF" />
                <TextInput
                  className="flex-1 py-3 px-2 text-base"
                  placeholder="Search city..."
                  value={city}
                  onChangeText={setCity}
                />
              </View>

              <FlatList
                data={filteredCities}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedCity(item.cityname);
                      setModalVisible(false);
                    }}
                    className="py-3 border-b border-gray-200"
                  >
                    <Text className="text-lg">{item.cityname}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}
