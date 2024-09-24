// DateTimePickerInput.tsx
import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import { TextInputProps, View } from "react-native";

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
        is24Hour={false}
        display="default"
        onChange={handleDateChange}
      />
    </View>
  );
};

export default DateTimePickerInput;
