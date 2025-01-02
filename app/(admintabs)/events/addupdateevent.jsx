import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
// import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import DateTimePickerComponent from "../../../ui/datetimepicker";
import { supabase } from "../../../utlis/supabase";
import { useLocalSearchParams } from "expo-router";
import { MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";
export default function Add() {
  const [image, setImage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [disabletime, setDisabletime] = useState("");
  const { id } = useLocalSearchParams();
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera permissions to make this work!");
      }
    })();
  }, []);
  const openCamera = async () => {
    try {
      // Open Image Picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      // If user selects an image
      if (!result.canceled) {
        const uri = result.assets[0]?.uri; // File URI
        console.log(uri);
        setImage(uri);
      }
    } catch (error) {
      console.error("Error uploading profile photo:", error.response || error);
    }
  };
  const [showstarttime, setShowStartTime] = useState(false);
  const [showEndTime, setShowEndTime] = useState(false);
  const handleDateTimeChange = (selectedDateTime) => {
    console.log("Selected:", selectedDateTime);
    setStartDate(selectedDateTime);
  };
  const handleEndDate = (selecteddate) => {
    console.log(selecteddate);
    setEndDate(selecteddate);
    const disableevnttime = new Date(
      selecteddate.getTime() + 24 * 60 * 60 * 1000
    );
    setDisabletime(disableevnttime);
    // console.log("uff", disableevnttime);
  };
  const handleShowPicker = () => {
    setShowStartTime(true);
  };
  const handleEndPicker = () => {
    setShowEndTime(true);
  };
  const UploadEventData = async () => {
    try {
      const { data, error } = await supabase
        .from("events")
        .insert([
          {
            eventname: name,
            city: city,
            desc: desc,
            startdate: startDate,
            enddate: endDate,
            disableeventtime: disabletime,
            photo: image,
            location: location,
          },
        ])
        .select();
      console.log(data, error);
      setShowStartTime(false);
      setShowEndTime(false);

      const { citydata, cityerror } = await supabase
        .from("cities")
        .insert([{ cityname: city }])
        .select();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    async function SingleEvent() {
      try {
        let { data, error } = await supabase
          .from("events")
          .select("*")
          .eq("id", id);
        console.log(data);
        setName(data[0].eventname);
        setCity(data[0].city);
        setDesc(data[0].desc);
        setStartDate(data[0].startdate);
        setEndDate(data[0].enddate);
        setImage(data[0].photo);
        setLocation(data[0].location);
      } catch (error) {
        console.log(error);
      }
    }
    SingleEvent();
  }, [id]);

  const UpdateEventData = async () => {
    try {
      const { data, error } = await supabase
        .from("events")
        .update({
          eventname: name,
          city: city,
          desc: desc,
          startdate: startDate,
          enddate: endDate,
          disableeventtime: disabletime,
          photo: image,
        })
        .eq("id", id)
        .select();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const formatTimeAgo = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }} // Added padding for tab bar
      >
        <View className="p-4 flex flex-col gap-y-4">
          {/* Form Header */}
          <Text className="text-2xl font-bold text-gray-800 mb-2">
            {id ? "Update Event" : "Create New Event"}
          </Text>

          {/* Basic Information Section */}
          <View className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <Text className="text-lg font-semibold text-gray-700 mb-4">
              Basic Information
            </Text>

            <TextInput
              placeholder="Event Name"
              className="bg-gray-100 p-4 rounded-xl mb-3 text-base"
              placeholderTextColor="#9CA3AF"
              value={name}
              onChangeText={setName}
            />

            <TextInput
              placeholder="City"
              className="bg-gray-100 p-4 rounded-xl mb-3 text-base"
              placeholderTextColor="#9CA3AF"
              value={city}
              onChangeText={setCity}
            />
            <TextInput
              placeholder="Location"
              className="bg-gray-100 p-4 rounded-xl mb-3 text-base"
              placeholderTextColor="#9CA3AF"
              value={location}
              onChangeText={setLocation}
            />
            <TextInput
              placeholder="Event Description"
              multiline={true}
              numberOfLines={10}
              value={desc}
              onChangeText={setDesc}
              className="bg-gray-100 p-4 rounded-xl text-base"
              style={{
                height: 150,
                textAlignVertical: "top",
              }}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Image Section */}
          <View className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <Text className="text-lg font-semibold text-gray-700 mb-4">
              Event Image
            </Text>

            {image && (
              <View className="bg-gray-100 rounded-xl overflow-hidden mb-4">
                <Image source={{ uri: image }} className="w-full h-48" />
              </View>
            )}

            <TouchableOpacity
              className="bg-indigo-600 p-4 rounded-xl flex-row items-center justify-center"
              onPress={openCamera}
            >
              <Ionicons
                name="camera"
                size={20}
                color="white"
                style={{ marginRight: 8 }}
              />
              <Text className="text-white font-medium text-base">
                {id ? "Update Event Image" : "Upload Event Image"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Date Selection Section */}
          <View className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <Text className="text-lg font-semibold text-gray-700 mb-4">
              Event Duration
            </Text>

            <View className="flex-row justify-between mb-4">
              <TouchableOpacity
                onPress={handleShowPicker}
                className="bg-indigo-600 py-3 px-6 rounded-xl flex-row items-center flex-1 mr-2"
              >
                <MaterialIcons
                  name="date-range"
                  size={20}
                  color="white"
                  style={{ marginRight: 8 }}
                />
                <Text className="text-white font-medium">Start Date</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleEndPicker}
                className="bg-indigo-600 py-3 px-6 rounded-xl flex-row items-center flex-1 ml-2"
              >
                <MaterialIcons
                  name="event"
                  size={20}
                  color="white"
                  style={{ marginRight: 8 }}
                />
                <Text className="text-white font-medium">End Date</Text>
              </TouchableOpacity>
            </View>

            {/* Selected Dates Display */}
            {(startDate || endDate) && id && (
              <View className="flex-row justify-between bg-gray-100 p-3 rounded-xl">
                <View className="flex-row items-center">
                  <FontAwesome5
                    name="calendar-day"
                    size={16}
                    color="#4B5563"
                    style={{ marginRight: 6 }}
                  />
                  <Text className="text-gray-600">
                    {formatTimeAgo(startDate)}
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <FontAwesome5
                    name="calendar-check"
                    size={16}
                    color="#4B5563"
                    style={{ marginRight: 6 }}
                  />
                  <Text className="text-gray-600">
                    {formatTimeAgo(endDate)}
                  </Text>
                </View>
              </View>
            )}

            {/* Date Picker Components */}
            <View className="flex-row justify-between">
              {showstarttime && (
                <DateTimePickerComponent
                  onDateTimeChange={handleDateTimeChange}
                />
              )}
              {showEndTime && (
                <DateTimePickerComponent onDateTimeChange={handleEndDate} />
              )}
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            className="bg-indigo-600 p-4 rounded-xl shadow-sm"
            onPress={() => (id ? UpdateEventData() : UploadEventData())}
          >
            <Text className="text-white text-center font-semibold text-lg">
              {id ? "Update Event" : "Create Event"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
