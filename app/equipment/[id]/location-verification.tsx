import { ErrorView } from '@/components/equipment-location/verification/ErrorView';
import { IdleView } from '@/components/equipment-location/verification/IdleView';
import { LoadingView } from '@/components/equipment-location/verification/LoadingView';
import { ScanningView } from '@/components/equipment-location/verification/ScanningView';
import { VerifiedView } from '@/components/equipment-location/verification/VerifiedView';
import { useLocationVerification } from '@/hooks/useLocationVerification';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';

export default function LocationVerificationScreen() {
  const { id } = useLocalSearchParams();
  const {
    scanState,
    scannedCode,
    location,
    verificationResult,
    errorMessage,
    flashEnabled,
    locationLoading,
    handleBarCodeScanned,
    handleStartScan,
    handleRescan,
    handleManualVerify,
    handleContinue,
    toggleFlash,
  } = useLocationVerification(String(id));

  // Loading state for location data
  if (locationLoading) {
    return (
      <>
        <Stack.Screen
          options={{
            title: 'Scan Plant',
            headerShown: true,
          }}
        />
        <LoadingView />
      </>
    );
  }

  // Scanning state - show camera view
  if (scanState === 'scanning' || scanState === 'loading') {
    return (
      <>
        <Stack.Screen
          options={{
            title: 'Scan Plant',
            headerShown: true,
          }}
        />
        <ScanningView
          location={location}
          scanState={scanState}
          flashEnabled={flashEnabled}
          onToggleFlash={toggleFlash}
          onManualVerify={handleManualVerify}
          onBarCodeScanned={handleBarCodeScanned}
          verificationResult={verificationResult}
        />
      </>
    );
  }

  // Verified state - show success screen
  if (scanState === 'verified' && verificationResult) {
    return (
      <>
        <Stack.Screen
          options={{
            title: 'Location Verification',
            headerShown: true,
          }}
        />
        <VerifiedView
          location={location}
          verificationResult={verificationResult}
          onRescan={handleRescan}
          onContinue={handleContinue}
        />
      </>
    );
  }

  // Error state
  if (scanState === 'error') {
    return (
      <>
        <Stack.Screen
          options={{
            title: 'Verification Failed',
            headerShown: true,
          }}
        />
        <ErrorView errorMessage={errorMessage} scannedCode={scannedCode} onRescan={handleRescan} />
      </>
    );
  }

  // Idle state - show start scan button
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Scan Plant',
          headerShown: true,
        }}
      />
      <IdleView location={location} onStartScan={handleStartScan} />
    </>
  );
}
