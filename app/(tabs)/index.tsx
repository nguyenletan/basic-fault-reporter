import { ThemedView } from '@/components/themed-view';
import { IconCard } from '@/components/ui/icon-card';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Icon, MD2Colors, MD3Colors, Text } from 'react-native-paper';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text variant="displaySmall" style={styles.header}>
          Alerts and Work Orders
        </Text>
        <Card mode="elevated" onPress={() => router.push('/alert')} style={styles.alertCard}>
          <Card.Content style={styles.cardContent}>
            <View style={styles.cardInner}>
              <Text style={styles.cardNumber}>3</Text>
              <Text variant="displaySmall" style={styles.cardText}>
                Active {'\n'}
                Fault Alert
              </Text>
            </View>
            <View style={styles.cardIndicator}>
              <Icon source="alert" size={28} color={MD3Colors.error100} />
            </View>
          </Card.Content>
        </Card>
        <View style={styles.twoColumns}>
          <IconCard icon="tools" title="Start Inspection" />
          <IconCard
            icon="camera-outline"
            title="Scan Equipment"
            onPress={() => router.push('/equipment/0/scanning')}
          />
        </View>
        <View style={styles.twoColumns}>
          <IconCard
            icon="alert-outline"
            title="Incident Reports"
            onPress={() => router.push('/alert')}
          />
          <IconCard icon="file-chart-outline" title="Incident Reports" />
        </View>
        <View style={styles.twoColumns}>
          <IconCard
            icon="folder-wrench-outline"
            title="Work Orders"
            onPress={() => router.push('/work-orders')}
          />
          <IconCard icon="map-search-outline" title="Location Map" />
        </View>
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
  header: {},

  alertCard: {
    backgroundColor: MD2Colors.deepOrange800,
    color: MD3Colors.primary100,
  },

  cardContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    paddingVertical: 24,
    paddingHorizontal: 24,
    flexWrap: 'wrap',
  },
  cardIndicator: {
    position: 'absolute',
    right: 8,
    top: 8,
  },
  cardInner: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 24,
  },
  twoColumns: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexShrink: 1,
    gap: 16,
    flexGrow: 1,
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
  cardNumber: {
    fontWeight: '800',
    color: MD3Colors.primary100,
    fontSize: 68,
  },
  cardText: {
    color: MD3Colors.primary100,
  },
});
