import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Typography, Spacing, Colors } from "@/constants/Variables";
import FloatingLabelInput from "@/components/FloatingLabelInput";

type LocationCoords = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

const HomeScreen = () => {
  const [location, setLocation] = useState<LocationCoords | null>(null);
  const [destination, setDestination] = useState<string>("");
  const [departure, setDeparture] =
    useState<Location.LocationObjectCoords | null>(null);

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
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setDeparture(loc.coords);
    })();
  }, []);

  const handleDestinationChange = (text: string) => {
    setDestination(text);
  };

  const handleFormSubmit = async () => {
    const scheduleData = {
      departure: departure,
      destination: destination,
    };
  };

  return (
    <View style={styles.container}>
      {location ? (
        <MapView style={styles.map} initialRegion={location}>
          <Marker coordinate={location} title="Your Location" />
          {departure && <Marker coordinate={departure} title="Departure" />}
        </MapView>
      ) : (
        <Text>Loading Map...</Text>
      )}

      <View style={styles.inputContainer}>
        <FloatingLabelInput
          placeholder="Where to?"
          value={destination}
          onChangeText={setDestination}
        />
      </View>

      {/* <Button title="Submit" onPress={handleFormSubmit} /> */}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  inputContainer: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 16,
    height: 250,
    marginTop: -80,
    marginBottom: -10,
    marginHorizontal: 0,
  },
  input: {
    padding: 10,
    backgroundColor: "#EFEFEF",
    borderRadius: 10,
    fontSize: 16,
    marginHorizontal: 10,
  },
});
