import { ThemedView } from '@/components/themed-view';
import { WorkOrder } from '@/types/types';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Chip, Divider, MD2Colors, MD3Colors, Text } from 'react-native-paper';

// Mock data - in a real app, this would come from an API or state management
const workOrders: WorkOrder[] = [
  {
    id: 1,
    code: '#WO-4530',
    title: 'Chiller – Low Coolant Pressure',
    location: 'HQ Tower – Level 3',
    priority: 'High',
    status: 'New',
  },
  {
    id: 2,
    code: '#WO-4531',
    title: 'HVAC Unit – Fan Noise',
    location: 'Annex – Level 2',
    priority: 'Medium',
    status: 'In Progress',
  },
  {
    id: 3,
    code: '#WO-4518',
    title: 'Boiler – Sensor Calibration',
    location: 'Plant B – Level 1',
    priority: 'Low',
    status: 'Completed',
  },
  {
    id: 4,
    code: '#WO-4542',
    title: 'Pump – Vibration Alert',
    location: 'HQ Tower – Basement3',
    priority: 'High',
    status: 'Waiting AI',
  },
  {
    id: 5,
    code: '#WO-4545',
    title: 'AHU – Filter Replacement',
    location: 'Annex – Level 4',
    priority: 'Low',
    status: 'New',
  },
  {
    id: 6,
    code: '#WO-4519',
    title: 'Chiller – Low Coolant Pressure',
    location: 'HQ Tower – Level 3',
    priority: 'High',
    status: 'New',
  },
  {
    id: 7,
    code: '#WO-4520',
    title: 'HVAC Unit – Fan Noise',
    location: 'Annex – Level 2',
    priority: 'Medium',
    status: 'In Progress',
  },
  {
    id: 8,
    code: '#WO-4521',
    title: 'Boiler – Sensor Calibration',
    location: 'Plant B – Level 1',
    priority: 'Low',
    status: 'Completed',
  },
  {
    id: 9,
    code: '#WO-4538',
    title: 'Pump – Vibration Alert',
    location: 'HQ Tower – Basement3',
    priority: 'High',
    status: 'Waiting AI',
  },
  {
    id: 10,
    code: '#WO-4539',
    title: 'AHU – Filter Replacement',
    location: 'Annex – Level 4',
    priority: 'Low',
    status: 'New',
  },
];

