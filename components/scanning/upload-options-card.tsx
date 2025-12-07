import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Divider, Icon, MD2Colors, Text } from 'react-native-paper';

interface UploadOptionsCardProps {
  photosCount: number;
  maxPhotos: number;
  showCamera: boolean;
  onPickImage: () => void;
  onToggleCamera: () => void;
}

export function UploadOptionsCard({
  photosCount,
  maxPhotos,
  showCamera,
  onPickImage,
  onToggleCamera,
}: UploadOptionsCardProps) {
  return (
    <Card mode="elevated">
      <Card.Content>
        <View style={styles.sectionHeader}>
          <Icon source="image-plus" size={24} color={MD2Colors.teal500} />
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Add Photos ({photosCount}/{maxPhotos})
          </Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.uploadActions}>
          <Button mode="contained" icon="upload" onPress={onPickImage} style={styles.uploadButton}>
            Upload from Device
          </Button>
          <Button
            mode="outlined"
            icon="camera"
            onPress={onToggleCamera}
            style={styles.cameraToggleButton}
          >
            {showCamera ? 'Hide Camera' : 'Use Camera'}
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
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
  uploadActions: {
    flexDirection: 'row',
    gap: 12,
  },
  uploadButton: {
    flex: 1,
  },
  cameraToggleButton: {
    flex: 1,
  },
});
