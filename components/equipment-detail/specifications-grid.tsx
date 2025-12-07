import { EquipmentDetail } from '@/types/types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, MD2Colors, MD3Colors, Text } from 'react-native-paper';

interface SpecificationsGridProps {
  equipment: EquipmentDetail;
}

export const SpecificationsGrid = ({ equipment }: SpecificationsGridProps) => {
  return (
    <Card mode="elevated">
      <Card.Content>
        <View style={styles.specsGrid}>
          <View style={styles.specItem}>
            <Text variant="labelSmall" style={styles.specLabel}>
              Asset ID
            </Text>
            <Text variant="bodyMedium" style={styles.specValue}>
              {equipment.specifications.asset}
            </Text>
          </View>
          <View style={styles.specItem}>
            <Text variant="labelSmall" style={styles.specLabel}>
              Installation
            </Text>
            <Text variant="bodyMedium" style={styles.specValue}>
              {equipment.specifications.installation}
            </Text>
          </View>
          <View style={styles.specItem}>
            <Text variant="labelSmall" style={styles.specLabel}>
              Capacity (kW)
            </Text>
            <Text variant="bodyMedium" style={styles.specValue}>
              {equipment.specifications.capacity}
            </Text>
          </View>
          <View style={styles.specItem}>
            <Text variant="labelSmall" style={styles.specLabel}>
              Model
            </Text>
            <Text variant="bodyMedium" style={styles.specValue}>
              {equipment.specifications.model}
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  specsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  specItem: {
    width: '48%',
    padding: 12,
    boxShadow: MD3Colors.primary40,
    borderRadius: 8,
    borderColor: MD3Colors.primary40,
    borderWidth: 0,
    borderStyle: 'solid',
    backgroundColor: MD2Colors.deepPurple50,
  },
  specLabel: {
    opacity: 0.6,
    marginBottom: 4,
  },
  specValue: {
    fontWeight: '600',
  },
});
