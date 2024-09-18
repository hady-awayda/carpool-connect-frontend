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

type BottomContentProps = {
  showRouteSheet: () => void;
};

const BottomContent: React.FC<BottomContentProps> = ({ showRouteSheet }) => {
  const uiState = useSelector((state: RootState) => state.uiState.uiState);
  const dispatch = useDispatch();

  const getAddressName = async (): Promise<string> => {
    return "";
  };

  const getMarkerCoordinates = async (): Promise<LocationCoords> => {
    return { latitude: 0, longitude: 0, latitudeDelta: 0, longitudeDelta: 0 };
  };

  const handleSettingLocation = async () => {
    const name = await getAddressName();
    const coords: LocationCoords = await getMarkerCoordinates();

    if (uiState === "setting-departure") {
      dispatch(setDeparture({ name: "", coords }));
    } else if (uiState === "setting-destination") {
      dispatch(setDestination({ name: "", coords }));
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
        <DestinationField showRouteSheet={showRouteSheet} />
      )}
      <LastDestinations />
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
