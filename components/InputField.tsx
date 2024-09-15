import { useEffect, useRef, useState } from "react";
import { Animated, Easing, StyleSheet, TextInput, View } from "react-native";
import { Colors } from "@/constants/Variables";

interface InputFieldProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
}

const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  value,
  onChangeText,
  keyboardType,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const animatedIsFocused = useRef(new Animated.Value(value ? 1 : 0)).current;

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setIsFocused(value !== "");
    setIsFocused(false);
  };

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
      outputRange: ["#333", "#49E99C"],
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
        />
      </View>
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    marginBottom: 0,
    width: "100%",
    paddingHorizontal: 10,
  },
  inputWrapper: {
    backgroundColor: "#eee",
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 15,
    marginTop: 8,
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
