import BottomContent from "@/components/homeScreenComponents/BottomContent";
import MapComponent from "@/components/homeScreenComponents/MapComponent";
import SheetComponent from "@/components/homeScreenComponents/SheetComponent";
import { setDeparture, setLocation } from "@/data/redux/addressListSlice/slice";
import { RootState } from "@/data/redux/store";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const { height } = Dimensions.get("window");

const HomeScreen = () => {
  const departure = useSelector((state: RootState) => state.address.departure);
  const dispatch = useDispatch();
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [isSelectingLocation, setIsSelectingLocation] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});

      const coords = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.004,
        longitudeDelta: 0.004,
      };

      let name = "Unknown Location";

      try {
        let [address] = await Location.reverseGeocodeAsync({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        });

        name =
          address.city || address.region || address.name || "Unknown Location";
      } catch (error) {
        console.error("Error in reverse geocoding:", error);
      }

      dispatch(setLocation({ name, coords }));

      !departure.name && dispatch(setDeparture({ name, coords }));
    })();
  }, [dispatch]);

  const showRouteSheet = () => {
    setIsAnimationComplete(false);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300,
      easing: Easing.bezier(0.42, 0, 0.58, 1),
      useNativeDriver: true,
    }).start(() => {
      setIsAnimationComplete(true);
    });
  };

  const closeRouteSheet = () => {
    setIsAnimationComplete(false);
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 300,
      easing: Easing.bezier(0.42, 0, 0.58, 1),
      useNativeDriver: true,
    }).start(() => {
      Keyboard.dismiss();
    });
  };

  const sheetTranslateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-height, -height * 0.704],
  });

  const bottomContentTranslateUp = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [height * 0.66, height * 0.194],
  });

  const bottomContentTranslateDown = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [height * 0.66, height * 0.194],
  });

  const setMapLocation = (focusedField: "departure" | "destination") => {
    if (focusedField === "departure") {
      console.log(focusedField);
      closeRouteSheet();
      setIsSelectingLocation(true);
      // setDeparture(value);
    } else if (focusedField === "destination") {
      console.log(focusedField);
      closeRouteSheet();
      setIsSelectingLocation(true);
      // setDestination(value);
    }
  };

  return (
    <TouchableOpacity activeOpacity={1} style={styles.container}>
      <StatusBar style="auto" />

      <MapComponent />

      <Animated.View
        style={[
          styles.sheetContainer,
          { transform: [{ translateY: sheetTranslateY }] },
        ]}
      >
        <SheetComponent
          {...{
            closeRouteSheet,
            setMapLocation,
            isAnimationComplete,
          }}
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.bottomContentContainer,
          { transform: [{ translateY: bottomContentTranslateUp }] },
        ]}
      >
        <BottomContent showRouteSheet={showRouteSheet} />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  map: {
    flex: 1,
  },
  sheetContainer: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    zIndex: 2,
  },
  bottomContentContainer: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    zIndex: 1,
  },
});

export default HomeScreen;
