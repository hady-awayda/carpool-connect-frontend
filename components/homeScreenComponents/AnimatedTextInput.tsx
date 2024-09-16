import { Colors } from "@/constants/Variables";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AnimatedTextInputProps } from "./interfaces";

export type IoniconsName = React.ComponentProps<typeof Ionicons>["name"];
export type MaterialCommunityIconsName = React.ComponentProps<
  typeof MaterialCommunityIcons
>["name"];

const AnimatedTextInput: React.FC<AnimatedTextInputProps> = ({
  value,
  onChangeText,
  placeholder,
  isFocused,
  onFocus,
  inputRef,
  leftIcon1,
  leftIcon1Color,
  leftIcon2,
  leftIcon2Color,
  rightIcon1,
  rightIcon1Color,
  rightIcon2,
  rightIcon2Color,
}) => {
  const borderOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(borderOpacity, {
      toValue: isFocused ? 1 : 0,
      duration: 200,
      easing: Easing.bezier(0.42, 0, 0.58, 1),
      useNativeDriver: false,
    }).start();
  }, [isFocused, borderOpacity]);

  return (
    <View style={styles.inputFieldWrapper}>
      {isFocused ? (
        <Ionicons
          name={leftIcon1}
          color={leftIcon1Color}
          size={20}
          style={styles.leftIcon}
        />
      ) : (
        <MaterialCommunityIcons
          name={leftIcon2}
          size={20}
          color={leftIcon2Color}
          style={styles.leftIcon}
        />
      )}

      <View
        style={[
          styles.inputContainer,
          isFocused && styles.focusedInputContainer,
        ]}
      >
        <TextInput
          ref={inputRef}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onFocus={onFocus}
          onBlur={onFocus}
          style={styles.textInput}
          cursorColor={Colors.light.primary}
          selectionColor={Colors.light.primary}
        />
      </View>

      {isFocused && (
        <>
          {value !== "" && (
            <TouchableOpacity
              onPress={() => onChangeText("")}
              style={styles.rightIconButton}
            >
              <Ionicons name={rightIcon1} size={28} color={rightIcon1Color} />
            </TouchableOpacity>
          )}
          <MaterialCommunityIcons
            name={rightIcon2}
            size={24}
            color={rightIcon2Color}
            style={styles.rightIcon}
          />
        </>
      )}

      <Animated.View
        style={[
          styles.overlayBorder,
          {
            opacity: borderOpacity,
          },
        ]}
        pointerEvents="box-none"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputFieldWrapper: {
    position: "relative",
  },
  inputContainer: {
    borderWidth: 1.5,
    borderColor: "transparent",
    borderRadius: 8,
    paddingLeft: 48,
    paddingRight: 36,
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  focusedInputContainer: {
    backgroundColor: "#fff",
  },
  textInput: {
    fontSize: 16,
    color: "#000",
    height: 48,
  },
  overlayBorder: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 2,
    borderColor: Colors.light.primary,
    borderRadius: 8,
  },
  leftIcon: {
    position: "absolute",
    left: 18,
    top: "50%",
    transform: [{ translateY: -10 }],
    zIndex: 1,
  },
  rightIcon: {
    position: "absolute",
    right: 12,
    top: "44%",
    transform: [{ translateY: -9.5 }],
    zIndex: 1,
  },
  rightIconButton: {
    position: "absolute",
    right: 44,
    top: "50%",
    transform: [{ translateY: -14 }],
    zIndex: 0,
  },
});

export default AnimatedTextInput;
