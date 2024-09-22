import { TextInput } from "react-native";
import { IoniconsName, MaterialCommunityIconsName } from "./AnimatedTextInput";
import { UIState } from "@/data/redux/UIStateSlice/slice";
import { LatLng, Region } from "react-native-maps";

export type AnimatedTextInputProps = {
  value: string;
  placeholder: string;
  inputRef?: React.RefObject<TextInput>;
  onChangeText: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onPress?: () => void;
  onIcon1Press?: () => void;
  onIcon2Press?: () => void;
  isFocused: boolean;
  leftIcon1?: { name: IoniconsName; color: string };
  leftIcon2?: { name: MaterialCommunityIconsName; color: string };
  rightIcon1?: { name: IoniconsName; color: string };
  rightIcon2?: { name: MaterialCommunityIconsName; color: string };
};

export type SheetComponentProps = {
  animateToState: (state: UIState) => void;
};

export type LocationProps = {
  name: string;
  coords: Region;
};

export type Address = {
  name: string;
  icon?: string;
  coords: Region;
};

export type LocationSheetProps = {
  animateToState: (animateTo: UIState) => void;
};

export type BottomContentProps = {
  animateToState: (animateTo: UIState) => void;
};
