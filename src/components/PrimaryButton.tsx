import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radius, spacing } from '../theme/colors';
import { gradients } from '../theme/gradients';

type Variant = 'primary' | 'outline' | 'danger';

type Props = {
  label: string;
  onPress: () => void;
  variant?: Variant;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
};

export default function PrimaryButton({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
}: Props) {
  const isDisabled = disabled || loading;

  if (variant === 'primary') {
    return (
      <Pressable
        onPress={onPress}
        disabled={isDisabled}
        accessibilityRole="button"
        accessibilityState={{ disabled: isDisabled }}
        style={({ pressed }) => [{ opacity: isDisabled ? 0.6 : pressed ? 0.9 : 1 }, style]}
      >
        <LinearGradient
          colors={gradients.button}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.base}
        >
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.primaryLabel}>{label}</Text>}
        </LinearGradient>
      </Pressable>
    );
  }

  const outlineStyle = variant === 'danger' ? styles.danger : styles.outline;
  const labelStyle = variant === 'danger' ? styles.dangerLabel : styles.outlineLabel;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
      style={({ pressed }) => [outlineStyle, { opacity: isDisabled ? 0.5 : pressed ? 0.85 : 1 }, style]}
    >
      <Text style={labelStyle}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  primaryLabel: { color: '#fff', fontWeight: '700', fontSize: 16 },
  outline: {
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    borderWidth: 1.5,
    borderColor: colors.ember,
    backgroundColor: colors.surface,
  },
  outlineLabel: { color: colors.ember, fontWeight: '700', fontSize: 16 },
  danger: {
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    borderWidth: 1.5,
    borderColor: colors.danger,
    backgroundColor: colors.surface,
  },
  dangerLabel: { color: colors.danger, fontWeight: '700', fontSize: 16 },
});