import { SkillIconKey } from '../components/icons/SkillIcons';

export const SKILL_CATEGORIES = [
  'Mobile',
  'Web',
  'Language',
  'Design',
  'Tools',
  'Other',
] as const;

export type SkillCategory = (typeof SKILL_CATEGORIES)[number];

export const SKILL_LEVELS = ['Confident', 'Studied', 'Beginner'] as const;
export type SkillLevel = (typeof SKILL_LEVELS)[number];

// For initial-tile fallback when the user adds a custom skill
export const INITIAL_TILE_COLORS = [
  '#E07A5F', // ember
  '#3D5A40', // moss
  '#E9C46A', // gold
  '#3178C6', // blue
  '#F05032', // git orange
  '#A259FF', // figma purple
  '#31A8FF', // adobe blue
  '#D24726', // powerpoint orange
] as const;

export type IconChoice = { kind: 'known'; key: SkillIconKey } | { kind: 'initial' };

export const ICON_OPTIONS: { key: SkillIconKey; label: string }[] = [
  { key: 'react', label: 'React' },
  { key: 'typescript', label: 'TypeScript' },
  { key: 'javascript', label: 'JavaScript' },
  { key: 'html', label: 'HTML' },
  { key: 'css', label: 'CSS' },
  { key: 'node', label: 'Node.js' },
  { key: 'python', label: 'Python' },
  { key: 'git', label: 'Git' },
];