import { Colors } from "@/constants/Variables";
import { RootState } from "@/data/redux/store";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useSelector } from "react-redux";

const MapComponent = () => {
  const location = useSelector(
    (state: RootState) => state.address.location.coords
  );

  console.log(location);

  return (
    <View style={styles.mapContainer}>
      {location && (
        <MapView style={styles.map} initialRegion={location}>
          <Marker coordinate={location} title="Your Location">
            <MaterialCommunityIcons
              name="map-marker"
              size={44}
              color={Colors.light.secondary}
            />
          </Marker>
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    height: "100%",
  },
  map: {
    flex: 1,
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
});

export default MapComponent;
