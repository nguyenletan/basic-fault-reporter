import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, MD3Colors } from 'react-native-paper';

interface AlertFiltersProps {
  selectedStatus: string;
  onStatusChange: (status: string) => void;
}

const filterOptions: Array<string> = ['All', 'New', 'In Progress', 'Completed'];

export function AlertFilters({ selectedStatus, onStatusChange }: AlertFiltersProps) {
  return (
    <View style={styles.container}>
      {filterOptions.map((status) => (
        <Button
          key={status}
          rippleColor={MD3Colors.primary80}
          contentStyle={{ paddingHorizontal: 5, minWidth: 75, paddingTop: 1 }}
          mode={selectedStatus === status ? 'contained' : 'elevated'}
          compact={true}
          labelStyle={{ fontSize: 13 }}
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
