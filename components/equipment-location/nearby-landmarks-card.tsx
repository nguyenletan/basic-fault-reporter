import { EquipmentLocation } from '@/types/types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Divider, Icon, MD2Colors, Text } from 'react-native-paper';

interface NearbyLandmarksCardProps {
  location: EquipmentLocation;
}

export function NearbyLandmarksCard({ location }: NearbyLandmarksCardProps) {
  if (!location.nearbyLandmarks || location.nearbyLandmarks.length === 0) {
    return null;
  }

  return (
    <Card mode="elevated">
      <Card.Content>
        <View style={styles.sectionHeader}>
          <Icon source="sign-direction" size={24} color={MD2Colors.orange500} />
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Nearby Landmarks
          </Text>
        </View>
        <Divider style={styles.sectionDivider} />
        {location.nearbyLandmarks.map((landmark, index) => (
          <View key={index} style={styles.listItem}>
            <Icon source="circle-small" size={24} color={MD2Colors.grey600} />
            <Text variant="bodyMedium" style={styles.listItemText}>
              {landmark}
            </Text>
          </View>
        ))}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  sectionTitle: {
    fontWeight: '600',
  },
  sectionDivider: {
    marginBottom: 12,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  listItemText: {
    flex: 1,
    marginTop: 2,
  },
});
