import React, { useCallback, useMemo, useState } from 'react';
import { Alert, Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Screen from '../components/Screen';
import PhotoCard from '../components/PhotoCard';
import AddPhotoSheet from '../components/AddPhotoSheet';
import PhotoDetailSheet from '../components/PhotoDetailSheet';
import { Photo } from '../data/photos';
import {
  deletePhotoFile,
  loadCategories,
  loadPhotos,
  newPhotoId,
  saveCategories,
  savePhotos,
} from '../storage/photosStorage';
import { colors, radius, spacing } from '../theme/colors';
import { fonts } from '../theme/typography';

const GUTTER = spacing.sm;

export default function PhotographyScreen() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [categories, setCategories] = useState<string[]>(['Favorites', 'Unsorted', 'In Progress']);
  const [filter, setFilter] = useState<string>('All');
  const [addOpen, setAddOpen] = useState(false);
  const [detail, setDetail] = useState<Photo | null>(null);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      Promise.all([loadPhotos(), loadCategories()]).then(([p, c]) => {
        if (active) {
          setPhotos(p);
          setCategories(c);
        }
      });
      return () => {
        active = false;
      };
    }, [])
  );

  const screenWidth = Dimensions.get('window').width;
  // approximate content width: screen - Screen component padding (16 each side) - one gutter
  const contentWidth = Math.max(220, screenWidth - spacing.lg * 2);
  const columnWidth = (contentWidth - GUTTER) / 2;

  const visible = filter === 'All' ? photos : photos.filter((p) => p.category === filter);

  // Split into two columns by alternating (simple masonry that keeps order)
  const columns = useMemo(() => {
    const left: Photo[] = [];
    const right: Photo[] = [];
    visible.forEach((p, i) => {
      (i % 2 === 0 ? left : right).push(p);
    });
    return { left, right };
  }, [visible]);

  const persist = async (next: Photo[]) => {
    setPhotos(next);
    await savePhotos(next);
  };

  const handleAddPhoto = async (data: {
    uri: string;
    title: string;
    description: string;
    category: string;
    width: number;
    height: number;
  }) => {
    const next: Photo[] = [
      {
        id: newPhotoId(),
        uri: data.uri,
        title: data.title,
        description: data.description,
        category: data.category,
        capturedAt: new Date().toISOString(),
        width: data.width,
        height: data.height,
      },
      ...photos,
    ];
    await persist(next);
    setAddOpen(false);
  };

  const handleDelete = async (id: string) => {
    const photo = photos.find((p) => p.id === id);
    if (!photo) return;
    await deletePhotoFile(photo.uri);
    const next = photos.filter((p) => p.id !== id);
    await persist(next);
  };

  const promptNewCategory = () => {
    Alert.prompt?.(
      'New category',
      'Give this category a short name.',
      async (text?: string) => {
        const name = (text ?? '').trim();
        if (name.length < 2) return;
        if (categories.includes(name)) return;
        const next = [...categories, name];
        setCategories(next);
        await saveCategories(next);
      },
      'plain-text'
    );
    // Note: Alert.prompt is iOS-only. On Android/web we rely on the fallback below.
  };

  const addCategoryFallback = async (name: string) => {
    const trimmed = name.trim();
    if (trimmed.length < 2 || categories.includes(trimmed)) return;
    const next = [...categories, trimmed];
    setCategories(next);
    await saveCategories(next);
  };

  return (
    <Screen scroll={false}>
      <View style={styles.wrap}>
        <LinearGradient colors={['#0E0E10', '#1A1A1D']} style={styles.hero}>
          <Text style={styles.heroTitle} accessibilityRole="header">
            Through My Eyes
          </Text>
          <Text style={styles.heroSubtitle}>Photos I have taken. Tap one to read about it.</Text>
        </LinearGradient>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.chipScroll}
          contentContainerStyle={styles.chipRow}
        >
          <Pressable
            onPress={() => setFilter('All')}
            style={[styles.chip, filter === 'All' && styles.chipActive]}
          >
            <Text style={[styles.chipText, filter === 'All' && styles.chipTextActive]}>All</Text>
          </Pressable>
          {categories.map((c) => (
            <Pressable
              key={c}
              onPress={() => setFilter(c)}
              style={[styles.chip, filter === c && styles.chipActive]}
            >
              <Text style={[styles.chipText, filter === c && styles.chipTextActive]}>{c}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <ScrollView contentContainerStyle={styles.gridContent} showsVerticalScrollIndicator={false}>
          {visible.length === 0 ? (
            <View style={styles.empty}>
              <Text style={styles.emptyTitle}>No photos yet.</Text>
              <Text style={styles.emptyText}>Tap the + card below to add your first one.</Text>
            </View>
          ) : (
            <View style={styles.masonry}>
              <View style={styles.column}>
                {columns.left.map((p) => (
                  <PhotoCard
                    key={p.id}
                    photo={p}
                    columnWidth={columnWidth}
                    onPress={() => setDetail(p)}
                    onLongPress={() => confirmDelete(p)}
                  />
                ))}
              </View>
              <View style={styles.column}>
                {columns.right.map((p) => (
                  <PhotoCard
                    key={p.id}
                    photo={p}
                    columnWidth={columnWidth}
                    onPress={() => setDetail(p)}
                    onLongPress={() => confirmDelete(p)}
                  />
                ))}
              </View>
            </View>
          )}

          <Pressable
            onPress={() => setAddOpen(true)}
            style={styles.addCard}
            accessibilityRole="button"
            accessibilityLabel="Add a new photo"
          >
            <Text style={styles.addPlus}>＋</Text>
            <Text style={styles.addLabel}>Add a photo</Text>
          </Pressable>
        </ScrollView>
      </View>

      <AddPhotoSheet
        visible={addOpen}
        categories={categories}
        onClose={() => setAddOpen(false)}
        onSubmit={handleAddPhoto}
      />
      <PhotoDetailSheet photo={detail} onClose={() => setDetail(null)} onDelete={handleDelete} />
    </Screen>
  );

  function confirmDelete(photo: Photo) {
    Alert.alert('Remove photo', `Remove "${photo.title}"?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: () => handleDelete(photo.id) },
    ]);
  }
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.ink },
  hero: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.inkBorder,
  },
  heroTitle: { fontFamily: fonts.display, fontSize: 26, color: colors.textOnInk, fontWeight: '700' },
  heroSubtitle: { fontFamily: fonts.ui, fontSize: 14, color: colors.textOnInkMuted, marginTop: 4 },
  chipScroll: { flexGrow: 0, flexShrink: 0 },
  chipRow: { paddingHorizontal: spacing.lg, paddingVertical: spacing.md, gap: spacing.xs },
  chip: {
    borderWidth: 1,
    borderColor: colors.inkBorder,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    backgroundColor: colors.inkAlt,
    marginRight: spacing.xs,
  },
  chipActive: { backgroundColor: colors.ember, borderColor: colors.ember },
  chipText: { fontFamily: fonts.uiMedium, color: colors.textOnInk, fontSize: 12 },
  chipTextActive: { color: '#FFFFFF', fontWeight: '700' },
  gridContent: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl },
  masonry: { flexDirection: 'row', gap: GUTTER },
  column: { flex: 1, gap: GUTTER },
  empty: { padding: spacing.xl, alignItems: 'center' },
  emptyTitle: { fontFamily: fonts.displaySemi, fontSize: 18, color: colors.textOnInk, marginBottom: spacing.xs },
  emptyText: { fontFamily: fonts.ui, fontSize: 14, color: colors.textOnInkMuted, textAlign: 'center' },
  addCard: {
    marginTop: spacing.md,
    height: 80,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.ember,
    backgroundColor: colors.inkAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPlus: { fontSize: 30, color: colors.ember, fontFamily: fonts.ui, lineHeight: 34 },
  addLabel: { fontFamily: fonts.uiBold, color: colors.ember, fontSize: 13, marginTop: 4 },
});