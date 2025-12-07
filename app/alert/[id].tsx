import { ThemedView } from '@/components/themed-view';
import { Alert } from '@/types/types';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Chip, Divider, MD2Colors, Text } from 'react-native-paper';

// Mock data - in a real app, this would come from an API or state management
const alerts: Alert[] = [
  {
    id: 1,
    code: '#AL-4530',
    title: 'Chiller - Low Coolant Pressure',
    location: 'HQ Tower - Level 3',
    priority: 'Critical',
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
    title: 'HVAC Unit - Fan Noise',
    location: 'Annex - Level 2',
    priority: 'High',
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
    title: 'Boiler - Sensor Calibration',
    location: 'Plant B - Level 1',
    priority: 'Routine',
    status: 'Completed',
    buildingName: 'Plant B',
    buildingAddress: '789 Industrial Road, Singapore 629234',
    plantSystemName: 'Boiler System',
    subSystemDetails: 'Temperature Sensor Array',
    equipmentId: '#EQ-003',
    dueDate: '2025-01-20T16:00:00',
  },
];

export default function AlertDetailScreen() {
  const { id } = useLocalSearchParams();

  // Find the alert by ID
  const alert = alerts.find((a) => a.id === Number(id));

  if (!alert) {
    return (
      <>
        <Stack.Screen
          options={{
            title: 'Alert Not Found',
            headerShown: true,
          }}
        />
        <ThemedView style={styles.container}>
          <View style={styles.content}>
            <Text variant="headlineMedium">Alert Not Found</Text>
            <Button mode="contained" onPress={() => router.back()} style={styles.backButton}>
              Go Back
            </Button>
          </View>
        </ThemedView>
      </>
    );
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return MD2Colors.red900;
      case 'High':
        return MD2Colors.red500;
      case 'Medium':
        return MD2Colors.orange600;
      case 'Routine':
        return MD2Colors.blue500;
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
    <>
      <Stack.Screen
        options={{
          title: alert.code,
          headerShown: true,
        }}
      />
      <ThemedView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header Card */}
          <Card mode="elevated">
            <Card.Content>
              <Text variant="labelLarge" style={styles.codeText}>
                {alert.code}
              </Text>
              <Text variant="headlineMedium" style={styles.titleText}>
                {alert.title}
              </Text>

              <View style={styles.chipsContainer}>
                <Chip
                  style={{
                    backgroundColor: getPriorityColor(alert.priority),
                  }}
                  textStyle={{ color: MD2Colors.white }}
                  mode="flat"
                >
                  {alert.priority} Priority
                </Chip>
                <Chip icon={getStatusIcon(alert.status)} mode="flat">
                  {alert.status}
                </Chip>
              </View>
            </Card.Content>
          </Card>

          {/* Location Details Card */}
          <Card mode="elevated">
            <Card.Content>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Location Details
              </Text>
              <View style={styles.diagnosticRow}>
                <Text variant="labelMedium">Building:</Text>
                <Text variant="bodyMedium">{alert.buildingName}</Text>
              </View>
              <Divider style={styles.divider} />
              <View style={styles.diagnosticRow}>
                <Text variant="labelMedium">Address:</Text>
                <Text variant="bodyMedium" style={styles.addressText}>
                  {alert.buildingAddress}
                </Text>
              </View>
              <Divider style={styles.divider} />
              <View style={styles.diagnosticRow}>
                <Text variant="labelMedium">Specific Location:</Text>
                <Text variant="bodyMedium">{alert.location}</Text>
              </View>
            </Card.Content>
          </Card>

          {/* Equipment/System Details Card */}
          <Card mode="elevated">
            <Card.Content>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Equipment Details
              </Text>
              <View style={styles.diagnosticRow}>
                <Text variant="labelMedium">Plant/System:</Text>
                <Text variant="bodyMedium">{alert.plantSystemName}</Text>
              </View>
              <Divider style={styles.divider} />
              <View style={styles.diagnosticRow}>
                <Text variant="labelMedium">Sub-system:</Text>
                <Text variant="bodyMedium">{alert.subSystemDetails}</Text>
              </View>
            </Card.Content>
          </Card>

          {/* Alert Details Card */}
          <Card mode="elevated">
            <Card.Content>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Alert Details
              </Text>
              <Text variant="bodyMedium" style={styles.descriptionText}>
                FDD system has detected an anomaly: {alert.title.toLowerCase()} at {alert.location}.
                This alert has been classified as {alert.priority.toLowerCase()} priority and is
                currently {alert.status.toLowerCase()}.
              </Text>
            </Card.Content>
          </Card>

          {/* Diagnostic Information Card */}
          <Card mode="elevated">
            <Card.Content>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Diagnostic Information
              </Text>
              <View style={styles.diagnosticRow}>
                <Text variant="labelMedium">Alert Type:</Text>
                <Text variant="bodyMedium">FDD Alert</Text>
              </View>
              <Divider style={styles.divider} />
              <View style={styles.diagnosticRow}>
                <Text variant="labelMedium">Detection Time:</Text>
                <Text variant="bodyMedium">Jan 15, 2025 09:30 AM</Text>
              </View>
              <Divider style={styles.divider} />
              <View style={styles.diagnosticRow}>
                <Text variant="labelMedium">Severity Level:</Text>
                <Text variant="bodyMedium">{alert.priority}</Text>
              </View>
            </Card.Content>
          </Card>

          {/* Compliance & Due Date Card */}
          {alert.dueDate && (
            <Card mode="elevated">
              <Card.Content>
                <Text variant="titleMedium" style={styles.sectionTitle}>
                  Compliance Tracking
                </Text>
                <View style={styles.diagnosticRow}>
                  <Text variant="labelLarge">Priority Level:</Text>
                  <Chip
                    style={{
                      backgroundColor: getPriorityColor(alert.priority),
                    }}
                    textStyle={{ color: MD2Colors.white }}
                    mode="flat"
                  >
                    {alert.priority}
                  </Chip>
                </View>
              </Card.Content>
            </Card>
          )}

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            {alert.status !== 'Completed' && (
              <>
                <Button
                  mode="contained"
                  icon="hammer-wrench"
                  onPress={() => router.push(`/equipment/${alert.id}/location`)}
                  style={styles.button}
                >
                  Accept job
                </Button>
                <Button
                  mode="outlined"
                  icon="close-circle"
                  onPress={() =>
                    router.push(
                      `/alert/rejection-submission?id=${alert.id}&code=${encodeURIComponent(alert.code)}&buildingName=${encodeURIComponent(alert.buildingName)}&buildingAddress=${encodeURIComponent(alert.buildingAddress)}&location=${encodeURIComponent(alert.location)}`
                    )
                  }
                  style={styles.button}
                >
                  Reject Job
                </Button>
                <Button
                  mode="contained-tonal"
                  icon="check"
                  onPress={() => console.log('Mark as resolved')}
                  style={styles.button}
                >
                  Mark as Resolved
                </Button>
              </>
            )}

            <Button
              mode="contained-tonal"
              icon="message"
              onPress={() => console.log('Add note')}
              style={styles.button}
            >
              Add Note
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
  diagnosticRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  divider: {
    marginVertical: 8,
  },
  actionText: {
    lineHeight: 24,
    marginBottom: 4,
  },
  actionButtons: {
    gap: 12,
    marginTop: 8,
    marginBottom: 16,
  },
  button: {},
  backButton: {
    marginTop: 16,
  },
  addressText: {
    textAlign: 'right',
    flex: 1,
    marginLeft: 16,
  },
  dueDateText: {
    fontWeight: '600',
  },
  overdueWarning: {
    backgroundColor: MD2Colors.red100,
    padding: 8,
    borderRadius: 4,
  },
  overdueText: {
    color: MD2Colors.red900,
    fontWeight: '600',
    textAlign: 'center',
  },
});
