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
export default function Add() {
  const [image, setImage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [city, setCity] = useState("");
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
          },
        ])
        .select();
      console.log(data, error);
      setShowStartTime(false);
      setShowEndTime(false);
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
  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1">
        <View className="mx-3 flex flex-col gap-y-2">
          <TextInput
            placeholder="Enter Event Name"
            className="bg-gray-300 p-2 rounded-lg"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            placeholder="Enter City"
            className="bg-gray-300 p-2 rounded-lg"
            value={city}
            onChangeText={setCity}
          />
          <TextInput
            placeholder="Enter Description"
            multiline={true}
            numberOfLines={10}
            value={desc}
            onChangeText={setDesc}
            className="bg-gray-300 p-2 rounded-lg  text-start"
            style={{
              height: 130,
              textAlignVertical: "top",
            }}
          />
          {image && (
            <Image source={{ uri: image }} className="w-full h-44 rounded-lg" />
          )}
          <TouchableOpacity
            className="bg-gray-400 p-2 rounded-lg py-3"
            onPress={openCamera}
          >
            <Text className="text-white self-center text-[17px]">
              {id ? "Update Event Image" : "Upload Event Image"}
            </Text>
          </TouchableOpacity>
          <View className="flex flex-row justify-around items-center">
            <TouchableOpacity
              onPress={handleShowPicker}
              className="bg-gray-400 p-2 rounded-lg py-3 px-5"
            >
              <Text className="text-white self-center text-[17px]">
                Start Date
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleEndPicker}
              className="bg-gray-400 p-2 rounded-lg py-3 px-5"
            >
              <Text className="text-white self-center text-[17px]">
                End Date
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex flex-row justify-around items-center">
            {startDate && id && <Text>{startDate}</Text>}
            {endDate && id && <Text>{startDate}</Text>}
          </View>
          <View className="flex flex-row justify-around items-center">
            {showstarttime && (
              <DateTimePickerComponent
                onDateTimeChange={handleDateTimeChange}
              />
            )}
            {showEndTime && (
              <DateTimePickerComponent onDateTimeChange={handleEndDate} />
            )}
          </View>
          <TouchableOpacity
            className="bg-gray-400 p-2 rounded-lg py-3 px-5"
            onPress={() => {
              if (id) {
                UpdateEventData();
              } else {
                UploadEventData();
              }
            }}
          >
            <Text className="text-white self-center text-[18px]">Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
