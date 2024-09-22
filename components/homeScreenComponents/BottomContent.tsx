import { Colors } from "@/constants/Variables";
import {
  setDeparture,
  setDestination,
} from "@/data/redux/addressListSlice/slice";
import { RootState } from "@/data/redux/store";
import Location from "expo-location";
import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Region } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import BoldButton from "../BoldButton";
import DestinationField from "./DestinationField";
import LastDestinations from "./LastThreeDestinations";
import { BottomContentProps } from "./interfaces";

const BottomContent: React.FC<BottomContentProps> = ({ animateToState }) => {
  const dispatch = useDispatch();
  const uiState = useSelector((state: RootState) => state.uiState.uiState);
  const search = useSelector((state: RootState) => state.address.search);

  const getMarkerCoordinates = async (): Promise<Region> => {
    try {
      let location = await Location.getCurrentPositionAsync({});
      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.004,
        longitudeDelta: 0.004,
      };
    } catch (error) {
      console.error("Error fetching location:", error);
      return { latitude: 0, longitude: 0, latitudeDelta: 0, longitudeDelta: 0 };
    }
  };

  const getAddressName = async (coords: Region): Promise<string> => {
    try {
      const [address] = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
      return (
        address.city || address.region || address.name || "Unknown Location"
      );
    } catch (error) {
      console.error("Error in reverse geocoding:", error);
      return "Unknown Location";
    }
  };

  const handleSettingLocation = async () => {
    const coords = await getMarkerCoordinates();
    const name = await getAddressName(coords);

    if (uiState === "setting-departure") {
      dispatch(setDeparture(search));
    } else if (uiState === "setting-destination") {
      dispatch(setDestination(search));
    }

    animateToState("full");
  };

  return (
    <Animated.View style={[styles.container]}>
      <TouchableOpacity style={styles.slider}></TouchableOpacity>
      {uiState === "setting-departure" || uiState === "setting-destination" ? (
        <View style={{ alignItems: "center" }}>
          <BoldButton
            buttonText={
              uiState === "setting-departure"
                ? "Confirm Departure"
                : "Confirm Destination"
            }
            buttonStyle={{ backgroundColor: Colors.light.primary }}
            onPress={handleSettingLocation}
            width={340}
          />
        </View>
      ) : (
        <DestinationField showRouteSheet={() => animateToState("full")} />
      )}
      <LastDestinations {...{ animateToState }} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get("window").height,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 16,
  },
  slider: {
    height: 5,
    width: 48,
    backgroundColor: Colors.light.background,
    borderRadius: 5,
    alignSelf: "center",
    marginBottom: 8,
  },
});

export default BottomContent;
