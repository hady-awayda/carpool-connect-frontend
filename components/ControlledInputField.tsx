import React from "react";
import { Controller, Control } from "react-hook-form";
import FloatingLabelInput from "@/components/FloatingLabelInput";
import { Text, StyleSheet } from "react-native";

interface ControlledInputFieldProps {
  control: Control<any>;
  name: string;
  placeholder: string;
  secureTextEntry?: boolean;
  setSecureTextEntry?: (value: boolean) => void;
  error?: string;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
}

const ControlledInputField: React.FC<ControlledInputFieldProps> = ({
  control,
  name,
  placeholder,
  secureTextEntry = false,
  setSecureTextEntry = () => {},
  error,
  keyboardType,
}) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value, onBlur } }) => (
          <FloatingLabelInput
            placeholder={placeholder}
            value={value}
            onChangeText={(text) =>
              onChange(
                keyboardType === "numeric" ? parseFloat(text) || 0 : text
              )
            }
            onBlur={onBlur}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            setSecureTextEntry={setSecureTextEntry}
          />
        )}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </>
  );
};

export default ControlledInputField;

const styles = StyleSheet.create({
  errorText: {
    color: "red",
    fontSize: 12,
    alignSelf: "flex-start",
    marginBottom: 12,
    marginTop: -8,
    width: "100%",
    textAlign: "center",
  },
});
