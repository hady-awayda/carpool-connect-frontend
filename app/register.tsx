import { router } from "expo-router";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";

export default function SignupScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create account</Text>

      {/* Input Fields */}
      <TextInput style={styles.input} placeholder="Full Name" />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
      />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
      />

      {/* Register Buttons */}
      <TouchableOpacity
        style={styles.registerButtonPassenger}
        onPress={() => {
          router.push("/FrequentCommuter");
        }}
      >
        <Text style={styles.registerButtonPassengerText}>Register</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>or</Text>

      <TouchableOpacity
        style={styles.registerButtonRider}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.registerButtonRiderText}>Login</Text>
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
    fontFamily: "Urbanist_700Bold",
    fontSize: 28,
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
  registerButtonPassenger: {
    backgroundColor: "#333",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    width: "100%",
    marginBottom: 15,
  },
  registerButtonRider: {
    borderColor: "#333",
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    width: "100%",
    marginBottom: 20,
  },
  registerButtonPassengerText: {
    fontFamily: "Urbanist_700Bold",
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  registerButtonRiderText: {
    fontFamily: "Urbanist_700Bold",
    color: "#000",
    fontSize: 16,
    textAlign: "center",
  },
  orText: {
    fontFamily: "Urbanist_400Regular",
    color: "#666",
    marginBottom: 10,
  },
});
