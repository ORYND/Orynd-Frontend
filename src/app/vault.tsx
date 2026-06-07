import React from 'react';
import VaultScreen from '@/screens/VaultScreen';
import { useStore } from '@/store/useStore';

export default function VaultRoute() {
  const { theme, toggleTheme } = useStore();

  return <VaultScreen onThemeToggle={toggleTheme} />;
}
