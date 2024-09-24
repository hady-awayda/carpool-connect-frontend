import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const messagesData = [
  {
    id: "1",
    name: "Tony Khoury",
    stars: "5 Stars",
    date: "23-7-2024",
    feedback: "Very good rider, always on time and extremely polite.",
  },
  // Add more items as needed
];

export default function MessagesScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={messagesData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.messageItem}>
            <Text style={styles.messageName}>{item.name}</Text>
            <Text style={styles.messageFeedback}>
              {item.stars} - {item.feedback}
            </Text>
            <Text style={styles.messageDate}>{item.date}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  messageItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
  },
  messageName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  messageFeedback: {
    fontSize: 16,
  },
  messageDate: {
    fontSize: 14,
    color: "#666",
  },
});
