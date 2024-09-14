import { Colors } from "@/constants/Variables";
import { useState } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Animated,
} from "react-native";

type BoldButtonProps = {
  buttonText: string;
  onPress: () => void;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
};

const BoldButton: React.FC<BoldButtonProps> = ({
  onPress,
  buttonStyle,
  textStyle,
  buttonText,
}) => {
  const [animation] = useState(new Animated.Value(0));
  let pressInTime = 0;

  const handlePressIn = () => {
    pressInTime = Date.now();

    Animated.timing(animation, {
      toValue: 1,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  const handlePressOut = () => {
    const pressOutTime = Date.now();
    const pressDuration = pressOutTime - pressInTime;
    const remainingTime = Math.max(500 - pressDuration, 0);
    onPress();

    setTimeout(() => {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }, remainingTime);
  };

  const animatedBackgroundColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["#333", Colors.light.primary],
  });

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.button, buttonStyle]}
    >
      <Animated.View
        style={[styles.animationStyle, { backgroundColor: animatedBackgroundColor }]}
      >
        <Text style={[styles.buttonText, textStyle]}>{buttonText}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default BoldButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#333",
    borderRadius: 5,
    width: "100%",
    height: 54,
    marginBottom: 15,
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Urbanist_700Bold",
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    width: "100%",
  },
  animationStyle: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});
