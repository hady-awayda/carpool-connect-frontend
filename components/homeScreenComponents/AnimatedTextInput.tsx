import React, { useRef, useEffect } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Variables";

type AnimatedTextInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  field: "departure" | "destination";
  isFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  inputRef?: React.RefObject<TextInput>;
};

const AnimatedTextInput: React.FC<AnimatedTextInputProps> = ({
  value,
  onChangeText,
  placeholder,
  field,
  isFocused,
  onFocus,
  onBlur,
  inputRef,
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
        <Ionicons name="search" size={20} style={styles.leftIcon} />
      ) : (
        <MaterialCommunityIcons
          name="radiobox-marked"
          size={20}
          color={field === "departure" ? Colors.light.secondary : "#bbb"}
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
          onBlur={onBlur}
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
              <Ionicons name="close-circle" size={28} color="#bbb" />
            </TouchableOpacity>
          )}
          <MaterialCommunityIcons
            name="map-marker-radius"
            size={24}
            color={
              field === "departure"
                ? Colors.light.primary
                : Colors.light.secondary
            }
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
