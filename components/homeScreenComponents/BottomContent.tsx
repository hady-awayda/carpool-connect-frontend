import { Colors } from "@/constants/Variables";
import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import DestinationField from "./DestinationField";
import LastDestinations from "./LastThreeDestinations";

type BottomContentProps = {
  showRouteSheet: () => void;
};

const BottomContent: React.FC<BottomContentProps> = ({ showRouteSheet }) => {
  return (
    <Animated.View style={[styles.container]}>
      <TouchableOpacity style={styles.slider}></TouchableOpacity>
      <DestinationField showRouteSheet={showRouteSheet} />
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
