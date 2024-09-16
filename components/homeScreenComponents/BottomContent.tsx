import DestinationField from "@/components/homeScreenComponents/DestinationField";
import LastDestinations from "@/components/homeScreenComponents/LastThreeDestinations";
import React from "react";
import { Animated, Dimensions, StyleSheet } from "react-native";

type BottomContentProps = {
  destination: string;
  setDestination: (text: string) => void;
  showRouteSheet: () => void;
  translateY: Animated.AnimatedInterpolation<number>;
};

const BottomContent: React.FC<BottomContentProps> = ({
  destination,
  setDestination,
  showRouteSheet,
  translateY,
}) => {
  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
        },
      ]}
    >
      <DestinationField
        destination={destination}
        setDestination={setDestination}
        showRouteSheet={showRouteSheet}
      />
      <LastDestinations />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 12,
  },
});

export default BottomContent;
