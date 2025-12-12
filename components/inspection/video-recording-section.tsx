import { CameraType, CameraView } from 'expo-camera';
import React, { RefObject } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Icon, IconButton, MD2Colors, MD3Colors, Text } from 'react-native-paper';

interface VideoRecordingSectionProps {
  cameraRef: RefObject<CameraView>;
  facing: CameraType;
  isRecording: boolean;
  videoUri: string | null;
  maxDuration: number;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onToggleCamera: () => void;
  onRemoveVideo: () => void;
}

export const VideoRecordingSection: React.FC<VideoRecordingSectionProps> = ({
  cameraRef,
  facing,
  isRecording,
  videoUri,
  maxDuration,
  onStartRecording,
  onStopRecording,
  onToggleCamera,
  onRemoveVideo,
}) => {
  if (videoUri) {
    // Show video preview after recording
    return (
      <Card style={styles.videoPreviewCard}>
        <Card.Content>
          <View style={styles.videoPreviewHeader}>
            <Icon source="check-circle" size={24} color={MD3Colors.primary40} />
            <Text variant="titleMedium" style={styles.videoPreviewTitle}>
              Video Recorded Successfully
            </Text>
          </View>
          <Text variant="bodySmall" style={styles.videoPreviewSubtitle}>
            Video saved and ready for AI analysis
          </Text>
          <View style={styles.videoPreviewActions}>
            <Button mode="outlined" onPress={onRemoveVideo} icon="delete">
              Delete Video
            </Button>
            <Button mode="contained" disabled icon="play">
              Preview (Coming Soon)
            </Button>
          </View>
        </Card.Content>
      </Card>
    );
  }

  // Show recording interface
  return (
    <>
      <Card>
        <Card.Content style={styles.videoInstructions}>
          <Icon source="video" size={48} color={MD3Colors.primary40} />
          <Text variant="titleMedium" style={styles.videoInstructionsTitle}>
            Record Abnormal Sound
          </Text>
          <Text variant="bodyMedium" style={styles.videoInstructionsText}>
            Record a short video (max {maxDuration}s) to capture the abnormal sound from the
            equipment.
          </Text>
        </Card.Content>
      </Card>

      <Card style={styles.videoCard}>
        <Card.Content style={styles.videoContent}>
          <CameraView ref={cameraRef} style={styles.videoCamera} facing={facing} mode="video">
            <View style={styles.videoCameraOverlay}>
              {isRecording && (
                <View style={styles.recordingIndicator}>
                  <View style={styles.recordingDot} />
                  <Text style={styles.recordingText}>Recording...</Text>
                </View>
              )}
            </View>
          </CameraView>
          <View style={styles.videoControls}>
            <IconButton
              icon="camera-flip"
              size={30}
              onPress={onToggleCamera}
              disabled={isRecording}
              style={styles.videoControlButton}
            />
            <Button
              mode="contained"
              onPress={isRecording ? onStopRecording : onStartRecording}
              icon={isRecording ? 'stop' : 'record'}
              style={styles.recordButton}
              buttonColor={isRecording ? MD2Colors.red500 : MD3Colors.primary40}
            >
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </Button>
          </View>
        </Card.Content>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  videoInstructions: {
    alignItems: 'center',
    gap: 12,
    paddingVertical: 16,
  },
  videoInstructionsTitle: {
    fontWeight: '600',
    textAlign: 'center',
  },
  videoInstructionsText: {
    textAlign: 'center',
    opacity: 0.7,
  },
  videoCard: {
    overflow: 'hidden',
  },
  videoContent: {
    padding: 0,
    height: 600,
  },
  videoCamera: {
    width: '100%',
    backgroundColor: '#000',
    height: 500,
  },
  videoCameraOverlay: {
    flex: 1,
    padding: 16,
  },
  recordingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
    gap: 8,
  },
  recordingDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: MD2Colors.red500,
  },
  recordingText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  videoControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    gap: 12,
  },
  videoControlButton: {
    margin: 0,
  },
  recordButton: {
    flex: 1,
  },
  videoPreviewCard: {},
  videoPreviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  videoPreviewTitle: {
    fontWeight: '600',
  },
  videoPreviewSubtitle: {
    opacity: 0.7,
    marginBottom: 16,
  },
  videoPreviewActions: {
    flexDirection: 'row',
    gap: 12,
  },
});
