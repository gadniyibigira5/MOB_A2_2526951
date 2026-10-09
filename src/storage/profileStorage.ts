import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system/legacy';
import { DEFAULT_PROFILE, EditableProfile } from '../data/profile';

const PROFILE_KEY = '@gadportfolio/profile/v1';
const IMAGE_DIR = FileSystem.documentDirectory + 'profile-images/';

async function ensureImageDir(): Promise<void> {
  const info = await FileSystem.getInfoAsync(IMAGE_DIR);
  if (!info.exists) {
    await FileSystem.makeDirectoryAsync(IMAGE_DIR, { intermediates: true });
  }
}

/**
 * Copies a picked image into the app's document directory so the URI survives
 * restarts (image-picker cache URIs can be cleared by the OS).
 */
export async function persistImage(sourceUri: string): Promise<string> {
  await ensureImageDir();
  const ext = sourceUri.split('.').pop()?.split('?')[0] || 'jpg';
  const target = `${IMAGE_DIR}avatar-${Date.now()}.${ext}`;
  await FileSystem.copyAsync({ from: sourceUri, to: target });
  return target;
}

export async function deleteImage(uri: string | null): Promise<void> {
  if (!uri) return;
  try {
    const info = await FileSystem.getInfoAsync(uri);
    if (info.exists) {
      await FileSystem.deleteAsync(uri, { idempotent: true });
    }
  } catch {
    // non-fatal
  }
}

export async function loadProfile(): Promise<EditableProfile> {
  try {
    const raw = await AsyncStorage.getItem(PROFILE_KEY);
    if (!raw) return { ...DEFAULT_PROFILE };
    const parsed = JSON.parse(raw) as Partial<EditableProfile>;
    return {
      ...DEFAULT_PROFILE,
      ...parsed,
      imageUri: typeof parsed.imageUri === 'string' ? parsed.imageUri : null,
    };
  } catch {
    return { ...DEFAULT_PROFILE };
  }
}

export async function saveProfile(profile: EditableProfile): Promise<void> {
  await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export async function resetProfile(): Promise<void> {
  const current = await loadProfile();
  await deleteImage(current.imageUri);
  await AsyncStorage.removeItem(PROFILE_KEY);
}