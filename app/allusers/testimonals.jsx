import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../../utlis/supabase";
import { SafeAreaView } from "react-native-safe-area-context";
import StarRating from "../../ui/starrating";
export default function Testimonals() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function AllTestimonals() {
      try {
        let { data, error } = await supabase.from("testimonals").select("*");
        console.log(data);
        setData(data);
      } catch (error) {
        console.log(error);
      }
    }
    AllTestimonals();
  }, []);
  const [expandedItems, setExpandedItems] = useState({});

  const toggleDescription = (index) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle the specific item's expanded state
    }));
  };
  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1">
        {data.length > 0 &&
          data.map((item, index) => {
            const isExpanded = expandedItems[index];
            return (
              <View
                key={index}
                className="border-[0.9px] border-gray-400 p-2 mx-3 rounded-2xl py-3 px-3 mb-2"
              >
                <View className="flex flex-row justify-between items-start">
                  <View className="">
                    <Text className="text-[20px] font-bold mb-1">Review</Text>
                    {/* <Text className="mb-1 w-52">{item.desc}</Text> */}
                    <Text className="mb-1 w-52">
                      {isExpanded ? (
                        <>
                          {item.desc}
                          <TouchableOpacity
                            onPress={() => toggleDescription(index)}
                          >
                            <Text style={{ color: "blue" }}> ..less</Text>
                          </TouchableOpacity>
                        </>
                      ) : (
                        <>
                          {item.desc.slice(0, 64)}
                          {item.desc.length > 32 && (
                            <TouchableOpacity
                              onPress={() => toggleDescription(index)}
                              // className="mt-1"
                            >
                              <Text style={{ color: "blue" }}> ..more</Text>
                            </TouchableOpacity>
                          )}
                        </>
                      )}
                    </Text>
                    <Text className="text-[18px] font-semibold mb-1">
                      Rating Given
                    </Text>
                    <StarRating rating={item.rating} />
                  </View>
                  <View className="flex flex-col justify-center items-center">
                    <Image
                      source={{ uri: item?.photo }}
                      className="w-20 h-20 rounded-full"
                    />
                    <Text className="text-[15px] font-bold mt-1">{item.name}</Text>
                  </View>
                </View>
              </View>
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
}
