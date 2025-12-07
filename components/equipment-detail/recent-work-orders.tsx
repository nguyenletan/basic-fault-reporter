import { EquipmentDetail } from '@/types/types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Chip, Divider, MD2Colors, Text } from 'react-native-paper';

interface RecentWorkOrdersProps {
  equipment: EquipmentDetail;
}

export const RecentWorkOrders = ({ equipment }: RecentWorkOrdersProps) => {
  return (
    <Card mode="elevated">
      <Card.Content>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          RECENT WORK ORDERS
        </Text>
        <Divider style={styles.divider} />

        {equipment.recentWorkOrders.map((order, index) => (
          <View key={index} style={styles.workOrderItem}>
            <View style={styles.workOrderLeft}>
              <Text variant="labelLarge" style={styles.workOrderCode}>
                {order.code}
              </Text>
              <Text variant="bodySmall" style={styles.workOrderTitle}>
                {order.title}
              </Text>
              <Text variant="bodySmall" style={styles.workOrderDate}>
                {order.date}
              </Text>
            </View>
            <View style={styles.workOrderRight}>
              <Chip
                compact
                mode={order.status === 'Completed' ? 'flat' : 'outlined'}
                icon={order.status === 'Completed' ? 'check-outline' : 'clock-outline'}
                style={styles.workOrderChip}
              >
                {order.status}
              </Chip>
            </View>
          </View>
        ))}
        <Divider style={styles.divider} />
        <View>
          <Text variant="titleMedium">Vibration Detected</Text>
          <Text variant="bodyMedium">Sensor data exceeds threshold by 15%</Text>
          <View style={styles.actionButtons}>
            <Button mode="contained-tonal" onPress={() => console.log('View IOT Data')}>
              View IOT Data
            </Button>
            <Button mode="outlined" onPress={() => console.log('View Work Order')}>
              View Work Order
            </Button>
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
  workOrderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    gap: 8,
    borderBottomColor: MD2Colors.grey200,
  },
  workOrderLeft: {
    flex: 1,
  },
  workOrderCode: {
    fontWeight: '600',
    marginBottom: 4,
  },
  workOrderTitle: {
    opacity: 0.8,
    marginBottom: 2,
  },
  workOrderDate: {
    opacity: 0.6,
  },
  workOrderRight: {
    alignItems: 'flex-end',
    gap: 8,
  },
  workOrderChip: {
    marginBottom: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 12,
  },
});
