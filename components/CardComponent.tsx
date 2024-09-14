import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography } from '@/constants/theme';

export default function Card({ title, subtitle, details }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Text style={styles.details}>{details}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light.background,
    padding: Spacing.medium,
    marginVertical: Spacing.small,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    ...Typography.heading,
    color: Colors.light.primary,
  },
  subtitle: {
    ...Typography.subheading,
    color: Colors.light.secondary,
  },
  details: {
    ...Typography.body,
    color: Colors.light.text,
  },
});
