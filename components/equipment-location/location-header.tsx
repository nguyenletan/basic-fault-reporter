import { EquipmentLocation } from '@/types/types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Icon, MD3Colors, Text } from 'react-native-paper';

interface LocationHeaderProps {
  location: EquipmentLocation;
}

export function LocationHeader({ location }: LocationHeaderProps) {
  return (
    <Card mode="elevated">
      <Card.Content>
        <View style={styles.headerRow}>
          <Icon source="map-marker" size={32} color={MD3Colors.primary40} />
          <View style={styles.headerText}>
            <Text variant="labelLarge" style={styles.codeText}>
              {location.equipmentCode}
            </Text>
            <Text variant="headlineSmall" style={styles.titleText}>
              {location.equipmentName}
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  headerText: {
    flex: 1,
  },
  codeText: {
    opacity: 0.7,
    marginBottom: 4,
  },
  titleText: {
    fontWeight: '600',
  },
});
