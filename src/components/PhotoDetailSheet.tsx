import React from 'react';
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import PrimaryButton from './PrimaryButton';
import { Photo } from '../data/photos';
import { colors, radius, spacing } from '../theme/colors';
import { fonts } from '../theme/typography';

type Props = {
  photo: Photo | null;
  onClose: () => void;
  onDelete: (id: string) => void;
};

export default function PhotoDetailSheet({ photo, onClose, onDelete }: Props) {
  if (!photo) return null;

  return (
    <Modal visible={!!photo} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.category}>{photo.category}</Text>
            <Pressable onPress={onClose} accessibilityRole="button" accessibilityLabel="Close">
              <Text style={styles.close}>✕</Text>
            </Pressable>
          </View>

          <ScrollView>
            <Image
              source={{ uri: photo.uri }}
              style={[styles.image, { aspectRatio: photo.width / photo.height || 1 }]}
              resizeMode="contain"
            />
            <Text style={styles.title}>{photo.title}</Text>
            {photo.description ? <Text style={styles.description}>{photo.description}</Text> : null}
            <Text style={styles.date}>{new Date(photo.capturedAt).toLocaleDateString()}</Text>

            <View style={styles.actions}>
              <PrimaryButton
                label="Remove photo"
                variant="danger"
                onPress={() => {
                  onDelete(photo.id);
                  onClose();
                }}
                style={styles.actionBtn}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(14,14,16,0.8)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: colors.ink,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    padding: spacing.lg,
    maxHeight: '94%',
  },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.md },
  category: {
    fontFamily: fonts.uiBold,
    fontSize: 12,
    color: colors.gold,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  close: { fontSize: 22, color: colors.textOnInkMuted, paddingHorizontal: spacing.sm },
  image: { width: '100%', borderRadius: radius.md, backgroundColor: colors.inkAlt, marginBottom: spacing.md },
  title: { fontFamily: fonts.display, fontSize: 22, color: colors.textOnInk, fontWeight: '700' },
  description: { fontFamily: fonts.ui, fontSize: 15, color: colors.textOnInkMuted, marginTop: spacing.sm, lineHeight: 22 },
  date: { fontFamily: fonts.ui, fontSize: 12, color: colors.textOnInkMuted, marginTop: spacing.md, letterSpacing: 0.3 },
  actions: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.lg },
  actionBtn: { flex: 1 },
});