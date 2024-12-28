import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { supabase } from "../../../utlis/supabase";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import DeleteConfirmationModal from "../../../ui/deletemodal";
export default function Singleevent() {
  const { id } = useLocalSearchParams();
  const [eventData, setEventdata] = useState({});
  const [showdeletemodal, setShowdeletemodal] = useState(false);
  const date = new Date();
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
    <SafeAreaView className="flex-1">
      <View className="flex-1">
        <View className="flex flex-row justify-end items-end gap-x-2 p-3">
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: "/(admintabs)/events/addupdateevent",
                params: { id: id },
              });
            }}
          >
            <Feather name="edit-3" size={25} color="blue" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowdeletemodal(true)}>
            <AntDesign name="delete" size={24} color="red" />
          </TouchableOpacity>
        </View>
        <View className="mx-4 rounded-xl">
          <Image
            source={{ uri: eventData?.photo }}
            className="w-full h-52 object-cover rounded-xl"
          />
        </View>
        <View className="mx-3 p-2 flex flex-col gap-y-1">
          <Text className="text-[17px]">{eventData.eventname}</Text>
          <Text className="text-[14px]">{eventData.city} (city)</Text>
          <Text className="text-[14px]">{eventData.desc}</Text>
        </View>
        <DeleteConfirmationModal
          visible={showdeletemodal}
          onClose={() => setShowdeletemodal(false)}
          onConfirm={handleDelete}
        />
      </View>
    </SafeAreaView>
  );
}
