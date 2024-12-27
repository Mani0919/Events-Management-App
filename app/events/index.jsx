import { View, Text, TextInput, TouchableOpacity, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
export default function Index() {
  const [image, setImage] = useState("");
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
        setImage(uri);
      }
    } catch (error) {
      console.error("Error uploading profile photo:", error.response || error);
    }
  };

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  return (
    <SafeAreaView className="flex-1">
      <View className="mx-3 flex flex-col gap-y-2">
        <TextInput
          placeholder="Enter Event Name"
          className="bg-gray-300 p-2 rounded-lg"
        />
        <TextInput
          placeholder="Enter City"
          className="bg-gray-300 p-2 rounded-lg"
        />
        <TextInput
          placeholder="Enter Description"
          multiline={true}
          numberOfLines={10}
          className="bg-gray-300 p-2 rounded-lg  text-start"
          style={{
            height: 130,
            textAlignVertical: "top",
          }}
        />
        <TouchableOpacity
          className="bg-gray-400 p-2 rounded-lg py-3"
          onPress={openCamera}
        >
          <Text className="text-white self-center text-[17px]">
            Choose the image
          </Text>
        </TouchableOpacity>
        <Button onPress={showDatepicker} title="Show date picker!" />
      <Button onPress={showTimepicker} title="Show time picker!" />
      <Text>selected: {date.toLocaleString()}</Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
      </View>
    </SafeAreaView>
  );
}
