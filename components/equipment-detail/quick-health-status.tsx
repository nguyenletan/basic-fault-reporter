import { EquipmentDetail } from '@/types/types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Divider, Icon, MD2Colors, MD3Colors, Text } from 'react-native-paper';

interface QuickHealthStatusProps {
  equipment: EquipmentDetail;
}

export const QuickHealthStatus = ({ equipment }: QuickHealthStatusProps) => {
  // We can reuse the helper from the hook, but we need to instantiate it or just copy the helper.
  // Since the hook returns the helper, we could pass it down, or just duplicate the small helper.
  // For cleaner code, let's just duplicate the small helper or import it if it was a util.
  // But wait, I can just use the hook logic if I want, but I can't call the hook inside here if I don't have the ID.
  // I'll just duplicate the helper for now as it's small.

  const getHealthStatusColor = (status: 'good' | 'warning' | 'critical') => {
    switch (status) {
      case 'good':
        return MD2Colors.teal500;
      case 'warning':
        return MD2Colors.orange500;
      case 'critical':
        return MD2Colors.red500;
      default:
        return MD2Colors.grey500;
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return 'trending-up';
      case 'down':
        return 'trending-down';
      case 'stable':
        return 'trending-neutral';
      default:
        return 'minus';
    }
  };

  return (
    <Card mode="elevated">
      <Card.Content>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          QUICK HEALTH STATUS
        </Text>
        <Divider style={styles.divider} />
        <View style={styles.healthGrid}>
          <View style={styles.healthItem}>
            <Icon
              source="wrench"
              size={24}
              color={getHealthStatusColor(equipment.quickHealthStatus.lastService.status)}
            />
            <Text variant="labelSmall" style={styles.healthLabel}>
              Last Service
            </Text>
            <Text variant="bodyMedium" style={styles.healthValue}>
              {equipment.quickHealthStatus.lastService.date}
            </Text>
          </View>
          <View style={styles.healthItem}>
            <Icon
              source="clock-outline"
              size={24}
              color={getHealthStatusColor(equipment.quickHealthStatus.operatingHours.status)}
            />
            <Text variant="labelSmall" style={styles.healthLabel}>
              Operating Hours
            </Text>
            <Text variant="bodyMedium" style={styles.healthValue}>
              {equipment.quickHealthStatus.operatingHours.hours} hrs
            </Text>
          </View>
          <View style={styles.healthItem}>
            <Icon
              source="gauge"
              size={24}
              color={getHealthStatusColor(equipment.quickHealthStatus.pressure.status)}
            />
            <Text variant="labelSmall" style={styles.healthLabel}>
              Pressure
            </Text>
            <Text variant="bodyMedium" style={styles.healthValue}>
              {equipment.quickHealthStatus.pressure.value}
            </Text>
            <Icon
              source={getTrendIcon(equipment.quickHealthStatus.pressure.trend)}
              size={16}
              color={MD2Colors.red500}
            />
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontWeight: '600',
    marginBottom: 8,
  },
  divider: {
    marginBottom: 12,
  },
  healthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  healthItem: {
    width: '48%',
    padding: 12,
    backgroundColor: MD2Colors.grey50,
    borderRadius: 8,
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: MD3Colors.primary90,
    borderStyle: 'solid',
  },
  healthLabel: {
    opacity: 0.6,
    textAlign: 'center',
  },
  healthValue: {
    fontWeight: '600',
    textAlign: 'center',
  },
});
