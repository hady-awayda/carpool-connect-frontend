import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, John</Text>
      <Text style={styles.subtitle}>Upcoming Schedule</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    paddingBottom: Platform.OS === "android" ? 50 : 0,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    marginTop: 40,
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
});
