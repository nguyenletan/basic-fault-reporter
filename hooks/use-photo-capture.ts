import { CameraView } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { RefObject, useState } from 'react';
import { Alert } from 'react-native';
import { CapturedPhoto } from './use-inspection-steps';

interface UsePhotoCaptureProps {
  cameraRef: RefObject<CameraView>;
  maxPhotos: number;
  photos: CapturedPhoto[];
  setPhotos: (photos: CapturedPhoto[]) => void;
}

export const usePhotoCapture = ({
  cameraRef,
  maxPhotos,
  photos,
  setPhotos,
}: UsePhotoCaptureProps) => {
  const [showCamera, setShowCamera] = useState(true);

  const takePhoto = async () => {
    if (!cameraRef.current) return;

    if (photos.length >= maxPhotos) {
      Alert.alert('Maximum Photos Reached', `You can only capture up to ${maxPhotos} photos.`);
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

        if (photos.length + 1 >= maxPhotos) {
          setShowCamera(false);
        }
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'Failed to capture photo. Please try again.');
    }
  };

  const pickImage = async () => {
    if (photos.length >= maxPhotos) {
      Alert.alert('Maximum Photos Reached', `You can only select up to ${maxPhotos} photos.`);
      return;
    }

    try {
      const remainingSlots = maxPhotos - photos.length;
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

        const updatedPhotos = [...photos, ...newPhotos].slice(0, maxPhotos);
        setPhotos(updatedPhotos);

        if (updatedPhotos.length >= maxPhotos) {
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
    if (photos.length - 1 < maxPhotos) {
      setShowCamera(true);
    }
  };

  return {
    showCamera,
    setShowCamera,
    takePhoto,
    pickImage,
    removePhoto,
  };
};
