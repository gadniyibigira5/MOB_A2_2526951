import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Screen from '../components/Screen';
import Card from '../components/Card';
import Section from '../components/Section';
import EmptyState from '../components/EmptyState';
import { PROJECTS } from '../data/projects';
import { RootStackParamList } from '../navigation/types';
import { colors, radius, spacing, typography } from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'ProjectDetail'>;

export default function ProjectDetailScreen({ route }: Props) {
  const { projectId } = route.params;
  const project = PROJECTS.find((p) => p.id === projectId);

  if (!project) {
    return (
      <Screen>
        <EmptyState title="Project not found" message="That project does not exist in this app." />
      </Screen>
    );
  }

  return (
    <Screen>
      <Text style={styles.title}>{project.title}</Text>
      <Text style={styles.summary}>{project.summary}</Text>

      <Section title="Problem">
        <Card>
          <Text style={typography.body}>{project.problem}</Text>
        </Card>
      </Section>

      <Section title="My contribution">
        <Card>
          <Text style={typography.body}>{project.contribution}</Text>
        </Card>
      </Section>

      <Section title="Technologies used">
        <Card>
          <View style={styles.techRow}>
            {project.technologies.map((t) => (
              <View key={t} style={styles.tech}>
                <Text style={styles.techText}>{t}</Text>
              </View>
            ))}
          </View>
        </Card>
      </Section>

      <Section title="Offline behaviour">
        <Card>
          <Text style={typography.body}>
            {project.offline
              ? 'This project was designed to keep working without a network connection.'
              : 'This project requires a network connection for its main features.'}
          </Text>
        </Card>
      </Section>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...typography.h1, marginBottom: spacing.xs },
  summary: { ...typography.bodyMuted, marginBottom: spacing.lg },
  techRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
  tech: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
  },
  techText: { fontSize: 12, color: colors.textMuted, fontWeight: '600' },
});