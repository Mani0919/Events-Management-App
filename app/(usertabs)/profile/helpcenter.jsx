import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const HelpSection = ({ title, icon, onPress }) => (
  <TouchableOpacity 
    className="bg-white p-4 rounded-xl mb-4 flex-row items-center justify-between"
    onPress={onPress}
  >
    <View className="flex-row items-center space-x-3">
      <View className="w-10 h-10 bg-blue-50 rounded-full items-center justify-center">
        <Ionicons name={icon} size={24} color="#3B82F6" />
      </View>
      <Text className="text-gray-800 text-lg font-medium">{title}</Text>
    </View>
    <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
  </TouchableOpacity>
);

const FaqItem = ({ question, answer }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <TouchableOpacity 
      className="bg-white p-4 rounded-xl mb-3"
      onPress={() => setExpanded(!expanded)}
    >
      <View className="flex-row justify-between items-center">
        <Text className="text-gray-800 font-medium flex-1 pr-4">{question}</Text>
        <Ionicons name={expanded ? "chevron-up" : "chevron-down"} size={20} color="#9CA3AF" />
      </View>
      {expanded && (
        <Text className="text-gray-600 mt-3">{answer}</Text>
      )}
    </TouchableOpacity>
  );
};

export default function HelpCenter() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      question: "How can I find events in my city?",
      answer: "Use the city map feature to view all events in your area. Events are highlighted with markers, and you can tap on them for more details."
    },
    {
      question: "How do I get more information about an event?",
      answer: "Click on any event to view its full details, including date, time, location, description, and organizer information."
    },
    {
      question: "Can I share events with friends?",
      answer: "Yes! On any event page, use the share button to send event details via message, email, or social media."
    },
    {
      question: "How do I use the map feature?",
      answer: "Open the map view to see all events marked in your city. Zoom in/out to explore different areas, and tap on markers to see event previews."
    }
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-4 pt-6">
        {/* Search Bar */}


   

        {/* FAQs Section */}
        <Text className="text-xl font-bold text-gray-800 mb-4">Frequently Asked Questions</Text>
        <View className="mb-6">
          {faqs.map((faq, index) => (
            <FaqItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </View>

        {/* Support Contact */}
        <View className="bg-blue-50 p-6 rounded-xl mb-8">
          <Text className="text-lg font-bold text-gray-800 mb-2">Need more help?</Text>
          <Text className="text-gray-600 mb-4">Our team is here to assist you</Text>
          <TouchableOpacity 
            className="bg-blue-500 py-3 rounded-lg"
            onPress={() => router.push("/(usertabs)/profile/contact")}
          >
            <Text className="text-white text-center font-semibold">Contact Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}