import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import RootNavigator from './src/navigation/RootNavigator';
import { colors, fonts } from './src/theme/colors';

SplashScreen.preventAutoHideAsync().catch(() => {
  // non-fatal — native splash may already be hidden on some platforms
});

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    [fonts.display]: require('./assets/fonts/Fraunces_700Bold.ttf'),
    [fonts.displaySemi]: require('./assets/fonts/Fraunces_600SemiBold.ttf'),
    [fonts.ui]: require('./assets/fonts/Geist_400Regular.ttf'),
    [fonts.uiMedium]: require('./assets/fonts/Geist_500Medium.ttf'),
    [fonts.uiBold]: require('./assets/fonts/Geist_700Bold.ttf'),
  });

  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      setReady(true);
      SplashScreen.hideAsync().catch(() => {
        // non-fatal
      });
    }
  }, [fontsLoaded, fontError]);

  const onLayout = useCallback(() => {
    // keep the layout handler stable
  }, []);

  if (!ready) {
    // Simple branded splash visible during the brief font-load window.
    // On native, the OS splash usually covers this; on web you see it directly.
    return (
      <View style={styles.splash} onLayout={onLayout}>
        <Text style={styles.wordmark}>GadPortfolio</Text>
        <Text style={styles.tagline}>Just a Nerd.</Text>
        <StatusBar style="light" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <RootNavigator />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  wordmark: {
    fontSize: 34,
    fontWeight: '800',
    color: colors.gold,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 14,
    fontStyle: 'italic',
    color: colors.textOnInkMuted,
    letterSpacing: 0.5,
  },
});