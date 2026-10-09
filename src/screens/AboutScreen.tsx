import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Screen from '../components/Screen';
import Card from '../components/Card';
import Section from '../components/Section';
import GradientHeader from '../components/GradientHeader';
import { STUDENT } from '../data/profile';
import { colors, radius, spacing, typography } from '../theme/colors';

export default function AboutScreen() {
  return (
    <Screen>
      <GradientHeader title={STUDENT.appName} subtitle="Release and identity information." />

      <Section title="Student">
        <Card>
          <Row label="Full name" value={STUDENT.fullName} />
          <Row label="Registration number" value={STUDENT.registrationNumber} />
          <View style={styles.codeBox}>
            <Text style={styles.codeLabel}>Verification code</Text>
            <Text style={styles.code}>{STUDENT.verificationCode}</Text>
          </View>
        </Card>
      </Section>

      <Section title="Application">
        <Card>
          <Row label="App name" value={STUDENT.appName} />
          <Row label="Version" value={STUDENT.appVersion} />
          <Row label="Platform" value="Android (standalone APK)" />
        </Card>
      </Section>

      <Section title="Data use">
        <Card>
          <Text style={typography.body}>
            {STUDENT.appName} stores your profile text and the profile image you choose only on this device, using local
            storage. Nothing is uploaded to a server. Removing the profile image or resetting the profile deletes that
            data from this device. The app works offline; no network connection is required for any core feature.
          </Text>
        </Card>
      </Section>
    </Screen>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.xs, gap: spacing.md },
  rowLabel: { ...typography.bodyMuted, flex: 1 },
  rowValue: { ...typography.body, flex: 1.2, textAlign: 'right', fontWeight: '600' },
  codeBox: {
    marginTop: spacing.md,
    backgroundColor: colors.emberSoft,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: 'center',
  },
  codeLabel: { ...typography.caption, color: colors.moss },
  code: { fontSize: 22, fontWeight: '800', letterSpacing: 2, color: 	colors.moss, marginTop: spacing.xs },
});