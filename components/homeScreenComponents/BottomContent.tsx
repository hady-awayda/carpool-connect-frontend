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
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BoldButton from "../BoldButton";
import DestinationField from "./DestinationField";
import LastDestinations from "./LastThreeDestinations";
import { BottomContentProps } from "./interfaces";

const BottomContent: React.FC<BottomContentProps> = ({ animateToState }) => {
  const dispatch = useDispatch();
  const uiState = useSelector((state: RootState) => state.uiState.uiState);
  const search = useSelector((state: RootState) => state.address.search);

  const handleSettingLocation = async () => {
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
