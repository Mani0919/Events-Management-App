import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { supabase } from "../../../utlis/supabase";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Feather,
  AntDesign,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import DeleteConfirmationModal from "../../../ui/deletemodal";
export default function Singleevent() {
  const { id } = useLocalSearchParams();
  const [eventData, setEventdata] = useState({});
  const [showdeletemodal, setShowdeletemodal] = useState(false);
  const date = new Date();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  console.log(date);
  useFocusEffect(
    useCallback(() => {
      SingleEvent();
    }, [id])
  );

  async function SingleEvent() {
    try {
      let { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id);
      console.log(data);
      setEventdata(data[0]);
    } catch (error) {
      console.log(error);
    }
  }
  const handleDelete = async () => {
    try {
      const { error } = await supabase.from("events").delete().eq("id", id);
      console.log(error);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView className="flex-1">
          {/* Header Actions */}
          <View className="flex-row justify-end items-center gap-x-4 p-4">
            <TouchableOpacity
              className="p-2 rounded-full bg-blue-50"
              onPress={() => {
                router.push({
                  pathname: "/(admintabs)/events/addupdateevent",
                  params: { id: id },
                });
              }}
            >
              <Feather name="edit-3" size={22} color="#2563eb" />
            </TouchableOpacity>
            <TouchableOpacity
              className="p-2 rounded-full bg-red-50"
              onPress={() => setShowDeleteModal(true)}
            >
              <AntDesign name="delete" size={22} color="#dc2626" />
            </TouchableOpacity>
          </View>

          {/* Event Image */}
          <View className="mx-4 rounded-2xl shadow-lg">
            <Image
              source={{ uri: eventData?.photo }}
              className="w-full h-64 object-cover rounded-2xl"
            />
          </View>

          {/* Event Details */}
          <View className="mx-4 mt-4">
            <Text className="text-2xl font-semibold text-gray-800">
              {eventData.eventname}
            </Text>

            {/* Location */}
            <View className="flex-row items-center mt-2">
              <Ionicons name="location-sharp" size={20} color="#4b5563" />
              <Text className="text-base text-gray-600 ml-1">
                {eventData.location}({eventData.city})
              </Text>
            </View>

            {/* Description */}
            <Text className="text-base text-gray-700 mt-3 leading-6">
              {eventData.desc}
            </Text>

            {/* Comments Section */}
            <View className="mt-6">
              {/* <Text className="text-xl font-semibold text-gray-800 mb-4">
                Comments
              </Text> */}

              {/* Comment Input */}
              {/* <View className="flex-row items-center gap-x-2 mb-4">
                <TextInput
                  className="flex-1 bg-gray-50 rounded-full px-4 py-2 text-base"
                  placeholder="Add a comment..."
                  value={comment}
                  onChangeText={setComment}
                />
                <TouchableOpacity
                  className="bg-blue-500 p-2 rounded-full"
                  // onPress={handleAddComment}
                >
                  <Ionicons name="send" size={20} color="white" />
                </TouchableOpacity>
              </View> */}

              {/* Comments List */}
              {/* {loading ? (
                <ActivityIndicator size="large" color="#4b5563" />
              ) : (
                <View className="space-y-4">
                  {eventData.comments.map((item) => (
                    <View key={item.id} className="bg-gray-50 p-3 rounded-lg">
                      <View className="flex-row justify-between items-center mb-1">
                        <View className="flex-row items-center">
                          <Text className="font-medium text-gray-800">
                            {item.user}
                          </Text>
                          <Text className="text-sm text-gray-500 ml-2">
                            {item.timestamp}
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => handleDeleteComment(item.id)}
                          className="p-1"
                        >
                          <AntDesign name="delete" size={18} color="#ef4444" />
                        </TouchableOpacity>
                      </View>
                      <Text className="text-gray-700">{item.text}</Text>
                    </View>
                  ))}
                </View>
              )} */}
            </View>
          </View>

          {/* Bottom Spacing */}
          <View className="h-6" />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Delete Event Modal */}
      <DeleteConfirmationModal
        visible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </SafeAreaView>
  );
}
