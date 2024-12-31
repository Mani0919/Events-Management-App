import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  Animated,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../../../utlis/supabase";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SingleEvent() {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const scrollY = useRef(new Animated.Value(0)).current;
  const [username, setUsername] = useState("");
  const [commentsdata, setCommentsdata] = useState([]);
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [300, 200],
    extrapolate: "clamp",
  });

  useFocusEffect(
    useCallback(() => {
      getEvent();
    }, [])
  );
  async function getEvent() {
    try {
      const res = await AsyncStorage.getItem("name");
      setUsername(res);
      let { data: events, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id);
      console.log(events);
      setCommentsdata(events[0].comments?.comments);
      setData(events[0]);
    } catch (error) {
      console.log(error);
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const EventHeader = () => (
    <Animated.View style={{ height: headerHeight }}>
      <Image
        source={{ uri: data.photo }}
        className="w-full h-full"
        resizeMode="cover"
      />
      <View className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
        <Text className="absolute bottom-6 left-4 text-3xl font-bold text-white">
          {data.eventname}
        </Text>
      </View>
    </Animated.View>
  );

  const EventDetails = () => (
    <View className="px-5 py-6 bg-white rounded-t-3xl -mt-4">
      <View className="flex-row items-center justify-between mb-6">
        <View className="flex-row items-center">
          <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center">
            <MaterialIcons name="event" size={24} color="#3b82f6" />
          </View>
          <View className="ml-3">
            <Text className="text-sm text-gray-500">Date</Text>
            <Text className="text-lg font-semibold">
              {formatDate(data.startdate)}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center">
          <View className="w-12 h-12 bg-red-100 rounded-full items-center justify-center">
            <MaterialIcons name="location-on" size={24} color="#ef4444" />
          </View>
          <View className="ml-3">
            <Text className="text-sm text-gray-500">{data.location}</Text>
            <Text className="text-lg font-semibold">{data.city}</Text>
          </View>
        </View>
      </View>

      <View className="mt-4">
        <Text className="text-xl font-bold mb-3">About Event</Text>
        <Text className="text-base leading-6 text-gray-700">{data.desc}</Text>
      </View>
    </View>
  );

  const CommentItem = ({ item }) => (
    <View className="mb-4 mx-4">
      <View className="flex-row items-center mb-2">
        <View className="w-10 h-10 bg-indigo-100 rounded-full items-center justify-center">
          <FontAwesome5 name="user" size={16} color="#6366f1" />
        </View>
        <View className="ml-3">
          <Text className="text-lg text-gray-500">{item.author}</Text>
          <Text className="text-xs text-gray-400">
            {formatDate(item.timestamp)}
          </Text>
        </View>
      </View>
      <View className="ml-13 bg-white p-4 rounded-2xl rounded-tl-none shadow-sm">
        <Text className="text-gray-800 text-base">{item.message}</Text>
      </View>
    </View>
  );

  const handleSubmitCommit = async () => {
    try {
      // Fetch the current comments from the `comments` column
      const { data: fetchData, error: fetchError } = await supabase
        .from("events")
        .select("comments")
        .eq("id", id)
        .single();

      if (fetchError) {
        console.error("Error fetching comments:", fetchError);
        return;
      }

      const existingComments = fetchData?.comments?.comments || [];

      // Add the new comment to the array
      const newComments = {
        author: username,
        message: newComment, // Adjust variable name for the comment text
        timestamp: new Date().toISOString(),
      };

      const updatedComments = {
        comments: [...existingComments, newComments],
      };

      // Update the `comments` column with the new array
      const { data: updateData, error: updateError } = await supabase
        .from("events")
        .update({ comments: updatedComments })
        .eq("id", id);

      if (updateError) {
        console.error("Error updating comments:", updateError);
      } else {
        console.log("Comment added successfully:", updateData);
        setNewComment("")
        setCommentsdata((prevComments) => [...prevComments, newComments]);
        await getEvent()
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <ScrollView keyboardShouldPersistTaps="handled" bounces={false}>
          <EventHeader />
          <EventDetails />
          <View className="flex-row items-center justify-between px-4 mb-2 mt-4">
            <Text className="text-xl font-bold">
              Discussions{" "}
              {commentsdata?.length > 0 ? `(${commentsdata?.length})` : ""}
            </Text>
            <View className="bg-blue-100 px-4 py-1 rounded-full">
              <Text className="text-blue-600 font-medium">Latest</Text>
            </View>
          </View>
          {commentsdata?.length > 0 &&
            commentsdata.map((item, index) => (
              <CommentItem key={index} item={item} />
            ))}
          <View className="p-4 mb-20">
            <View className="bg-white rounded-2xl shadow-lg p-2">
              <TextInput
                className="min-h-[45px] px-4 mb-2"
                value={newComment}
                onChangeText={setNewComment}
                placeholder="Share your thoughts..."
                multiline
                numberOfLines={3}
              />
              <View className="flex-row justify-end border-t border-gray-100 pt-2">
                <TouchableOpacity
                  className="bg-blue-500 px-6 py-2 rounded-full flex-row items-center"
                  onPress={handleSubmitCommit}
                >
                  <MaterialIcons name="send" size={16} color="white" />
                  <Text className="text-white font-semibold ml-1">Send</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
