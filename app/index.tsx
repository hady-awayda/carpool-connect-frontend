import BoldButton from "@/components/BoldButton";
import BorderedButton from "@/components/BorderedButton";
import {
  Urbanist_400Regular,
  Urbanist_700Bold,
  useFonts,
} from "@expo-google-fonts/urbanist";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "@/constants/Variables";

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

  const handleLogin = () => router.push("/login");
  const handleRegister = () => router.push("/Home");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Ride Together.{" "}
        <Text style={{ color: Colors.light.primary }}>Save.</Text> Together.
      </Text>
      <Text style={styles.subtitle}>
        Join our community to reduce traffic, save costs, and promote
        sustainability.
      </Text>
      <View style={styles.credentialsContainer}>
        <BoldButton buttonText="Login" onPress={handleLogin} />

        <BorderedButton buttonText="Register" onPress={handleRegister} />
      </View>
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
    fontWeight: "bold",
    fontSize: 28,
    textAlign: "center",
    marginBottom: 100,
    marginTop: 60,
  },
  subtitle: {
    fontFamily: "Urbanist_400Regular",
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 30,
  },
  orText: {
    fontFamily: "Urbanist_400Regular",
    color: "#666",
    marginBottom: 20,
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
