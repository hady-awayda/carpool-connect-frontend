import { Colors, Typography } from "@/constants/Variables";
import { RootState } from "@/data/redux/store";
import { UIState } from "@/data/redux/UIStateSlice/slice";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";

const { height } = Dimensions.get("window");

type SettingLocationSheetProps = {
  animateToState: (animateTo: UIState) => void;
};

const SettingLocationSheet: React.FC<SettingLocationSheetProps> = ({
  animateToState,
}) => {
  const uiState = useSelector((state: RootState) => state.uiState.uiState);

  return (
    <Animated.View style={styles.sheetContainer}>
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
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  sheetContainer: {
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
});

export default SettingLocationSheet;
