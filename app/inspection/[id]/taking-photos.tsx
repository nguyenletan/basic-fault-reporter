import { ActionButtons } from '@/components/scanning/action-buttons';
import { AIProviderSelectorCard } from '@/components/scanning/ai-provider-selector-card';
import { AnalysisResultsCard } from '@/components/scanning/analysis-results-card';
import { CameraCard } from '@/components/scanning/camera-card';
import { PhotosGridCard } from '@/components/scanning/photos-grid-card';
import { UploadOptionsCard } from '@/components/scanning/upload-options-card';
import { ThemedView } from '@/components/themed-view';
import { Alert as AlertType } from '@/types/types';
import { useEquipmentLocation } from '@/hooks/use-equipment-location';
import { AIProvider, analyzeFaults } from '@/services/ai-fault-detection';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import {
  ActivityIndicator,
  Button,
  Card,
  Icon,
  IconButton,
  MD2Colors,
  MD3Colors,
  Text,
} from 'react-native-paper';

interface CapturedPhoto {
  uri: string;
  id: string;
}

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
  const { id } = useLocalSearchParams();
  const alert = alerts.find((a) => a.id === Number(id));
  const { location } = useEquipmentLocation(String(id));
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');

  // Step management
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [step1Photos, setStep1Photos] = useState<CapturedPhoto[]>([]);
  const [step2Photos, setStep2Photos] = useState<CapturedPhoto[]>([]);

  const [selectedAI, setSelectedAI] = useState<AIProvider>('openai');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(true);

  const MAX_PHOTOS = 5;
  const MIN_PHOTOS = 1;

  // Get current step's photos
  const photos = currentStep === 1 ? step1Photos : step2Photos;
  const setPhotos = currentStep === 1 ? setStep1Photos : setStep2Photos;

  // Handle camera permissions
  if (!permission) {
    return (
      <>
        <Stack.Screen
          options={{
            title: 'Equipment Scanning',
            headerShown: true,
          }}
        />
        <ThemedView style={styles.container}>
          <View style={styles.centerContent}>
            <ActivityIndicator size="large" />
            <Text variant="bodyLarge">Loading camera...</Text>
          </View>
        </ThemedView>
      </>
    );
  }

  if (!permission.granted) {
    return (
      <>
        <Stack.Screen
          options={{
            title: 'Camera Permission',
            headerShown: true,
          }}
        />
        <ThemedView style={styles.container}>
          <View style={styles.centerContent}>
            <Icon source="camera-off" size={64} color={MD2Colors.orange500} />
            <Text variant="headlineSmall" style={styles.permissionTitle}>
              Camera Permission Required
            </Text>
            <Text variant="bodyMedium" style={styles.permissionMessage}>
              We need access to your camera to capture photos of the equipment for fault detection.
            </Text>
            <Button mode="contained" onPress={requestPermission} style={styles.permissionButton}>
              Grant Permission
            </Button>
          </View>
        </ThemedView>
      </>
    );
  }

  const takePhoto = async () => {
    if (!cameraRef.current) return;

    if (photos.length >= MAX_PHOTOS) {
      Alert.alert('Maximum Photos Reached', `You can only capture up to ${MAX_PHOTOS} photos.`);
      return;
    }

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
      });

      if (photo) {
        const newPhoto: CapturedPhoto = {
          uri: photo.uri,
          id: Date.now().toString(),
        };
        setPhotos([...photos, newPhoto]);

        if (photos.length + 1 >= MAX_PHOTOS) {
          setShowCamera(false);
        }
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'Failed to capture photo. Please try again.');
    }
  };

  const pickImage = async () => {
    if (photos.length >= MAX_PHOTOS) {
      Alert.alert('Maximum Photos Reached', `You can only select up to ${MAX_PHOTOS} photos.`);
      return;
    }

    try {
      const remainingSlots = MAX_PHOTOS - photos.length;
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsMultipleSelection: true,
        quality: 0.8,
        selectionLimit: remainingSlots,
      });

      if (!result.canceled && result.assets.length > 0) {
        const newPhotos: CapturedPhoto[] = result.assets.map((asset, index) => ({
          uri: asset.uri,
          id: `${Date.now()}-${index}`,
        }));

        const updatedPhotos = [...photos, ...newPhotos].slice(0, MAX_PHOTOS);
        setPhotos(updatedPhotos);

        if (updatedPhotos.length >= MAX_PHOTOS) {
          setShowCamera(false);
        }
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to select image. Please try again.');
    }
  };

  const removePhoto = (photoId: string) => {
    setPhotos(photos.filter((p) => p.id !== photoId));
    if (photos.length - 1 < MAX_PHOTOS) {
      setShowCamera(true);
    }
  };

  const toggleCamera = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  };

  const analyzeWithAI = async () => {
    // Check if both steps have minimum photos
    if (step1Photos.length < MIN_PHOTOS) {
      Alert.alert(
        'Insufficient Photos',
        `Please capture at least ${MIN_PHOTOS} photo(s) for Step 1: Full Equipment Overview.`
      );
      return;
    }
    if (step2Photos.length < MIN_PHOTOS) {
      Alert.alert(
        'Insufficient Photos',
        `Please capture at least ${MIN_PHOTOS} photo(s) for Step 2: Close-Up of Key Components.`
      );
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      // Combine photos from both steps
      const allPhotos = [...step1Photos, ...step2Photos];
      const response = await analyzeFaults({
        imageUris: allPhotos.map((p) => p.uri),
        provider: selectedAI,
        equipmentId: String(id),
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
    setStep1Photos([]);
    setStep2Photos([]);
    setCurrentStep(1);
    setAnalysisResult(null);
    setShowCamera(true);
  };

  const handleNextStep = () => {
    if (currentStep === 1 && photos.length < MIN_PHOTOS) {
      Alert.alert(
        'Photos Required',
        `Please capture at least ${MIN_PHOTOS} photo(s) for the equipment overview.`
      );
      return;
    }
    setCurrentStep(2);
    setShowCamera(true);
  };

  const handlePreviousStep = () => {
    setCurrentStep(1);
    setShowCamera(true);
  };

  const handleSaveAnalysis = () => {
    Alert.alert('Success', 'Analysis saved successfully!', [
      {
        text: 'OK',
        onPress: () => router.back(),
      },
    ]);
  };

  const getStepTitle = () => {
    return currentStep === 1 ? 'Full Equipment Overview' : 'Close-Up of Key Components';
  };

  const getStepDescription = () => {
    return currentStep === 1
      ? 'Capture overall view of the equipment (1-5 photos)'
      : 'Capture detailed close-ups of important components (1-5 photos)';
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Equipment Scanning',
          headerShown: true,
        }}
      />
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
          <Card mode="outlined" style={styles.stepCard}>
            <Card.Content>
              <View style={styles.stepIndicator}>
                <View style={styles.stepItem}>
                  <View
                    style={[
                      styles.stepCircle,
                      currentStep === 1 && styles.stepCircleActive,
                      step1Photos.length >= MIN_PHOTOS && styles.stepCircleCompleted,
                    ]}
                  >
                    <Text
                      variant="bodyMedium"
                      style={[
                        styles.stepNumber,
                        (currentStep === 1 || step1Photos.length >= MIN_PHOTOS) &&
                          (step1Photos.length >= MIN_PHOTOS
                            ? styles.stepNumberActiveCompleted
                            : styles.stepNumberActive),
                      ]}
                    >
                      {step1Photos.length >= MIN_PHOTOS ? '✓' : '1'}
                    </Text>
                  </View>
                  <Text
                    variant="bodySmall"
                    style={[styles.stepLabel, currentStep === 1 && styles.stepLabelActive]}
                  >
                    Overview
                  </Text>
                </View>
                <View style={styles.stepConnector} />
                <View style={styles.stepItem}>
                  <View
                    style={[
                      styles.stepCircle,
                      currentStep === 2 && styles.stepCircleActive,
                      step2Photos.length >= MIN_PHOTOS && styles.stepCircleCompleted,
                    ]}
                  >
                    <Text
                      variant="bodyMedium"
                      style={[
                        styles.stepNumber,
                        (currentStep === 2 || step2Photos.length >= MIN_PHOTOS) &&
                          (step2Photos.length >= MIN_PHOTOS
                            ? styles.stepNumberActiveCompleted
                            : styles.stepNumberActive),
                      ]}
                    >
                      {step2Photos.length >= MIN_PHOTOS ? '✓' : '2'}
                    </Text>
                  </View>
                  <Text
                    variant="bodySmall"
                    style={[styles.stepLabel, currentStep === 2 && styles.stepLabelActive]}
                  >
                    Close-Up
                  </Text>
                </View>
              </View>
              <View style={styles.stepDescription}>
                <Text variant="titleSmall" style={styles.stepTitle}>
                  {getStepTitle()}
                </Text>
                <Text variant="bodySmall" style={styles.stepSubtitle}>
                  {getStepDescription()}
                </Text>
              </View>
            </Card.Content>
          </Card>

          {/* Upload Options - Always visible when not at max */}
          {photos.length < MAX_PHOTOS && (
            <UploadOptionsCard
              photosCount={photos.length}
              maxPhotos={MAX_PHOTOS}
              showCamera={showCamera}
              onPickImage={pickImage}
              onToggleCamera={() => setShowCamera(!showCamera)}
            />
          )}

          {/* Camera View */}
          {showCamera && photos.length < MAX_PHOTOS && (
            <CameraCard
              cameraRef={cameraRef}
              facing={facing}
              onTakePhoto={takePhoto}
              onToggleCamera={toggleCamera}
            />
          )}

          {/* Captured Photos */}
          {photos.length > 0 && (
            <PhotosGridCard
              photos={photos}
              maxPhotos={MAX_PHOTOS}
              onRemovePhoto={removePhoto}
              onPickImage={pickImage}
            />
          )}

          {/* AI Provider Selection - Only show in step 2 after taking photos */}
          {currentStep === 2 &&
            step2Photos.length >= MIN_PHOTOS &&
            step1Photos.length >= MIN_PHOTOS &&
            !analysisResult && (
              <AIProviderSelectorCard selectedAI={selectedAI} onSelectAI={setSelectedAI} />
            )}

          {/* Analysis Results */}
          {analysisResult && <AnalysisResultsCard analysisResult={analysisResult} />}

          {/* Step Navigation and Action Buttons */}
          {!analysisResult && (
            <View style={styles.navigationButtons}>
              {/* Step 1: Show Next button */}
              {currentStep === 1 && (
                <>
                  <Button mode="outlined" onPress={() => router.back()} style={styles.navButton}>
                    Cancel
                  </Button>
                  <Button
                    mode="contained"
                    onPress={handleNextStep}
                    style={styles.navButton}
                    disabled={photos.length < MIN_PHOTOS}
                  >
                    Next Step
                  </Button>
                </>
              )}

              {/* Step 2: Show Back, Analyze, Cancel */}
              {currentStep === 2 && (
                <>
                  <Button mode="outlined" onPress={handlePreviousStep} style={styles.navButton}>
                    Back
                  </Button>
                  <Button
                    mode="contained"
                    onPress={analyzeWithAI}
                    style={styles.navButton}
                    disabled={
                      step1Photos.length < MIN_PHOTOS ||
                      step2Photos.length < MIN_PHOTOS ||
                      isAnalyzing
                    }
                    loading={isAnalyzing}
                  >
                    {isAnalyzing ? 'Analyzing...' : 'Analyze with AI'}
                  </Button>
                </>
              )}
            </View>
          )}

          {/* Post-Analysis Action Buttons */}
          {analysisResult && (
            <View style={styles.navigationButtons}>
              <Button mode="outlined" onPress={resetScanning} style={styles.navButton}>
                Start Over
              </Button>
              <Button mode="contained" onPress={handleSaveAnalysis} style={styles.navButton}>
                Save Analysis
              </Button>
            </View>
          )}
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
  stepCard: {
    borderWidth: 2,
  },
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  stepItem: {
    alignItems: 'center',
    gap: 8,
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ccc',
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircleActive: {
    borderColor: MD3Colors.primary40,
    //backgroundColor: '#5EBAB0',
  },
  stepCircleCompleted: {
    borderColor: MD3Colors.primary40,
    backgroundColor: MD3Colors.primary40,
  },
  stepNumber: {
    color: MD3Colors.secondary60,
    fontWeight: '600',
  },
  stepNumberActive: {
    color: MD3Colors.primary30,
  },
  stepNumberActiveCompleted: {
    color: MD3Colors.secondary100,
  },
  stepConnector: {
    width: 60,
    height: 2,
    backgroundColor: '#ccc',
    marginHorizontal: 8,
  },
  stepLabel: {
    color: MD3Colors.secondary50,
    fontWeight: '500',
  },
  stepLabelActive: {
    color: MD3Colors.primary20,
    fontWeight: '600',
  },
  stepDescription: {
    alignItems: 'center',
    gap: 4,
  },
  stepTitle: {
    fontWeight: '600',
    textAlign: 'center',
  },
  stepSubtitle: {
    opacity: 0.7,
    textAlign: 'center',
  },
  navigationButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  navButton: {
    flex: 1,
  },
});
