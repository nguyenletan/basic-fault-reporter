import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Divider, Icon, MD2Colors, Text } from 'react-native-paper';

export function LocationMapCard() {
  return (
    <Card mode="elevated">
      <Card.Content>
        <View style={styles.sectionHeader}>
          <Icon source="map" size={24} color={MD2Colors.teal500} />
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Location Map
          </Text>
        </View>
        <Divider style={styles.sectionDivider} />
        <View style={styles.mapImageContainer}>
          <Image
            source={require('../../assets/images/location.svg')}
            style={styles.mapImage}
            contentFit="cover"
            contentPosition="center"
          />
        </View>
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
  mapImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapImage: {
    width: '100%',
    height: 200,
  },
});
