import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function CarpoolWithSmokersScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Do you prefer carpooling with smokers?</Text>

      {/* Yes Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/CarTemperatureScreen")}
      >
        <Text style={styles.buttonText}>Yes</Text>
      </TouchableOpacity>

      {/* No Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/CarTemperatureScreen")}
      >
        <Text style={styles.buttonText}>No</Text>
      </TouchableOpacity>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.FinishLaterText} onPress={() => router.push("/Home")}>
        Finish Later
      </Text>
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
    marginTop: 50,
    textDecorationLine: "underline",
  },
});
