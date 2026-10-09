import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Screen from '../components/Screen';
import Card from '../components/Card';
import Section from '../components/Section';
import SkillChip from '../components/SkillChip';
import GradientHeader from '../components/GradientHeader';
import { SKILLS } from '../data/skills';
import { EDUCATION } from '../data/education';
import { colors, spacing, typography } from '../theme/colors';

export default function SkillsScreen() {
  return (
    <Screen>
      <GradientHeader title="Skills & Education" subtitle="What I can do and where I learned it." />

      <Section title="Skills">
        {SKILLS.map((s) => (
          <View key={s.name}>
            <SkillChip name={s.name} level={s.level} />
            <Text style={styles.note}>{s.note}</Text>
          </View>
        ))}
      </Section>

      <Section title="Education & training">
        {EDUCATION.map((e) => (
          <Card key={e.institution + e.period}>
            <Text style={styles.inst}>{e.institution}</Text>
            <Text style={styles.program}>{e.program}</Text>
            <Text style={styles.period}>{e.period}</Text>
            <Text style={styles.detail}>{e.detail}</Text>
          </Card>
        ))}
      </Section>
    </Screen>
  );
}

const styles = StyleSheet.create({
  note: { ...typography.bodyMuted, marginTop: -spacing.xs, marginBottom: spacing.sm, marginLeft: spacing.xs },
  inst: { ...typography.h3 },
  program: { ...typography.body, marginTop: 2 },
  period: { color: colors.ember, fontWeight: '600', marginTop: spacing.xs, fontSize: 13 },
  detail: { ...typography.bodyMuted, marginTop: spacing.xs },
});