import { TextInput } from "react-native";
import { IoniconsName, MaterialCommunityIconsName } from "./AnimatedTextInput";

export type AnimatedTextInputProps = {
  value: string;
  placeholder: string;
  inputRef?: React.RefObject<TextInput>;
  onChangeText: (text: string) => void;
  onMapLocationSelect?: () => void;
  onFocus: () => void;
  isFocused: boolean;
  leftIcon1?: { name: IoniconsName; color: string };
  leftIcon2?: { name: MaterialCommunityIconsName; color: string };
  rightIcon1?: { name: IoniconsName; color: string };
  rightIcon2?: { name: MaterialCommunityIconsName; color: string };
};

export type SheetComponentProps = {
  closeRouteSheet: () => void;
};

export type LocationCoords = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

export type LocationProps = {
  name: string;
  coords: LocationCoords | null;
};

export type Address = {
  name: string;
  icon?: string;
  coords: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
};
