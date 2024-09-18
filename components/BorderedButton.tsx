import { Colors } from "@/constants/Variables";
import React, { useState } from "react";
import {
  Animated,
  StyleSheet,
  TextStyle,
  ViewStyle,
  Pressable,
} from "react-native";

type BorderedButtonProps = {
  buttonText: string;
  onPress: () => void;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  textColor?: string;
  borderColor?: string;
  width?: number;
  height?: number;
};

const BorderedButton: React.FC<BorderedButtonProps> = ({
  onPress,
  buttonStyle,
  textStyle,
  buttonText,
  textColor,
  borderColor,
  width,
  height,
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
    onPress();

    setTimeout(() => {
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }, remainingTime);
  };

  const animatedBorderColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [borderColor ? borderColor : "#333", Colors.light.primary],
  });

  const animatedTextColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [textColor ? textColor : "#333", Colors.light.primary],
  });

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.button, buttonStyle, { width, height }]}
    >
      <Animated.View
        style={[styles.animationStyle, { borderColor: animatedBorderColor }]}
      >
        <Animated.Text
          style={[styles.buttonText, textStyle, { color: animatedTextColor }]}
        >
          {buttonText}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  );
};

export default BorderedButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    width: "100%",
    height: 54,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Urbanist_700Bold",
    fontSize: 16,
    textAlign: "center",
    width: "100%",
  },
  animationStyle: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});
