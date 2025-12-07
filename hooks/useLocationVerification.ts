import { equipmentLocationService } from '@/services/equipment-location';
import {
  subsystemVerificationService,
  VerificationResult,
} from '@/services/subsystem-verification';
import { EquipmentLocation } from '@/types/types';
import { useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';

export type ScanState = 'idle' | 'scanning' | 'loading' | 'verified' | 'error';

export function useLocationVerification(id: string) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanState, setScanState] = useState<ScanState>('idle');
  const [scannedCode, setScannedCode] = useState<string>('');
  const [location, setLocation] = useState<EquipmentLocation | null>(null);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [flashEnabled, setFlashEnabled] = useState<boolean>(false);
  const [locationLoading, setLocationLoading] = useState(true);

  useEffect(() => {
    loadEquipmentLocation();
  }, [id]);

  const loadEquipmentLocation = async () => {
    try {
      setLocationLoading(true);
      const response = await equipmentLocationService.getEquipmentLocation(id);
      if (response.success && response.data) {
        setLocation(response.data);
      }
    } catch (err) {
      console.error('Error loading equipment location:', err);
    } finally {
      setLocationLoading(false);
    }
  };

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    if (scanState === 'loading') return;

    setScannedCode(data);
    setScanState('loading');

    const response = await subsystemVerificationService.verifySubsystem({
      scannedCode: data,
      expectedEquipmentId: id,
      expectedLocation: location?.zone || location?.room || '',
    });

    if (response.success && response.data) {
      setVerificationResult(response.data);
      if (response.data.isVerified) {
        setScanState('verified');
      } else {
        setErrorMessage(response.data.message || 'Verification failed');
        setScanState('error');
      }
    } else {
      setErrorMessage(response.error || 'Failed to verify equipment');
      setScanState('error');
    }
  };

  const handleStartScan = async () => {
    if (!permission?.granted) {
      const result = await requestPermission();
      if (!result.granted) {
        return;
      }
    }

    setScanState('scanning');
    setScannedCode('');
    setErrorMessage('');
    setVerificationResult(null);
  };

  const handleRescan = () => {
    setScanState('scanning');
    setScannedCode('');
    setErrorMessage('');
    setVerificationResult(null);
  };

  const handleManualVerify = () => {
    console.log('Manual verification requested');
  };

  const handleContinue = () => {
    router.navigate(`/equipment/${id}/scanning`);
  };

  const toggleFlash = () => {
    setFlashEnabled(!flashEnabled);
  };

  return {
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
  };
}
