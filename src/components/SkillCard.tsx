import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import SkillIcon from './SkillIcon';
import { Skill } from '../data/skills';
import { colors, radius, spacing, typography } from '../theme/colors';
import { fonts } from '../theme/typography';

type Props = {
  skill: Skill;
  onPress: () => void;
  onLongPress: () => void;
};

const levelTint: Record<Skill['level'], { bg: string; fg: string }> = {
  Confident: { bg: colors.mossSoft, fg: colors.moss },
  Studied: { bg: colors.goldSoft, fg: colors.warning },
  Beginner: { bg: colors.emberSoft, fg: colors.emberDark },
};

export default function SkillCard({ skill, onPress, onLongPress }: Props) {
  const tint = levelTint[skill.level];
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      accessibilityRole="button"
      accessibilityLabel={`${skill.name}, ${skill.level}, ${skill.category}`}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={styles.topRow}>
        <SkillIcon name={skill.name} iconKey={skill.iconKey} color={skill.color} size={44} />
        <View style={[styles.levelBadge, { backgroundColor: tint.bg }]}>
          <Text style={[styles.levelText, { color: tint.fg }]}>{skill.level}</Text>
        </View>
      </View>
      <Text style={styles.name} numberOfLines={2}>
        {skill.name}
      </Text>
      <Text style={styles.category}>{skill.category}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    minHeight: 140,
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  cardPressed: { opacity: 0.85 },
  topRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: spacing.sm },
  levelBadge: {
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
  },
  levelText: { fontFamily: fonts.uiBold, fontSize: 11, fontWeight: '700' },
  name: {
    ...typography.h3,
    fontSize: 15,
    marginTop: spacing.md,
    lineHeight: 19,
  },
  category: {
    ...typography.caption,
    marginTop: 2,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});