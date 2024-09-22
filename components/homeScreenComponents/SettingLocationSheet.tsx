import { Colors, Typography } from "@/constants/Variables";
import { RootState } from "@/data/redux/store";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { useSelector } from "react-redux";
import { SettingLocationSheetProps } from "./interfaces";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const { height, width } = Dimensions.get("window");

const SettingLocationSheet = ({
  animateToState,
}: SettingLocationSheetProps) => {
  const uiState = useSelector((state: RootState) => state.uiState.uiState);
  const location = useSelector((state: RootState) => state.address.location);
  const [isFetchingLocation, setIsFetchingLocation] = useState<boolean>(true);
  const [locationName, setLocationName] = useState<string>(
    uiState === "setting-departure" ? "Set Departure" : "Set Destination"
  );

  const mapRef = useRef<MapView>(null);

  const [region, setRegion] = useState({
    latitude: location.coords?.latitude,
    longitude: location.coords?.longitude,
    latitudeDelta: 0.003,
    longitudeDelta: 0.003,
  });

  const onRegionChangeComplete = (region: Region) => {
    console.log("Center coordinates:", region.latitude, region.longitude);
    fetchLocationName(region.latitude, region.longitude);
    setRegion(region);
  };

  const fetchLocationName = async (latitude: number, longitude: number) => {
    setIsFetchingLocation(true);
    try {
      const apiKey = "AIzaSyCzduXSDjg5mbh4txUTEVVu7LN1O53_fEc";
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

      const response = await axios.get(url);
      const address =
        response.data.results[0]?.formatted_address || "Unknown Location";

      setLocationName(address);
      setIsFetchingLocation(false);
    } catch (error) {
      console.error("Error fetching location name:", error);
      setLocationName("Unknown Location");
      setIsFetchingLocation(false);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="map-marker"
          size={48}
          color={
            uiState === "setting-departure"
              ? Colors.light.primary
              : Colors.light.secondary
          }
          style={styles.fullScreenMarker}
        />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => animateToState("full")}
        >
          <MaterialCommunityIcons
            name="chevron-left"
            size={24}
            color={Colors.light.text}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{locationName.split(",")[0]}</Text>
      </View>
      {location && (
        <MapView
          ref={mapRef}
          style={[StyleSheet.absoluteFillObject]}
          initialRegion={region}
          onRegionChangeComplete={onRegionChangeComplete}
        >
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
          />
        </MapView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    flexDirection: "row",
    height: height * 0.12,
    width: "100%",
    paddingHorizontal: 20,
    zIndex: 1,
  },
  title: {
    height: 50,
    paddingLeft: 32,
    paddingTop: 7,
    color: Colors.light.text,
    ...Typography.heading,
  },
  backButton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 44,
    borderColor: Colors.light.backgroundIcons,
    borderWidth: 0.5,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    marginRight: 10,
  },
  fullScreenMarker: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    transform: [
      { translateY: height / 2 - 64 },
      { translateX: width / 2 - 24 },
    ],
  },
});

export default SettingLocationSheet;
