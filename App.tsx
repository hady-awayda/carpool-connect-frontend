import {
  Urbanist_400Regular,
  Urbanist_700Bold,
  useFonts,
} from "@expo-google-fonts/urbanist";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import LoginScreen from "./app/index";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded] = useFonts({
    Urbanist_400Regular,
    Urbanist_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      setAppIsReady(true);
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // Ensure the splash screen is hidden after everything is loaded
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null; // Show nothing until app is ready
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <LoginScreen />
    </View>
  );
}
