import { ThemedView } from '@/components/themed-view';
import { paperTheme } from '@/constants/paper-theme';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, MD3Colors, ProgressBar, Text } from 'react-native-paper';

export default function MyJobsScreen() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text variant="headlineMedium">My Jobs Overview</Text>
        <Text variant="bodyMedium">Track your assigned tasks and progress</Text>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge">Electrical Fault - Building A</Text>
            <Text variant="bodyMedium">Status: In Progress</Text>
            <View style={styles.progressContainer}>
              <ProgressBar progress={0.6} color={MD3Colors.primary40} style={styles.progressBar} />
              <Text style={styles.progressText}>60% Complete</Text>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge">HVAC Maintenance - Floor 3</Text>
            <Text variant="bodyMedium">Status: Scheduled</Text>
            <View style={styles.progressContainer}>
              <ProgressBar progress={0.2} color={MD3Colors.primary80} style={styles.progressBar} />
              <Text style={styles.progressText}>20% Complete</Text>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge">Plumbing Inspection</Text>
            <Text variant="bodyMedium">Status: Completed</Text>
            <View style={styles.progressContainer}>
              <ProgressBar progress={1.0} color={MD3Colors.primary20} style={styles.progressBar} />
              <Text style={styles.progressText}>100% Complete</Text>
            </View>
          </Card.Content>
        </Card>
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
  card: {
    height: 140,
  },
  progressContainer: {
    marginTop: 12,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  progressText: {
    marginTop: 4,
    fontSize: 12,
    color: '#666',
  },
});
