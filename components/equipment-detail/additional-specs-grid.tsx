import { EquipmentDetail } from '@/types/types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, MD2Colors, MD3Colors, Text } from 'react-native-paper';

interface AdditionalSpecsGridProps {
  equipment: EquipmentDetail;
}

export const AdditionalSpecsGrid = ({ equipment }: AdditionalSpecsGridProps) => {
  return (
    <Card mode="elevated">
      <Card.Content>
        <View style={styles.specsGrid}>
          <View style={styles.specItem}>
            <Text variant="labelSmall" style={styles.specLabel}>
              Manufacturer
            </Text>
            <Text variant="bodyMedium" style={styles.specValue}>
              {equipment.specifications.manufacturer}
            </Text>
          </View>
          <View style={styles.specItem}>
            <Text variant="labelSmall" style={styles.specLabel}>
              Serial Number
            </Text>
            <Text variant="bodyMedium" style={styles.specValue}>
              {equipment.specifications.serialNumber}
            </Text>
          </View>

          <View style={styles.specItem}>
            <Text variant="labelSmall" style={styles.specLabel}>
              Plant RM
            </Text>
            <Text variant="bodyMedium" style={styles.specValue}>
              {equipment.specifications.plantRM}
            </Text>
          </View>
          <View style={styles.specItem}>
            <Text variant="labelSmall" style={styles.specLabel}>
              Commissioned (date)
            </Text>
            <Text variant="bodyMedium" style={styles.specValue}>
              {equipment.specifications.commissioned}
            </Text>
          </View>
          <View style={styles.specItem}>
            <Text variant="labelSmall" style={styles.specLabel}>
              Initial Value (EUR)
            </Text>
            <Text variant="bodyMedium" style={styles.specValue}>
              {equipment.specifications.initialValue}
            </Text>
          </View>
          <View style={styles.specItem}>
            <Text variant="labelSmall" style={styles.specLabel}>
              Location
            </Text>
            <Text variant="bodyMedium" style={styles.specValue}>
              {equipment.specifications.location}
            </Text>
          </View>
          <View style={styles.specItem}>
            <Text variant="labelSmall" style={styles.specLabel}>
              Age (years)
            </Text>
            <Text variant="bodyMedium" style={styles.specValue}>
              {equipment.specifications.age}
            </Text>
          </View>

          <View style={styles.specItem}>
            <Text variant="labelSmall" style={styles.specLabel}>
              Expected Lifespan (years)
            </Text>
            <Text variant="bodyMedium" style={styles.specValue}>
              {equipment.specifications.expectedLifespan}
            </Text>
          </View>
          <View style={styles.specItem}>
            <Text variant="labelSmall" style={styles.specLabel}>
              Warranty Expiry Date
            </Text>
            <Text variant="bodyMedium" style={styles.specValue}>
              {equipment.specifications.warrantyExpiry.date}
            </Text>
          </View>
          <View style={styles.fullWidthSpecItem}>
            <Text variant="labelSmall" style={styles.specLabel}>
              Description
            </Text>
            <Text variant="bodyMedium" style={styles.specValue}>
              {equipment.specifications.description}
            </Text>
          </View>
        </View>
        <Button mode="outlined" style={styles.maintenanceButton}>
          Maintenance Logs
        </Button>
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
  fullWidthSpecItem: {
    width: '100%',
    padding: 12,
    boxShadow: MD3Colors.primary40,
    borderRadius: 8,
    borderColor: MD3Colors.primary40,
    borderWidth: 0,
    borderStyle: 'solid',
    backgroundColor: MD2Colors.deepPurple50,
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
  maintenanceButton: {
    marginTop: 16,
  },
});
