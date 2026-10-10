import React, { useState } from 'react';
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import PrimaryButton from './PrimaryButton';
import { Photo, PhotoCategory } from '../data/photos';
import { persistPhoto, readDimensions } from '../storage/photosStorage';
import { colors, radius, spacing } from '../theme/colors';
import { fonts } from '../theme/typography';

type Props = {
  visible: boolean;
  categories: PhotoCategory[];
  onClose: () => void;
  onSubmit: (data: { uri: string; title: string; description: string; category: string; width: number; height: number }) => void;
};

export default function AddPhotoSheet({ visible, categories, onClose, onSubmit }: Props) {
  const [uri, setUri] = useState<string | null>(null);
  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(1);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<PhotoCategory>(categories[0] ?? 'Unsorted');
  const [error, setError] = useState<string | null>(null);

  const reset = () => {
    setUri(null);
    setTitle('');
    setDescription('');
    setCategory(categories[0] ?? 'Unsorted');
    setError(null);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const pickFromGallery = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert('Permission denied', 'Gallery access is needed to add a photo.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.9,
    });
    if (result.canceled || !result.assets?.length) return;
    const src = result.assets[0];
    try {
      const durable = await persistPhoto(src.uri);
      const dims = await readDimensions(durable);
      setUri(durable);
      setWidth(dims.width);
      setHeight(dims.height);
    } catch {
      setError('Could not store that photo. Try again.');
    }
  };

  const takePhoto = async () => {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) {
      Alert.alert('Permission denied', 'Camera access is needed to take a photo.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 0.9,
    });
    if (result.canceled || !result.assets?.length) return;
    const src = result.assets[0];
    try {
      const durable = await persistPhoto(src.uri);
      const dims = await readDimensions(durable);
      setUri(durable);
      setWidth(dims.width);
      setHeight(dims.height);
    } catch {
      setError('Could not store that photo. Try again.');
    }
  };

  const handleSubmit = () => {
    if (!uri) {
      setError('Add a photo first.');
      return;
    }
    const trimmed = title.trim();
    if (trimmed.length < 2) {
      setError('Title must be at least 2 characters.');
      return;
    }
    setError(null);
    onSubmit({ uri, title: trimmed, description: description.trim(), category, width, height });
    reset();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>New photo</Text>
            <Pressable onPress={handleClose} accessibilityRole="button" accessibilityLabel="Close">
              <Text style={styles.close}>✕</Text>
            </Pressable>
          </View>

          <ScrollView keyboardShouldPersistTaps="handled">
            {uri ? (
              <Image source={{ uri }} style={styles.preview} resizeMode="cover" />
            ) : (
              <View style={styles.previewEmpty}>
                <Text style={styles.previewEmptyText}>No photo selected</Text>
              </View>
            )}

            <View style={styles.pickRow}>
              <PrimaryButton label="Gallery" onPress={pickFromGallery} variant="outline" style={styles.pickBtn} />
              <PrimaryButton label="Camera" onPress={takePhoto} variant="outline" style={styles.pickBtn} />
            </View>

            <Text style={styles.label}>Title</Text>
            <TextInput
              value={title}
              onChangeText={(t) => {
                setTitle(t);
                setError(null);
              }}
              placeholder="e.g. Muhanga, first rain"
              placeholderTextColor={colors.textFaint}
              style={styles.input}
              maxLength={60}
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="One sentence about this photo"
              placeholderTextColor={colors.textFaint}
              style={[styles.input, styles.multiline]}
              multiline
              numberOfLines={3}
              maxLength={240}
            />

            <Text style={styles.label}>Category</Text>
            <View style={styles.chipRow}>
              {categories.map((c) => (
                <Pressable
                  key={c}
                  onPress={() => setCategory(c)}
                  style={[styles.chip, category === c && styles.chipActive]}
                  accessibilityRole="button"
                  accessibilityState={{ selected: category === c }}
                >
                  <Text style={[styles.chipText, category === c && styles.chipTextActive]}>{c}</Text>
                </Pressable>
              ))}
            </View>

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <View style={styles.actions}>
              <PrimaryButton label="Add photo" onPress={handleSubmit} style={styles.actionBtn} />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(14,14,16,0.6)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: colors.ink,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    padding: spacing.lg,
    maxHeight: '94%',
  },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.md },
  title: { fontFamily: fonts.display, fontSize: 22, color: colors.textOnInk, fontWeight: '700' },
  close: { fontSize: 22, color: colors.textOnInkMuted, paddingHorizontal: spacing.sm },
  preview: { width: '100%', height: 200, borderRadius: radius.md, marginBottom: spacing.md },
  previewEmpty: {
    width: '100%',
    height: 200,
    borderRadius: radius.md,
    marginBottom: spacing.md,
    backgroundColor: colors.inkAlt,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.inkBorder,
  },
  previewEmptyText: { fontFamily: fonts.ui, color: colors.textOnInkMuted, fontSize: 13 },
  pickRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.sm },
  pickBtn: { flex: 1 },
  label: { fontFamily: fonts.uiBold, fontSize: 13, color: colors.textOnInk, marginTop: spacing.md, marginBottom: spacing.xs },
  input: {
    borderWidth: 1,
    borderColor: colors.inkBorder,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: 15,
    fontFamily: fonts.ui,
    color: colors.textOnInk,
    backgroundColor: colors.inkAlt,
  },
  multiline: { minHeight: 80, textAlignVertical: 'top' },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
  chip: {
    borderWidth: 1,
    borderColor: colors.inkBorder,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.inkAlt,
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
  },
  chipActive: { backgroundColor: colors.ember, borderColor: colors.ember },
  chipText: { fontFamily: fonts.uiMedium, color: colors.textOnInk, fontSize: 13 },
  chipTextActive: { color: '#FFFFFF', fontWeight: '700' },
  error: { color: colors.ember, fontSize: 13, marginTop: spacing.sm, fontFamily: fonts.ui },
  actions: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.lg },
  actionBtn: { flex: 1 },
});