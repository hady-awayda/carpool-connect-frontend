import { TextStyle } from "react-native";

export const Colors = {
  light: {
    primary: "#40c784",
    secondary: "#5c6afa",
    background: "#f4f4f6",
    backgroundIcon: "#eaeaec",
    backgroundIcons: "#f5f6f8",
    accent: "#95999e",
    blue: "#4782f8",
    error: "#d9534f",
    text: "rgb(49 48 64)",
  },
  dark: {
    primary: "#fff",
    secondary: "#ccc",
    background: "#000",
    accent: "#00bfa5",
    error: "#d9534f",
    text: "#fff",
  },
};

export const Typography: { [key: string]: TextStyle } = {
  heading: {
    fontSize: 24,
    fontFamily: "Urbanist_700Bold",
  },
  heading1: {
    fontSize: 22,
    fontFamily: "Urbanist_700Bold",
  },
  heading2: {
    fontSize: 20,
    fontFamily: "Urbanist_700Bold",
  },
  subheading: {
    fontSize: 18,
    fontFamily: "Urbanist_700Bold",
  },
  title: {
    fontSize: 16,
    fontFamily: "Urbanist_700Bold",
  },
  title2: {
    fontSize: 16,
    fontFamily: "Urbanist_600SemiBold",
  },
  title3: {
    fontSize: 16,
    fontFamily: "Urbanist_500Medium",
  },
  body: {
    fontSize: 15,
    fontFamily: "Urbanist_500Medium",
  },
  text: {
    fontSize: 14,
    fontFamily: "Urbanist_400Regular",
  },
  text2: {
    fontSize: 14,
    fontFamily: "Urbanist_700Bold",
  },
};

export const Spacing = {
  small: 8,
  medium: 16,
  large: 24,
};
