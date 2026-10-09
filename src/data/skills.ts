import { SkillIconKey } from '../components/icons/SkillIcons';
import { SkillCategory, SkillLevel } from './skillCatalog';

export type Skill = {
  id: string;
  name: string;
  level: SkillLevel;
  category: SkillCategory;
  color: string;
  iconKey: SkillIconKey | null; // null = use initial tile
};

export const DEFAULT_SKILLS: Skill[] = [
  { id: 'sk-react-native', name: 'React Native', level: 'Confident', category: 'Mobile', color: '#61DAFB', iconKey: 'react' },
  { id: 'sk-typescript', name: 'TypeScript', level: 'Confident', category: 'Language', color: '#3178C6', iconKey: 'typescript' },
  { id: 'sk-javascript', name: 'JavaScript', level: 'Confident', category: 'Language', color: '#F7DF1E', iconKey: 'javascript' },
  { id: 'sk-html', name: 'HTML', level: 'Confident', category: 'Web', color: '#E34F26', iconKey: 'html' },
  { id: 'sk-css', name: 'CSS', level: 'Confident', category: 'Web', color: '#1572B6', iconKey: 'css' },
  { id: 'sk-git', name: 'Git & GitHub', level: 'Confident', category: 'Tools', color: '#F05032', iconKey: 'git' },
  { id: 'sk-photoshop', name: 'Adobe Photoshop', level: 'Confident', category: 'Design', color: '#31A8FF', iconKey: null },
  { id: 'sk-photography', name: 'Photography', level: 'Confident', category: 'Design', color: '#E07A5F', iconKey: null },
  { id: 'sk-powerpoint', name: 'PowerPoint Design', level: 'Confident', category: 'Design', color: '#D24726', iconKey: null },
  { id: 'sk-java-mysql', name: 'Java (Swing) & MySQL', level: 'Studied', category: 'Language', color: '#EA2D2E', iconKey: null },
];