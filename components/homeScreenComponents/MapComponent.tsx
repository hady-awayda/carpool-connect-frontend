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
            <View style={styles.pin}>
              <View style={styles.circle} />
              <View style={styles.cone} />
            </View>
          </Marker>
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
});

export default MapComponent;
