export const colors = {
  bg: '#F5F1EA',
  surface: '#FFFFFF',
  surfaceAlt: '#EFE9DF',
  border: '#E2DACB',

  ink: '#0E0E10',
  inkAlt: '#1A1A1D',
  inkBorder: '#2A2A2E',

  text: '#0E0E10',
  textMuted: '#5A5A60',
  textFaint: '#9A9A9F',
  textOnInk: '#F5F1EA',
  textOnInkMuted: '#B5B0A8',

  ember: '#E07A5F',
  emberDark: '#C25F46',
  emberSoft: '#F4D9D0',
  moss: '#3D5A40',
  mossSoft: '#D9E2DA',
  gold: '#E9C46A',
  goldSoft: '#F7EBC8',

  danger: '#B33A2B',
  dangerSoft: '#F4D6D0',
  success: '#3D5A40',
  successSoft: '#D9E2DA',
  warning: '#B4761F',
  warningSoft: '#F7E4C2',

  scrimTop: 'rgba(14,14,16,0)',
  scrimMid: 'rgba(14,14,16,0.45)',
  scrimBottom: 'rgba(14,14,16,0.88)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 20,
  xl: 28,
  pill: 999,
};

// Re-export so existing `import { typography } from '../theme/colors'` keeps working.
export { typography, fonts } from './typography';