import { ThemedView } from '@/components/themed-view';
import { EquipmentLocation } from '@/types/types';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Icon, MD2Colors, MD3Colors, Text } from 'react-native-paper';
import { LocationHeader } from './LocationHeader';

interface IdleViewProps {
  location: EquipmentLocation | null;
  onStartScan: () => void;
}

export function IdleView({ location, onStartScan }: IdleViewProps) {
  return (
    <ThemedView style={styles.container}>
      <LocationHeader location={location} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card mode="elevated">
          <Card.Content>
            <View style={styles.idleContent}>
              <Icon source="qrcode-scan" size={80} color={MD3Colors.primary40} />
              <Text variant="headlineSmall" style={styles.idleTitle}>
                Scan Plant Equipment
              </Text>
              <Text variant="bodyMedium" style={styles.idleDescription}>
                Scan the QR code on the equipment to verify you are at the correct location and view
                equipment details.
              </Text>
            </View>
          </Card.Content>
          <Card.Actions style={styles.idleActions}>
            <Button
              mode="contained"
              icon="qrcode-scan"
              onPress={onStartScan}
              style={styles.startScanButton}
            >
              Start Scanning
            </Button>
          </Card.Actions>
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
  idleContent: {
    alignItems: 'center',
    paddingVertical: 24,
    gap: 16,
  },
  idleTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  idleDescription: {
    textAlign: 'center',
    color: MD2Colors.grey600,
    paddingHorizontal: 16,
  },
  idleActions: {
    justifyContent: 'center',
    paddingBottom: 16,
  },
  startScanButton: {
    borderRadius: 24,
  },
});
