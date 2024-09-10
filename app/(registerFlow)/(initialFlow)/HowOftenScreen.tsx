import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";

export default function HowOftenScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How often do you commute?</Text>
      <TextInput style={styles.input} placeholder="Select" />

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/(registerFlow)/UserAddressScreen")}
      >
        <Text style={styles.buttonText}>Confirm</Text>
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
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  title: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 100,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 20,
    width: "100%",
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
