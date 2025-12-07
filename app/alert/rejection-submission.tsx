import { ThemedView } from '@/components/themed-view';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Chip, Divider, Text } from 'react-native-paper';

export default function RejectionSubmissionScreen() {
  const { id, code, buildingName, buildingAddress, location } = useLocalSearchParams();
  const [rejectionReason, setRejectionReason] = useState('');

  // Convert code to string with fallback
  const alertCode = Array.isArray(code)
    ? 'Reject ' + code[0]
    : 'Reject ' + code || 'Alert Rejection';

  // Convert location params to strings
  const building = Array.isArray(buildingName) ? buildingName[0] : buildingName || '';
  const address = Array.isArray(buildingAddress) ? buildingAddress[0] : buildingAddress || '';
  const specificLocation = Array.isArray(location) ? location[0] : location || '';

  const handleSubmitRejection = () => {
    console.log('Rejection submitted:', { alertId: id, rejectionReason });
    // Here you would typically send this to your API
    // Then navigate back to the alert list or previous screen
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: alertCode,
          headerShown: true,
        }}
      />
      <ThemedView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Location Information Card */}
          {building && (
            <Card mode="elevated" style={styles.locationCard}>
              <Card.Content>
                <View style={styles.locationHeader}>
                  <Text variant="labelMedium" style={styles.locationLabel}>
                    LOCATION & STATUS
                  </Text>
                </View>
                <Text variant="titleLarge" style={styles.buildingName}>
                  {building}
                </Text>
                {specificLocation && (
                  <Text variant="bodyMedium" style={styles.specificLocation}>
                    {specificLocation}
                  </Text>
                )}
                {address && (
                  <Text variant="bodySmall" style={styles.address}>
                    {address}
                  </Text>
                )}
              </Card.Content>
            </Card>
          )}

          <Card mode="elevated" style={styles.rejectionCard}>
            <Card.Content>
              <Text variant="headlineSmall" style={styles.rejectionTitle}>
                Alert Rejection Notice
              </Text>
              <Text variant="bodyMedium" style={styles.rejectionDescription}>
                Provide reason for rejecting this Alert Notice as this must be formally approved and
                handed over to a designated person.
              </Text>

              <Divider style={styles.divider} />

              <View style={styles.rejectionOptions}>
                <Chip
                  icon="check"
                  textStyle={styles.selectionText}
                  style={styles.selection}
                  mode={rejectionReason === 'Alert Repaired' ? 'flat' : 'outlined'}
                  onPress={() => setRejectionReason('Alert Repaired')}
                >
                  Alert Repaired
                </Chip>
                <Chip
                  textStyle={styles.selectionText}
                  style={styles.selection}
                  icon="progress-clock"
                  mode={rejectionReason === 'Repair in Progress' ? 'flat' : 'outlined'}
                  onPress={() => setRejectionReason('Repair in Progress')}
                >
                  Repair in Progress
                </Chip>
              </View>
            </Card.Content>
            <Card.Actions style={styles.cardActions}>
              <Button mode="outlined" icon="note-text" onPress={() => console.log('Add Note')}>
                Add Note
              </Button>

              <Button
                icon="check"
                mode="contained"
                onPress={handleSubmitRejection}
                disabled={!rejectionReason}
              >
                Confirm and Submit
              </Button>
            </Card.Actions>
          </Card>
        </ScrollView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  locationCard: {
    marginBottom: 16,
  },
  locationHeader: {
    marginBottom: 8,
  },
  locationLabel: {
    opacity: 0.6,
    fontWeight: '600',
  },
  buildingName: {
    fontWeight: '700',
    marginBottom: 4,
  },
  specificLocation: {
    marginBottom: 4,
    opacity: 0.8,
  },
  address: {
    opacity: 0.6,
    lineHeight: 18,
  },
  rejectionCard: {
    marginTop: 8,
  },
  rejectionHeader: {
    marginBottom: 8,
    marginLeft: -8,
  },
  backButtonContent: {
    justifyContent: 'flex-start',
  },
  rejectionTitle: {
    marginBottom: 12,
    fontWeight: '600',
  },
  rejectionDescription: {
    marginBottom: 16,
    lineHeight: 22,
  },
  divider: {
    marginVertical: 16,
  },
  rejectionOptions: {
    gap: 18,
    marginTop: 16,
    marginBottom: 24,
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 8,
    marginBottom: 16,
  },
  selection: {
    paddingVertical: 18,
  },
  selectionText: {
    fontWeight: '600',
    fontSize: 18,
  },
});
