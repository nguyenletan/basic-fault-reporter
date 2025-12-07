import { AdditionalSpecsGrid } from '@/components/equipment-detail/additional-specs-grid';
import { AnnualEnergyChart } from '@/components/equipment-detail/annual-energy-chart';
import { AssetReliabilityChart } from '@/components/equipment-detail/asset-reliability-chart';
import { BuildingImageCard } from '@/components/equipment-detail/building-image-card';
import { EnergyConsumptionChart } from '@/components/equipment-detail/energy-consumption-chart';
import { EquipmentHeader } from '@/components/equipment-detail/equipment-header';
import { EquipmentImageCard } from '@/components/equipment-detail/equipment-image-card';
import { IotLiveData } from '@/components/equipment-detail/iot-live-data';
import { QuickHealthStatus } from '@/components/equipment-detail/quick-health-status';
import { RecentWorkOrders } from '@/components/equipment-detail/recent-work-orders';
import { ReliabilityHoursChart } from '@/components/equipment-detail/reliability-hours-chart';
import { SpecificationsGrid } from '@/components/equipment-detail/specifications-grid';
import { ThemedView } from '@/components/themed-view';
import { useEquipmentDetail } from '@/hooks/use-equipment-detail';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Icon, MD2Colors, Text } from 'react-native-paper';

export default function EquipmentDetailScreen() {
  const { id } = useLocalSearchParams();
  const {
    equipment,
    loading,
    error,
    getAnnualEnergyChartData,
    getAssetReliabilityChartData,
    getReliabilityChartData,
  } = useEquipmentDetail(String(id));

  if (loading) {
    return (
      <>
        <Stack.Screen
          options={{
            title: 'Equipment Details',
            headerShown: true,
          }}
        />
        <ThemedView style={styles.container}>
          <View style={styles.centerContent}>
            <ActivityIndicator size="large" />
            <Text variant="bodyLarge" style={styles.loadingText}>
              Loading equipment details...
            </Text>
          </View>
        </ThemedView>
      </>
    );
  }

  if (error || !equipment) {
    return (
      <>
        <Stack.Screen
          options={{
            title: 'Error',
            headerShown: true,
          }}
        />
        <ThemedView style={styles.container}>
          <View style={styles.centerContent}>
            <Icon source="alert-circle" size={64} color={MD2Colors.red500} />
            <Text variant="headlineMedium" style={styles.errorTitle}>
              Failed to Load
            </Text>
            <Text variant="bodyMedium" style={styles.errorMessage}>
              {error || 'Unable to load equipment details'}
            </Text>
          </View>
        </ThemedView>
      </>
    );
  }

  const annualEnergyData = getAnnualEnergyChartData();
  const assetReliabilityData = getAssetReliabilityChartData();
  const reliabilityData = getReliabilityChartData();

  return (
    <>
      <Stack.Screen
        options={{
          title: equipment.equipmentCode,
          headerShown: true,
        }}
      />
      <ThemedView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <EquipmentHeader equipment={equipment} />

          <BuildingImageCard equipment={equipment} id={String(id)} />

          <SpecificationsGrid equipment={equipment} />

          <EquipmentImageCard equipment={equipment} />

          <AdditionalSpecsGrid equipment={equipment} />

          <EnergyConsumptionChart equipment={equipment} />

          {annualEnergyData && (
            <AnnualEnergyChart
              equipment={equipment}
              data={annualEnergyData.data}
              years={annualEnergyData.years}
            />
          )}

          {assetReliabilityData && (
            <AssetReliabilityChart
              equipment={equipment}
              maintenanceData={assetReliabilityData.maintenanceData}
              partsData={assetReliabilityData.partsData}
              energyData={assetReliabilityData.energyData}
              years={assetReliabilityData.years}
            />
          )}

          {reliabilityData && (
            <ReliabilityHoursChart
              equipment={equipment}
              mtbfData={reliabilityData.mtbfData}
              mttrData={reliabilityData.mttrData}
              years={reliabilityData.years}
            />
          )}

          <QuickHealthStatus equipment={equipment} />

          <IotLiveData equipment={equipment} />

          <RecentWorkOrders equipment={equipment} />
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
    gap: 12,
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
});
