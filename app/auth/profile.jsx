import { View, Text, Image } from "react-native";
import React, { use, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

export default function Profile() {
  const { useremail, name, photo } = useLocalSearchParams();
  useEffect(() => {
    console.log(useremail, name, photo);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image source={{ uri: photo }} style={{ width: 70, height: 70 }} />
        <Text style={{marginTop:10}}>{name}</Text>
        <Text>{useremail}</Text>
      </View>
    </SafeAreaView>
  );
}
