import { NavigationButtons } from '@/components/inspection/navigation-buttons';
import { StepIndicator } from '@/components/inspection/step-indicator';
import { VideoRecordingSection } from '@/components/inspection/video-recording-section';
import { AIProviderSelectorCard } from '@/components/scanning/ai-provider-selector-card';
import { AnalysisResultsCard } from '@/components/scanning/analysis-results-card';
import { CameraCard } from '@/components/scanning/camera-card';
import { PhotosGridCard } from '@/components/scanning/photos-grid-card';
import { UploadOptionsCard } from '@/components/scanning/upload-options-card';
import { ThemedView } from '@/components/themed-view';
import { useEquipmentLocation } from '@/hooks/use-equipment-location';
import { useInspectionSteps } from '@/hooks/use-inspection-steps';
import { usePhotoCapture } from '@/hooks/use-photo-capture';
import { useVideoRecording } from '@/hooks/use-video-recording';
import { AIProvider, analyzeFaults } from '@/services/ai-fault-detection';
import { Alert as AlertType } from '@/types/types';
import {
  CameraType,
  CameraView,
  useCameraPermissions,
  useMicrophonePermissions,
} from 'expo-camera';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, View } from 'react-native';
import {
  ActivityIndicator,
  Button,
  Card,
  Icon,
  IconButton,
  MD2Colors,
  Text,
} from 'react-native-paper';

// Mock data - should match the alerts from initial.tsx
const alerts: AlertType[] = [
  {
    id: 1,
    code: '#AL-4530',
    title: 'Chiller - Low Coolant Pressure',
    location: 'HQ Tower - Level 3',
    priority: 'Critical',
    status: 'New',
    buildingName: 'HQ Tower',
    buildingAddress: '123 Business District, Singapore 018956',
    plantSystemName: 'Chiller Plant',
    subSystemDetails: 'Pump Motor #3',
    equipmentId: '#EQ-001',
    dueDate: '2025-01-16T14:00:00',
  },
  {
    id: 2,
    code: '#AL-4531',
    title: 'HVAC Unit - Fan Noise',
    location: 'Annex - Level 2',
    priority: 'High',
    status: 'In Progress',
    buildingName: 'Annex Building',
    buildingAddress: '456 Commerce Avenue, Singapore 018957',
    plantSystemName: 'HVAC System',
    subSystemDetails: 'Air Handling Unit #2',
    equipmentId: '#EQ-002',
    dueDate: '2025-01-18T10:00:00',
  },
  {
    id: 3,
    code: '#AL-4518',
    title: 'Boiler - Sensor Calibration',
    location: 'Plant B - Level 1',
    priority: 'Routine',
    status: 'Completed',
    buildingName: 'Plant B',
    buildingAddress: '789 Industrial Road, Singapore 629234',
    plantSystemName: 'Boiler System',
    subSystemDetails: 'Temperature Sensor Array',
    equipmentId: '#EQ-003',
    dueDate: '2025-01-20T16:00:00',
  },
];

