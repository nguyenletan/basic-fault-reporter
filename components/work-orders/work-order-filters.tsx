import { Status } from '@/types/types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, MD3Colors } from 'react-native-paper';

interface WorkOrderFiltersProps {
  selectedStatus: string;
  onStatusChange: (status: string) => void;
}

const filterOptions: Array<string> = ['All', 'New', 'In Progress', 'Completed', 'Waiting AI'];

export function WorkOrderFilters({ selectedStatus, onStatusChange }: WorkOrderFiltersProps) {
  return (
    <View style={styles.container}>
      {filterOptions.map((status) => (
        <Button
          key={status}
          rippleColor={MD3Colors.primary80}
          contentStyle={{ paddingHorizontal: 0, minWidth: 60, paddingTop: 1 }}
          mode={selectedStatus === status ? 'contained' : 'elevated'}
          compact={true}
          labelStyle={{ fontSize: 12 }}
          onPress={() => onStatusChange(status)}
        >
          {status}
        </Button>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
