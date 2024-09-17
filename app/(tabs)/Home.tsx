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
  const [currentLocation, setCurrentLocation] = useState<string>("Fetching...");
  const [departureCoords, setDepartureCoords] = useState<string>("");
  const [departureName, setDepartureName] = useState<string>("");
  const [destinationCoords, setDestinationCoords] = useState<string>("");
  const [destinationName, setDestinationName] = useState<string>("");
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const destinationInputRef = useRef<TextInput>(null);
  const [isSelectingLocation, setIsSelectingLocation] = useState(false);

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
          setCurrentLocation(address.city);
        } else if (address && address.region) {
          setCurrentLocation(address.region);
        } else {
          setCurrentLocation("Unknown Location");
        }
      } catch (error) {
        console.error("Error in reverse geocoding:", error);
        setCurrentLocation("Unknown Location");
      }

      currentLocation && departure === "" && setDeparture(currentLocation);
    })();
  }, [currentLocation]);

  const handleLocationSelected = async (
    location: LocationCoords,
    focusedField: "departure" | "destination"
  ) => {
    console.log("Selected location:", location);
    try {
      let [address] = await Location.reverseGeocodeAsync(location);

      if (address && address.street) {
        setDestination(`${address.street}, ${address.city}`);
      } else if (address && address.name) {
        setDestination(address.name);
      } else {
        setDestination(
          `${location.latitude.toFixed(5)}, ${location.longitude.toFixed(5)}`
        );
      }
    } catch (error) {
      console.error("Error in reverse geocoding:", error);
      setDestination(
        `${location.latitude.toFixed(5)}, ${location.longitude.toFixed(5)}`
      );
    }

    setIsSelectingLocation(false);
  };

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
            destinationName,
            setDestinationName,
            departureName,
            setDepartureName,
            setMapLocation,
            isAnimationComplete,
            destinationInputRef,
            translateY: sheetTranslateY,
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
