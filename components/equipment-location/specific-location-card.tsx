import { EquipmentLocation } from '@/types/types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Divider, Icon, MD2Colors, Text } from 'react-native-paper';

interface SpecificLocationCardProps {
  location: EquipmentLocation;
}

export function SpecificLocationCard({ location }: SpecificLocationCardProps) {
  return (
    <Card mode="elevated">
      <Card.Content>
        <View style={styles.sectionHeader}>
          <Icon source="map-marker-radius" size={24} color={MD2Colors.green500} />
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Specific Location
          </Text>
        </View>
        <Divider style={styles.sectionDivider} />
        <View style={styles.infoRow}>
          <Text variant="labelMedium">Floor:</Text>
          <Text variant="bodyMedium" style={styles.infoValue}>
            {location.floor}
          </Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.infoRow}>
          <Text variant="labelMedium">Room:</Text>
          <Text variant="bodyMedium" style={styles.infoValue}>
            {location.room}
          </Text>
        </View>
        {location.zone && (
          <>
            <Divider style={styles.divider} />
            <View style={styles.infoRow}>
              <Text variant="labelMedium">Zone:</Text>
              <Text variant="bodyMedium" style={styles.infoValue}>
                {location.zone}
              </Text>
            </View>
          </>
        )}
        {location.coordinates && (
          <>
            <Divider style={styles.divider} />
            <View style={styles.infoRow}>
              <Text variant="labelMedium">Coordinates:</Text>
              <Text variant="bodyMedium" style={styles.infoValue}>
                {location.coordinates.latitude.toFixed(6)},{' '}
                {location.coordinates.longitude.toFixed(6)}
              </Text>
            </View>
          </>
        )}
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
  divider: {
    marginVertical: 8,
  },
});
