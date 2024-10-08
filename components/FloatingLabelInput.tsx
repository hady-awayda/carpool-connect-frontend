import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface FloatingLabelInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  secureTextEntry?: boolean;
  setSecureTextEntry?: (value: boolean) => void;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  setSecureTextEntry,
  keyboardType,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const animatedIsFocused = useRef(new Animated.Value(value ? 1 : 0)).current;

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setIsFocused(value !== "");
    setIsFocused(false);
  };
  const handleIconChange = () =>
    setSecureTextEntry && setSecureTextEntry(!secureTextEntry);

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const labelStyle = {
    position: "absolute" as const,
    left: 20,
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [16.25, -10],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: ["#666", "#49E99C"],
    }),
    backgroundColor: "white",
    paddingHorizontal: 4,
    zIndex: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <Animated.Text style={labelStyle}>{placeholder}</Animated.Text>

        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          keyboardType={keyboardType}
          secureTextEntry={
            (placeholder == "Password" || placeholder == "Confirm Password") &&
            secureTextEntry
          }
        />

        {placeholder == "Password" && (
          <TouchableOpacity style={styles.eyeIcon} onPress={handleIconChange}>
            <Ionicons
              name={secureTextEntry ? "eye-off" : "eye"}
              size={24}
              color="#999"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FloatingLabelInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 0,
    width: "100%",
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 15,
    width: "100%",
    position: "relative",
    height: 60,
  },
  input: {
    height: 30,
    fontSize: 16,
    color: "#333",
    paddingLeft: 0,
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 18,
  },
});
