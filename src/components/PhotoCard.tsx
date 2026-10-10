import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Photo } from '../data/photos';
import { colors, radius, spacing } from '../theme/colors';
import { fonts } from '../theme/typography';

type Props = {
  photo: Photo;
  columnWidth: number;
  onPress: () => void;
  onLongPress: () => void;
};

export default function PhotoCard({ photo, columnWidth, onPress, onLongPress }: Props) {
  const ratio = photo.height > 0 && photo.width > 0 ? photo.height / photo.width : 1;
  // Clamp ratio to avoid absurdly tall/short tiles
  const clampedRatio = Math.min(Math.max(ratio, 0.6), 1.8);
  const height = columnWidth * clampedRatio;

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      accessibilityRole="button"
      accessibilityLabel={`${photo.title}, ${photo.category}`}
      style={({ pressed }) => [styles.card, { width: columnWidth, height }, pressed && { opacity: 0.9 }]}
    >
      <Image source={{ uri: photo.uri }} style={styles.image} resizeMode="cover" />
      <LinearGradient
        colors={['rgba(14,14,16,0)', 'rgba(14,14,16,0.85)']}
        style={styles.scrim}
        pointerEvents="none"
      />
      <View style={styles.overlay}>
        <Text style={styles.title} numberOfLines={2}>
          {photo.title || 'Untitled'}
        </Text>
        <Text style={styles.category}>{photo.category}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.md,
    overflow: 'hidden',
    backgroundColor: colors.inkAlt,
    marginBottom: spacing.sm,
  },
   image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  scrim: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: spacing.sm,
  },
  title: {
    fontFamily: fonts.uiBold,
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '700',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowRadius: 4,
    textShadowOffset: { width: 0, height: 1 },
  },
  category: {
    fontFamily: fonts.ui,
    fontSize: 10,
    color: '#F5F1EA',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginTop: 2,
  },
});