import { EquipmentLocation } from '@/types/types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Divider, Icon, MD2Colors, Text } from 'react-native-paper';

interface AccessInstructionsCardProps {
  location: EquipmentLocation;
}

export function AccessInstructionsCard({ location }: AccessInstructionsCardProps) {
  if (!location.accessInstructions) {
    return null;
  }

  return (
    <Card mode="elevated">
      <Card.Content>
        <View style={styles.sectionHeader}>
          <Icon source="door-open" size={24} color={MD2Colors.purple500} />
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Access Instructions
          </Text>
        </View>
        <Divider style={styles.sectionDivider} />
        <Text variant="bodyMedium" style={styles.instructionsText}>
          {location.accessInstructions}
        </Text>
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
  instructionsText: {
    lineHeight: 22,
  },
});
