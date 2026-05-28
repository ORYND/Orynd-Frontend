import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useStore } from './src/store/useStore';
import CaptureScreen from './src/screens/CaptureScreen';
import VaultScreen from './src/screens/VaultScreen';

export default function App() {
  const { initApp, isEngineReady, theme, setTheme } = useStore();
  const [currentScreen, setCurrentScreen] = useState<'capture' | 'vault'>('capture');

  useEffect(() => {
    initApp();
  }, []);

  if (!isEngineReady) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme === 'dark' ? '#121412' : '#ffffff' }]}>
        <ActivityIndicator size="large" color="#b2cdb6" />
      </View>
    );
  }

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <View style={styles.container}>
      {currentScreen === 'capture' ? (
        <CaptureScreen onNext={() => setCurrentScreen('vault')} />
      ) : (
        <VaultScreen onThemeToggle={toggleTheme} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
