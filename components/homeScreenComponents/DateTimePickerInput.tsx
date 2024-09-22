// DateTimePickerInput.tsx
import React, { useState } from "react";
import {
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Colors } from "@/constants/Variables";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface DateTimePickerInputProps extends TextInputProps {
  value: string;
  placeholder: string;
  onConfirm: (time: string) => void;
  setShowPicker: React.Dispatch<React.SetStateAction<boolean>>;
}

const DateTimePickerInput: React.FC<DateTimePickerInputProps> = ({
  value,
  placeholder,
  onConfirm,
  setShowPicker,
  ...textInputProps
}) => {
  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      const formattedTime = selectedDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      onConfirm(formattedTime);
    }
  };

  return (
    <View>
      <DateTimePicker
        testID="dateTimePicker"
        value={new Date()}
        mode="time"
        is24Hour={true}
        display="default"
        onChange={handleDateChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
  },
  icon: {
    marginLeft: 8,
  },
});

export default DateTimePickerInput;
