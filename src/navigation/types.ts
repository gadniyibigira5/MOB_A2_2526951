import type { NavigatorScreenParams } from '@react-navigation/native';

export type TabParamList = {
  Home: undefined;
  Skills: undefined;
  Projects: undefined;
  Photography: undefined;
  Profile: undefined;
  About: undefined;
};

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList>;
  ProjectDetail: { projectId: string };
};