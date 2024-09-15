import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const LastDestinations = () => {
  return (
    <View style={styles.suggestions}>
      <View style={styles.suggestionItem}>
        <Ionicons name="airplane-outline" size={24} />
        <Text>Beirut Rafic Hariri Airport (BEY)</Text>
      </View>
      <View style={styles.suggestionItem}>
        <Ionicons name="location-outline" size={24} />
        <Text>Hamra</Text>
      </View>
      <View style={styles.suggestionItem}>
        <Ionicons name="bag-outline" size={24} />
        <Text>City Centre Beirut</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  suggestions: {
    marginTop: 20,
  },
  suggestionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
});

export default LastDestinations;
