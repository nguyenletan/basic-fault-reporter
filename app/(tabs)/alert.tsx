import { ThemedView } from '@/components/themed-view';

import { AlertCard } from '@/components/alerts/alert-card';
import { AlertFilters } from '@/components/alerts/alert-filters';
import { Alert } from '@/types/types';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { MD3Colors, Text } from 'react-native-paper';

const alerts: Alert[] = [
  {
    id: 1,
    code: '#AL-4530',
    title: 'Chiller – Low Coolant Pressure',
    location: 'HQ Tower – Level 3',
    priority: 'High',
    status: 'New',
    buildingName: 'HQ Tower',
    buildingAddress: '123 Business District, Singapore 018956',
    plantSystemName: 'Chiller Plant',
    subSystemDetails: 'Pump Motor #3',
    equipmentId: '#EQ-001',
    dueDate: '2025-01-16T14:00:00',
  },
  {
    id: 2,
    code: '#AL-4531',
    title: 'HVAC Unit – Fan Noise',
    location: 'Annex – Level 2',
    priority: 'Medium',
    status: 'In Progress',
    buildingName: 'Annex Building',
    buildingAddress: '456 Commerce Avenue, Singapore 018957',
    plantSystemName: 'HVAC System',
    subSystemDetails: 'Air Handling Unit #2',
    equipmentId: '#EQ-002',
    dueDate: '2025-01-18T10:00:00',
  },
  {
    id: 3,
    code: '#AL-4518',
    title: 'Boiler – Sensor Calibration',
    location: 'Plant B – Level 1',
    priority: 'Low',
    status: 'Completed',
    buildingName: 'Plant B',
    buildingAddress: '789 Industrial Road, Singapore 629234',
    plantSystemName: 'Boiler System',
    subSystemDetails: 'Temperature Sensor Array',
    equipmentId: '#EQ-003',
    dueDate: '2025-01-20T16:00:00',
  },
];

export default function AlertScreen() {
  const [value, setValue] = React.useState('All');
  const handleAlertPress = (id: number) => {
    router.push(`/alert/${id}`);
  };
  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text variant="displaySmall">All System Alerts</Text>
        <AlertFilters selectedStatus={value} onStatusChange={setValue} />
        {alerts
          .filter((alert) => value === 'All' || alert.status === value)
          .map((alert) => (
            <AlertCard key={alert.id} alert={alert} onPress={handleAlertPress} />
          ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },
  header: {
    marginVertical: 16,
    fontWeight: '600',
    color: MD3Colors.primary20,
  },

  cardInner: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 32,
    paddingVertical: 24,
    paddingHorizontal: 24,
  },

  smallCard: {
    flex: 1,
    elevation: 2,
  },
  smallCardContent: {
    alignItems: 'center',
    textAlign: 'center',
    gap: 8,
  },
  smallCardText: {
    textAlign: 'center',
  },
});
