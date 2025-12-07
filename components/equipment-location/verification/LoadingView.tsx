import { ThemedView } from '@/components/themed-view';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

export function LoadingView() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.centerContent}>
        <ActivityIndicator size="large" />
        <Text variant="bodyLarge">Loading location information...</Text>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 16,
  },
});
