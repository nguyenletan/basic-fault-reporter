import { EquipmentLocation } from '@/types/types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MD2Colors, Text } from 'react-native-paper';

interface LocationHeaderProps {
  location: EquipmentLocation | null;
}

export function LocationHeader({ location }: LocationHeaderProps) {
  if (!location) return null;

  return (
    <View style={styles.locationHeader}>
      <View style={styles.locationHeaderLeft}>
        <Text variant="labelSmall" style={styles.locationLabel}>
          LOCATION & STATUS
        </Text>
        <Text variant="titleLarge" style={styles.locationTitle}>
          {location.equipmentName.split(' - ')[0]}
        </Text>
        <Text variant="bodyMedium" style={styles.locationSubtitle}>
          {location.buildingName} – {location.floor} – {location.zone || 'Zone A'}
        </Text>
        <Text variant="bodySmall" style={styles.locationAddress}>
          {location.buildingAddress}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  locationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  locationHeaderLeft: {
    flex: 1,
  },
  locationLabel: {
    color: MD2Colors.grey600,
    marginBottom: 4,
  },
  locationTitle: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  locationSubtitle: {
    color: MD2Colors.grey700,
  },
  locationAddress: {
    color: MD2Colors.grey500,
    marginTop: 2,
  },
});
