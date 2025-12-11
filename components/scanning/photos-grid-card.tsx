import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Card, Divider, Icon, MD2Colors, MD3Colors, Text } from 'react-native-paper';

interface CapturedPhoto {
  uri: string;
  id: string;
}

interface PhotosGridCardProps {
  photos: CapturedPhoto[];
  maxPhotos: number;
  onRemovePhoto: (photoId: string) => void;
  onPickImage: () => void;
}

export function PhotosGridCard({
  photos,
  maxPhotos,
  onRemovePhoto,
  onPickImage,
}: PhotosGridCardProps) {
  return (
    <Card mode="elevated">
      <Card.Content>
        <View style={styles.sectionHeader}>
          <Icon source="image-multiple" size={24} color={MD3Colors.tertiary50} />
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Captured Photos ({photos.length}/{maxPhotos})
          </Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.photosGrid}>
          {photos.map((photo) => (
            <View key={photo.id} style={styles.photoContainer}>
              <Image source={{ uri: photo.uri }} style={styles.photoImage} />
              <TouchableOpacity style={styles.removeButton} onPress={() => onRemovePhoto(photo.id)}>
                <Icon source="close-circle" size={32} color={MD2Colors.red500} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
        {photos.length < maxPhotos && (
          <View style={styles.addMoreActions}>
            <Button
              mode="outlined"
              icon="upload"
              onPress={onPickImage}
              style={styles.addMoreButton}
            >
              Upload More
            </Button>
          </View>
        )}
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
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  photoContainer: {
    position: 'relative',
    width: '48%',
    aspectRatio: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  photoImage: {
    width: '100%',
    height: '100%'
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'white',
    borderRadius: 16,
  },
  addMoreActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  addMoreButton: {
    flex: 1,
  },
});
