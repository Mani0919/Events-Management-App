import React, { useEffect, useState, useRef } from "react";
import {
  View, Text, ScrollView, Image, TouchableOpacity,
  Animated, Dimensions, RefreshControl, StatusBar, Share
} from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../../utlis/supabase";

const { width } = Dimensions.get('window');

export default function Wishlist({ navigation }) {
  const [eventdata, setEventdata] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", "Upcoming", "This Month", "Later"];

  const getWishlist = async () => {
    try {
      const userEmail = await AsyncStorage.getItem("userEmail");
      if (!userEmail) return;

      const { data, error } = await supabase
        .from("users")
        .select("wishlist")
        .eq("email", userEmail)
        .single();
      console.log("wishlist data",data)
      if (error) return;

      if (data?.wishlist) {
        const eventIds = data.wishlist.map((item) => item.eventid);
        const { data: events } = await supabase
          .from("events")
          .select("*")
          .in("id", eventIds);

        setEventdata(events || []);
      }
    } catch (error) {
      console.error("Error in getWishlist:", error);
    }
  };

  const handleRemoveFromWishlist = async (eventId) => {
    try {
      const userEmail = await AsyncStorage.getItem("userEmail");
      if (!userEmail) {
        console.log("No user email found");
        return;
      }

      // First, fetch current wishlist
      const { data: userData, error: fetchError } = await supabase
        .from("users")
        .select("wishlist")
        .eq("email", userEmail)
        .single();

      if (fetchError) {
        console.error("Error fetching wishlist:", fetchError);
        return;
      }

      // Log the current wishlist
      console.log("Current wishlist:", userData.wishlist);

      // Ensure wishlist exists and is an array
      const currentWishlist = userData.wishlist || [];

      // Create new wishlist array without the event
      const updatedWishlist = currentWishlist.filter(item => 
        item.eventid.toString() !== eventId.toString()
      );

      // Log the wishlist after filtering
      console.log("Filtered wishlist:", updatedWishlist);

      // Update the database with just the wishlist field
      const { data, error: updateError } = await supabase
        .from("users")
        .update({ wishlist: updatedWishlist })
        .eq("email", userEmail);

      if (updateError) {
        console.error("Error updating wishlist:", updateError);
        return;
      }

      // Update local state
      setEventdata(prevData => prevData.filter(event => event.id !== eventId));
      
      // Force refresh the wishlist data
      await getWishlist();

      console.log("Successfully removed from wishlist");

    } catch (error) {
      console.error("Error in handleRemoveFromWishlist:", error);
    }
};

  const EventCard = ({ event, index }) => {
    const slideAnim = useRef(new Animated.Value(50)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 500,
          delay: index * 100,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          delay: index * 100,
          useNativeDriver: true,
        })
      ]).start();
    }, []);

    return (
      <Animated.View 
        style={{
          opacity: fadeAnim,
          transform: [{ translateX: slideAnim }]
        }}
        className="bg-white rounded-2xl shadow-lg mb-4 overflow-hidden"
      >
        <TouchableOpacity 
          onPress={() => navigation.navigate('EventDetail', { event })}
          className="flex-1"
        >
          <Image
            source={{ uri: event.photo }}
            className="w-full h-56 object-cover"
          />
          <View className="p-4">
            <View className="flex-row justify-between items-start">
              <View className="flex-1">
                <Text className="text-2xl font-bold text-gray-800 mb-2">
                  {event.eventname}
                </Text>
                <View className="flex-row items-center mb-3">
                  <MaterialIcons name="location-on" size={18} color="#6B7280" />
                  <Text className="text-gray-600 ml-2 text-base">
                    {event.location}, {event.city}
                  </Text>
                </View>
              </View>
              <View className="bg-blue-100 px-3 py-1 rounded-full">
                <Text className="text-blue-600 font-medium">
                  {getDaysUntilEvent(event.startdate)}
                </Text>
              </View>
            </View>
            <View className="flex-row items-center mb-4">
              <MaterialIcons name="event" size={18} color="#6B7280" />
              <Text className="text-gray-600 ml-2 text-base">
                {formatDate(event.startdate)} - {formatDate(event.enddate)}
              </Text>
            </View>
            <TouchableOpacity 
              className="mt-2 bg-red-500 py-3 rounded-xl flex-row items-center justify-center"
              onPress={() => handleRemoveFromWishlist(event.id)}
            >
              <MaterialIcons name="remove-circle-outline" size={20} color="white" />
              <Text className="text-white font-semibold ml-2">Remove</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysUntilEvent = (startDate) => {
    const days = Math.ceil((new Date(startDate) - new Date()) / (1000 * 60 * 60 * 24));
    if (days < 0) return 'Past';
    if (days === 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    return `${days} days to go`;
  };

  const filterEvents = (category) => {
    const now = new Date();
    switch(category) {
      case 'Upcoming':
        return eventdata.filter(event => {
          const eventDate = new Date(event.startdate);
          return eventDate >= now; // Show all future events
        });
      case 'This Month':
        return eventdata.filter(event => 
          new Date(event.startdate).getMonth() === now.getMonth());
      case 'Later':
        return eventdata.filter(event => 
          new Date(event.startdate) > new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000));
      default:
        return eventdata;
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" />
      <View className="bg-white pt-12 pb-4 px-4 shadow-sm">
        <Text className="text-3xl font-bold text-gray-800">My Wishlist</Text>
        <Text className="text-gray-500 mt-1">{eventdata.length} saved events</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="mt-4"
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => setSelectedCategory(category)}
              className={`mr-3 px-4 py-2 rounded-full ${
                selectedCategory === category ? 'bg-blue-500' : 'bg-gray-200'
              }`}
            >
              <Text className={
                selectedCategory === category ? 'text-white font-medium' : 'text-gray-600'
              }>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView 
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getWishlist} />
        }
      >
        {filterEvents(selectedCategory).map((event, index) => (
          <EventCard key={event.id} event={event} index={index} />
        ))}
        
        {eventdata.length === 0 && (
          <View className="flex-1 items-center justify-center py-20">
            <FontAwesome5 name="calendar-times" size={70} color="#D1D5DB" />
            <Text className="text-gray-500 text-xl font-medium mt-6">
              No events in your wishlist
            </Text>
            <TouchableOpacity 
              className="mt-8 bg-blue-500 px-6 py-3 rounded-xl"
              // onPress={() => navigation.navigate('Explore')}
            >
              <Text className="text-white font-semibold">Explore Events</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}