export type Availability = 'Open to internship' | 'Open to part-time' | 'Open to freelance' | 'Not available';

export const AVAILABILITY_OPTIONS: Availability[] = [
  'Open to internship',
  'Open to part-time',
  'Open to freelance',
  'Not available',
];

export const STUDENT = {
  fullName: 'Gad Niyibigira',
  registrationNumber: '25/26951',
  verificationCode: 'MOB-A2-6951',
  appName: 'GadPortfolio',
  appVersion: '1.0.0',
  introduction: 'My name is Gad Niyibigira.',
} as const;

export type EditableProfile = {
  headline: string;
  bio: string;
  primarySkill: string;
  availability: Availability;
  imageUri: string | null;
};

export const DEFAULT_PROFILE: EditableProfile = {
  headline: 'Computer Science student and mobile app developer',
  bio:
    'I am a Computer Science student at INES-Ruhengeri focused on mobile application development with React Native and Expo. I enjoy building practical tools that work offline and solve local problems.',
  primarySkill: 'React Native',
  availability: 'Open to internship',
  imageUri: null,
};