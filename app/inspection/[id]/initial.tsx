import { ThemedView } from '@/components/themed-view';
import { Alert } from '@/types/types';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  Button,
  Card,
  Checkbox,
  IconButton,
  Menu,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';

// Mock data - should match the alerts from [id].tsx
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

interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
}

export default function InitialInspectionScreen() {
  const { id } = useLocalSearchParams();
  const theme = useTheme();
  const alert = alerts.find((a) => a.id === Number(id));

  const [menuVisible, setMenuVisible] = useState(false);
  const [photosTaken, setPhotosTaken] = useState(false);
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    { id: '1', label: 'Excessive vibration', checked: false },
    { id: '2', label: 'Abnormal noise', checked: false },
    { id: '3', label: 'Belt loose or worn', checked: false },
    { id: '4', label: 'Visible damage', checked: false },
    { id: '5', label: 'High temperature', checked: false },
    { id: '6', label: 'Signs of leak', checked: false },
  ]);
  const [notes, setNotes] = useState('');

  const toggleCheckbox = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const handleNext = () => {
    // TODO: Navigate to next inspection screen
    console.log('Checklist:', checklist);
    console.log('Notes:', notes);
    router.push({
      pathname: '/inspection/[id]/taking-photos',
      params: { id: id as string }
    });
  };

  if (!alert) {
    return (
      <>
        <Stack.Screen options={{ title: 'Inspection Not Found', headerShown: true }} />
        <ThemedView style={styles.container}>
          <View style={styles.centerContent}>
            <Text variant="headlineMedium">Alert Not Found</Text>
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
      <Stack.Screen options={{ title: 'Initial Inspection', headerShown: true }} />
      <ThemedView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header Card with Equipment Info */}
          <Card mode="elevated" style={styles.headerCard}>
            <Card.Content style={styles.headerContent}>
              <View style={styles.iconContainer}>
                <IconButton icon="home" size={32} />
              </View>
              <View style={styles.headerTextContainer}>
                <Text variant="titleMedium" style={styles.headerTitle}>
                  Initial Basic Surface Inspection:
                </Text>
                <Text variant="bodyLarge" style={styles.headerSubtitle}>
                  {alert.equipmentId} {alert.title}
                </Text>
              </View>
            </Card.Content>
          </Card>

          {/* Take Photos Section */}
          <Card style={styles.photosCard}>
            <Card.Content style={styles.photosContent}>
              <View style={styles.photosHeader}>
                <Checkbox.Item
                  label="Take Photos beforehand"
                  status={photosTaken ? 'checked' : 'unchecked'}
                  onPress={() => setPhotosTaken(!photosTaken)}
                  style={styles.photosCheckboxItem}
                  labelStyle={styles.photosCheckboxLabel}
                  mode="android"
                  position="leading"
                />
                <Menu
                  visible={menuVisible}
                  onDismiss={() => setMenuVisible(false)}
                  anchor={
                    <IconButton
                      icon="dots-vertical"
                      size={20}
                      onPress={() => setMenuVisible(true)}
                    />
                  }
                >
                  <Menu.Item onPress={() => { }} title="Open Camera" leadingIcon="camera" />
                  <Menu.Item onPress={() => { }} title="Choose from Gallery" leadingIcon="image" />
                </Menu>
              </View>
            </Card.Content>
          </Card>

          {/* Checklist Section */}
          <Card>
            <Card.Content>
              <Text variant="titleMedium" style={styles.checklistTitle}>
                Check off simple observations:
              </Text>

              <View style={styles.checklistItems}>
                {checklist.map((item) => (
                  <View key={item.id} style={styles.checklistRow}>
                    <Checkbox.Item
                      label={item.label}
                      status={item.checked ? 'checked' : 'unchecked'}
                      onPress={() => toggleCheckbox(item.id)}
                      style={styles.checkboxItem}
                      labelStyle={styles.checkboxItemLabel}
                      mode="android"
                      position="leading"
                    />
                    <IconButton
                      icon="dots-vertical"
                      size={20}
                      onPress={() => {
                        // TODO: Add item-specific actions
                      }}
                    />
                  </View>
                ))}
              </View>
            </Card.Content>
          </Card>

          {/* Notes Section */}
          <Card style={styles.notesCard}>
            <Card.Content>
              <Text variant="titleSmall" style={styles.notesTitle}>
                Add an optional note
              </Text>
              <Text variant="bodySmall" style={styles.notesSubtitle}>
                This is core input to start the FDD process
              </Text>
              <TextInput
                mode="outlined"
                placeholder="Put your note here"
                value={notes}
                onChangeText={setNotes}
                multiline
                numberOfLines={5}
                style={styles.notesInput}
              />

            </Card.Content>
          </Card>
          <Button style={styles.nextButton}
            mode="contained"
            onPress={handleNext}
          >
            Next
          </Button>
        </ScrollView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
    gap: 16,
  },
  backButton: {
    marginTop: 16,
  },
  headerCard: {
    //backgroundColor: MD3Colors.primary50,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    //color: '#ffffff',
    marginBottom: 4,
  },
  headerSubtitle: {
    //color: '#ffffff',
    fontWeight: '600',
  },
  photosCard: {},
  photosContent: {
    paddingVertical: 8,
  },
  photosHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  photosCheckboxItem: {
    flex: 1,
    paddingLeft: 0,
  },
  photosCheckboxLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  checklistCard: {},
  checklistTitle: {
    fontWeight: '600',
    marginBottom: 4,
  },
  checklistSubtitle: {
    opacity: 0.6,
    marginBottom: 16,
  },
  checklistItems: {
    gap: 4,
  },
  checklistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkboxItem: {
    flex: 1,
    paddingLeft: 0,
    paddingVertical: 4,
  },
  checkboxItemLabel: {
    fontSize: 16,
  },
  notesCard: {},
  notesTitle: {
    fontWeight: '600',
    marginBottom: 4,
  },
  notesSubtitle: {
    opacity: 0.6,
    marginBottom: 12,
  },
  notesInput: {
    minHeight: 150,
  },

  nextButton: {
    marginVertical: 8,
  },
});
