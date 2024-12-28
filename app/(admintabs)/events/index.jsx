import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router, useFocusEffect } from "expo-router";
import { supabase } from "../../../utlis/supabase";

export default function Index() {
  const { bottom } = useSafeAreaInsets();
  const [eventsdata, setEventsdata] = useState([]);
  useFocusEffect(
    useCallback(() => {
      fun();
    }, [])
  );
  useEffect(() => {
    fun();
  }, []);
  async function fun() {
    try {
      let { data, error } = await supabase.from("events").select("*");
      setEventsdata(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    const hours = date.getHours() % 12 || 12;
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const period = date.getHours() >= 12 ? "PM" : "AM";
    return `${day}-${month}-${year} ${hours}:${minutes} ${period}`;
  };

  return (
    <SafeAreaView className="flex-1 relative">
      <ScrollView className="flex-1">
        {eventsdata.length > 0 &&
          eventsdata.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                className="flex flex-row justify-between items-center mx-4 mb-3"
                onPress={() =>
                  router.push({
                    pathname: "/(admintabs)/events/singleevent",
                    params: { id: item.id },
                  })
                }
              >
                <View>
                  <Text className="text-[17px] font-bold">
                    {item.eventname}
                  </Text>
                  <Text className="text-[14px]">{item.city}</Text>
                  <Text className="text-[11px]">{item.desc}</Text>
                  <View className="flex flex-row items-center gap-x-2 my-1">
                    <Text className="text-[13px] font-bold">Start Date:</Text>
                    <Text className="text-[12px]">
                      {formatDate(item.startdate)}
                    </Text>
                  </View>
                  <View className="flex flex-row items-center gap-x-2 ">
                    <Text className="text-[13px] font-bold">End Date:</Text>
                    <Text className="text-[12px] ">
                      {formatDate(item.enddate)}
                    </Text>
                  </View>
                </View>
                <View className="rounded-lg">
                  <Image
                    source={{ uri: item.photo }}
                    className="w-32 h-32 rounded-lg"
                  />
                </View>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
      <TouchableOpacity
        style={{ bottom }}
        className="absolute self-end bottom-0 py-4 px-4"
        onPress={() => router.push("/events/addupdateevent")}
      >
        <AntDesign name="pluscircle" size={40} color="gray" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