export default function WorkOrderDetailScreen() {
  const { id } = useLocalSearchParams();

  // Find the work order by ID
  const workOrder = workOrders.find((wo) => wo.id === Number(id));

  if (!workOrder) {
    return (
      <>
        <Stack.Screen
          options={{
            title: 'Work Order Not Found',
            headerShown: true,
          }}
        />
        <ThemedView style={styles.container}>
          <View style={styles.content}>
            <Text variant="headlineMedium">Work Order Not Found</Text>
            <Button mode="contained" onPress={() => router.back()} style={styles.backButton}>
              Go Back
            </Button>
          </View>
        </ThemedView>
      </>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: workOrder.code,
          headerShown: true,
        }}
      />
      <ThemedView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header Card */}
          <Card mode="elevated">
            <Card.Content>
              <Text variant="labelLarge" style={styles.codeText}>
                {workOrder.code}
              </Text>
              <Text variant="headlineMedium" style={styles.titleText}>
                {workOrder.title}
              </Text>

              <View style={styles.chipsContainer}>
                <Chip
                  style={{
                    backgroundColor:
                      workOrder.priority === 'High'
                        ? MD2Colors.red500
                        : workOrder.priority === 'Medium'
                          ? MD2Colors.orange600
                          : MD2Colors.green500,
                  }}
                  textStyle={{ color: MD2Colors.white }}
                  mode="flat"
                >
                  {workOrder.priority} Priority
                </Chip>
                <Chip
                  icon={
                    workOrder.status === 'New'
                      ? 'plus-circle'
                      : workOrder.status === 'In Progress'
                        ? 'timer-sand'
                        : workOrder.status === 'Waiting AI'
                          ? 'pause-circle'
                          : workOrder.status === 'Completed'
                            ? 'check-circle'
                            : 'clock'
                  }
                  mode="flat"
                >
                  {workOrder.status}
                </Chip>
              </View>
            </Card.Content>
          </Card>

          {/* Location Card */}
          <Card mode="elevated">
            <Card.Content>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Location
              </Text>
              <View style={styles.infoRow}>
                <Text variant="bodyLarge">{workOrder.location}</Text>
              </View>
            </Card.Content>
          </Card>

          {/* Description Card */}
          <Card mode="elevated">
            <Card.Content>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Description
              </Text>
              <Text variant="bodyMedium" style={styles.descriptionText}>
                This work order requires attention for {workOrder.title.toLowerCase()} at{' '}
                {workOrder.location}. The issue has been classified as{' '}
                {workOrder.priority.toLowerCase()} priority and is currently{' '}
                {workOrder.status.toLowerCase()}.
              </Text>
            </Card.Content>
          </Card>

          {/* Timeline Card */}
          <Card mode="elevated">
            <Card.Content>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Timeline
              </Text>
              <View style={styles.timelineItem}>
                <Text variant="labelMedium">Created:</Text>
                <Text variant="bodyMedium">Jan 15, 2025 09:30 AM</Text>
              </View>
              <Divider style={styles.divider} />
              <View style={styles.timelineItem}>
                <Text variant="labelMedium">Last Updated:</Text>
                <Text variant="bodyMedium">Jan 15, 2025 02:45 PM</Text>
              </View>
              {workOrder.status === 'Completed' && (
                <>
                  <Divider style={styles.divider} />
                  <View style={styles.timelineItem}>
                    <Text variant="labelMedium">Completed:</Text>
                    <Text variant="bodyMedium">Jan 15, 2025 04:00 PM</Text>
                  </View>
                </>
              )}
            </Card.Content>
          </Card>

          {/* Assigned To Card */}
          <Card mode="elevated">
            <Card.Content>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Assigned To
              </Text>
              <View style={styles.infoRow}>
                <Text variant="bodyLarge">John Smith</Text>
                <Text variant="bodyMedium" style={styles.labelText}>
                  Senior Technician
                </Text>
              </View>
            </Card.Content>
          </Card>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            {workOrder.status !== 'Completed' && (
              <>
                <Button
                  mode="contained"
                  icon="camera-outline"
                  onPress={() => router.push('/scanning/scan-plant')}
                  style={styles.button}
                >
                  Scan Plant
                </Button>
                <Button
                  mode="contained"
                  icon="message-plus-outline"
                  onPress={() => console.log('Accept work order')}
                  style={styles.button}
                >
                  Accept Work Order
                </Button>
                <Button
                  mode="contained"
                  icon="check"
                  onPress={() => console.log('Mark as complete')}
                  style={styles.button}
                >
                  Mark as Complete
                </Button>
                <Button
                  mode="contained-tonal"
                  icon="close-circle"
                  onPress={() => console.log('Reject work order')}
                  style={styles.button}
                  textColor={MD3Colors.primary20}
                >
                  Reject Work Order
                </Button>
              </>
            )}
            <Button
              mode="contained-tonal"
              icon="message"
              onPress={() => console.log('Add comment')}
              style={styles.button}
            >
              Add Comment
            </Button>
          </View>
        </ScrollView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },
  codeText: {
    marginBottom: 4,
    opacity: 0.7,
  },
  titleText: {
    marginBottom: 12,
  },
  chipsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  sectionTitle: {
    marginBottom: 8,
    fontWeight: '600',
  },
  infoRow: {
    gap: 4,
  },
  descriptionText: {
    lineHeight: 22,
  },
  timelineItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  divider: {
    marginVertical: 8,
  },
  labelText: {
    opacity: 0.7,
  },
  actionButtons: {
    gap: 12,
    marginTop: 8,
    marginBottom: 16,
  },
  button: {
    marginVertical: 4,
  },
  backButton: {
    marginTop: 16,
  },
});
