import { useColorScheme } from "@/hooks/useColorScheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { BackHandler } from "react-native";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );

    return () => backHandler.remove();
  }, []);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false, animation: "simple_push" }}>
        <Stack.Screen
          name="index"
          options={{
            title: "Welcome",
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="login"
          options={{
            title: "Login",
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="register"
          options={{
            title: "Sign Up",
            animation: "slide_from_right",
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
