import { Home, Settings } from '@tamagui/lucide-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { getTokens } from 'tamagui';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: getTokens().color.$blue.val,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home size={28} color={color} />, // eslint-disable-line react/no-unstable-nested-components
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <Settings size={28} color={color} />, // eslint-disable-line react/no-unstable-nested-components
        }}
      />
    </Tabs>
  );
}
