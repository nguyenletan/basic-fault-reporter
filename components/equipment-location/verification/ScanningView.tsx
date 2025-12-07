import { ThemedView } from '@/components/themed-view';
import { VerificationResult } from '@/services/subsystem-verification';
import { EquipmentLocation } from '@/types/types';
import { CameraView } from 'expo-camera';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  ActivityIndicator,
  Button,
  IconButton,
  MD2Colors,
  MD3Colors,
  Text,
} from 'react-native-paper';
import { LocationHeader } from './LocationHeader';

interface ScanningViewProps {
  location: EquipmentLocation | null;
  scanState: 'scanning' | 'loading';
  flashEnabled: boolean;
  onToggleFlash: () => void;
  onManualVerify: () => void;
  onBarCodeScanned: (result: { data: string }) => void;
  verificationResult: VerificationResult | null;
}

export function ScanningView({
  location,
  scanState,
  flashEnabled,
  onToggleFlash,
  onManualVerify,
  onBarCodeScanned,
  verificationResult,
}: ScanningViewProps) {
  return (
    <ThemedView style={styles.container}>
      <LocationHeader location={location} />

      {/* Scan Title */}
      <View style={styles.scanTitleContainer}>
        <IconButton icon="chevron-left" size={24} onPress={() => router.back()} />
        <View>
          <Text variant="headlineMedium" style={styles.scanTitle}>
            Scan Plant
          </Text>
          <Text variant="bodyMedium" style={styles.scanSubtitle}>
            To verify location of Plant or Asset
          </Text>
        </View>
      </View>

      {/* Camera View */}
      <View style={styles.cameraContainer}>
        {scanState === 'loading' ? (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#fff" />
            <Text variant="titleMedium" style={styles.loadingText}>
              Verifying equipment...
            </Text>
          </View>
        ) : (
          <>
            <CameraView
              style={styles.camera}
              facing="back"
              enableTorch={flashEnabled}
              barcodeScannerSettings={{
                barcodeTypes: ['qr'],
              }}
              onBarcodeScanned={onBarCodeScanned}
            />
            <View style={styles.scanOverlay}>
              <View style={styles.scanFrame}>
                <View style={[styles.cornerTL, styles.corner]} />
                <View style={[styles.cornerTR, styles.corner]} />
                <View style={[styles.cornerBL, styles.corner]} />
                <View style={[styles.cornerBR, styles.corner]} />
              </View>
            </View>
          </>
        )}
      </View>

      {/* Scan Instructions */}
      <Text variant="bodyLarge" style={styles.scanInstruction}>
        Align QR or Barcode within the frame
      </Text>

      {/* Action Buttons */}
      <View style={styles.scanActions}>
        <Button
          mode="outlined"
          icon="flashlight"
          onPress={onToggleFlash}
          style={styles.actionButton}
        >
          Flashlight
        </Button>
        <Button
          mode="outlined"
          icon="hand-pointing-up"
          onPress={onManualVerify}
          style={styles.actionButton}
        >
          Manual Verify
        </Button>
      </View>

      {/* Last Verified Info */}
      {verificationResult?.lastVerified && (
        <View style={styles.lastVerifiedContainer}>
          <Text variant="bodyMedium" style={styles.lastVerifiedText}>
            Last verified: {verificationResult.lastVerified.name}
          </Text>
        </View>
      )}

      {/* Continue Button */}
      <Button
        mode="contained"
        onPress={() => router.back()}
        style={styles.continueButton}
        contentStyle={styles.continueButtonContent}
      >
        Continue
      </Button>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scanTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  scanTitle: {
    color: MD3Colors.primary40,
    fontWeight: 'bold',
  },
  scanSubtitle: {
    color: MD2Colors.grey600,
  },
  cameraContainer: {
    flex: 1,
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#000',
    minHeight: 300,
    maxHeight: 400,
  },
  camera: {
    flex: 1,
  },
  scanOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: 220,
    height: 220,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: '#fff',
  },
  cornerTL: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 8,
  },
  cornerTR: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 8,
  },
  cornerBL: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 8,
  },
  cornerBR: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 8,
  },
  loadingOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    gap: 16,
  },
  loadingText: {
    color: '#fff',
  },
  scanInstruction: {
    textAlign: 'center',
    color: MD3Colors.primary40,
    marginTop: 16,
    paddingHorizontal: 16,
  },
  scanActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: 16,
    paddingHorizontal: 16,
  },
  actionButton: {
    flex: 1,
  },
  lastVerifiedContainer: {
    backgroundColor: '#EDE7F6',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 12,
    borderRadius: 24,
    alignItems: 'center',
  },
  lastVerifiedText: {
    color: MD2Colors.purple700,
  },
  continueButton: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 24,
    borderRadius: 24,
  },
  continueButtonContent: {
    paddingVertical: 8,
  },
});
