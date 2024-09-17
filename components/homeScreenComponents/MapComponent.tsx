import { Colors } from "@/constants/Variables";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

type MapComponentProps = {
  location: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
};

const MapComponent: React.FC<MapComponentProps> = ({ location }) => {
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
