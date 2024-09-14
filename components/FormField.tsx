import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography } from '@/constants/theme';

export default function InputField({ label, value, onChangeText, placeholder }) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.light.secondary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.medium,
  },
  label: {
    ...Typography.subheading,
    color: Colors.light.primary,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.light.secondary,
    padding: Spacing.medium,
    borderRadius: 8,
    color: Colors.light.text,
  },
});
