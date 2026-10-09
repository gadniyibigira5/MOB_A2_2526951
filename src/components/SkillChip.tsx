import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../theme/colors';

type Props = {
  name: string;
  level: 'Confident' | 'Studied' | 'Beginner';
};

const levelColor: Record<Props['level'], { bg: string; fg: string }> = {
  Confident: { bg: colors.successSoft, fg: colors.success },
  Studied: { bg: colors.mossSoft, fg: colors.moss },
  Beginner: { bg: colors.warningSoft, fg: colors.warning },
};

export default function SkillChip({ name, level }: Props) {
  const c = levelColor[level];
  return (
    <View style={styles.chip}>
      <Text style={styles.name}>{name}</Text>
      <View style={[styles.badge, { backgroundColor: c.bg }]}>
        <Text style={[styles.badgeText, { color: c.fg }]}>{level}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  name: { flex: 1, fontSize: 15, fontWeight: '600', color: colors.text },
  badge: {
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  badgeText: { fontSize: 12, fontWeight: '700' },
});