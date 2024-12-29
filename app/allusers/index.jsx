import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../../utlis/supabase";
import ImageModal from "../../ui/imageshowmodal";
import { Ionicons } from '@expo/vector-icons';
export default function index() {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    async function users() {
      try {
        let { data, error } = await supabase.from("users").select("*");
        console.log("users", data);
        setData(data);
      } catch (error) {
        console.log(error);
      }
    }
    users();
  }, []);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  useEffect(() => {
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchQuery, data]);
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Search Bar */}
      <View className="mx-4 my-3">
        <View className="flex-row items-center bg-white rounded-lg px-4 py-2 shadow-sm">
          <Ionicons name="search" size={20} color="#6B7280" />
          <TextInput
            className="flex-1 ml-2 text-base"
            placeholder="Search by name..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#6B7280"
          />
          {searchQuery !== "" && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color="#6B7280" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Header */}
      <View className="bg-indigo-600 mx-4 rounded-t-lg shadow-md">
        <View className="flex-row items-center py-3 px-4">
          <Text className="text-white text-base font-medium w-12">S.No</Text>
          <Text className="text-white text-base font-medium flex-2 w-24">
            Name
          </Text>
          <Text className="text-white text-base font-medium flex-3 w-32">
            Email
          </Text>
          <Text className="text-white text-base font-medium w-16">Photo</Text>
        </View>
      </View>

      {/* User List */}
      <ScrollView className="flex-1">
        <View className="bg-white mx-4 rounded-b-lg shadow-md">
          {filteredData.length === 0 ? (
            <View className="py-8 items-center">
              <Text className="text-gray-500 text-lg">No users found</Text>
            </View>
          ) : (
            filteredData.map((item, index) => (
              <View
                key={index}
                className="flex-row items-center py-3 px-4 border-b border-gray-100"
              >
                <Text className="text-gray-800 text-base w-12">
                  {index + 1}
                </Text>
                <Text className="text-gray-800 text-base w-24">
                  {item.name}
                </Text>
                <Text className="text-gray-800 text-base w-32">
                  {item.email.length > 15
                    ? `${item.email.slice(0, 15)}...`
                    : item.email}
                </Text>
                <TouchableOpacity
                  className="w-16"
                  onPress={() => {
                    setSelectedItem(item.photo);
                    setShowModal(true);
                  }}
                >
                  <Text className="text-indigo-600 text-base font-medium">
                    View
                  </Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* Image Modal */}
      <ImageModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        imageUrl={selectedItem}
      />
    </SafeAreaView>
  );
}
