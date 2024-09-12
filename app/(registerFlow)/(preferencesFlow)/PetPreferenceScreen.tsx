import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function PetPreferenceScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Do you mind pets in the car?</Text>

      {/* Yes Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/ChattingPreferenceScreen")}
      >
        <Text style={styles.buttonText}>Yes</Text>
      </TouchableOpacity>

      {/* No Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/ChattingPreferenceScreen")}
      >
        <Text style={styles.buttonText}>No</Text>
      </TouchableOpacity>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.FinishLaterButton}
        onPress={() => router.push("/Home")}
      >
        <Text style={styles.FinishLaterText}>Finish Later</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
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
  FinishLaterText: {
    color: "#333",
    fontSize: 16,
    textAlign: "center",
    marginTop: 16,
    marginBottom: 16,
    textDecorationLine: "underline",
  },
  FinishLaterButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    borderRadius: 5,
    width: "50%",
    marginTop: 40,
  },
});
