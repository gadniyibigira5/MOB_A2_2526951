import React, { useCallback, useState } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Screen from '../components/Screen';
import Card from '../components/Card';
import Section from '../components/Section';
import Field from '../components/Field';
import PrimaryButton from '../components/PrimaryButton';
import GradientHeader from '../components/GradientHeader';
import { colors, radius, spacing, typography } from '../theme/colors';
import {
  AVAILABILITY_OPTIONS,
  Availability,
  DEFAULT_PROFILE,
  EditableProfile,
  STUDENT,
} from '../data/profile';
import { loadProfile, persistImage, deleteImage, saveProfile, resetProfile } from '../storage/profileStorage';

type Errors = Partial<Record<'headline' | 'bio' | 'primarySkill', string>>;

export default function ProfileEditorScreen() {
  const [profile, setProfile] = useState<EditableProfile>(DEFAULT_PROFILE);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      loadProfile().then((p) => {
        if (active) {
          setProfile(p);
          setLoaded(true);
        }
      });
      return () => {
        active = false;
      };
    }, [])
  );

  const validate = (p: EditableProfile): Errors => {
    const e: Errors = {};
    const headline = p.headline.trim();
    const bio = p.bio.trim();
    const skill = p.primarySkill.trim();

    if (headline.length === 0) {
      e.headline = 'Headline is required.';
    } else if (headline.length < 6) {
      e.headline = 'Headline must be at least 6 characters.';
    } else if (headline.length > 80) {
      e.headline = 'Headline must be 80 characters or fewer.';
    }

    if (bio.length === 0) {
      e.bio = 'Biography is required.';
    } else if (bio.length < 30) {
      e.bio = 'Biography must be at least 30 characters.';
    } else if (bio.length > 400) {
      e.bio = 'Biography must be 400 characters or fewer.';
    }

    if (skill.length === 0) {
      e.primarySkill = 'Primary skill is required.';
    } else if (skill.length < 2) {
      e.primarySkill = 'Primary skill must be at least 2 characters.';
    }

    return e;
  };

  const onChange = <K extends keyof EditableProfile>(key: K, value: EditableProfile[K]) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
    setStatus(null);
  };

  const onSave = async () => {
    const e = validate(profile);
    setErrors(e);
    if (Object.keys(e).length > 0) {
      setStatus('Please fix the highlighted fields.');
      return;
    }
    setSaving(true);
    try {
      await saveProfile(profile);
      setStatus('Profile saved.');
    } catch {
      setStatus('Could not save profile. Try again.');
    } finally {
      setSaving(false);
    }
  };

  const onPickImage = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert('Permission denied', 'Gallery access is needed to choose a profile photo.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (result.canceled || !result.assets?.length) return;
    try {
      const durable = await persistImage(result.assets[0].uri);
      await deleteImage(profile.imageUri);
      setProfile((prev) => ({ ...prev, imageUri: durable }));
      setStatus('New image selected. Press Save to keep it.');
    } catch {
      setStatus('Could not store that image. Try another one.');
    }
  };

  const onTakePhoto = async () => {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) {
      Alert.alert('Permission denied', 'Camera access is needed to take a profile photo.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (result.canceled || !result.assets?.length) return;
    try {
      const durable = await persistImage(result.assets[0].uri);
      await deleteImage(profile.imageUri);
      setProfile((prev) => ({ ...prev, imageUri: durable }));
      setStatus('New photo captured. Press Save to keep it.');
    } catch {
      setStatus('Could not store that photo. Try again.');
    }
  };

  const onRemoveImage = async () => {
    await deleteImage(profile.imageUri);
    setProfile((prev) => ({ ...prev, imageUri: null }));
    setStatus('Image removed. Press Save to keep the change.');
  };

  const onReset = () => {
    Alert.alert('Reset profile', 'This clears your saved profile and image. Continue?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Reset',
        style: 'destructive',
        onPress: async () => {
          await resetProfile();
          setProfile({ ...DEFAULT_PROFILE });
          setErrors({});
          setStatus('Profile reset to defaults.');
        },
      },
    ]);
  };

  return (
    <Screen>
      <GradientHeader title="Edit profile" subtitle="Changes are saved on this device only." />

      <Section title="Profile image">
        <Card>
          <View style={styles.imageRow}>
            {profile.imageUri ? (
              <Image source={{ uri: profile.imageUri }} style={styles.avatar} accessibilityLabel="Profile image preview" />
            ) : (
              <View style={[styles.avatar, styles.avatarFallback]}>
                <Text style={styles.avatarInitial}>?</Text>
              </View>
            )}
            <View style={styles.imageActions}>
              <PrimaryButton label="Choose from gallery" onPress={onPickImage} variant="outline" style={styles.smallBtn} />
              <PrimaryButton label="Take photo" onPress={onTakePhoto} variant="outline" style={styles.smallBtn} />
              {profile.imageUri ? (
                <PrimaryButton label="Remove image" onPress={onRemoveImage} variant="danger" style={styles.smallBtn} />
              ) : null}
            </View>
          </View>
        </Card>
      </Section>

      <Section title="Professional headline">
        <Field
          label="Headline"
          value={profile.headline}
          onChangeText={(t) => onChange('headline', t)}
          placeholder="e.g. Computer Science student and mobile app developer"
          error={errors.headline}
          maxLength={100}
        />
      </Section>

      <Section title="Short biography">
        <Field
          label="Biography"
          value={profile.bio}
          onChangeText={(t) => onChange('bio', t)}
          placeholder="A short paragraph about you"
          error={errors.bio}
          multiline
          numberOfLines={5}
          style={styles.multiline}
          maxLength={420}
        />
        <Text style={styles.counter}>{profile.bio.length}/400</Text>
      </Section>

      <Section title="Primary skill">
        <Field
          label="Primary skill"
          value={profile.primarySkill}
          onChangeText={(t) => onChange('primarySkill', t)}
          placeholder="e.g. React Native"
          error={errors.primarySkill}
          maxLength={40}
        />
      </Section>

      <Section title="Availability">
        <Card>
          <View style={styles.availRow}>
            {AVAILABILITY_OPTIONS.map((opt) => {
              const active = profile.availability === opt;
              return (
                <Text
                  key={opt}
                  onPress={() => onChange('availability', opt as Availability)}
                  style={[styles.availChip, active && styles.availChipActive]}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}
                >
                  {opt}
                </Text>
              );
            })}
          </View>
        </Card>
      </Section>

      {status ? (
        <Text style={[styles.status, status.startsWith('Profile saved') ? styles.statusOk : styles.statusInfo]}>
          {status}
        </Text>
      ) : null}

      <PrimaryButton label={saving ? 'Saving…' : 'Save profile'} onPress={onSave} loading={saving} />

      <View style={{ height: spacing.md }} />
      <PrimaryButton label="Reset profile" onPress={onReset} variant="danger" />

      {!loaded ? <Text style={styles.counter}>Loading saved profile…</Text> : null}

      <View style={{ height: spacing.xl }} />

      <Section title="About this app">
        <Card>
          <View style={styles.aboutRow}>
            <Text style={styles.aboutLabel}>App name</Text>
            <Text style={styles.aboutValue}>{STUDENT.appName}</Text>
          </View>
          <View style={styles.aboutRow}>
            <Text style={styles.aboutLabel}>Full name</Text>
            <Text style={styles.aboutValue}>{STUDENT.fullName}</Text>
          </View>
          <View style={styles.aboutRow}>
            <Text style={styles.aboutLabel}>Registration number</Text>
            <Text style={styles.aboutValue}>{STUDENT.registrationNumber}</Text>
          </View>
          <View style={styles.aboutRow}>
            <Text style={styles.aboutLabel}>Version</Text>
            <Text style={styles.aboutValue}>{STUDENT.appVersion}</Text>
          </View>
        </Card>

        <Card>
          <Text style={styles.codeLabel}>Verification code</Text>
          <Text style={styles.codeText}>{STUDENT.verificationCode}</Text>
        </Card>

        <Card>
          <Text style={typography.bodyMuted}>
            {STUDENT.appName} stores your profile text, skills, and photos only on this device. Nothing is uploaded
            to a server. Removing a photo, skill, or profile image deletes that data from this device. The app works
            offline; no network connection is required.
          </Text>
        </Card>
      </Section>
    </Screen>
  );
}

