import { WorkOrder } from '@/types/types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Chip, MD2Colors, Text } from 'react-native-paper';

interface WorkOrderCardProps {
  workOrder: WorkOrder;
  onPress: (id: number) => void;
}

export function WorkOrderCard({ workOrder, onPress }: WorkOrderCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return MD2Colors.red500;
      case 'Medium':
        return MD2Colors.orange600;
      case 'Low':
        return MD2Colors.green500;
      default:
        return MD2Colors.grey500;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'New':
        return 'new-box';
      case 'In Progress':
        return 'timer-sand';
      case 'Waiting AI':
        return 'monitor-shimmer';
      case 'Completed':
        return 'check-circle';
      default:
        return 'clock';
    }
  };

  return (
    <Card key={workOrder.id} onPress={() => onPress(workOrder.id)} mode="elevated">
      <Card.Content>
        <Text variant="bodyMedium">{workOrder.code}</Text>
        <Text variant="titleLarge">{workOrder.title}</Text>
        <Text variant="bodyLarge">{workOrder.location}</Text>
        <View style={styles.chipContainer}>
          <Chip
            style={{
              backgroundColor: getPriorityColor(workOrder.priority),
            }}
            textStyle={{ color: MD2Colors.white }}
            mode="flat"
          >
            {workOrder.priority}
          </Chip>
          <Chip icon={getStatusIcon(workOrder.status)} mode="flat">
            {workOrder.status}
          </Chip>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  chipContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
