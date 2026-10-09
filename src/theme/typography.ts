import { TextStyle } from 'react-native';

export const fonts = {
  display: 'Fraunces_700Bold',
  displaySemi: 'Fraunces_600SemiBold',
  ui: 'Geist_400Regular',
  uiMedium: 'Geist_500Medium',
  uiBold: 'Geist_700Bold',
} as const;

// NOTE: These hex values intentionally mirror src/theme/colors.ts.
// We duplicate them here to avoid a circular import (colors -> typography -> colors).
// If you change a color in colors.ts that appears here, update it in both places.
const TEXT = '#0E0E10';
const TEXT_MUTED = '#5A5A60';
const TEXT_FAINT = '#9A9A9F';

export const typography: Record<string, TextStyle> = {
  display: {
    fontFamily: fonts.display,
    fontSize: 34,
    fontWeight: '700',
    color: TEXT,
    letterSpacing: -0.8,
    lineHeight: 40,
  },
  h1: {
    fontFamily: fonts.display,
    fontSize: 26,
    fontWeight: '700',
    color: TEXT,
    letterSpacing: -0.5,
    lineHeight: 32,
  },
  h2: {
    fontFamily: fonts.displaySemi,
    fontSize: 20,
    fontWeight: '600',
    color: TEXT,
    letterSpacing: -0.2,
    lineHeight: 26,
  },
  h3: {
    fontFamily: fonts.uiBold,
    fontSize: 16,
    fontWeight: '700',
    color: TEXT,
    letterSpacing: -0.1,
  },
  body: {
    fontFamily: fonts.ui,
    fontSize: 15,
    color: TEXT,
    lineHeight: 23,
  },
  bodyMuted: {
    fontFamily: fonts.ui,
    fontSize: 14,
    color: TEXT_MUTED,
    lineHeight: 21,
  },
  caption: {
    fontFamily: fonts.ui,
    fontSize: 12,
    color: TEXT_FAINT,
    letterSpacing: 0.2,
  },
  tagline: {
    fontFamily: fonts.uiMedium,
    fontSize: 14,
    fontStyle: 'italic',
    color: TEXT_MUTED,
    letterSpacing: 0.2,
  },
};

export type TypographyKey = keyof typeof typography;