import { EquipmentDetail } from '@/types/types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

interface EquipmentHeaderProps {
  equipment: EquipmentDetail;
}

export const EquipmentHeader = ({ equipment }: EquipmentHeaderProps) => {
  return (
    <Card mode="elevated">
      <Card.Content>
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <Text variant="labelMedium" style={styles.headerLabel}>
              LOCATION & STATUS
            </Text>
            <Text variant="headlineSmall" style={styles.equipmentTitle}>
              {equipment.equipmentCode}
            </Text>
            <Text variant="bodyMedium" style={styles.locationText}>
              {equipment.location}
            </Text>
            <Text variant="bodySmall" style={styles.lastRefresh}>
              Last Refresh: {equipment.lastRefresh}
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerLeft: {
    flex: 1,
  },
  headerLabel: {
    opacity: 0.6,
    marginBottom: 4,
  },
  equipmentTitle: {
    fontWeight: '600',
    marginBottom: 4,
  },
  locationText: {
    opacity: 0.8,
    marginBottom: 4,
  },
  lastRefresh: {
    opacity: 0.6,
  },
});
