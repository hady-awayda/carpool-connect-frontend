import { TextInput } from "react-native";
import { IoniconsName, MaterialCommunityIconsName } from "./AnimatedTextInput";

export type AnimatedTextInputProps = {
  value: string;
  placeholder: string;
  inputRef?: React.RefObject<TextInput>;
  onChangeText: (text: string) => void;
  onMapLocationSelect: () => void;
  onFocus: () => void;
  isFocused: boolean;
  leftIcon1?: { name: IoniconsName; color: string };
  leftIcon2?: { name: MaterialCommunityIconsName; color: string };
  rightIcon1?: { name: IoniconsName; color: string };
  rightIcon2?: { name: MaterialCommunityIconsName; color: string };
};

export type SheetComponentProps = {
  closeRouteSheet: () => void;
  destinationName: string;
  setDestinationName: (text: string) => void;
  departureName: string;
  setDepartureName: (text: string) => void;
  setMapLocation: (focusedField: "departure" | "destination") => void;
  isAnimationComplete: boolean;
  destinationInputRef: React.RefObject<TextInput>;
};
