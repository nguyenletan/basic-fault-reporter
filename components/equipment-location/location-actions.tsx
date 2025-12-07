import { EquipmentLocation } from '@/types/types';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

interface LocationActionsProps {
  location: EquipmentLocation;
  id: string;
}

export function LocationActions({ location, id }: LocationActionsProps) {
  return (
    <View style={styles.actionButtons}>
      <Button
        mode="contained"
        icon="information-variant"
        onPress={() => router.push(`/equipment/${id}/detail`)}
        style={styles.button}
      >
        View Details
      </Button>
      {location.coordinates && (
        <Button
          mode="contained-tonal"
          icon="scan-helper"
          onPress={() => router.push(`/equipment/${id}/location-verification`)}
          style={styles.button}
        >
          Verify Location
        </Button>
      )}
      <Button
        mode="elevated"
        icon="check"
        onPress={() => console.log('Mark as arrived')}
        style={styles.button}
      >
        Mark as Completed
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  actionButtons: {
    gap: 12,
    marginTop: 8,
    marginBottom: 16,
  },
  button: {},
});
