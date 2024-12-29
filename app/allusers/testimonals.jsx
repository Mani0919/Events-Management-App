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
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingVertical: 16 }}
      >
        {data.length > 0 &&
          data.map((item, index) => {
            const isExpanded = expandedItems[index];

            return (
              <View
                key={index}
                className="bg-white mx-4 mb-4 rounded-2xl shadow-sm overflow-hidden border border-gray-100"
              >
                <View className="p-4">
                  {/* Header with Image and Name */}
                  <View className="flex-row items-center mb-4">
                    <Image
                      source={{ uri: item?.photo }}
                      className="w-16 h-16 rounded-full border-2 border-gray-100"
                    />
                    <View className="ml-3">
                      <Text className="text-lg font-bold text-gray-800">
                        {item.name}
                      </Text>
                      <StarRating rating={item.rating} />
                    </View>
                  </View>

                  {/* Review Content */}
                  <View className="bg-gray-50 rounded-xl p-4">
                    <View className="flex-row items-center mb-2">
                      <Text className="text-base font-semibold text-gray-800">
                        Review
                      </Text>
                      <View className="h-1 w-1 bg-gray-400 rounded-full mx-2" />
                      <Text className="text-sm text-gray-500">
                        {/* {format(new Date(), "MMM dd, yyyy")} */}
                      </Text>
                    </View>

                    <Text className="text-gray-600 leading-6">
                      {isExpanded ? (
                        <>
                          {item.desc}
                          <TouchableOpacity
                            onPress={() => toggleDescription(index)}
                            className="ml-1"
                          >
                            <Text className="text-indigo-600 font-medium">
                              Show less
                            </Text>
                          </TouchableOpacity>
                        </>
                      ) : (
                        <>
                          {item.desc.slice(0, 150)}
                          {item.desc.length > 150 && (
                            <>
                              ...
                              <TouchableOpacity
                                onPress={() => toggleDescription(index)}
                                className="ml-1"
                              >
                                <Text className="text-indigo-600 font-medium">
                                  Show more
                                </Text>
                              </TouchableOpacity>
                            </>
                          )}
                        </>
                      )}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
}
