import { Colors, Typography } from "@/constants/Variables";
import { RootState } from "@/data/redux/store";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { SettingLocationSheetProps } from "./interfaces";

const { height } = Dimensions.get("window");
const { width } = Dimensions.get("window");

const SettingLocationSheet: React.FC<SettingLocationSheetProps> = ({
  animateToState,
}) => {
  const uiState = useSelector((state: RootState) => state.uiState.uiState);

  return (
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
      <Text style={styles.title}>
        {uiState === "setting-departure" ? "Set Departure" : "Set Destination"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    flexDirection: "row",
    height: height * 0.12,
    width: "100%",
    borderRadius: 20,
    paddingHorizontal: 20,
    zIndex: 3,
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
      { translateY: height / 2 - 48 },
      { translateX: width / 2 - 24 },
    ],
  },
});

export default SettingLocationSheet;
