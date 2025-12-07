import { EquipmentLocation } from '@/types/types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Divider, Icon, MD2Colors, Text } from 'react-native-paper';

interface BuildingInfoCardProps {
  location: EquipmentLocation;
}

export function BuildingInfoCard({ location }: BuildingInfoCardProps) {
  return (
    <Card mode="elevated">
      <Card.Content>
        <View style={styles.sectionHeader}>
          <Icon source="office-building" size={24} color={MD2Colors.blue500} />
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Building Information
          </Text>
        </View>
        <Divider style={styles.sectionDivider} />
        <View style={styles.infoRow}>
          <Text variant="labelMedium">Building:</Text>
          <Text variant="bodyMedium" style={styles.infoValue}>
            {location.buildingName}
          </Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.infoRow}>
          <Text variant="labelMedium">Address:</Text>
          <Text variant="bodyMedium" style={styles.addressText}>
            {location.buildingAddress}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  sectionTitle: {
    fontWeight: '600',
  },
  sectionDivider: {
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    gap: 16,
  },
  infoValue: {
    textAlign: 'right',
    flex: 1,
  },
  addressText: {
    textAlign: 'right',
    flex: 1,
  },
  divider: {
    marginVertical: 8,
  },
});
