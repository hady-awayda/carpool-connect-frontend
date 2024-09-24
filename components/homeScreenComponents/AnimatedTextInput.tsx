import { Colors, Typography } from "@/constants/Variables";
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
  placeholder,
  inputRef,
  onChangeText,
  onFocus,
  onBlur,
  onPress,
  onIcon1Press,
  onIcon2Press,
  isFocused,
  leftIcon1,
  leftIcon2,
  rightIcon1,
  rightIcon2,
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
          name={leftIcon1?.name}
          color={leftIcon1?.color}
          size={24}
          style={styles.leftIcon}
        />
      ) : (
        <MaterialCommunityIcons
          name={leftIcon2?.name}
          size={24}
          color={leftIcon2?.color}
          style={styles.leftIcon}
        />
      )}

      <TouchableOpacity
        onPress={onPress}
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
          onBlur={onBlur}
          style={styles.textInput}
          cursorColor={Colors.light.primary}
          selectionColor={Colors.light.primary}
        />
      </TouchableOpacity>

      {isFocused && (
        <>
          {value !== "" && (
            <TouchableOpacity
              onPress={onIcon1Press}
              style={styles.rightIconButton}
            >
              <Ionicons
                name={rightIcon1?.name}
                size={28}
                color={rightIcon1?.color}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={onIcon2Press} style={styles.rightIcon}>
            <MaterialCommunityIcons
              name={rightIcon2?.name}
              size={24}
              color={rightIcon2?.color}
            />
          </TouchableOpacity>
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
    height: 50,
    paddingLeft: 48,
    paddingRight: 80,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#fff",
  },
  focusedInputContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "transparent",
  },
  textInput: {
    fontSize: 16,
    color: "#000",
    height: 50,
    ...Typography.title,
  },
  overlayBorder: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -1,
    height: 52,
    borderWidth: 2,
    borderColor: Colors.light.primary,
    borderRadius: 8,
    zIndex: 200,
  },
  leftIcon: {
    position: "absolute",
    left: 12,
    top: "48%",
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
