import { CameraType, CameraView } from 'expo-camera';
import { Video, ResizeMode } from 'expo-av';
import React, { RefObject, useState } from 'react';
import { Modal, Platform, StyleSheet, View, Pressable, Dimensions } from 'react-native';
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
  const [showPreview, setShowPreview] = useState(false);

  if (videoUri) {
    // Show video preview after recording
    return (
      <>
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
              <Button mode="contained" onPress={() => setShowPreview(true)} icon="play">
                Preview Video
              </Button>
            </View>
          </Card.Content>
        </Card>

        {/* Video Preview Modal */}
        <Modal
          visible={showPreview}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowPreview(false)}
        >
          <Pressable style={styles.modalOverlay} onPress={() => setShowPreview(false)}>
            <View style={styles.modalContent}>
              <Pressable onPress={(e) => e.stopPropagation()}>
                <Card style={styles.videoPlayerCard}>
                  <Card.Content style={styles.videoPlayerContent}>
                    <View style={styles.videoPlayerHeader}>
                      <Text variant="titleMedium" style={styles.videoPlayerTitle}>
                        Video Preview
                      </Text>
                      <IconButton
                        icon="close"
                        size={24}
                        onPress={() => setShowPreview(false)}
                        style={styles.closeButton}
                      />
                    </View>
                    <Video
                      source={{ uri: videoUri }}
                      style={styles.videoPlayer}
                      useNativeControls
                      resizeMode={ResizeMode.CONTAIN}
                      shouldPlay
                    />
                  </Card.Content>
                </Card>
              </Pressable>
            </View>
          </Pressable>
        </Modal>
      </>
    );
  }

  // Show recording interface
  // On web, video recording is not fully supported, show a message
  if (Platform.OS === 'web') {
    return (
      <Card>
        <Card.Content style={styles.videoInstructions}>
          <Icon source="alert-circle-outline" size={48} color={MD2Colors.orange500} />
          <Text variant="titleMedium" style={styles.videoInstructionsTitle}>
            Video Recording Not Available on Web
          </Text>
          <Text variant="bodyMedium" style={styles.videoInstructionsText}>
            Video recording with audio is only available on mobile devices (iOS/Android). Please use
            the mobile app to record videos of equipment abnormal sounds.
          </Text>
          <Text variant="bodySmall" style={styles.videoInstructionsHint}>
            You can continue with the inspection process. The video step will be marked as optional
            on web.
          </Text>
        </Card.Content>
      </Card>
    );
  }

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
          <CameraView
            key={facing}
            ref={cameraRef}
            style={styles.videoCamera}
            facing={facing}
            mode="video"
            active={true}
          >
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
  videoInstructionsHint: {
    textAlign: 'center',
    opacity: 0.6,
    marginTop: 12,
    fontStyle: 'italic',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxWidth: 600,
  },
  videoPlayerCard: {
    overflow: 'hidden',
  },
  videoPlayerContent: {
    padding: 0,
  },
  videoPlayerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 8,
  },
  videoPlayerTitle: {
    fontWeight: '600',
  },
  closeButton: {
    margin: 0,
  },
  videoPlayer: {
    width: '100%',
    height: Dimensions.get('window').height * 0.5,
    backgroundColor: '#000',
  },
});
