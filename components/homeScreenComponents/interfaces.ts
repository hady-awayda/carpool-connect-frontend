import { TextInput } from "react-native";
import { IoniconsName, MaterialCommunityIconsName } from "./AnimatedTextInput";

export type AnimatedTextInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  onMapLocationSelect: () => void;
  onFocus: () => void;
  placeholder: string;
  isFocused: boolean;
  inputRef?: React.RefObject<TextInput>;
  leftIcon1?: IoniconsName;
  leftIcon1Color?: string;
  leftIcon2?: MaterialCommunityIconsName;
  leftIcon2Color?: string;
  rightIcon1?: IoniconsName;
  rightIcon1Color?: string;
  rightIcon2?: MaterialCommunityIconsName;
  rightIcon2Color?: string;
};

export type SheetComponentProps = {
  closeRouteSheet: () => void;
  destination: string;
  setDestination: (text: string) => void;
  departure: string;
  setDeparture: (text: string) => void;
  setMapLocation: () => void;
  isAnimationComplete: boolean;
  destinationInputRef: React.RefObject<TextInput>;
};
