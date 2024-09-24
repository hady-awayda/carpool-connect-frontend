import { Colors, Typography } from "@/constants/Variables";
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
  onPress?: () => void;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  width?: number;
  height?: number;
};

const BoldButton: React.FC<BoldButtonProps> = ({
  onPress,
  buttonStyle,
  textStyle,
  buttonText,
  width = 340,
  height = 54,
}) => {
  const [animation] = useState(new Animated.Value(0));
  let pressInTime = 0;

  const handlePressIn = () => {
    pressInTime = Date.now();

    Animated.timing(animation, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const handlePressOut = () => {
    const pressOutTime = Date.now();
    const pressDuration = pressOutTime - pressInTime;
    const remainingTime = Math.max(200 - pressDuration, 0);
    onPress && onPress();

    setTimeout(() => {
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }, remainingTime);
  };

  const animatedBackgroundColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [
      (buttonStyle?.backgroundColor as string) || "#333",
      Colors.light.primary,
    ],
  });

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.button, buttonStyle, { width: width, height: height }]}
    >
      <Animated.View
        style={[
          styles.animationStyle,
          { backgroundColor: animatedBackgroundColor },
        ]}
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
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    width: "100%",
    ...Typography.title,
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
