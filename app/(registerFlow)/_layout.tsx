import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="frequent-commuter"
          options={{
            title: "Welcome",
            animation: "slide_from_right",
            headerBackButtonMenuEnabled: false,
          }}
        />
        <Stack.Screen
          name="how-often"
          options={{
            title: "Welcome",
            animation: "slide_from_right",
            headerBackButtonMenuEnabled: false,
          }}
        />
        <Stack.Screen
          name="user-address"
          options={{
            title: "Welcome",
            animation: "slide_from_right",
            headerBackButtonMenuEnabled: false,
          }}
        />
        <Stack.Screen
          name="car-owner"
          options={{
            title: "Welcome",
            animation: "slide_from_right",
            headerBackButtonMenuEnabled: false,
          }}
        />
        <Stack.Screen
          name="car-details"
          options={{
            title: "Welcome",
            animation: "slide_from_right",
            headerBackButtonMenuEnabled: false,
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
