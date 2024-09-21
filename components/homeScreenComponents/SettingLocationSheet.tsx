import { Colors } from "@/constants/Variables";
import {
  setDeparture,
  setDestination,
} from "@/data/redux/addressListSlice/slice";
import { RootState } from "@/data/redux/store";
import { UIState } from "@/data/redux/UIStateSlice/slice";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const { height } = Dimensions.get("window");

type SettingLocationSheetProps = {
  animateToState: (animateTo: UIState) => void;
};

const SettingLocationSheet: React.FC<SettingLocationSheetProps> = ({
  animateToState,
}) => {
  const uiState = useSelector((state: RootState) => state.uiState.uiState);
  const dispatch = useDispatch();
  const [locationOptions, setLocationOptions] = useState([]);

  const handleConfirmLocation = (place: any) => {
    if (uiState === "setting-departure") {
      dispatch(setDeparture({ name: place.name, coords: place.coords }));
    } else if (uiState === "setting-destination") {
      dispatch(setDestination({ name: place.name, coords: place.coords }));
    }
    animateToState("full");
  };

  return (
    <Animated.View style={styles.sheetContainer}>
      <TouchableOpacity onPress={() => animateToState("full")}>
        <MaterialCommunityIcons
          name="close"
          size={24}
          color={Colors.light.text}
        />
      </TouchableOpacity>
      <Text style={styles.title}>
        {uiState === "setting-departure" ? "Set Departure" : "Set Destination"}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  sheetContainer: {
    position: "absolute",
    top: 0,
    height: height * 0.15,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 20,
    zIndex: 3,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 10,
    color: Colors.light.text,
  },
  placeName: {
    fontSize: 16,
    color: Colors.light.primary,
    marginVertical: 8,
  },
  placeAddress: {
    fontSize: 12,
    color: Colors.light.secondary,
  },
});

export default SettingLocationSheet;
