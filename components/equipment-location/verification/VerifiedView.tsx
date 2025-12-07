import { ThemedView } from '@/components/themed-view';
import { VerificationResult } from '@/services/subsystem-verification';
import { EquipmentLocation } from '@/types/types';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  Button,
  Card,
  Divider,
  Icon,
  IconButton,
  MD2Colors,
  MD3Colors,
  Text,
} from 'react-native-paper';
import { LocationHeader } from './LocationHeader';

interface VerifiedViewProps {
  location: EquipmentLocation | null;
  verificationResult: VerificationResult;
  onRescan: () => void;
  onContinue: () => void;
}

export function VerifiedView({
  location,
  verificationResult,
  onRescan,
  onContinue,
}: VerifiedViewProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <ThemedView style={styles.container}>
      <LocationHeader location={location} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Verification Title */}
        <View style={styles.verificationTitleContainer}>
          <IconButton icon="chevron-left" size={24} onPress={() => router.back()} />
          <Text variant="headlineMedium" style={styles.verificationTitle}>
            Location Verification
          </Text>
        </View>

        {/* QR Code Display (static representation) */}
        <View style={styles.qrDisplayContainer}>
          <View style={styles.qrPlaceholder}>
            <Icon source="qrcode" size={120} color={MD2Colors.grey700} />
          </View>
        </View>

        {/* Verification Success Card */}
        <Card mode="elevated" style={styles.verifiedCard}>
          <Card.Content>
            <View style={styles.verifiedHeader}>
              <Icon source="check-circle" size={32} color={MD2Colors.green500} />
              <View style={styles.verifiedHeaderText}>
                <Text variant="titleLarge" style={styles.verifiedTitle}>
                  Plant Verified:
                </Text>
                <Text variant="titleMedium" style={styles.verifiedName}>
                  {verificationResult.equipment?.name || location?.equipmentName}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Equipment Details Card */}
        <Card mode="elevated">
          <Card.Content>
            <View style={styles.detailRow}>
              <Text variant="bodyMedium" style={styles.detailLabel}>
                Last Service Date
              </Text>
              <Text variant="bodyLarge" style={styles.detailValue}>
                {verificationResult.equipment?.lastServiceDate
                  ? formatDate(verificationResult.equipment.lastServiceDate)
                  : '01 Aug 2025'}
              </Text>
            </View>
            <Divider style={styles.detailDivider} />
            <View style={styles.detailRow}>
              <Text variant="bodyMedium" style={styles.detailLabel}>
                Total Operating Hours
              </Text>
              <Text variant="bodyLarge" style={styles.detailValue}>
                {verificationResult.equipment?.totalOperatingHours?.toLocaleString() || '5,280'}
              </Text>
            </View>
            <Divider style={styles.detailDivider} />
            <View style={styles.detailRow}>
              <Text variant="bodyMedium" style={styles.detailLabel}>
                Open Fault Alerts
              </Text>
              <Text
                variant="bodyLarge"
                style={[
                  styles.detailValue,
                  {
                    color:
                      (verificationResult.equipment?.openFaultAlerts || 0) > 0
                        ? MD3Colors.error40
                        : MD2Colors.grey700,
                  },
                ]}
              >
                {verificationResult.equipment?.openFaultAlerts || 3}
              </Text>
            </View>
            <Divider style={styles.detailDivider} />
            <View style={styles.detailRow}>
              <Text variant="bodyMedium" style={styles.detailLabel}>
                Warranty Expiry
              </Text>
              <Text variant="bodyLarge" style={styles.detailValue}>
                {verificationResult.equipment?.warrantyExpiry
                  ? formatDate(verificationResult.equipment.warrantyExpiry)
                  : '01 Feb 2026'}
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Button mode="contained" icon="qrcode-scan" onPress={onRescan} style={styles.button}>
            Scan Another
          </Button>
          <Button
            mode="outlined"
            icon="information"
            onPress={() => router.push(`/equipment/${String(location?.id)}/detail`)}
            style={styles.button}
          >
            View Equipment Details
          </Button>
          <Button mode="contained-tonal" onPress={onContinue} style={styles.button}>
            Continue to Work Order
          </Button>
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
  verificationTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  verificationTitle: {
    color: MD3Colors.primary40,
    fontWeight: 'bold',
  },
  qrDisplayContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  qrPlaceholder: {
    width: 180,
    height: 180,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  verifiedCard: {
    backgroundColor: '#E8F5E9',
    marginBottom: 8,
  },
  verifiedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  verifiedHeaderText: {
    flex: 1,
  },
  verifiedTitle: {
    fontWeight: 'bold',
    color: MD2Colors.green800,
  },
  verifiedName: {
    color: MD2Colors.grey800,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  detailLabel: {
    color: MD2Colors.grey600,
  },
  detailValue: {
    fontWeight: '600',
  },
  detailDivider: {
    backgroundColor: '#e0e0e0',
  },
  actionButtons: {
    gap: 12,
    marginTop: 16,
    marginBottom: 24,
  },
  button: {},
});
