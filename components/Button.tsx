import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '@/constants/theme';

export default function Button({ title, onPress, style, disabled = false }) {
  return (
    <TouchableOpacity
      style={[styles.button, style, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.light.accent,
    padding: Spacing.medium,
    borderRadius: 8,
    alignItems: 'center',
  },
  text: {
    ...Typography.body,
    color: Colors.light.primary,
  },
  disabled: {
    backgroundColor: Colors.light.secondary,
  },
});
