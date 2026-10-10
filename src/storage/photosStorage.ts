import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system/legacy';
import * as ImageManipulator from 'expo-image-manipulator';
import {
  DEFAULT_CATEGORIES,
  PHOTO_CATEGORIES_KEY,
  PHOTOS_KEY,
  Photo,
  PhotoCategory,
} from '../data/photos';

const PHOTO_DIR = FileSystem.documentDirectory + 'photos/';

async function ensurePhotoDir(): Promise<void> {
  const info = await FileSystem.getInfoAsync(PHOTO_DIR);
  if (!info.exists) {
    await FileSystem.makeDirectoryAsync(PHOTO_DIR, { intermediates: true });
  }
}

export async function persistPhoto(sourceUri: string): Promise<string> {
  await ensurePhotoDir();
  const ext = sourceUri.split('.').pop()?.split('?')[0] || 'jpg';
  const target = `${PHOTO_DIR}photo-${Date.now()}.${ext}`;
  await FileSystem.copyAsync({ from: sourceUri, to: target });
  return target;
}

export async function readDimensions(uri: string): Promise<{ width: number; height: number }> {
  try {
    const result = await ImageManipulator.manipulateAsync(uri, [], { compress: 1 });
    return { width: result.width, height: result.height };
  } catch {
    return { width: 1, height: 1 };
  }
}

export async function deletePhotoFile(uri: string): Promise<void> {
  try {
    const info = await FileSystem.getInfoAsync(uri);
    if (info.exists) {
      await FileSystem.deleteAsync(uri, { idempotent: true });
    }
  } catch {
    // non-fatal
  }
}

export async function loadPhotos(): Promise<Photo[]> {
  try {
    const raw = await AsyncStorage.getItem(PHOTOS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Photo[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function savePhotos(photos: Photo[]): Promise<void> {
  await AsyncStorage.setItem(PHOTOS_KEY, JSON.stringify(photos));
}

export async function loadCategories(): Promise<PhotoCategory[]> {
  try {
    const raw = await AsyncStorage.getItem(PHOTO_CATEGORIES_KEY);
    if (!raw) return [...DEFAULT_CATEGORIES];
    const parsed = JSON.parse(raw) as PhotoCategory[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [...DEFAULT_CATEGORIES];
  } catch {
    return [...DEFAULT_CATEGORIES];
  }
}

export async function saveCategories(categories: PhotoCategory[]): Promise<void> {
  await AsyncStorage.setItem(PHOTO_CATEGORIES_KEY, JSON.stringify(categories));
}

export function newPhotoId(): string {
  return `ph-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}