/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export const Colors1 = {
  light: {
    primary: "#333",
    secondary: "#555",
    background: "#f8f8f8",
    accent: "#00bfa5",
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

export const Typography = {
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subheading: {
    fontSize: 18,
    fontWeight: '600',
  },
  body: {
    fontSize: 16,
    fontWeight: 'normal',
  },
};

export const Spacing = {
  small: 8,
  medium: 16,
  large: 24,
};
