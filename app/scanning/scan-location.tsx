import { ThemedView } from '@/components/themed-view';
import { Stack } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Chip, Divider, Text } from 'react-native-paper';

export default function ScanLocationScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Scan Location',
          headerShown: true,
        }}
      />
      <ThemedView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header Card */}
          <Card mode="elevated">
            <Card.Content>
              <Text variant="labelLarge" style={styles.codeText}>
                Scan Location
              </Text>

              <View style={styles.chipsContainer}>
                <Chip mode="flat">Scan Location</Chip>
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
                <Text variant="bodyLarge">Location</Text>
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
                Description
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
            </Card.Content>
          </Card>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <Button
              mode="outlined"
              icon="qrcode-scan"
              onPress={() => console.log('Scan Location')}
              style={styles.button}
            >
              Scan Location
            </Button>
            <Button
              mode="outlined"
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
