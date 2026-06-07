import { Tabs } from 'expo-router';
import { useColorScheme, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { useStore } from '@/store/useStore';
import { Colors, BottomTabInset } from '@/constants/theme';

export default function AppTabs() {
  const scheme = useStore((state) => state.theme) || useColorScheme() || 'dark';
  const colors = Colors[scheme === 'unspecified' ? 'dark' : scheme];

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.backgroundElement,
          paddingBottom: Platform.OS === 'web' ? 0 : BottomTabInset,
        },
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.icon,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Capture',
          tabBarIcon: ({ color }) => <MaterialIcons name="mic" size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="vault"
        options={{
          title: 'Vault',
          tabBarIcon: ({ color }) => <MaterialIcons name="inventory-2" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
