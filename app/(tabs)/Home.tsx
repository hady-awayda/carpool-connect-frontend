import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import * as NavigationBar from "expo-navigation-bar";

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

  const routeSheetHeight = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["30%", "80%"],
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {location ? (
          <MapView style={styles.map} initialRegion={location}>
            <Marker coordinate={location} title="Your Location">
              <View style={styles.pin}>
                <View style={styles.circle} />
                <View style={styles.cone} />
              </View>
            </Marker>
          </MapView>
        ) : (
          <Text>Loading Map...</Text>
        )}

        <Animated.View
          style={[styles.bottomSheet, { height: routeSheetHeight }]}
        >
          {isSheetVisible ? (
            <>
              <View style={styles.routeHeader}>
                <TouchableOpacity onPress={closeRouteSheet}>
                  <Ionicons name="close" size={24} />
                </TouchableOpacity>
                <Text style={styles.routeTitle}>Your route</Text>
                <TouchableOpacity>
                  <Ionicons name="add" size={24} />
                </TouchableOpacity>
              </View>
              <View style={styles.routeDetails}>
                <Text>{departure}</Text>
                <TextInput
                  style={[styles.destinationInput, { borderColor: "#49E99C" }]}
                  placeholder="Destination"
                  value={destination}
                  onChangeText={setDestination}
                  autoFocus
                />
              </View>
            </>
          ) : (
            <>
              <TouchableOpacity
                onPress={showRouteSheet}
                style={styles.searchContainer}
              >
                <Ionicons name="search" size={24} />
                <TextInput
                  style={styles.input}
                  placeholder="Where to?"
                  value={destination}
                  onChangeText={setDestination}
                />
              </TouchableOpacity>

              <View style={styles.suggestions}>
                <View style={styles.suggestionItem}>
                  <Ionicons name="airplane-outline" size={24} />
                  <Text>Beirut Rafic Hariri Airport (BEY)</Text>
                </View>
                <View style={styles.suggestionItem}>
                  <Ionicons name="location-outline" size={24} />
                  <Text>Hamra</Text>
                </View>
                <View style={styles.suggestionItem}>
                  <Ionicons name="bag-outline" size={24} />
                  <Text>City Centre Beirut</Text>
                </View>
              </View>
            </>
          )}
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  pin: {
    alignItems: "center",
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "blue",
  },
  cone: {
    width: 5,
    height: 10,
    backgroundColor: "rgba(0, 0, 255, 0.5)",
    transform: [{ rotate: "45deg" }],
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 16,
    padding: 10,
  },
  input: {
    marginLeft: 10,
    fontSize: 16,
  },
  suggestions: {
    marginTop: 20,
  },
  suggestionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  routeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  routeTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  routeDetails: {
    marginTop: 20,
  },
  destinationInput: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
});

export default HomeScreen;