const styles = StyleSheet.create({
  imageRow: { flexDirection: 'row', gap: spacing.lg, alignItems: 'center' },
  avatar: { width: 90, height: 90, borderRadius: 45, backgroundColor: colors.surfaceAlt },
  avatarFallback: { alignItems: 'center', justifyContent: 'center' },
  avatarInitial: { fontSize: 32, fontWeight: '800', color: colors.textFaint },
  imageActions: { flex: 1, gap: spacing.sm },
  smallBtn: { paddingVertical: spacing.sm, minHeight: 40 },
  multiline: { minHeight: 110, textAlignVertical: 'top' },
  counter: { ...typography.caption, textAlign: 'right', marginTop: -spacing.xs },
  availRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
  availChip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    color: colors.text,
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
    overflow: 'hidden',
  },
  availChipActive: {
    backgroundColor: colors.emberSoft,
    borderColor: colors.ember,
    color: colors.moss,
    fontWeight: '700',
  },
  status: { textAlign: 'center', marginBottom: spacing.sm, fontWeight: '600' },
  statusOk: { color: colors.success },
  statusInfo: { color: colors.warning },
  aboutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
    gap: spacing.md,
  },
  aboutLabel: { ...typography.bodyMuted, flex: 1 },
  aboutValue: { ...typography.body, flex: 1.2, textAlign: 'right', fontWeight: '600' },
  codeLabel: {
    ...typography.caption,
    color: colors.textMuted,
    letterSpacing: 1,
    textAlign: 'center',
  },
  codeText: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 3,
    color: colors.text,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
});