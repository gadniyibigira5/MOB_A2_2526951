import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SKILL_ICONS, SkillIconKey } from './icons/SkillIcons';
import { colors, radius } from '../theme/colors';
import { fonts } from '../theme/typography';

type Props = {
  name: string;
  iconKey: SkillIconKey | null;
  color: string;
  size?: number;
};

export default function SkillIcon({ name, iconKey, color, size = 44 }: Props) {
  if (iconKey && SKILL_ICONS[iconKey]) {
    const { Component } = SKILL_ICONS[iconKey];
    return (
      <View style={[styles.tile, { width: size, height: size, backgroundColor: '#FFFFFF' }]}>
        <Component size={size * 0.68} />
      </View>
    );
  }

  // Initial tile — first two meaningful characters of the name
  const initials = computeInitials(name);
  return (
    <View style={[styles.tile, { width: size, height: size, backgroundColor: color }]}>
      <Text style={styles.initials}>{initials}</Text>
    </View>
  );
}

function computeInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return '?';
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }
  return (words[0][0] + words[1][0]).toUpperCase();
}

const styles = StyleSheet.create({
  tile: {
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  initials: {
    fontFamily: fonts.uiBold,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});