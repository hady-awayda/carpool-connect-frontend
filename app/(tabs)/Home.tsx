import DestinationField from "@/components/homeScreenComponents/DestinationField";
import LastDestinations from "@/components/homeScreenComponents/LastThreeDestinations";
import MapComponent from "@/components/homeScreenComponents/MapComponent";
import SheetComponent from "@/components/homeScreenComponents/SheetComponent";
import * as Location from "expo-location";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

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
  const animatedValue = useRef(new Animated.Value(0)).current;

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
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const closeRouteSheet = () => {
    setIsSheetVisible(false);
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        {location && <MapComponent location={location} />}

        <Animated.View style={[styles.bottomSheet]}>
          {isSheetVisible ? (
            <>
              <SheetComponent
                isSheetVisible={isSheetVisible}
                showRouteSheet={showRouteSheet}
                closeRouteSheet={closeRouteSheet}
                destination={destination}
                setDestination={setDestination}
                departure={departure}
                setDeparture={setDeparture}
              />
            </>
          ) : (
            <DestinationField
              {...{ destination, setDestination, showRouteSheet }}
            />
          )}

          {!isSheetVisible && <LastDestinations />}
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
});

export default HomeScreen;
