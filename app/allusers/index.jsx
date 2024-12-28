import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../../utlis/supabase";
import ImageModal from "../../ui/imageshowmodal";
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
  return (
    <SafeAreaView>
      <View className="bg-gray-500 mx-2 mt-5 flex flex-row items-center rounded">
        <Text className="text-white text-lg px-2 ">S.No</Text>
        <Text className="text-white text-lg px-6 "> Name</Text>
        <Text className="text-white text-lg px-14"> Email</Text>
        <Text className="text-white text-lg px-2 ">Photo</Text>
      </View>
      <View className="bg-gray-200">
        {data.map((item, index) => {
          return (
            <View className="flex flex-row items-center  mx-2 my-1" key={index}>
              <Text className="text-lg px-2 ml-2">{index + 1}</Text>
              <Text className="text-lg px-6 "> {item.name}</Text>
              <Text className="text-lg px-3">
                {" "}
                {item.email.length > 7
                  ? `${item.email.slice(0, 12)}...`
                  : item.email}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setSelectedItem(item.photo);
                  setShowModal(true);
                }}
              >
                <Text className="text-lg px-2 text-blue-400 underline">
                  View
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
      <ImageModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        imageUrl={selectedItem}
      />
    </SafeAreaView>
  );
}
