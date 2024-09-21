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
    fontWeight: "bold",
    fontFamily: "Urbanist_700Bold",
  },
  heading2: {
    fontSize: 22,
    fontWeight: "bold",
    fontFamily: "Urbanist_700Bold",
  },
  subheading: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "Urbanist_700Bold",
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Urbanist_700Bold",
  },
  body: {
    fontSize: 16,
    fontWeight: "normal",
    fontFamily: "Urbanist_400Regular",
  },
  Text: {
    fontSize: 14,
    fontWeight: "normal",
    fontFamily: "Urbanist_400Regular",
  },
};

export const Spacing = {
  small: 8,
  medium: 16,
  large: 24,
};
