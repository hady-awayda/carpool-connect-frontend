import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";

export default function CarTemperatureScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What is your preferred car temperature?</Text>

      <TextInput style={styles.input} placeholder="Enter temperature (°C)" />

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/MusicPreferenceScreen")}
      >
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>

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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 15,
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
  FinishLaterText: {
    color: "#333",
    fontSize: 16,
    textAlign: "center",
    marginTop: 50,
    textDecorationLine: "underline",
  },
});
