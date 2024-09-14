import { useColorScheme } from "@/hooks/useColorScheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

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
