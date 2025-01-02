import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { supabase } from "../../../utlis/supabase";
import { useAdminContext } from "../../../context/authcontext";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Feedback() {
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const router = useRouter();
  const {userProfile} = useAdminContext();
  const handleSubmit = async () => {
    if (rating === 0) {
      Alert.alert("Error", "Please select a rating");
      return;
    }
    if (description.trim().length < 10) {
      Alert.alert("Error", "Please provide more detailed feedback");
      return;
    }
    // Add your submission logic here
    try {
      const { data, error } = await supabase
        .from("testimonals")
        .insert([{ name: userProfile.name, photo: userProfile.photo, desc:description, rating: rating }])
        .select();
        console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-4 pt-6">
        {/* Header */}
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View className="mb-8">
          <Text className="text-2xl font-bold text-gray-800">
            Your Feedback
          </Text>
          <Text className="text-gray-500 mt-2">
            Help us improve your experience
          </Text>
        </View>

        {/* Rating Section */}
        <View className="bg-white p-6 rounded-xl shadow-sm mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Rate your experience
          </Text>
          <View className="flex-row justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => setRating(star)}
                className="p-2"
              >
                <Ionicons
                  name={rating >= star ? "star" : "star-outline"}
                  size={32}
                  color={rating >= star ? "#F59E0B" : "#CBD5E1"}
                />
              </TouchableOpacity>
            ))}
          </View>
          <Text className="text-center text-gray-500 mt-2">
            {rating > 0
              ? `You rated: ${rating} star${rating > 1 ? "s" : ""}`
              : "Tap to rate"}
          </Text>
        </View>

        {/* Feedback Description */}
        <View className="bg-white p-6 rounded-xl shadow-sm mb-8">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Tell us more
          </Text>
          <TextInput
            className="bg-gray-50 p-4 rounded-xl min-h-[120px] text-gray-800"
            multiline
            placeholder="Share your experience with us..."
            value={description}
            onChangeText={setDescription}
            textAlignVertical="top"
          />
          <Text className="text-gray-500 text-sm mt-2">
            Minimum 10 characters required
          </Text>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          className={`p-4 rounded-xl mb-8 ${
            rating > 0 && description.length >= 10
              ? "bg-blue-500"
              : "bg-gray-300"
          }`}
          onPress={handleSubmit}
          disabled={rating === 0 || description.length < 10}
        >
          <Text className="text-white text-center text-lg font-semibold">
            Submit Feedback
          </Text>
        </TouchableOpacity>
        </KeyboardAwareScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}
