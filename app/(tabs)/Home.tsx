import BottomContent from "@/components/homeScreenComponents/BottomContent";
import MapComponent from "@/components/homeScreenComponents/MapComponent";
import SheetComponent from "@/components/homeScreenComponents/SheetComponent";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

type LocationCoords = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

const { height } = Dimensions.get("window");

const HomeScreen = () => {
  const [location, setLocation] = useState<LocationCoords | null>(null);
  const [departure, setDeparture] = useState<string>("Fetching...");
  const [destination, setDestination] = useState<string>("");
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const destinationInputRef = useRef<TextInput>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setDeparture("Permission denied");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.004,
        longitudeDelta: 0.004,
      });

      try {
        let [address] = await Location.reverseGeocodeAsync({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        });

        if (address && address.city) {
          setDeparture(address.city);
        } else if (address && address.region) {
          setDeparture(address.region);
        } else {
          setDeparture("Unknown Location");
        }
      } catch (error) {
        console.error("Error in reverse geocoding:", error);
        setDeparture("Unknown Location");
      }
    })();
  }, []);

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

  const bottomContentTranslateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [height * 0.66, height * 0.194],
  });

  return (
    <TouchableOpacity
      onPress={closeRouteSheet}
      activeOpacity={1}
      style={styles.container}
    >
      <StatusBar style="auto" />

      {location && <MapComponent location={location} />}

      <Animated.View
        style={[
          styles.sheetContainer,
          { transform: [{ translateY: sheetTranslateY }] },
        ]}
      >
        <SheetComponent
          {...{
            closeRouteSheet,
            destination,
            setDestination,
            departure,
            setDeparture,
            isAnimationComplete,
            destinationInputRef,
            translateY: sheetTranslateY,
          }}
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.bottomContentContainer,
          { transform: [{ translateY: bottomContentTranslateY }] },
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
