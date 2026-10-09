import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import SkillIcon from './SkillIcon';
import PrimaryButton from './PrimaryButton';
import { ICON_OPTIONS, SKILL_CATEGORIES, SKILL_LEVELS, SkillCategory, SkillLevel } from '../data/skillCatalog';
import { SkillIconKey } from './icons/SkillIcons';
import { Skill } from '../data/skills';
import { colors, radius, spacing, typography } from '../theme/colors';
import { fonts } from '../theme/typography';

type Props = {
  visible: boolean;
  initialSkill: Skill | null; // null = create
  onClose: () => void;
  onSubmit: (skill: Omit<Skill, 'id'>) => void;
  onDelete?: () => void;
};

const DEFAULT_COLOR = '#E07A5F';

export default function AddSkillSheet({ visible, initialSkill, onClose, onSubmit, onDelete }: Props) {
  const [name, setName] = useState(initialSkill?.name ?? '');
  const [level, setLevel] = useState<SkillLevel>(initialSkill?.level ?? 'Confident');
  const [category, setCategory] = useState<SkillCategory>(initialSkill?.category ?? 'Other');
  const [iconKey, setIconKey] = useState<SkillIconKey | null>(initialSkill?.iconKey ?? null);
  const [color] = useState<string>(initialSkill?.color ?? DEFAULT_COLOR);
  const [error, setError] = useState<string | null>(null);

  const reset = () => {
    setName(initialSkill?.name ?? '');
    setLevel(initialSkill?.level ?? 'Confident');
    setCategory(initialSkill?.category ?? 'Other');
    setIconKey(initialSkill?.iconKey ?? null);
    setError(null);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = () => {
    const trimmed = name.trim();
    if (trimmed.length < 2) {
      setError('Skill name must be at least 2 characters.');
      return;
    }
    if (trimmed.length > 40) {
      setError('Skill name must be 40 characters or fewer.');
      return;
    }
    setError(null);
    onSubmit({ name: trimmed, level, category, color, iconKey });
    reset();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>{initialSkill ? 'Edit skill' : 'New skill'}</Text>
            <Pressable onPress={handleClose} accessibilityRole="button" accessibilityLabel="Close">
              <Text style={styles.close}>✕</Text>
            </Pressable>
          </View>

          <ScrollView keyboardShouldPersistTaps="handled">
            <Text style={styles.label}>Name</Text>
            <TextInput
              value={name}
              onChangeText={(t) => {
                setName(t);
                setError(null);
              }}
              placeholder="e.g. Figma"
              placeholderTextColor={colors.textFaint}
              style={[styles.input, error ? styles.inputError : null]}
              maxLength={50}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Text style={styles.label}>Level</Text>
            <View style={styles.chipRow}>
              {SKILL_LEVELS.map((lvl) => (
                <Pressable
                  key={lvl}
                  onPress={() => setLevel(lvl)}
                  style={[styles.chip, level === lvl && styles.chipActive]}
                  accessibilityRole="button"
                  accessibilityState={{ selected: level === lvl }}
                >
                  <Text style={[styles.chipText, level === lvl && styles.chipTextActive]}>{lvl}</Text>
                </Pressable>
              ))}
            </View>

            <Text style={styles.label}>Category</Text>
            <View style={styles.chipRow}>
              {SKILL_CATEGORIES.map((cat) => (
                <Pressable
                  key={cat}
                  onPress={() => setCategory(cat)}
                  style={[styles.chip, category === cat && styles.chipActive]}
                  accessibilityRole="button"
                  accessibilityState={{ selected: category === cat }}
                >
                  <Text style={[styles.chipText, category === cat && styles.chipTextActive]}>{cat}</Text>
                </Pressable>
              ))}
            </View>

            <Text style={styles.label}>Icon</Text>
            <View style={styles.iconGrid}>
              <Pressable
                onPress={() => setIconKey(null)}
                style={[styles.iconCell, iconKey === null && styles.iconCellActive]}
                accessibilityRole="button"
                accessibilityLabel="Use initial tile"
                accessibilityState={{ selected: iconKey === null }}
              >
                <SkillIcon name={name || '?'} iconKey={null} color={color} size={38} />
                <Text style={styles.iconLabel}>Initial</Text>
              </Pressable>
              {ICON_OPTIONS.map((opt) => {
                const active = iconKey === opt.key;
                return (
                  <Pressable
                    key={opt.key}
                    onPress={() => setIconKey(opt.key)}
                    style={[styles.iconCell, active && styles.iconCellActive]}
                    accessibilityRole="button"
                    accessibilityLabel={opt.label}
                    accessibilityState={{ selected: active }}
                  >
                    <SkillIcon name={opt.label} iconKey={opt.key} color={color} size={38} />
                    <Text style={styles.iconLabel} numberOfLines={1}>
                      {opt.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <View style={styles.actions}>
              {initialSkill && onDelete ? (
                <PrimaryButton
                  label="Delete"
                  onPress={() => {
                    onDelete();
                    reset();
                  }}
                  variant="danger"
                  style={styles.actionBtn}
                />
              ) : null}
              <PrimaryButton label={initialSkill ? 'Save changes' : 'Add skill'} onPress={handleSubmit} style={styles.actionBtn} />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(14,14,16,0.55)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.bg,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    padding: spacing.lg,
    maxHeight: '92%',
  },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.md },
  title: { ...typography.h2 },
  close: { fontSize: 22, color: colors.textMuted, paddingHorizontal: spacing.sm },
  label: { ...typography.h3, fontSize: 14, marginTop: spacing.md, marginBottom: spacing.xs },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: 15,
    fontFamily: fonts.ui,
    color: colors.text,
    backgroundColor: colors.surface,
  },
  inputError: { borderColor: colors.danger },
  error: { color: colors.danger, fontSize: 13, marginTop: spacing.xs, fontFamily: fonts.ui },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
  },
  chipActive: { backgroundColor: colors.emberSoft, borderColor: colors.ember },
  chipText: { fontFamily: fonts.uiMedium, color: colors.text, fontSize: 13 },
  chipTextActive: { color: colors.emberDark, fontWeight: '700' },
  iconGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  iconCell: {
    width: 76,
    alignItems: 'center',
    padding: spacing.xs,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  iconCellActive: { borderColor: colors.ember, backgroundColor: colors.surface },
  iconLabel: {
    fontFamily: fonts.ui,
    fontSize: 10,
    color: colors.textMuted,
    marginTop: 4,
    textAlign: 'center',
  },
  actions: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.lg },
  actionBtn: { flex: 1 },
});