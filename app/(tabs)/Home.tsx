import BottomContent from "@/components/homeScreenComponents/BottomContent";
import { LocationProps } from "@/components/homeScreenComponents/interfaces";
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

const { height } = Dimensions.get("window");

const HomeScreen = () => {
  const [location, setLocation] = useState<LocationProps>({
    name: "Fetching...",
    coords: null,
  });
  const [departure, setDeparture] = useState<LocationProps>({
    name: "",
    coords: null,
  });
  const [destination, setDestination] = useState<LocationProps>({
    name: "",
    coords: null,
  });
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const destinationInputRef = useRef<TextInput>(null);
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

      setLocation({ name, coords });
      !departure.name && setDeparture({ name, coords });
    })();
  }, []);

  // const handleLocationSelected = async (
  //   location: LocationCoords,
  //   focusedField: "departure" | "destination"
  // ) => {
  //   console.log("Selected location:", location);
  //   try {
  //     let [address] = await Location.reverseGeocodeAsync(location);

  //     if (address && address.street) {
  //       setDestinationName(`${address.street}, ${address.city}`);
  //     } else if (address && address.name) {
  //       setDestinationName(address.name);
  //     } else {
  //       setDestinationName(
  //         `${location.latitude.toFixed(5)}, ${location.longitude.toFixed(5)}`
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error in reverse geocoding:", error);
  //     setDestinationName(
  //       `${location.latitude.toFixed(5)}, ${location.longitude.toFixed(5)}`
  //     );
  //   }

  //   setIsSelectingLocation(false);
  // };

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
    <TouchableOpacity activeOpacity={1} style={styles.container}>
      <StatusBar style="auto" />

      {location.coords && <MapComponent location={location.coords} />}

      <Animated.View
        style={[
          styles.sheetContainer,
          { transform: [{ translateY: sheetTranslateY }] },
        ]}
      >
        <SheetComponent
          {...{
            closeRouteSheet,
            destination: destination.name,
            setDestination,
            departure: departure.name,
            setDeparture,
            location,
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
