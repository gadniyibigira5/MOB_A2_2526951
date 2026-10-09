import React, { useCallback, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Screen from '../components/Screen';
import Card from '../components/Card';
import Section from '../components/Section';
import EmptyState from '../components/EmptyState';
import { colors, radius, spacing, typography } from '../theme/colors';
import { gradients } from '../theme/gradients';
import { STUDENT, DEFAULT_PROFILE, EditableProfile } from '../data/profile';
import { loadProfile } from '../storage/profileStorage';

export default function HomeScreen() {
  const [profile, setProfile] = useState<EditableProfile>(DEFAULT_PROFILE);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      loadProfile().then((p) => {
        if (active) setProfile(p);
      });
      return () => {
        active = false;
      };
    }, [])
  );

  const hasImage = Boolean(profile.imageUri);

  const overlayContent = (
    <View style={styles.overlay}>
      <Text style={styles.intro} accessibilityRole="header">
        {STUDENT.introduction}
      </Text>
      <Text style={styles.headline}>{profile.headline}</Text>
      <View style={styles.codePill}>
        <Text style={styles.codeText}>{STUDENT.verificationCode}</Text>
      </View>
    </View>
  );

  return (
    <Screen>
      {hasImage ? (
        <View style={styles.heroWrap}>
          <ImageBackground
            source={{ uri: profile.imageUri as string }}
            style={styles.heroImage}
            imageStyle={styles.heroImageInner}
            resizeMode="cover"
            accessibilityLabel="Profile hero image"
          >
            <LinearGradient
              colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.35)', 'rgba(0,0,0,0.85)']}
              locations={[0, 0.55, 1]}
              style={styles.scrim}
            >
              {overlayContent}
            </LinearGradient>
          </ImageBackground>
        </View>
      ) : (
        <LinearGradient
          colors={gradients.hero}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroFallback}
        >
          {overlayContent}
        </LinearGradient>
      )}

      <Section title="About me">
        <Card>
          <Text style={typography.body}>{profile.bio}</Text>
        </Card>
      </Section>

      <Section title="Primary skill">
        <Card>
          <Text style={typography.body}>
            <Text style={{ fontWeight: '700' }}>{profile.primarySkill}</Text>
            {'  ·  '}
            {profile.availability}
          </Text>
        </Card>
      </Section>

      <Section title="What you will find here">
        <Card>
          <Text style={typography.bodyMuted}>
            Use the bottom tabs to see my skills and education, explore two student projects, or edit my profile. The
            About tab shows this app&apos;s release information.
          </Text>
        </Card>
      </Section>

      {!hasImage ? (
        <EmptyState
          title="No profile image yet"
          message="Open the Profile tab to take a photo or choose one from your gallery. It will appear as the hero image on this screen."
        />
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  heroWrap: {
    marginBottom: spacing.lg,
    borderRadius: radius.lg,
    overflow: 'hidden',
    backgroundColor: colors.surfaceAlt,
  },
  heroImage: {
    width: '100%',
    aspectRatio: 1,
    justifyContent: 'flex-end',
  },
  heroImageInner: {
    borderRadius: radius.lg,
  },
  heroFallback: {
    borderRadius: radius.lg,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    minHeight: 260,
    justifyContent: 'flex-end',
  },
  scrim: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.lg,
    justifyContent: 'flex-end',
  },
  overlay: {
    alignItems: 'flex-start',
  },
  intro: {
    ...typography.h1,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowRadius: 6,
    textShadowOffset: { width: 0, height: 1 },
  },
  headline: {
    marginTop: spacing.xs,
    fontSize: 15,
    lineHeight: 22,
    color: colors.textOnInk,
    textShadowColor: 'rgba(0,0,0,0.45)',
    textShadowRadius: 6,
    textShadowOffset: { width: 0, height: 1 },
  },
  codePill: {
    marginTop: spacing.md,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
  },
  codeText: {
    color: colors.textOnInk,
    fontWeight: '700',
    letterSpacing: 1,
  },
});