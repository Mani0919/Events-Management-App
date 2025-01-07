import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  Modal,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import { supabase } from "../../utlis/supabase";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";

const AdminControl = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [admintype,setAdminType]=useState("")
  useFocusEffect(
    useCallback(() => {
      checkAccess();
      getAdmins();
    }, [])
  );

  async function checkAccess() {
    try {
      const res = await AsyncStorage.getItem("adminEmail");
      let { data, error } = await supabase
        .from("Admin")
        .select("*")
        .eq("Email", res);

      if (error) throw error;
      setAdminType(data[0].AdminType)
      if (data[0].AdminType !== "hero") {
        Alert.alert("Access Denied", "You don't have permission to access this page");
        router.back();
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to verify access");
      router.back();
    }
  }

  async function getAdmins() {
    try {
      setLoading(true);
      let { data, error } = await supabase.from("Admin").select("*");
      if (error) throw error;
      // Remove the first admin from the list
      const filteredData = data.slice(1);
      setData(filteredData);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to fetch admin list");
    } finally {
      setLoading(false);
    }
  }

  async function updateAdminStatus(newStatus) {
    try {
      const { error } = await supabase
        .from("Admin")
        .update({ AdminType: newStatus })
        .eq("id", selectedAdmin.id);

      if (error) throw error;

      Alert.alert("Success", "Admin status updated successfully");
      getAdmins();
      setShowStatusModal(false);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to update admin status");
    }
  }

  const StatusModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showStatusModal}
      onRequestClose={() => setShowStatusModal(false)}
    >
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-white rounded-t-3xl p-6">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-xl font-semibold">Change Admin Status</Text>
            <TouchableOpacity onPress={() => setShowStatusModal(false)}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>
          
          {["hero", "admin", "default"].map((status) => (
            <TouchableOpacity
              key={status}
              className="py-4 px-6 bg-gray-50 rounded-xl mb-3 flex-row justify-between items-center"
              onPress={() => updateAdminStatus(status)}
            >
              <Text className="text-lg capitalize">{status}</Text>
              <MaterialIcons name="arrow-forward-ios" size={20} color="#666" />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1">
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-4 py-6 shadow-sm">
        <Text className="text-2xl font-bold">Admin Control</Text>
        <Text className="text-gray-500 mt-1">Manage admin permissions</Text>
      </View>

      {/* Admin List */}
      <ScrollView className="flex-1 px-4 pt-4">
        {data.map((admin) => (
          <View 
            key={admin.id} 
            className="bg-white p-4 rounded-xl mb-4 shadow-sm"
          >
            <View className="flex-row justify-between items-start">
              <View className="flex-1">
                <Text className="text-lg font-semibold">{admin.Name || 'N/A'}</Text>
                <Text className="text-gray-500 mt-1">{admin.Email}</Text>
                <View className="flex-row items-center mt-2">
                  <View className="bg-blue-100 px-3 py-1 rounded-full">
                    <Text className="text-blue-700 capitalize">
                      {admin.AdminType}
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                className="bg-gray-100 px-4 py-2 rounded-lg"
                onPress={() => {
                  setSelectedAdmin(admin);
                  setShowStatusModal(true);
                }}
              >
                <Text className="text-gray-700">Change Status</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Status Change Modal */}
      <StatusModal />
    </View>
    </SafeAreaView>

  );
};

export default AdminControl;