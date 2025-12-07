import { EquipmentDetail } from '@/types/types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Divider, Icon, MD2Colors, Text } from 'react-native-paper';

interface IotLiveDataProps {
  equipment: EquipmentDetail;
}

export const IotLiveData = ({ equipment }: IotLiveDataProps) => {
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
          IOT LIVE DATA SNAPSHOT
        </Text>
        <Divider style={styles.divider} />
        <View style={styles.iotGrid}>
          <View
            style={[
              styles.iotItem,
              equipment.iotLiveData.temperature.status === 'critical' && styles.iotItemCritical,
            ]}
          >
            <Icon
              source="thermometer"
              size={24}
              color={getHealthStatusColor(equipment.iotLiveData.temperature.status)}
            />
            <Text variant="labelSmall" style={styles.iotLabel}>
              Temperature
            </Text>
            <Text variant="bodyLarge" style={styles.iotValue}>
              {equipment.iotLiveData.temperature.value}
            </Text>
            <Icon
              source={getTrendIcon(equipment.iotLiveData.temperature.trend)}
              size={16}
              color={MD2Colors.grey600}
            />
          </View>
          <View
            style={[
              styles.iotItem,
              equipment.iotLiveData.energyUse.status === 'critical' && styles.iotItemCritical,
            ]}
          >
            <Icon
              source="lightning-bolt"
              size={24}
              color={getHealthStatusColor(equipment.iotLiveData.energyUse.status)}
            />
            <Text variant="labelSmall" style={styles.iotLabel}>
              Energy Use
            </Text>
            <Text variant="bodyLarge" style={styles.iotValue}>
              {equipment.iotLiveData.energyUse.value}
            </Text>
            <Icon
              source={getTrendIcon(equipment.iotLiveData.energyUse.trend)}
              size={16}
              color={MD2Colors.grey600}
            />
          </View>
          <View
            style={[
              styles.iotItem,
              equipment.iotLiveData.flowRate.status === 'critical' && styles.iotItemCritical,
            ]}
          >
            <Icon
              source="water-pump"
              size={24}
              color={getHealthStatusColor(equipment.iotLiveData.flowRate.status)}
            />
            <Text variant="labelSmall" style={styles.iotLabel}>
              Flow Rate
            </Text>
            <Text variant="bodyLarge" style={styles.iotValue}>
              {equipment.iotLiveData.flowRate.value}
            </Text>
            <Icon
              source={getTrendIcon(equipment.iotLiveData.flowRate.trend)}
              size={16}
              color={MD2Colors.grey600}
            />
          </View>
          <View
            style={[
              styles.iotItem,
              equipment.iotLiveData.pressure.status === 'critical' && styles.iotItemCritical,
            ]}
          >
            <Icon
              source="gauge"
              size={24}
              color={getHealthStatusColor(equipment.iotLiveData.pressure.status)}
            />
            <Text variant="labelSmall" style={styles.iotLabel}>
              Pressure
            </Text>
            <Text variant="bodyLarge" style={styles.iotValue}>
              {equipment.iotLiveData.pressure.value}
            </Text>
            <Icon
              source={getTrendIcon(equipment.iotLiveData.pressure.trend)}
              size={16}
              color={MD2Colors.grey600}
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
  iotGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  iotItem: {
    width: '48%',
    padding: 12,
    backgroundColor: MD2Colors.teal50,
    borderRadius: 8,
    alignItems: 'center',
    gap: 6,
  },
  iotItemCritical: {
    backgroundColor: MD2Colors.red50,
  },
  iotLabel: {
    opacity: 0.6,
    textAlign: 'center',
  },
  iotValue: {
    fontWeight: '700',
    textAlign: 'center',
  },
});
