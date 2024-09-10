import React from "react";
import { Slot } from "expo-router";
import {
  useFonts,
  Urbanist_400Regular,
  Urbanist_700Bold,
} from "@expo-google-fonts/urbanist";
import AppLoading from "expo-app-loading";

export default function App() {
  const [fontsLoaded] = useFonts({
    Urbanist_400Regular,
    Urbanist_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return <Slot />; // The Slot component loads the routes defined in app/
}
