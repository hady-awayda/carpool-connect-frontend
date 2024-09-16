import { TextStyle } from "react-native";

export const Colors = {
  light: {
    primary: "#40c784",
    secondary: "#5c6afa",
    background: "#f4f4f6",
    backgroundIcon: "#eaeaec",
    backgroundIcons: "#f5f6f8",
    accent: "#40c784",
    error: "#d9534f",
    text: "#333",
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
  },
  subheading: {
    fontSize: 18,
    fontWeight: "600",
  },
  body: {
    fontSize: 16,
    fontWeight: "normal",
  },
};

export const Spacing = {
  small: 8,
  medium: 16,
  large: 24,
};
