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
import { ActivityIndicator, Button, Card, Icon, IconButton, MD2Colors, Text } from 'react-native-paper';

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
  const [photos, setPhotos] = useState<CapturedPhoto[]>([]);
  const [selectedAI, setSelectedAI] = useState<AIProvider>('openai');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(true);

  const MAX_PHOTOS = 3;
  const MIN_PHOTOS = 1;

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
    if (photos.length < MIN_PHOTOS) {
      Alert.alert(
        'Insufficient Photos',
        `Please capture at least ${MIN_PHOTOS} photo(s) for analysis.`
      );
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      const response = await analyzeFaults({
        imageUris: photos.map((p) => p.uri),
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
    setPhotos([]);
    setAnalysisResult(null);
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
                  <Text variant="titleMedium">
                    Initial Basic Surface Inspection:
                  </Text>
                  <Text variant="bodyLarge" style={styles.headerSubtitle}>
                    {alert.equipmentId} {alert.title}
                  </Text>
                </View>
              </Card.Content>
            </Card>
          )}

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

          {/* AI Provider Selection */}
          {photos.length >= MIN_PHOTOS && !analysisResult && (
            <AIProviderSelectorCard selectedAI={selectedAI} onSelectAI={setSelectedAI} />
          )}

          {/* Analysis Results */}
          {analysisResult && <AnalysisResultsCard analysisResult={analysisResult} />}

          {/* Action Buttons */}
          <ActionButtons
            photosCount={photos.length}
            minPhotos={MIN_PHOTOS}
            isAnalyzing={isAnalyzing}
            hasAnalysisResult={!!analysisResult}
            onAnalyze={analyzeWithAI}
            onReset={resetScanning}
            onSave={handleSaveAnalysis}
            onCancel={() => router.back()}
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
