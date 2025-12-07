import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, List, Badge, Text } from 'react-native-paper';
import { ThemedView } from '@/components/themed-view';
import { View } from 'react-native';

export default function NotificationsScreen() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.headerRow}>
              <Title>Notifications</Title>
              <Badge>5</Badge>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <List.Item
              title="New Work Order Assigned"
              description="Electrical Fault - Building A requires attention"
              left={(props) => <List.Icon {...props} icon="briefcase" color="#5EBAB0" />}
              right={(props) => (
                <View {...props} style={styles.timeContainer}>
                  <Text style={styles.timeText}>2h ago</Text>
                </View>
              )}
            />
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <List.Item
              title="Maintenance Reminder"
              description="HVAC system check scheduled for tomorrow"
              left={(props) => <List.Icon {...props} icon="clock" color="#ffa726" />}
              right={(props) => (
                <View {...props} style={styles.timeContainer}>
                  <Text style={styles.timeText}>5h ago</Text>
                </View>
              )}
            />
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <List.Item
              title="Task Completed"
              description="Plumbing inspection has been completed"
              left={(props) => <List.Icon {...props} icon="check-circle" color="#66bb6a" />}
              right={(props) => (
                <View {...props} style={styles.timeContainer}>
                  <Text style={styles.timeText}>1d ago</Text>
                </View>
              )}
            />
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
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeContainer: {
    justifyContent: 'center',
  },
  timeText: {
    color: '#999',
    fontSize: 12,
  },
});
