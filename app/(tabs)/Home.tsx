import DestinationField from "@/components/homeScreenComponents/DestinationField";
import LastDestinations from "@/components/homeScreenComponents/LastThreeDestinations";
import MapComponent from "@/components/homeScreenComponents/MapComponent";
import SheetComponent from "@/components/homeScreenComponents/SheetComponent";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { Animated, Easing, StyleSheet, TextInput, View } from "react-native";

type LocationCoords = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

const HomeScreen = () => {
  const [location, setLocation] = useState<LocationCoords | null>(null);
  const [departure, setDeparture] = useState<string>("Fetching...");
  const [destination, setDestination] = useState<string>("");
  const [isSheetVisible, setIsSheetVisible] = useState(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const destinationInputRef = useRef<TextInput>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.004,
        longitudeDelta: 0.004,
      });
      setDeparture("Your City");
    })();
  }, []);

  const showRouteSheet = () => {
    setIsSheetVisible(true);
    setIsAnimationComplete(false);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300,
      easing: Easing.bezier(0.42, 0, 0.58, 1),
      useNativeDriver: false,
    }).start(() => {
      setIsAnimationComplete(true);
    });
  };

  const closeRouteSheet = () => {
    setIsSheetVisible(false);
    setIsAnimationComplete(false);
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 300,
      easing: Easing.bezier(0.42, 0, 0.58, 1),
      useNativeDriver: false,
    }).start(() => setIsSheetVisible(false));
  };

  const sheetTranslateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -280],
  });

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {location && <MapComponent location={location} />}

      <Animated.View
        style={[
          styles.bottomSheet,
          {
            transform: [{ translateY: sheetTranslateY }],
          },
        ]}
      >
        {isSheetVisible ? (
          <SheetComponent
            {...{
              closeRouteSheet,
              destination,
              setDestination,
              departure,
              setDeparture,
              isAnimationComplete,
              destinationInputRef,
            }}
          />
        ) : (
          <>
            <DestinationField
              {...{ destination, setDestination, showRouteSheet }}
            />
            <LastDestinations />
          </>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
});

export default HomeScreen;
