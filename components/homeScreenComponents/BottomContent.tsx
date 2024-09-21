import { Colors } from "@/constants/Variables";
import {
  setDeparture,
  setDestination,
} from "@/data/redux/addressListSlice/slice";
import { RootState } from "@/data/redux/store";
import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BoldButton from "../BoldButton";
import DestinationField from "./DestinationField";
import { LocationCoords } from "./interfaces";
import LastDestinations from "./LastThreeDestinations";
import Location from "expo-location";
import { UIState } from "@/data/redux/UIStateSlice/slice";

type BottomContentProps = {
  animateToState: (animateTo: UIState) => void;
};

const BottomContent: React.FC<BottomContentProps> = ({ animateToState }) => {
  const uiState = useSelector((state: RootState) => state.uiState.uiState);
  const dispatch = useDispatch();

  const getMarkerCoordinates = async (): Promise<LocationCoords> => {
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

  const getAddressName = async (coords: LocationCoords): Promise<string> => {
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
      dispatch(setDeparture({ name, coords }));
    } else if (uiState === "setting-destination") {
      dispatch(setDestination({ name, coords }));
    }
  };

  return (
    <Animated.View style={[styles.container]}>
      <TouchableOpacity style={styles.slider}></TouchableOpacity>
      {uiState === "setting-departure" || uiState === "setting-destination" ? (
        <BoldButton
          buttonText="Confirm Location"
          buttonStyle={{ backgroundColor: Colors.light.primary }}
          onPress={handleSettingLocation}
        />
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
