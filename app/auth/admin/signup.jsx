import { View, Text, TextInput, Button, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../../../utlis/supabase";

export default function SignOut() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const handleSubmit = async () => {
    try {
      let { data, error } = await supabase.from("Admin").select("*");
      console.log(data);
      if (data.length > 0) {
        let { data, error } = await supabase
          .from("Admin")
          .select("*")
          .eq("Email", Email);
        if (data.length === 0) {
          const { data, error } = await supabase
            .from("Admin")
            .insert([
              {
                Name: Name,
                Email: Email,
                password: Password,
                AdminType: "default",
                isAdmin: true,
              },
            ])
            .select();
          console.log(data);
        } else {
          Alert.alert("Admin Already Exist");
        }
      } else {
        const { data, error } = await supabase
          .from("Admin")
          .insert([
            {
              Name: Name,
              Email: Email,
              password: Password,
              AdminType: "hero",
              isAdmin: true,
            },
          ])
          .select();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView>
      <View>
        <TextInput
          placeholder="Enter Name"
          value={Name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="Enter Email"
          value={Email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Enter Password"
          value={Password}
          onChangeText={setPassword}
        />
      </View>
      <Button title="Submit" onPress={handleSubmit} />
    </SafeAreaView>
  );
}
