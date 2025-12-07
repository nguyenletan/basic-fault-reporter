import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { Icon, MD3Colors } from 'react-native-paper';

import { HapticTab } from '@/components/haptic-tab';
import { AppHeader } from '@/components/app-header';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: paperTheme.light.colors.primary,
        // tabBarInactiveTintColor: paperTheme.light.colors.primary,
        tabBarStyle: {
          // backgroundColor: paperTheme.light.colors.primary,
          borderTopWidth: 0,
          elevation: 8,
          boxShadow: '0px -2px 4px rgba(0, 0, 0, 0.1)',
          height: Platform.OS === 'ios' ? 85 : 65,
          paddingBottom: Platform.OS === 'ios' ? 10 : 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          // color: MD3Colors.primary90,
        },
        tabBarButton: HapticTab,
        header: () => <AppHeader />,
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon source="home-outline" size={size} color={MD3Colors.primary20} />
          ),
        }}
      />
      <Tabs.Screen
        name="work-orders"
        options={{
          title: 'Work Orders',
          tabBarIcon: ({ color, size }) => (
            <Icon source="clipboard-list-outline" size={size} color={MD3Colors.primary20} />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ color, size }) => (
            <Icon source="bell-outline" size={size} color={MD3Colors.primary20} />
          ),
        }}
      />
      <Tabs.Screen
        name="my-jobs"
        options={{
          title: 'My Jobs',
          tabBarIcon: ({ color, size }) => (
            <Icon source="folder-wrench-outline" size={size} color={MD3Colors.primary20} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          href: null, // This hides it from tabs
        }}
      />
      <Tabs.Screen
        name="alert"
        options={{
          href: null, // This hides it from tabs
        }}
      />
    </Tabs>
  );
}
