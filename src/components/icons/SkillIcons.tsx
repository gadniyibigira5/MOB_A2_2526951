import React from 'react';
import Svg, { Path, G, Circle, Rect } from 'react-native-svg';

type IconProps = { size?: number; color?: string };

export const ReactIcon = ({ size = 28, color = '#61DAFB' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle cx="12" cy="12" r="2.2" fill={color} />
    <G stroke={color} strokeWidth="0.9" fill="none">
      <Path d="M12 3c4.5 0 8 1.6 8 3.6S16.5 10.2 12 10.2 4 8.6 4 6.6 7.5 3 12 3z" />
      <Path d="M6.06 7.5c2.25-3.9 5.2-6.6 7.2-5.4s1.6 5.9-.65 9.8-5.2 6.6-7.2 5.4-1.6-5.9.65-9.8z" />
      <Path d="M17.94 7.5c2.25 3.9 2.65 8.7.65 9.8s-4.95-1.5-7.2-5.4-2.65-8.7-.65-9.8 4.95 1.5 7.2 5.4z" />
    </G>
  </Svg>
);

export const TypeScriptIcon = ({ size = 28 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Rect x="1.5" y="1.5" width="21" height="21" rx="2" fill="#3178C6" />
    <Path
      d="M14.6 16.6c.5.5 1.2.9 2 .9 1 0 1.6-.5 1.6-1.2 0-.6-.4-.9-1.3-1.3l-.6-.3c-1.3-.6-2.2-1.3-2.2-2.9 0-1.5 1.1-2.6 2.9-2.6.9 0 1.6.3 2 .7l-.9 1.5c-.3-.3-.7-.5-1.2-.5-.6 0-.9.3-.9.7 0 .5.4.7 1.3 1.1l.6.3c1.5.6 2.3 1.4 2.3 3 0 1.6-1.2 2.8-3.4 2.8-1 0-2-.3-2.6-.9l1.4-1.3zM10 10.4H7.5V17H5.6V10.4H3V8.8h7v1.6z"
      fill="#FFFFFF"
    />
  </Svg>
);

export const JavaScriptIcon = ({ size = 28 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Rect x="1.5" y="1.5" width="21" height="21" rx="2" fill="#F7DF1E" />
    <Path
      d="M11.2 17.3c.4.8 1 1.4 2 1.4.9 0 1.4-.4 1.4-1 0-.7-.5-1-1.4-1.4l-.5-.2c-1.4-.6-2.4-1.4-2.4-3 0-1.5 1.1-2.6 2.9-2.6 1.2 0 2.1.4 2.7 1.5l-1.5.9c-.3-.6-.7-.8-1.2-.8-.5 0-.9.3-.9.8 0 .5.3.7 1.2 1.1l.5.2c1.7.7 2.6 1.5 2.6 3.1 0 1.8-1.4 2.8-3.3 2.8-1.8 0-3-.9-3.6-2l1.9-1.2zM6.6 17.4c.3.5.5 1 1.2 1 .6 0 1-.2 1-.9V11h2v6.7c0 2.1-1.2 3-3 3-1.6 0-2.5-.8-3-1.8l1.8-1.5z"
      fill="#000000"
    />
  </Svg>
);

export const HtmlIcon = ({ size = 28 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M3.3 2l1.55 17.4L12 21.5l7.15-2.1L20.7 2H3.3z" fill="#E34F26" />
    <Path d="M12 20.05V3.55H19.1l-1.35 15.15-5.75 1.35z" fill="#EF652A" />
    <Path
      d="M16.6 6.65H12v2.05h4.35l-.3 3.35H12v2.05h3.75l-.35 3.85L12 18.6v2.15l4.9-1.4.95-10.65-.25-2.05zm-5.6 0H6.9l.3 2.05H11v2.05H7.5l.3 3.35H11v2.05H6.35L5.9 6.65h5.1z"
      fill="#FFFFFF"
    />
  </Svg>
);

export const CssIcon = ({ size = 28 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M3.3 2l1.55 17.4L12 21.5l7.15-2.1L20.7 2H3.3z" fill="#1572B6" />
    <Path d="M12 20.05V3.55H19.1l-1.35 15.15-5.75 1.35z" fill="#33A9DC" />
    <Path
      d="M12 8.7H9.35l-.15-2.05H12V4.6H6.9l.55 6.15H12V8.7zm0 5.4h-.05l-2.4-.65-.15-1.7H7.3l.3 3.4 4.4 1.2V14.1zm0-5.4v2.05h2.35l-.2 2.4-2.15.6v2.05l4-1.1.05-.5.4-4.55.1-1H12v.05z"
      fill="#FFFFFF"
    />
  </Svg>
);

export const NodeIcon = ({ size = 28, color = '#539E43' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.3l6.5 3.6v7.2L12 18.7l-6.5-3.6V7.9L12 4.3z"
      fill={color}
    />
    <Path d="M12 6.7L8 9v6l4 2.3 4-2.3V9l-4-2.3zm0 3.3v4l-1-.6v-2.8l1-.6z" fill={color} />
  </Svg>
);

export const PythonIcon = ({ size = 28 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M11.6 2.1c-4 0-3.8 1.7-3.8 1.7v2.4h3.9v.7H5.7S2.1 6.4 2.1 11.8c0 5.4 3.1 5.2 3.1 5.2h1.9v-2.5s-.1-3.2 3.1-3.2h4.9s3 .05 3-2.9V4.5s.5-2.4-6.5-2.4zm-2.1 1.6a.9.9 0 110 1.8.9.9 0 010-1.8z"
      fill="#3776AB"
    />
    <Path
      d="M12.4 21.9c4 0 3.8-1.7 3.8-1.7v-2.4h-3.9v-.7h6.1s3.6.6 3.6-4.9-3.1-5.2-3.1-5.2h-1.9v2.5s.1 3.2-3.1 3.2H9.1s-3-.05-3 2.9v4.1s-.5 2.4 6.3 2.2zm2.1-1.6a.9.9 0 110-1.8.9.9 0 010 1.8z"
      fill="#FFD343"
    />
  </Svg>
);

export const GitIcon = ({ size = 28 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M23.55 11L13 .05 11.6 1.4l2.5 2.5a2.1 2.1 0 011.05 1.35 2.15 2.15 0 01.55 3.95c.02.25.05.5.05.75a2.1 2.1 0 11-4.2.1c0-.15 0-.3.05-.45L9.5 7.65v5.55a2.15 2.15 0 01-1.25 3.85 2.15 2.15 0 01-1.1-4v-5.6a2.15 2.15 0 01-1.15-2.8 2.1 2.1 0 01-1-1.85c0-.55.2-1.05.55-1.4L4.5 1.4 0.05 5.85a.5.5 0 000 .7L11.05 17.65a.5.5 0 00.7 0L23.55 11.7a.5.5 0 000-.7z"
      fill="#F05032"
    />
  </Svg>
);

export const SKILL_ICONS = {
  react: { label: 'React', Component: ReactIcon },
  typescript: { label: 'TypeScript', Component: TypeScriptIcon },
  javascript: { label: 'JavaScript', Component: JavaScriptIcon },
  html: { label: 'HTML', Component: HtmlIcon },
  css: { label: 'CSS', Component: CssIcon },
  node: { label: 'Node.js', Component: NodeIcon },
  python: { label: 'Python', Component: PythonIcon },
  git: { label: 'Git', Component: GitIcon },
} as const;

export type SkillIconKey = keyof typeof SKILL_ICONS;