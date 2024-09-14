import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import {
  Urbanist_200ExtraLight,
  Urbanist_300Light,
  Urbanist_400Regular,
  Urbanist_600SemiBold,
  Urbanist_700Bold,
  Urbanist_800ExtraBold,
  Urbanist_900Black,
  useFonts,
} from "@expo-google-fonts/urbanist";
import * as SplashScreen from "expo-splash-screen";
import { Provider } from "react-redux";
import { useDispatch } from "react-redux";
import { setToken } from "@/data/redux/tokenSlice/slice";
import { getToken } from "@/data/local/storage";
import store from "@/data/redux/store";
import { Stack } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded] = useFonts({
    Urbanist_200ExtraLight,
    Urbanist_300Light,
    Urbanist_400Regular,
    Urbanist_600SemiBold,
    Urbanist_700Bold,
    Urbanist_800ExtraBold,
    Urbanist_900Black,
  });

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      if (token) {
        store.dispatch(setToken(token));
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      setAppIsReady(true);
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <Stack />
      </View>
    </Provider>
  );
}
