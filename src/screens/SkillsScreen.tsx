import React, { useCallback, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Screen from '../components/Screen';
import Card from '../components/Card';
import Section from '../components/Section';
import GradientHeader from '../components/GradientHeader';
import SkillCard from '../components/SkillCard';
import AddSkillSheet from '../components/AddSkillSheet';
import { Skill } from '../data/skills';
import { SkillLevel } from '../data/skillCatalog';
import { loadSkills, newSkillId, saveSkills } from '../storage/skillsStorage';
import { EDUCATION } from '../data/education';
import { colors, radius, spacing, typography } from '../theme/colors';
import { fonts } from '../theme/typography';

type Filter = 'All' | SkillLevel;
const FILTERS: Filter[] = ['All', 'Confident', 'Studied', 'Beginner'];

export default function SkillsScreen() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [filter, setFilter] = useState<Filter>('All');
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editing, setEditing] = useState<Skill | null>(null);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      loadSkills().then((s) => {
        if (active) setSkills(s);
      });
      return () => {
        active = false;
      };
    }, [])
  );

  const persist = async (next: Skill[]) => {
    setSkills(next);
    await saveSkills(next);
  };

  const openCreate = () => {
    setEditing(null);
    setSheetOpen(true);
  };

  const openEdit = (skill: Skill) => {
    setEditing(skill);
    setSheetOpen(true);
  };

  const handleSubmit = async (data: Omit<Skill, 'id'>) => {
    if (editing) {
      const next = skills.map((s) => (s.id === editing.id ? { ...s, ...data } : s));
      await persist(next);
    } else {
      const next = [...skills, { id: newSkillId(), ...data }];
      await persist(next);
    }
    setSheetOpen(false);
    setEditing(null);
  };

  const handleDelete = async () => {
    if (!editing) return;
    const next = skills.filter((s) => s.id !== editing.id);
    await persist(next);
    setSheetOpen(false);
    setEditing(null);
  };

  const visible = filter === 'All' ? skills : skills.filter((s) => s.level === filter);

  const rows: (Skill | null)[][] = [];
  for (let i = 0; i < visible.length; i += 2) {
    rows.push([visible[i], visible[i + 1] ?? null]);
  }

  return (
    <Screen>
      <GradientHeader title="Skills & Education" subtitle="What I can do and where I learned it." />

      <View style={styles.filterRow}>
        {FILTERS.map((f) => (
          <Pressable
            key={f}
            onPress={() => setFilter(f)}
            style={[styles.filterChip, filter === f && styles.filterChipActive]}
            accessibilityRole="button"
            accessibilityState={{ selected: filter === f }}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>{f}</Text>
          </Pressable>
        ))}
      </View>

      {rows.map((pair, i) => (
        <View key={i} style={styles.row}>
          {pair[0] ? (
            <SkillCard
              skill={pair[0]}
              onPress={() => openEdit(pair[0] as Skill)}
              onLongPress={() => openEdit(pair[0] as Skill)}
            />
          ) : (
            <View style={styles.spacer} />
          )}
          {pair[1] ? (
            <SkillCard
              skill={pair[1]}
              onPress={() => openEdit(pair[1] as Skill)}
              onLongPress={() => openEdit(pair[1] as Skill)}
            />
          ) : (
            <View style={styles.spacer} />
          )}
        </View>
      ))}

      <Pressable
        onPress={openCreate}
        style={styles.addCardFull}
        accessibilityRole="button"
        accessibilityLabel="Add a new skill"
      >
        <Text style={styles.addPlus}>＋</Text>
        <Text style={styles.addLabel}>Add a new skill</Text>
      </Pressable>

      {visible.length === 0 ? (
        <Card>
          <Text style={typography.bodyMuted}>No skills match this filter yet.</Text>
        </Card>
      ) : null}

      <Section title="Education & training">
        {EDUCATION.map((e) => (
          <Card key={e.institution + e.period}>
            <Text style={typography.h3}>{e.institution}</Text>
            <Text style={[typography.body, { marginTop: 2 }]}>{e.program}</Text>
            <Text style={styles.period}>{e.period}</Text>
            <Text style={[typography.bodyMuted, { marginTop: spacing.xs }]}>{e.detail}</Text>
          </Card>
        ))}
      </Section>

      <AddSkillSheet
        visible={sheetOpen}
        initialSkill={editing}
        onClose={() => {
          setSheetOpen(false);
          setEditing(null);
        }}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  filterRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs, marginBottom: spacing.md },
  filterChip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    backgroundColor: colors.surface,
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
  },
  filterChipActive: { backgroundColor: colors.emberSoft, borderColor: colors.ember },
  filterText: { fontFamily: fonts.uiMedium, color: colors.text, fontSize: 12 },
  filterTextActive: { color: colors.emberDark, fontWeight: '700' },
  row: { flexDirection: 'row', gap: spacing.md },
  spacer: { flex: 1 },
  addCardFull: {
    minHeight: 80,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.ember,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    marginTop: spacing.xs,
  },
  addPlus: { fontSize: 30, color: colors.ember, fontFamily: fonts.ui, lineHeight: 34 },
  addLabel: { fontFamily: fonts.uiBold, color: colors.ember, fontSize: 13, marginTop: 4 },
  period: { fontFamily: fonts.uiBold, color: colors.ember, fontWeight: '600', marginTop: spacing.xs, fontSize: 13 },
});