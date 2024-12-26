import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import Login from "./app/auth";
import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { supabase } from "./utlis/supabase";

export default function App() {
  const handleOut = async () => {
    try {
      const res=await supabase.auth.signOut()
      console.log(res)
    } catch (error) {
      
    }
  }
  return (
    <View style={styles.container}>
      <Login />
      <Button title="Logout" onPress={handleOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
