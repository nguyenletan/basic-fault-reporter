import { EquipmentLocation } from '@/types/types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Divider, Icon, MD2Colors, Text } from 'react-native-paper';

interface SafetyNotesCardProps {
  location: EquipmentLocation;
}

export function SafetyNotesCard({ location }: SafetyNotesCardProps) {
  if (!location.safetyNotes || location.safetyNotes.length === 0) {
    return null;
  }

  return (
    <Card mode="elevated" style={styles.safetyCard}>
      <Card.Content>
        <View style={styles.sectionHeader}>
          <Icon source="alert-circle" size={24} color={MD2Colors.red500} />
          <Text variant="titleMedium" style={[styles.sectionTitle, styles.safetyTitle]}>
            Safety Notes
          </Text>
        </View>
        <Divider style={styles.sectionDivider} />
        {location.safetyNotes.map((note, index) => (
          <View key={index} style={styles.safetyItem}>
            <Icon source="shield-alert" size={20} color={MD2Colors.red700} />
            <Text variant="bodyMedium" style={styles.safetyText}>
              {note}
            </Text>
          </View>
        ))}
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
  safetyCard: {
    backgroundColor: '#FFF3E0',
  },
  safetyTitle: {
    color: MD2Colors.red700,
  },
  safetyItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
    padding: 8,
    backgroundColor: '#FFEBEE',
    borderRadius: 4,
  },
  safetyText: {
    flex: 1,
    color: MD2Colors.red900,
    fontWeight: '500',
  },
});
