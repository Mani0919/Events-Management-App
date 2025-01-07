import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../utlis/supabase";
import { MaterialIcons } from '@expo/vector-icons';

export default function SupportMessages() {
 const [data, setData] = useState([]);
 const [selectedMessage, setSelectedMessage] = useState(null);

 useEffect(() => {
   async function fetchMessages() {
     const { data: support, error } = await supabase
       .from("support")
       .select("*")
       .order('created_at', { ascending: false });
     setData(support);
   }
   fetchMessages();
 }, []);

 return (
   <ScrollView className="flex-1 bg-gray-50">
     <View className="p-6">
       <Text className="text-3xl font-bold text-gray-800 mb-6">Support Messages</Text>
       
       {data?.map((message) => (
         <TouchableOpacity
           key={message.id}
           className="bg-white rounded-2xl p-4 mb-4 shadow-sm"
           onPress={() => setSelectedMessage(selectedMessage === message.id ? null : message.id)}
         >
           <View className="flex-row justify-between items-center mb-2">
             <View className="flex-row items-center">
               <MaterialIcons name="person" size={20} color="#6B7280" />
               <Text className="text-gray-800 font-semibold ml-2">{message.name}</Text>
             </View>
             <View className={`px-3 py-1 rounded-full ${
               message.status === 'pending' ? 'bg-yellow-100' : 'bg-green-100'
             }`}>
               <Text className={
                 message.status === 'pending' ? 'text-yellow-800' : 'text-green-800'
               }>
                 {message.status}
               </Text>
             </View>
           </View>

           <View className="flex-row items-center mb-2">
             <MaterialIcons name="phone" size={18} color="#6B7280" />
             <Text className="text-gray-600 ml-2">{message.phone}</Text>
           </View>

           <Text className="text-gray-800 font-medium mb-2">{message.subject}</Text>
           
           {selectedMessage === message.id && (
             <View className="mt-2 pt-3 border-t border-gray-100">
               <Text className="text-gray-600">{message.desc}</Text>
             </View>
           )}
           
           <View className="flex-row justify-between items-center mt-2">
             <Text className="text-gray-500 text-sm">
               {new Date(message.created_at).toLocaleDateString()}
             </Text>
             <MaterialIcons 
               name={selectedMessage === message.id ? "expand-less" : "expand-more"} 
               size={24} 
               color="#6B7280" 
             />
           </View>
         </TouchableOpacity>
       ))}

       {data?.length === 0 && (
         <View className="items-center justify-center py-20">
           <MaterialIcons name="inbox" size={70} color="#D1D5DB" />
           <Text className="text-gray-500 text-xl mt-4">No support messages yet</Text>
         </View>
       )}
     </View>
   </ScrollView>
 );
}