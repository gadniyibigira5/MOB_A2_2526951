import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import SkillsScreen from '../screens/SkillsScreen';
import ProjectsScreen from '../screens/ProjectsScreen';
import PhotographyScreen from '../screens/PhotographyScreen';
import ProfileEditorScreen from '../screens/ProfileEditorScreen';
import AboutScreen from '../screens/AboutScreen';
import ProjectDetailScreen from '../screens/ProjectDetailScreen';
import { RootStackParamList, TabParamList } from './types';
import { colors } from '../theme/colors';

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const iconFor = (name: keyof TabParamList, focused: boolean): keyof typeof Ionicons.glyphMap => {
  switch (name) {
    case 'Home':
      return focused ? 'home' : 'home-outline';
    case 'Skills':
      return focused ? 'ribbon' : 'ribbon-outline';
    case 'Projects':
      return focused ? 'albums' : 'albums-outline';
    case 'Photography':
      return focused ? 'camera' : 'camera-outline';
    case 'Profile':
      return focused ? 'person-circle' : 'person-circle-outline';
    case 'About':
      return focused ? 'information-circle' : 'information-circle-outline';
  }
};

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.ember,
        tabBarInactiveTintColor: colors.textFaint,
        tabBarStyle: { borderTopColor: colors.border, backgroundColor: colors.surface },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons name={iconFor(route.name, focused)} size={size} color={color} />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Skills" component={SkillsScreen} />
      <Tab.Screen name="Projects" component={ProjectsScreen} />
      <Tab.Screen name="Photography" component={PhotographyScreen} />
      <Tab.Screen name="Profile" component={ProfileEditorScreen} options={{ title: 'Profile' }} />
      <Tab.Screen name="About" component={AboutScreen} />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerStyle: { backgroundColor: colors.surface }, headerTintColor: colors.text }}
      >
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
        <Stack.Screen name="ProjectDetail" component={ProjectDetailScreen} options={{ title: 'Project details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}