import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEFAULT_SKILLS, Skill } from '../data/skills';

const SKILLS_KEY = '@gadportfolio/skills/v1';

export async function loadSkills(): Promise<Skill[]> {
  try {
    const raw = await AsyncStorage.getItem(SKILLS_KEY);
    if (!raw) return [...DEFAULT_SKILLS];
    const parsed = JSON.parse(raw) as Skill[];
    if (!Array.isArray(parsed)) return [...DEFAULT_SKILLS];
    return parsed;
  } catch {
    return [...DEFAULT_SKILLS];
  }
}

export async function saveSkills(skills: Skill[]): Promise<void> {
  await AsyncStorage.setItem(SKILLS_KEY, JSON.stringify(skills));
}

export function newSkillId(): string {
  return `sk-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

export async function resetSkills(): Promise<Skill[]> {
  await AsyncStorage.removeItem(SKILLS_KEY);
  return [...DEFAULT_SKILLS];
}