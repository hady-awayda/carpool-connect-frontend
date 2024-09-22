import { Colors, Typography } from "@/constants/Variables";
import { RootState } from "@/data/redux/store";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Location from "expo-location"; // Importing expo-location
import { useRef, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { useSelector } from "react-redux";
import { SettingLocationSheetProps } from "./interfaces";

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
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
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
      const addresses = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      console.log(addresses);

      if (addresses.length > 0) {
        const address =
          addresses[0].street ||
          addresses[0].city ||
          addresses[0].region ||
          addresses[0].name ||
          "Unknown Location";
        setLocationName(address);
      } else {
        setLocationName("Unknown Location");
      }
    } catch (error) {
      console.error("Error fetching location name:", error);
      setLocationName("Unknown Location");
    } finally {
      setIsFetchingLocation(false);
    }
  };

  return (
    <>
      {(uiState === "setting-departure" ||
        uiState === "setting-destination") && (
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
          <Text style={styles.title}>{locationName}</Text>
        </View>
      )}
      {location && (
        <MapView
          ref={mapRef}
          style={[StyleSheet.absoluteFillObject]}
          initialRegion={region}
          onRegionChangeComplete={onRegionChangeComplete}
          showsCompass={false}
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
