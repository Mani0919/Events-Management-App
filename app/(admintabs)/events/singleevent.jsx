import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [comment, setComment] = useState([]);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      SingleEvent();
    }, [id])
  );

  async function SingleEvent() {
    try {
      setLoading(true);
      let { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id);

      if (error) throw error;

      if (data && data.length > 0) {
        setEventdata(data[0]);
        // Safely access comments
        if (data[0]?.comments?.comments) {
          setComment(data[0].comments.comments);
        } else {
          setComment([]); // Set empty array if no comments
        }
      }
    } catch (error) {
      console.log('Error fetching event:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async () => {
    try {
      const { error } = await supabase.from("events").delete().eq("id", id);
      if (error) throw error;
      
      // Navigate back after successful deletion
      router.back();
    } catch (error) {
      console.log('Error deleting event:', error);
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
            {eventData?.photo && (
              <Image
                source={{ uri: eventData.photo }}
                className="w-full h-64 object-cover rounded-2xl"
              />
            )}
          </View>

          {/* Event Details */}
          <View className="mx-4 mt-4">
            <Text className="text-2xl font-semibold text-gray-800">
              {eventData?.eventname || 'Untitled Event'}
            </Text>

            {/* Location */}
            {(eventData?.location || eventData?.city) && (
              <View className="flex-row items-center mt-2">
                <Ionicons name="location-sharp" size={20} color="#4b5563" />
                <Text className="text-base text-gray-600 ml-1">
                  {eventData.location}{eventData.city ? ` (${eventData.city})` : ''}
                </Text>
              </View>
            )}

            {/* Description */}
            {eventData?.desc && (
              <Text className="text-base text-gray-700 mt-3 leading-6">
                {eventData.desc}
              </Text>
            )}

            {/* Comments Section */}
            <View className="mt-6">
              <Text className="text-xl font-semibold text-gray-800 mb-4">
                Comments
              </Text>

              {/* Comments List */}
              <View className="w-full max-w-3xl mx-auto">
                {loading ? (
                  <View className="flex items-center justify-center py-8">
                    <ActivityIndicator size="large" className="text-gray-600" />
                  </View>
                ) : (
                  <View className="space-y-6 mb-20">
                    {comment.map((item, index) => (
                      <View
                        key={index}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                      >
                        {/* Comment Header */}
                        <View className="p-4 bg-gray-50 border-b border-gray-100">
                          <View className="flex-row justify-between items-center">
                            <View className="flex-row items-center space-x-2">
                              <View className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                                <Text className="text-sm font-medium text-gray-600">
                                  {item?.author ? item.author[0].toUpperCase() : '?'}
                                </Text>
                              </View>
                              <View>
                                <Text className="font-semibold text-gray-800">
                                  {item?.author || 'Anonymous'}
                                </Text>
                                <Text className="text-xs text-gray-500">
                                  {formatTimeAgo(item?.timestamp)}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>

                        {/* Comment Body */}
                        <View className="p-4">
                          {item?.message && (
                            <Text className="text-gray-600 font-medium mb-2">
                              {item.message}
                            </Text>
                          )}
                          <Text className="text-gray-700 leading-relaxed">
                            {item?.text || ''}
                          </Text>
                        </View>
                      </View>
                    ))}

                    {(!comment || comment.length === 0) && (
                      <View className="py-3 text-center">
                        <Text className="text-gray-500">
                          No comments yet!
                        </Text>
                      </View>
                    )}
                  </View>
                )}
              </View>
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