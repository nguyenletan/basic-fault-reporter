import { EquipmentLocation } from '@/types/types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Divider, Icon, MD2Colors, MD3Colors, Text } from 'react-native-paper';

interface LocationInfoCardProps {
  location: EquipmentLocation;
}

export function LocationInfoCard({ location }: LocationInfoCardProps) {
  return (
    <Card mode="elevated" style={styles.locationCard}>
      <Card.Content>
        <View style={styles.locationHeader}>
          <Icon source="map-marker" size={28} color={MD3Colors.primary20} />
          <View style={styles.locationTextContainer}>
            <Text variant="labelMedium" style={styles.equipmentCode}>
              {location.equipmentCode}
            </Text>
            <Text variant="titleLarge" style={styles.equipmentName}>
              {location.equipmentName}
            </Text>
          </View>
        </View>
        <Divider style={styles.locationDivider} />
        <View style={styles.locationDetails}>
          <View style={styles.locationRow}>
            <Icon source="office-building" size={20} color={MD2Colors.grey600} />
            <Text variant="bodyMedium" style={styles.locationText}>
              {location.buildingName}
            </Text>
          </View>
          <View style={styles.locationRow}>
            <Icon source="floor-plan" size={20} color={MD2Colors.grey600} />
            <Text variant="bodyMedium" style={styles.locationText}>
              Floor {location.floor}, Room {location.room}
              {location.zone && ` (Zone ${location.zone})`}
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  locationCard: {},
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  locationTextContainer: {
    flex: 1,
  },
  equipmentCode: {
    opacity: 0.7,
    marginBottom: 2,
  },
  equipmentName: {
    fontWeight: '600',
    color: MD3Colors.primary20,
  },
  locationDivider: {
    marginVertical: 12,
  },
  locationDetails: {
    gap: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  locationText: {
    flex: 1,
    color: '#424242',
  },
});
