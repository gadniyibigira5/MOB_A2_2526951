export type Skill = {
  name: string;
  level: 'Confident' | 'Studied' | 'Beginner';
  note: string;
};

export const SKILLS: Skill[] = [
  { name: 'React Native (Expo)', level: 'Confident', note: 'Built mobile screens, navigation, local storage and image workflows.' },
  { name: 'TypeScript & JavaScript', level: 'Confident', note: 'Typed components, state, and reusable modules.' },
  { name: 'HTML & CSS', level: 'Confident', note: 'Responsive layouts and accessible interfaces.' },
  { name: 'Git & GitHub', level: 'Confident', note: 'Version control, branching, and releases.' },
  { name: 'Adobe Photoshop', level: 'Confident', note: 'Image editing and visual asset preparation.' },
  { name: 'Photography', level: 'Confident', note: 'Composition, lighting, and editing.' },
  { name: 'PowerPoint & Presentation Design', level: 'Confident', note: 'Clear slide design for technical topics.' },
  { name: 'Java (Swing) & MySQL', level: 'Studied', note: 'Desktop app with database, reports and QR codes.' },
];
