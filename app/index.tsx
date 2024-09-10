import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import {
  useFonts,
  Urbanist_400Regular,
  Urbanist_700Bold,
} from "@expo-google-fonts/urbanist";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function WelcomeScreen() {
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    Urbanist_400Regular,
    Urbanist_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Ride Together. Save. Together.</Text>
      <Text style={styles.subtitle}>
        Join our community to reduce traffic, save costs, and promote
        sustainability.
      </Text>

      {/* Login Button */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Register Button */}
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => router.push("/register")}
      >
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>

      {/* Social Login Icons */}
      <Text style={styles.orText}>or login with</Text>
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="facebook" size={24} color="#3b5998" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="google" size={24} color="#db4a39" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="apple" size={24} color="#000" />
        </TouchableOpacity>
      </View>
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
    marginBottom: 20,
    marginTop: 60, // Move the title away from the other elements
  },
  subtitle: {
    fontFamily: "Urbanist_400Regular",
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 30,
  },
  loginButton: {
    backgroundColor: "#333",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    width: "100%",
    marginBottom: 15,
  },
  loginButtonText: {
    fontFamily: "Urbanist_700Bold",
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  registerButton: {
    borderColor: "#333",
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    width: "100%",
    marginBottom: 20,
  },
  registerButtonText: {
    fontFamily: "Urbanist_700Bold",
    color: "#333",
    fontSize: 16,
    textAlign: "center",
  },
  orText: {
    fontFamily: "Urbanist_400Regular",
    color: "#666",
    marginBottom: 10,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
  socialButton: {
    padding: 10,
  },
});
