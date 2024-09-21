import { setToken } from "@/data/redux/tokenSlice/slice";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogoutUser = () => {
    dispatch(setToken(null));
    router.replace("/");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>Profile</Text>
      <TouchableOpacity onPress={handleLogoutUser}>
        <Text style={styles.title}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
