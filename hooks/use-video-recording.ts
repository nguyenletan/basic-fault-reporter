import { CameraView, useMicrophonePermissions } from 'expo-camera';
import { RefObject, useState } from 'react';
import { Alert, Linking, Platform } from 'react-native';

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
  const [microphonePermission, requestMicrophonePermission] = useMicrophonePermissions();

  const openSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
  };

  const startRecording = async () => {
    if (!cameraRef.current || isRecording) return;

    // Check microphone permission before recording (skip on web - browsers handle this automatically)
    if (Platform.OS !== 'web' && !microphonePermission?.granted) {
      Alert.alert(
        'Microphone Permission Required',
        'Video recording requires microphone access to capture audio. Would you like to grant permission?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Allow',
            onPress: async () => {
              const result = await requestMicrophonePermission();
              if (!result.granted) {
                Alert.alert(
                  'Permission Denied',
                  'Microphone permission is required for video recording. Please enable it in your device settings.',
                  [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Open Settings', onPress: openSettings },
                  ]
                );
              } else {
                // Permission granted, start recording
                startRecording();
              }
            },
          },
        ]
      );
      return;
    }

    try {
      setIsRecording(true);
      const video = await cameraRef.current.recordAsync({
        maxDuration,
      });

      if (video && video.uri) {
        onVideoRecorded(video.uri);
        Alert.alert('Success', 'Video recorded successfully!');
      } else {
        throw new Error('No video URI returned from recording');
      }
    } catch (error) {
      console.error('Error recording video:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      Alert.alert(
        'Recording Failed',
        `Failed to record video: ${errorMessage}\n\nPlease ensure:\n• Camera and microphone permissions are granted\n• Device has sufficient storage space\n• Try restarting the app if the issue persists`
      );
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
