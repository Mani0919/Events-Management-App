import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ContactUs() {
  const email = "manikanta555@gmail.com";
  
  const handleEmailPress = () => {
    Linking.openURL(`mailto:${email}?subject=Support Request&body=Hi,`);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-4 pt-6">
        
        <View className="items-center justify-center flex-1">
          <TouchableOpacity 
            onPress={handleEmailPress}
            className="items-center"
          >
            <View className="w-24 h-24 bg-blue-50 rounded-full items-center justify-center mb-4">
              <Ionicons name="mail" size={40} color="#3B82F6" />
            </View>
            <Text className="text-lg font-semibold text-gray-800">{email}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}