import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../../utlis/supabase";

const ContactSupport = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (
      !subject.trim() ||
      !message.trim() ||
      !phone.trim() ||
      !username.trim()
    ) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from("support")
        .insert([{ name: username, phone: phone,subject:subject,desc:message }])
        .select();
        console.log(data)
      if (error) throw error;

      Alert.alert(
        "Success",
        "Your message has been sent. We will contact you soon.",
        [
          {
            text: "OK",
            onPress: () => {
              setSubject("");
              setMessage("");
              setPhone("");
              setUsername("");
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert("Error", "Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        <View className="mb-8">
          <Text className="text-3xl font-bold text-gray-800">
            Contact Support
          </Text>
          <Text className="text-gray-500 mt-2">
            We're here to help. Send us a message and we'll respond as soon as
            possible.
          </Text>
        </View>

        <View className="bg-white p-6 rounded-2xl shadow-sm mb-6">
          <View className="mb-6">
            <Text className="text-gray-700 font-semibold mb-2">Username</Text>
            <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3">
              <MaterialIcons name="person" size={20} color="#6B7280" />
              <TextInput
                className="flex-1 ml-3 text-gray-700"
                placeholder="Enter your username"
                value={username}
                onChangeText={setUsername}
              />
            </View>
          </View>

          <View className="mb-6">
            <Text className="text-gray-700 font-semibold mb-2">
              Phone Number
            </Text>
            <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3">
              <MaterialIcons name="phone" size={20} color="#6B7280" />
              <TextInput
                className="flex-1 ml-3 text-gray-700"
                placeholder="Enter your phone number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                maxLength={10}
              />
            </View>
          </View>

          <View className="mb-6">
            <Text className="text-gray-700 font-semibold mb-2">Subject</Text>
            <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3">
              <MaterialIcons name="subject" size={20} color="#6B7280" />
              <TextInput
                className="flex-1 ml-3 text-gray-700"
                placeholder="What's your issue about?"
                value={subject}
                onChangeText={setSubject}
              />
            </View>
          </View>

          <View>
            <Text className="text-gray-700 font-semibold mb-2">Message</Text>
            <View className="border border-gray-200 rounded-xl p-4">
              <TextInput
                className="text-gray-700"
                placeholder="Describe your issue in detail..."
                multiline
                numberOfLines={6}
                textAlignVertical="top"
                value={message}
                onChangeText={setMessage}
              />
            </View>
          </View>
        </View>

        <TouchableOpacity
          className={`${
            isSubmitting ? "bg-blue-400" : "bg-blue-500"
          } py-4 rounded-xl`}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Text className="text-white text-center font-semibold text-lg">
            {isSubmitting ? "Sending..." : "Send Message"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ContactSupport;
