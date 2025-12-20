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

    // Check if recordAsync is available
    if (typeof cameraRef.current.recordAsync !== 'function') {
      Alert.alert(
        'Recording Not Supported',
        Platform.OS === 'web'
          ? 'Video recording is not yet fully supported in your web browser. Please use the mobile app (iOS/Android) for video recording functionality.'
          : 'Video recording is not supported on this device.'
      );
      return;
    }

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
      console.log('Starting video recording...');

      const video = await cameraRef.current.recordAsync({
        maxDuration,
      });

      console.log('Video recording completed:', video);

      if (video && video.uri) {
        console.log('Video URI received:', video.uri);
        onVideoRecorded(video.uri);
        Alert.alert('Success', 'Video recorded successfully!');
      } else {
        console.error('No video URI in response. Video object:', JSON.stringify(video));
        throw new Error('No video URI returned from recording');
      }
    } catch (error) {
      console.error('Error recording video:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      // On web, provide more specific guidance
      const platformSpecificHelp = Platform.OS === 'web'
        ? '\n\nOn web browsers:\n• Allow camera and microphone access when prompted\n• Ensure you\'re using HTTPS or localhost\n• Try a different browser (Chrome/Firefox recommended)'
        : '\n\nPlease ensure:\n• Camera and microphone permissions are granted\n• Device has sufficient storage space\n• Try restarting the app if the issue persists';

      Alert.alert(
        'Recording Failed',
        `Failed to record video: ${errorMessage}${platformSpecificHelp}`
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
