import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function CarOwnerScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Are you a car owner?</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/CarDetailsScreen")}
      >
        <Text style={styles.buttonText}>Yes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/CarpoolWithSmokersScreen")}
      >
        <Text style={styles.buttonText}>No</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 100,
  },
  button: {
    backgroundColor: "#333",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    width: "100%",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  backButton: {
    borderColor: "#333",
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    width: "100%",
    marginTop: 20,
  },
  backButtonText: {
    color: "#333",
    fontSize: 16,
    textAlign: "center",
  },
});
