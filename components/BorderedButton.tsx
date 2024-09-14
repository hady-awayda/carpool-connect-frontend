import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Animated,
} from "react-native";
import { Colors } from "@/constants/Variables";

type BorderedButtonProps = {
  buttonText: string;
  onPress: () => void;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
};

const BorderedButton: React.FC<BorderedButtonProps> = ({
  onPress,
  buttonStyle,
  textStyle,
  buttonText,
}) => {
  const [animation] = useState(new Animated.Value(0));

  const handlePressIn = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      onPress();
    });
  };

  const animatedBorderColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["#333", Colors.light.primary],
  });

  const animatedTextColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["#333", Colors.light.primary],
  });

  return (
    <Animated.View
      style={[styles.button, buttonStyle, { borderColor: animatedBorderColor }]}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.Text
          style={[styles.buttonText, textStyle, { color: animatedTextColor }]}
        >
          {buttonText}
        </Animated.Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default BorderedButton;

const styles = StyleSheet.create({
  button: {
    borderColor: "#333",
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    width: "100%",
    marginTop: 10,
    marginBottom: 30,
  },
  buttonText: {
    fontFamily: "Urbanist_700Bold",
    color: "#333",
    fontSize: 16,
    textAlign: "center",
  },
});
