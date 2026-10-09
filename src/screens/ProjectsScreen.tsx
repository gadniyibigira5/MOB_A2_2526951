import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import Screen from '../components/Screen';
import Card from '../components/Card';
import Section from '../components/Section';
import GradientHeader from '../components/GradientHeader';
import { LinearGradient } from 'expo-linear-gradient';
import { gradients } from '../theme/gradients';
import { PROJECTS } from '../data/projects';
import { RootStackParamList, TabParamList } from '../navigation/types';
import { colors, radius, spacing, typography } from '../theme/colors';

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Projects'>,
  NativeStackScreenProps<RootStackParamList>
>;

export default function ProjectsScreen({ navigation }: Props) {
  return (
    <Screen>
      <GradientHeader title="Projects" subtitle="Two student projects with real work behind them." />

      <Section title="Selected work">
        {PROJECTS.map((p) => (
          <Pressable
            key={p.id}
            onPress={() => navigation.navigate('ProjectDetail', { projectId: p.id })}
            accessibilityRole="button"
            accessibilityLabel={`Open ${p.title} details`}
            style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}
          >
            <Card>
              <LinearGradient
                colors={gradients.accent}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.strip}
              />
              <Text style={styles.title}>{p.title}</Text>
              <Text style={styles.summary}>{p.summary}</Text>
              <View style={styles.techRow}>
                {p.technologies.slice(0, 4).map((t) => (
                  <View key={t} style={styles.tech}>
                    <Text style={styles.techText}>{t}</Text>
                  </View>
                ))}
              </View>
              <Text style={styles.more}>View details ›</Text>
            </Card>
          </Pressable>
        ))}
      </Section>
    </Screen>
  );
}

const styles = StyleSheet.create({
  strip: { height: 4, borderRadius: 2, marginBottom: spacing.md, width: 56 },
  title: { ...typography.h3, marginBottom: spacing.xs },
  summary: { ...typography.bodyMuted, marginBottom: spacing.md },
  techRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
  tech: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
  },
  techText: { fontSize: 12, color: colors.textMuted, fontWeight: '600' },
  more: { marginTop: spacing.md, color: colors.ember, fontWeight: '700' },
});