import { Colors, Typography } from "@/constants/Variables";
import {
  setDeparture,
  setLocation,
  setSearch,
} from "@/data/redux/addressListSlice/slice";
import { RootState } from "@/data/redux/store";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { LocationSheetProps } from "./interfaces";

const { height, width } = Dimensions.get("window");

const SettingLocationSheet = ({ animateToState }: LocationSheetProps) => {
  const dispatch = useDispatch();
  const uiState = useSelector((state: RootState) => state.uiState.uiState);
  const location = useSelector((state: RootState) => state.address.location);
  const departure = useSelector((state: RootState) => state.address.departure);
  const destination = useSelector(
    (state: RootState) => state.address.destination
  );
  const [locationName, setLocationName] = useState<string>(
    uiState === "setting-departure" ? "Set Departure" : "Set Destination"
  );
  const [isUpdating, setIsUpdating] = useState<Boolean>(
    uiState === "setting-departure" || uiState === "setting-destination"
  );
  const [initialLocationFetched, setInitialLocationFetched] = useState(false);
  const previousRegionRef = useRef<Region | null>(null);

  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    console.log(uiState);
    setIsUpdating(
      uiState === "setting-departure" || uiState === "setting-destination"
    );
  }, [uiState]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});

      const coords = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.004,
        longitudeDelta: 0.004,
      };

      let name = "Unknown Location";

      try {
        let [address] = await Location.reverseGeocodeAsync({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        });

        name =
          address.city || address.region || address.name || "Unknown Location";
      } catch (error) {
        console.error("Error in reverse geocoding:", error);
      }

      dispatch(setLocation({ name, coords }));

      if (!departure.name) {
        dispatch(setDeparture({ name, coords }));
      }

      animateToState("expanded");
      setInitialLocationFetched(true);
    })();
  }, []);

  const onRegionChangeComplete = (region: Region) => {
    if (previousRegionRef.current) {
      const isSameRegion =
        Math.abs(region.latitude - previousRegionRef.current.latitude) <
          0.0001 &&
        Math.abs(region.longitude - previousRegionRef.current.longitude) <
          0.0001;
      if (isSameRegion) return;
    }

    console.log("Center coordinates:", region.latitude, region.longitude);
    fetchLocationName(region.latitude, region.longitude);
    previousRegionRef.current = region;
  };

  const fetchLocationName = async (latitude: number, longitude: number) => {
    try {
      const addresses = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (addresses.length > 0) {
        const address: string =
          addresses[0].street ||
          addresses[0].city ||
          addresses[0].region ||
          addresses[0].name ||
          "Unknown Location";
        setLocationName(address);
        dispatch(
          setSearch({
            name: address,
            coords: {
              latitude,
              longitude,
              latitudeDelta: 0.004,
              longitudeDelta: 0.004,
            },
          })
        );
      } else {
        setLocationName("Unknown Location");
      }
    } catch (error) {
      console.error("Error fetching location name:", error);
      setLocationName("Unknown Location");
    } finally {
    }
  };

  return (
    <>
      {isUpdating && (
        <View style={styles.container}>
          <MaterialCommunityIcons
            name="map-marker"
            size={48}
            color={
              uiState === "setting-departure"
                ? Colors.light.secondary
                : Colors.light.blue
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
      {location && initialLocationFetched && (
        <MapView
          ref={mapRef}
          style={[StyleSheet.absoluteFillObject]}
          initialRegion={location.coords}
          onRegionChangeComplete={
            isUpdating ? onRegionChangeComplete : undefined
          }
          showsCompass={false}
        >
          <Marker coordinate={location.coords} title="Your Location">
            <MaterialCommunityIcons
              name="map-marker"
              size={44}
              color={Colors.light.primary}
            />
          </Marker>

          {uiState === "setting-departure" && destination.coords && (
            <Marker coordinate={destination.coords} title="Destination">
              <MaterialCommunityIcons
                name="map-marker"
                size={44}
                color={Colors.light.blue}
              />
            </Marker>
          )}

          {uiState === "setting-destination" && departure.coords && (
            <Marker coordinate={departure.coords} title="Departure">
              <MaterialCommunityIcons
                name="map-marker"
                size={44}
                color={Colors.light.secondary}
              />
            </Marker>
          )}
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
