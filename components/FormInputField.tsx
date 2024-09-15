import React from "react";
import { Controller, Control } from "react-hook-form";
import FloatingLabelInput from "@/components/FloatingLabelInput";
import { Text, StyleSheet } from "react-native";

interface FormInputFieldProps {
  control: Control<any>;
  name: string;
  placeholder: string;
  secureTextEntry?: boolean;
  setSecureTextEntry?: (value: boolean) => void;
  error?: string;
}

const FormInputField: React.FC<FormInputFieldProps> = ({
  control,
  name,
  placeholder,
  secureTextEntry = false,
  setSecureTextEntry = () => {},
  error,
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
            onChangeText={onChange}
            onBlur={onBlur}
            secureTextEntry={secureTextEntry}
            setSecureTextEntry={setSecureTextEntry}
          />
        )}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </>
  );
};

export default FormInputField;

const styles = StyleSheet.create({
  errorText: {
    color: "red",
    fontSize: 12,
    alignSelf: "flex-start",
    marginBottom: 12,
    width: "100%",
    textAlign: "center",
  },
});
