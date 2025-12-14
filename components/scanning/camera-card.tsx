import { CameraType, CameraView } from 'expo-camera';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Card, Divider, Icon, MD2Colors, Text } from 'react-native-paper';

interface CameraCardProps {
  cameraRef: React.RefObject<CameraView | null>;
  facing: CameraType;
  onTakePhoto: () => void;
  onToggleCamera: () => void;
}

export function CameraCard({ cameraRef, facing, onTakePhoto, onToggleCamera }: CameraCardProps) {
  return (
    <Card mode="elevated" style={styles.cameraCard}>
      <Card.Content style={styles.cameraContent}>
        <View style={styles.cameraHeader}>
          <Icon source="camera" size={24} color={MD2Colors.green500} />
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Camera View
          </Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.cameraContainer}>
          <CameraView key={facing} ref={cameraRef} style={styles.camera} facing={facing} active={true}>
            <View style={styles.cameraOverlay}>
              <TouchableOpacity style={styles.flipButton} onPress={onToggleCamera}>
                <Icon source="camera-flip" size={32} color="white" />
              </TouchableOpacity>
            </View>
          </CameraView>
        </View>
        <View style={styles.cameraActions}>
          <Button mode="contained" icon="camera" onPress={onTakePhoto} style={styles.captureButton}>
            Take Photo
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  cameraCard: {
    overflow: 'hidden',
  },
  cameraContent: {
    padding: 16,
  },
  cameraHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  sectionTitle: {
    fontWeight: '600',
  },
  divider: {
    marginBottom: 16,
  },
  cameraContainer: {
    width: '100%',
    height: 400,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    padding: 16,
  },
  flipButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 30,
    padding: 12,
  },
  cameraActions: {
    marginTop: 16,
  },
  captureButton: {
    width: '100%',
  },
});