export default function TakingPhotosScreen() {
  const { id, hasAbnormalNoise } = useLocalSearchParams();
  const alert = alerts.find((a) => a.id === Number(id));
  const { location } = useEquipmentLocation(String(id));
  const cameraRef = useRef<CameraView>(null);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [microphonePermission, requestMicrophonePermission] = useMicrophonePermissions();
  const [facing, setFacing] = useState<CameraType>('back');

  const MAX_PHOTOS = 5;
  const MIN_PHOTOS = 1;
  const MAX_VIDEO_DURATION = 30;

  const hasAbnormalNoiseChecked = hasAbnormalNoise === 'true';

  // Use custom hooks
  const stepManager = useInspectionSteps({
    hasAbnormalNoise: hasAbnormalNoiseChecked,
    minPhotos: MIN_PHOTOS,
  });

  const photoCapture = usePhotoCapture({
    cameraRef,
    maxPhotos: MAX_PHOTOS,
    photos: stepManager.photos,
    setPhotos: stepManager.setPhotos,
  });

  const videoRecording = useVideoRecording({
    cameraRef,
    maxDuration: MAX_VIDEO_DURATION,
    onVideoRecorded: stepManager.setStep3VideoUri,
  });

  const [selectedAI, setSelectedAI] = useState<AIProvider>('openai');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  const requestPermissions = () => {
    Alert.alert(
      'Permissions Required',
      'This app needs access to your camera and microphone to:\n\n• Capture photos of equipment\n• Record videos with audio for fault detection\n\nYour privacy is important. Media is only used for analysis.',
      [
        {
          text: 'Not Now',
          style: 'cancel',
        },
        {
          text: 'Allow',
          onPress: async () => {
            if (!cameraPermission?.granted) {
              const camResult = await requestCameraPermission();
              if (!camResult.granted) {
                Alert.alert(
                  'Camera Permission Denied',
                  'Camera access is required to capture photos. Please enable it in Settings > Privacy > Camera.',
                  [{ text: 'OK' }]
                );
                return;
              }
            }
            if (!microphonePermission?.granted) {
              const micResult = await requestMicrophonePermission();
              if (!micResult.granted) {
                Alert.alert(
                  'Microphone Permission Denied',
                  'Microphone access is required for video recording with audio. Please enable it in Settings > Privacy > Microphone.',
                  [{ text: 'OK' }]
                );
              }
            }
          },
        },
      ]
    );
  };

  // Handle camera and microphone permissions (skip on web - browsers handle this automatically)
  if (Platform.OS !== 'web') {
    if (!cameraPermission || !microphonePermission) {
      return (
        <>
          <Stack.Screen options={{ title: 'Equipment Scanning', headerShown: true }} />
          <ThemedView style={styles.container}>
            <View style={styles.centerContent}>
              <ActivityIndicator size="large" />
              <Text variant="bodyLarge">Loading permissions...</Text>
            </View>
          </ThemedView>
        </>
      );
    }

    if (!cameraPermission.granted || !microphonePermission.granted) {
      const missingPermissions = [];
      if (!cameraPermission.granted) missingPermissions.push('Camera');
      if (!microphonePermission.granted) missingPermissions.push('Microphone');

      return (
        <>
          <Stack.Screen options={{ title: 'Permissions Required', headerShown: true }} />
          <ThemedView style={styles.container}>
            <View style={styles.centerContent}>
              <Icon source="camera-off" size={64} color={MD2Colors.orange500} />
              <Text variant="headlineSmall" style={styles.permissionTitle}>
                Permissions Required
              </Text>
              <Text variant="bodyMedium" style={styles.permissionMessage}>
                We need access to your {missingPermissions.join(' and ')} to capture photos and
                record videos of equipment for fault detection.
              </Text>
              <Button mode="contained" onPress={requestPermissions} style={styles.permissionButton}>
                Grant Permissions
              </Button>
            </View>
          </ThemedView>
        </>
      );
    }
  }

  const toggleCamera = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  };

  const analyzeWithAI = async () => {
    if (stepManager.step1Photos.length < MIN_PHOTOS) {
      Alert.alert(
        'Insufficient Photos',
        `Please capture at least ${MIN_PHOTOS} photo(s) for Step 1: Full Equipment Overview.`
      );
      return;
    }
    if (stepManager.step2Photos.length < MIN_PHOTOS) {
      Alert.alert(
        'Insufficient Photos',
        `Please capture at least ${MIN_PHOTOS} photo(s) for Step 2: Close-Up of Key Components.`
      );
      return;
    }
    // Video is required when abnormal noise is checked (optional on web due to browser limitations)
    if (hasAbnormalNoiseChecked && !stepManager.step3VideoUri && Platform.OS !== 'web') {
      Alert.alert(
        'Video Required',
        'Please record a short video of the abnormal sound before analyzing.'
      );
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      const allPhotos = [...stepManager.step1Photos, ...stepManager.step2Photos];
      const response = await analyzeFaults({
        imageUris: allPhotos.map((p) => p.uri),
        provider: selectedAI,
        equipmentId: String(id),
        videoUri: stepManager.step3VideoUri || undefined,
      });

      if (response.success && response.data) {
        setAnalysisResult(response.data.analysis);
      } else {
        Alert.alert(
          'Analysis Failed',
          response.error || 'Failed to analyze photos. Please try again.'
        );
      }
    } catch (error) {
      console.error('Error analyzing photos:', error);
      Alert.alert('Analysis Failed', 'Failed to analyze photos. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetScanning = () => {
    stepManager.resetSteps();
    setAnalysisResult(null);
    photoCapture.setShowCamera(true);
  };

  const handleSaveAnalysis = () => {
    Alert.alert('Success', 'Analysis saved successfully!', [
      {
        text: 'OK',
        onPress: () => router.back(),
      },
    ]);
  };

  const handleNextStep = () => {
    if (stepManager.handleNextStep()) {
      photoCapture.setShowCamera(true);
    }
  };

  // Determine if we can proceed to next step or analyze
  const canProceed =
    stepManager.currentStep === 1
      ? stepManager.photos.length >= MIN_PHOTOS
      : stepManager.currentStep === 2
        ? stepManager.photos.length >= MIN_PHOTOS
        : stepManager.step3VideoUri !== null || Platform.OS === 'web'; // Video optional on web

  const canAnalyze =
    stepManager.step1Photos.length >= MIN_PHOTOS &&
    stepManager.step2Photos.length >= MIN_PHOTOS &&
    (!hasAbnormalNoiseChecked || stepManager.step3VideoUri !== null || Platform.OS === 'web'); // Video optional on web

  return (
    <>
      <Stack.Screen options={{ title: 'Equipment Scanning', headerShown: true }} />
      <ThemedView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header Card with Equipment Info */}
          {alert && (
            <Card mode="elevated" style={styles.headerCard}>
              <Card.Content style={styles.headerContent}>
                <View style={styles.iconContainer}>
                  <IconButton icon="home" size={32} />
                </View>
                <View style={styles.headerTextContainer}>
                  <Text variant="titleMedium">Initial Basic Surface Inspection:</Text>
                  <Text variant="bodyLarge" style={styles.headerSubtitle}>
                    {alert.equipmentId} {alert.title}
                  </Text>
                </View>
              </Card.Content>
            </Card>
          )}

          {/* Step Indicator */}
          <StepIndicator
            currentStep={stepManager.currentStep}
            hasAbnormalNoise={hasAbnormalNoiseChecked}
            step1Completed={stepManager.step1Photos.length >= MIN_PHOTOS}
            step2Completed={stepManager.step2Photos.length >= MIN_PHOTOS}
            step3Completed={stepManager.step3VideoUri !== null}
            stepTitle={stepManager.getStepTitle()}
            stepDescription={stepManager.getStepDescription(MAX_VIDEO_DURATION)}
          />

          {/* Photo Capture UI (Steps 1 & 2) */}
          {stepManager.currentStep !== 3 && (
            <>
              {/* Upload Options */}
              {stepManager.photos.length < MAX_PHOTOS && (
                <UploadOptionsCard
                  photosCount={stepManager.photos.length}
                  maxPhotos={MAX_PHOTOS}
                  showCamera={photoCapture.showCamera}
                  onPickImage={photoCapture.pickImage}
                  onToggleCamera={() => photoCapture.setShowCamera(!photoCapture.showCamera)}
                />
              )}

              {/* Camera View */}
              {photoCapture.showCamera && stepManager.photos.length < MAX_PHOTOS && (
                <CameraCard
                  cameraRef={cameraRef}
                  facing={facing}
                  onTakePhoto={photoCapture.takePhoto}
                  onToggleCamera={toggleCamera}
                />
              )}

              {/* Captured Photos */}
              {stepManager.photos.length > 0 && (
                <PhotosGridCard
                  photos={stepManager.photos}
                  maxPhotos={MAX_PHOTOS}
                  onRemovePhoto={photoCapture.removePhoto}
                  onPickImage={photoCapture.pickImage}
                />
              )}
            </>
          )}

          {/* Video Recording UI (Step 3) */}
          {stepManager.currentStep === 3 && (
            <VideoRecordingSection
              cameraRef={cameraRef}
              facing={facing}
              isRecording={videoRecording.isRecording}
              videoUri={stepManager.step3VideoUri}
              maxDuration={MAX_VIDEO_DURATION}
              onStartRecording={videoRecording.startRecording}
              onStopRecording={videoRecording.stopRecording}
              onToggleCamera={toggleCamera}
              onRemoveVideo={() => stepManager.setStep3VideoUri(null)}
            />
          )}

          {/* AI Provider Selection */}
          {((stepManager.currentStep === 2 && !hasAbnormalNoiseChecked) ||
            (stepManager.currentStep === 3 &&
              hasAbnormalNoiseChecked &&
              (stepManager.step3VideoUri || Platform.OS === 'web'))) &&
            stepManager.step2Photos.length >= MIN_PHOTOS &&
            stepManager.step1Photos.length >= MIN_PHOTOS &&
            !analysisResult && (
              <AIProviderSelectorCard selectedAI={selectedAI} onSelectAI={setSelectedAI} />
            )}

          {/* Analysis Results */}
          {analysisResult && <AnalysisResultsCard analysisResult={analysisResult} />}

          {/* Navigation Buttons */}
          <NavigationButtons
            currentStep={stepManager.currentStep}
            hasAbnormalNoise={hasAbnormalNoiseChecked}
            canProceed={stepManager.currentStep === 3 ? canAnalyze : canProceed}
            isAnalyzing={isAnalyzing}
            showAnalysisResults={!!analysisResult}
            onCancel={() => router.back()}
            onBack={stepManager.handlePreviousStep}
            onNext={handleNextStep}
            onAnalyze={analyzeWithAI}
            onStartOver={resetScanning}
            onSave={handleSaveAnalysis}
          />
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
  permissionTitle: {
    marginTop: 16,
    textAlign: 'center',
  },
  permissionMessage: {
    marginTop: 8,
    textAlign: 'center',
    opacity: 0.7,
  },
  permissionButton: {
    marginTop: 24,
  },
  headerCard: {},
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerSubtitle: {
    fontWeight: '600',
  },
});
