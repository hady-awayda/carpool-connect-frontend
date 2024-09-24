import { Colors } from "@/constants/Variables";
import { RootState } from "@/data/redux/store";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useSelector } from "react-redux";

const MapComponent = () => {
  const location = useSelector(
    (state: RootState) => state.address.location.coords
  );

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
});

export default MapComponent;
