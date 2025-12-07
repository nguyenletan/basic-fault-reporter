import { AccessInstructionsCard } from '@/components/equipment-location/access-instructions-card';
import { BuildingInfoCard } from '@/components/equipment-location/building-info-card';
import { LocationActions } from '@/components/equipment-location/location-actions';
import { LocationHeader } from '@/components/equipment-location/location-header';
import { LocationMapCard } from '@/components/equipment-location/location-map-card';
import { NearbyLandmarksCard } from '@/components/equipment-location/nearby-landmarks-card';
import { SafetyNotesCard } from '@/components/equipment-location/safety-notes-card';
import { SpecificLocationCard } from '@/components/equipment-location/specific-location-card';
import { ThemedView } from '@/components/themed-view';
import { useEquipmentLocation } from '@/hooks/use-equipment-location';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Icon, MD2Colors, Text } from 'react-native-paper';

export default function EquipmentLocationScreen() {
  const { id } = useLocalSearchParams();
  const { location, loading, error } = useEquipmentLocation(String(id));

  if (loading) {
    return (
      <>
        <Stack.Screen
          options={{
            title: 'Equipment Location',
            headerShown: true,
          }}
        />
        <ThemedView style={styles.container}>
          <View style={styles.centerContent}>
            <ActivityIndicator size="large" />
            <Text variant="bodyLarge" style={styles.loadingText}>
              Loading location information...
            </Text>
          </View>
        </ThemedView>
      </>
    );
  }

  if (error || !location) {
    return (
      <>
        <Stack.Screen
          options={{
            title: 'Location Not Found',
            headerShown: true,
          }}
        />
        <ThemedView style={styles.container}>
          <View style={styles.centerContent}>
            <Icon source="alert-circle" size={64} color={MD2Colors.red500} />
            <Text variant="headlineMedium" style={styles.errorTitle}>
              Location Not Found
            </Text>
            <Text variant="bodyMedium" style={styles.errorMessage}>
              {error || 'Unable to load equipment location'}
            </Text>
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
      <Stack.Screen
        options={{
          title: location.equipmentCode,
          headerShown: true,
        }}
      />
      <ThemedView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <LocationHeader location={location} />
          <BuildingInfoCard location={location} />
          <SpecificLocationCard location={location} />
          <LocationMapCard />
          <AccessInstructionsCard location={location} />
          <NearbyLandmarksCard location={location} />
          <SafetyNotesCard location={location} />
          <LocationActions location={location} id={String(id)} />
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
    padding: 24,
    gap: 16,
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },
  loadingText: {
    marginTop: 16,
  },
  errorTitle: {
    marginTop: 16,
    textAlign: 'center',
  },
  errorMessage: {
    marginTop: 8,
    textAlign: 'center',
    opacity: 0.7,
  },
  backButton: {
    marginTop: 24,
  },
});
