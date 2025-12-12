import { CameraView } from 'expo-camera';
import { RefObject, useState } from 'react';
import { Alert } from 'react-native';

interface UseVideoRecordingProps {
  cameraRef: RefObject<CameraView>;
  maxDuration: number;
  onVideoRecorded: (uri: string) => void;
}

export const useVideoRecording = ({
  cameraRef,
  maxDuration,
  onVideoRecorded,
}: UseVideoRecordingProps) => {
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async () => {
    if (!cameraRef.current || isRecording) return;

    try {
      setIsRecording(true);
      const video = await cameraRef.current.recordAsync({
        maxDuration,
      });

      if (video) {
        onVideoRecorded(video.uri);
        Alert.alert('Success', 'Video recorded successfully!');
      }
    } catch (error) {
      console.error('Error recording video:', error);
      Alert.alert('Error', 'Failed to record video. Please try again.');
    } finally {
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (cameraRef.current && isRecording) {
      cameraRef.current.stopRecording();
    }
  };

  return {
    isRecording,
    startRecording,
    stopRecording,
  };
};
