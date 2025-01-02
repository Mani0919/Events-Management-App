import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { supabase } from "../../../utlis/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const CITIES = [
//   "Mumbai",
//   "Delhi",
//   "Bangalore",
//   "Hyderabad",
//   "Chennai",
//   "Kolkata",
// ];

export default function CitySelection() {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const router = useRouter();
  const [CITIES,setCities] = useState([]);
  const handleSearch = (text) => {
    setCity(text);
    const filtered = CITIES.filter((item) =>
      item.cityname.toLowerCase().includes(text?.toLowerCase())
    );
    setSuggestions(text ? filtered : []);
  };

  const handleCitySelect = (selectedCity) => {
    setCity(selectedCity);
    setSuggestions([]);
  };

  const handleNext = () => {
    if (city.trim()) {
      AsyncStorage.setItem("city", city);
      router.push("/(usertabs)");
    }
  };

  useEffect(() => {
    async function getCities() {
      try {
        let { data, error } = await supabase.from("cities").select("*");
        setCities(data)
      } catch (error) {
        console.log(error);
      }
    }
    getCities();
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-4 pt-12">
        {/* Header */}
        <View className="items-center mb-8">
          <Text className="text-2xl font-bold text-gray-800 mt-6">
            Find Events Near You
          </Text>
          <Text className="text-gray-500 text-center mt-2">
            Discover amazing events happening in your city
          </Text>
        </View>

        {/* Search Input */}
        <View className="mb-6">
          <View className="flex-row items-center bg-gray-50 rounded-xl px-4 border border-gray-200">
            <Ionicons name="location" size={24} color="#3B82F6" />
            <TextInput
              className="flex-1 py-4 px-3 text-gray-800"
              placeholder="Enter your city"
              value={city}
              onChangeText={handleSearch}
            />
            {city.length > 0 && (
              <TouchableOpacity onPress={() => handleSearch("")}>
                <Ionicons name="close-circle" size={24} color="#9CA3AF" />
              </TouchableOpacity>
            )}
          </View>

          {/* City Suggestions */}
          {suggestions.length > 0 && (
            <View className="bg-white rounded-xl mt-2 shadow-sm border border-gray-100">
              {suggestions.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  className={`px-4 py-3 flex-row items-center ${
                    index !== suggestions.length - 1
                      ? "border-b border-gray-100"
                      : ""
                  }`}
                  onPress={() => handleCitySelect(item.cityname)}
                >
                  <Ionicons name="location-outline" size={20} color="#6B7280" />
                  <Text className="text-gray-800 ml-3">{item.cityname}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Popular Cities */}
        <View>
          <Text className="text-lg font-semibold text-gray-800 mb-3">
            Popular Cities
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {CITIES.slice(0, 4).map((item, index) => (
              <TouchableOpacity
                key={index}
                className="bg-blue-50 px-4 py-2 rounded-full"
                onPress={() => handleCitySelect(item.cityname)}
              >
                <Text className="text-blue-600">{item.cityname}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Next Button */}
        <TouchableOpacity
          className={`absolute bottom-8 right-8 w-14 h-14 rounded-full justify-center items-center shadow-lg ${
            city.trim() ? "bg-blue-500" : "bg-gray-300"
          }`}
          onPress={handleNext}
          disabled={!city.trim()}
        >
          <Ionicons name="arrow-forward" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
