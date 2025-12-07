import { ThemedView } from '@/components/themed-view';
import { AssetDetails, assetService } from '@/services/asset';
import { assignedEquipmentService } from '@/services/assigned-equipment';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import {
  ActivityIndicator,
  Button,
  Card,
  Chip,
  Dialog,
  Divider,
  IconButton,
  MD3Colors,
  Portal,
  Text,
} from 'react-native-paper';

type ScanState = 'idle' | 'scanning' | 'loading' | 'success' | 'error';

export default function ScanPlantScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanState, setScanState] = useState<ScanState>('idle');
  const [scannedCode, setScannedCode] = useState<string>('');
  const [assetData, setAssetData] = useState<AssetDetails | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isAssigned, setIsAssigned] = useState<boolean>(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState<boolean>(false);
  const [showWarningDialog, setShowWarningDialog] = useState<boolean>(false);

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    if (scanState === 'loading') return; // Prevent multiple scans

    setScannedCode(data);
    setScanState('loading');

    // Fetch asset details from API
    const response = await assetService.getAssetDetails(data);

    console.log('response', response);

    if (response.success && response.data) {
      setAssetData(response.data);

      // Check if equipment is assigned to current user
      const assigned = assignedEquipmentService.isEquipmentAssigned(data);
      setIsAssigned(assigned);

      setScanState('success');

      // Show appropriate confirmation dialog
      if (assigned) {
        setShowSuccessDialog(true);
      } else {
        setShowWarningDialog(true);
      }
    } else {
      setErrorMessage(response.error || 'Failed to fetch asset details');
      setScanState('error');
    }
  };

  const handleStartScan = async () => {
    if (!permission?.granted) {
      const result = await requestPermission();
      if (!result.granted) {
        Alert.alert('Permission Required', 'Camera permission is required to scan QR codes', [
          {
            text: 'OK',
            onPress: () => {
              return;
            },
          },
          {
            text: 'Cancel',
            onPress: () => {
              return;
            },
          },
        ]);
      }
    }

    setScanState('scanning');
    setAssetData(null);
    setScannedCode('');
    setErrorMessage('');
    setIsAssigned(false);
  };

  const handleCancelScan = () => {
    setScanState('idle');
  };

  const handleRescan = () => {
    setScanState('scanning');
    setAssetData(null);
    setScannedCode('');
    setErrorMessage('');
    setIsAssigned(false);
    setShowSuccessDialog(false);
    setShowWarningDialog(false);
  };

  const handleCloseSuccessDialog = () => {
    setShowSuccessDialog(false);
  };

  const handleCloseWarningDialog = () => {
    setShowWarningDialog(false);
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'operational':
        return '#4CAF50';
      case 'maintenance':
        return '#FF9800';
      case 'offline':
        return '#F44336';
      case 'decommissioned':
        return '#9E9E9E';
      default:
        return '#2196F3';
    }
  };

  // If scanning, show camera view
  if (scanState === 'scanning' || scanState === 'loading') {
    return (
      <>
        <Stack.Screen
          options={{
            title: 'Scan QR Code',
            headerShown: true,
          }}
        />
        <ThemedView style={styles.container}>
          <View style={styles.cameraContainer}>
            {scanState === 'loading' ? (
              <View style={styles.loadingOverlay}>
                <ActivityIndicator size="large" />
                <Text variant="titleMedium" style={styles.loadingText}>
                  Loading asset details...
                </Text>
              </View>
            ) : (
              <>
                <CameraView
                  style={styles.camera}
                  facing="back"
                  barcodeScannerSettings={{
                    barcodeTypes: ['qr'],
                  }}
                  onBarcodeScanned={handleBarCodeScanned}
                />
                <View style={styles.scanOverlay}>
                  <View style={styles.scanFrame} />
                  <Text variant="titleMedium" style={styles.scanInstruction}>
                    Position QR code within the frame
                  </Text>
                  <Button
                    mode="contained"
                    onPress={handleCancelScan}
                    style={styles.cancelButton}
                    icon="close"
                  >
                    Cancel
                  </Button>
                </View>
              </>
            )}
          </View>
        </ThemedView>
      </>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Scan Plant',
          headerShown: true,
        }}
      />
      <ThemedView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Scan Action Card */}
          {scanState === 'idle' && (
            <Card mode="elevated">
              <Card.Content>
                <Text variant="titleLarge" style={styles.sectionTitle}>
                  Scan Plant Equipment
                </Text>
                <Text variant="bodyMedium" style={styles.descriptionText}>
                  Scan the QR code on the equipment to retrieve asset details from the management
                  system.
                </Text>
              </Card.Content>
              <Card.Actions>
                <Button
                  mode="contained"
                  icon="qrcode-scan"
                  onPress={handleStartScan}
                  style={styles.scanButton}
                >
                  Start Scanning
                </Button>
              </Card.Actions>
            </Card>
          )}

          {/* Error State - Asset Not Found */}
          {scanState === 'error' && (
            <Card mode="elevated">
              <Card.Content>
                <View style={styles.errorContainer}>
                  <IconButton icon="alert-circle" size={60} iconColor={MD3Colors.error40} />
                  <Text variant="titleLarge" style={styles.errorTitle}>
                    Asset Not Found
                  </Text>
                  {/* <Text variant="bodyMedium" style={styles.errorMessage}>
                    {errorMessage}
                  </Text> */}
                  {/* {scannedCode && (
                    <Text variant="bodySmall" style={styles.scannedCodeText}>
                      Scanned code: <Text style={styles.boldText}>{scannedCode}</Text>
                    </Text>
                  )} */}
                  <Text variant="bodyMedium" style={styles.errorHint}>
                    Please verify the QR code is valid or contact support if the issue persists.
                  </Text>
                </View>
              </Card.Content>
              <Card.Actions>
                <Button
                  mode="contained"
                  icon="qrcode-scan"
                  onPress={handleRescan}
                  style={styles.button}
                >
                  Scan Again
                </Button>
              </Card.Actions>
            </Card>
          )}

          {/* Asset Details - Success State */}
          {scanState === 'success' && assetData && (
            <>
              {/* Header Card */}
              <Card mode="elevated">
                <Card.Content>
                  <View style={styles.headerRow}>
                    <View style={styles.headerContent}>
                      <Text variant="labelLarge" style={styles.codeText}>
                        {assetData.code}
                      </Text>
                      <Text variant="titleLarge" style={styles.titleText}>
                        {assetData.name}
                      </Text>
                    </View>
                    <IconButton icon="qrcode-scan" size={24} onPress={handleRescan} />
                  </View>

                  <View style={styles.chipsContainer}>
                    <Chip
                      mode="flat"
                      style={{ backgroundColor: getStatusColor(assetData.status) }}
                      textStyle={{ color: 'white' }}
                    >
                      {assetData.status?.toUpperCase()}
                    </Chip>
                    {assetData.category && <Chip mode="outlined">{assetData.category}</Chip>}
                    {isAssigned && (
                      <Chip
                        mode="flat"
                        icon="check-circle"
                        textStyle={{ color: MD3Colors.primary20 }}
                      >
                        ASSIGNED TO YOU
                      </Chip>
                    )}
                    {!isAssigned && (
                      <Chip mode="flat" icon="alert" textStyle={{ color: MD3Colors.primary20 }}>
                        NOT ASSIGNED
                      </Chip>
                    )}
                  </View>
                </Card.Content>
              </Card>

              {/* Location Card */}
              <Card mode="elevated">
                <Card.Content>
                  <Text variant="titleMedium" style={styles.sectionTitle}>
                    Location
                  </Text>
                  <View style={styles.infoRow}>
                    <Text variant="bodyLarge">{assetData.location}</Text>
                  </View>
                </Card.Content>
              </Card>

              {/* Description Card */}
              <Card mode="elevated">
                <Card.Content>
                  <Text variant="titleMedium" style={styles.sectionTitle}>
                    Description
                  </Text>
                  <Text variant="bodyMedium" style={styles.descriptionText}>
                    {assetData.description}
                  </Text>
                </Card.Content>
              </Card>

              {/* Equipment Details Card */}
              {(assetData.manufacturer || assetData.model || assetData.serialNumber) && (
                <Card mode="elevated">
                  <Card.Content>
                    <Text variant="titleMedium" style={styles.sectionTitle}>
                      Equipment Details
                    </Text>
                    {assetData.manufacturer && (
                      <View style={styles.detailRow}>
                        <Text variant="labelMedium" style={styles.labelText}>
                          Manufacturer:
                        </Text>
                        <Text variant="bodyMedium">{assetData.manufacturer}</Text>
                      </View>
                    )}
                    {assetData.model && (
                      <View style={styles.detailRow}>
                        <Text variant="labelMedium" style={styles.labelText}>
                          Model:
                        </Text>
                        <Text variant="bodyMedium">{assetData.model}</Text>
                      </View>
                    )}
                    {assetData.serialNumber && (
                      <View style={styles.detailRow}>
                        <Text variant="labelMedium" style={styles.labelText}>
                          Serial Number:
                        </Text>
                        <Text variant="bodyMedium">{assetData.serialNumber}</Text>
                      </View>
                    )}
                  </Card.Content>
                </Card>
              )}

              {/* Timeline Card */}
              {(assetData.installDate ||
                assetData.lastMaintenanceDate ||
                assetData.nextMaintenanceDate) && (
                <Card mode="elevated">
                  <Card.Content>
                    <Text variant="titleMedium" style={styles.sectionTitle}>
                      Timeline
                    </Text>
                    {assetData.installDate && (
                      <>
                        <View style={styles.timelineItem}>
                          <Text variant="labelMedium">Installed:</Text>
                          <Text variant="bodyMedium">
                            {new Date(assetData.installDate).toLocaleDateString()}
                          </Text>
                        </View>
                        <Divider style={styles.divider} />
                      </>
                    )}
                    {assetData.lastMaintenanceDate && (
                      <>
                        <View style={styles.timelineItem}>
                          <Text variant="labelMedium">Last Maintenance:</Text>
                          <Text variant="bodyMedium">
                            {new Date(assetData.lastMaintenanceDate).toLocaleDateString()}
                          </Text>
                        </View>
                        <Divider style={styles.divider} />
                      </>
                    )}
                    {assetData.nextMaintenanceDate && (
                      <View style={styles.timelineItem}>
                        <Text variant="labelMedium">Next Maintenance:</Text>
                        <Text variant="bodyMedium">
                          {new Date(assetData.nextMaintenanceDate).toLocaleDateString()}
                        </Text>
                      </View>
                    )}
                  </Card.Content>
                </Card>
              )}

              {/* Assigned To Card */}
              {assetData.assignedTo && (
                <Card mode="elevated">
                  <Card.Content>
                    <Text variant="titleMedium" style={styles.sectionTitle}>
                      Assigned To
                    </Text>
                    <View style={styles.infoRow}>
                      <Text variant="bodyLarge">{assetData.assignedTo}</Text>
                    </View>
                  </Card.Content>
                </Card>
              )}

              {/* Action Buttons */}
              <View style={styles.actionButtons}>
                <Button
                  mode="contained"
                  icon="qrcode-scan"
                  onPress={handleRescan}
                  style={styles.button}
                >
                  Scan Another
                </Button>
                <Button
                  mode="outlined"
                  icon="file-document-edit"
                  onPress={() => console.log('Create work order')}
                  style={styles.button}
                >
                  Create Work Order
                </Button>
                <Button
                  mode="outlined"
                  icon="message"
                  onPress={() => console.log('Add comment')}
                  style={styles.button}
                >
                  Add Comment
                </Button>
              </View>
            </>
          )}
        </ScrollView>
      </ThemedView>

      {/* Success Dialog - Equipment is Assigned */}
      <Portal>
        <Dialog visible={showSuccessDialog} onDismiss={handleCloseSuccessDialog}>
          <Dialog.Icon icon="check-circle" size={60} color={MD3Colors.primary20} />
          <Dialog.Title style={styles.dialogTitle}>Verification Successful!</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyLarge" style={styles.dialogText}>
              Equipment <Text style={styles.boldText}>{scannedCode}</Text> is assigned to you.
            </Text>
            <Text variant="bodyMedium" style={styles.dialogSubtext}>
              You have authorization to perform maintenance and create work orders for this
              equipment.
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleCloseSuccessDialog}>Got It</Button>
            <Button
              mode="contained"
              onPress={() => {
                handleCloseSuccessDialog();
                console.log('Create work order for', scannedCode);
              }}
            >
              Create Work Order
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* Warning Dialog - Equipment is NOT Assigned */}
      <Portal>
        <Dialog visible={showWarningDialog} onDismiss={handleCloseWarningDialog}>
          <Dialog.Icon icon="alert" size={60} color="#FF9800" />
          <Dialog.Title style={styles.dialogTitle}>Not Assigned</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyLarge" style={styles.dialogText}>
              Equipment <Text style={styles.boldText}>{scannedCode}</Text> is not assigned to you.
            </Text>
            <Text variant="bodyMedium" style={styles.dialogSubtext}>
              This equipment is managed by: {assetData?.assignedTo || 'Another team member'}
            </Text>
            <Text variant="bodySmall" style={styles.dialogNote}>
              You can view details but may have limited permissions for maintenance actions.
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleCloseWarningDialog}>Understood</Button>
            <Button
              mode="outlined"
              onPress={() => {
                handleCloseWarningDialog();
                console.log('Request access for', scannedCode);
              }}
            >
              Request Access
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },
  cameraContainer: {
    flex: 1,
    position: 'relative',
  },
  camera: {
    flex: 1,
  },
  scanOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  scanFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  scanInstruction: {
    color: '#fff',
    marginTop: 24,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  cancelButton: {
    marginTop: 32,
  },
  loadingOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  loadingText: {
    marginTop: 16,
  },
  scanButton: {
    marginTop: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerContent: {
    flex: 1,
  },
  codeText: {
    marginBottom: 4,
    opacity: 0.7,
  },
  titleText: {
    marginBottom: 12,
  },
  chipsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
    flexWrap: 'wrap',
  },
  sectionTitle: {
    marginBottom: 8,
    fontWeight: '600',
  },
  infoRow: {
    gap: 4,
  },
  descriptionText: {
    lineHeight: 22,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  timelineItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  divider: {
    marginVertical: 8,
  },
  labelText: {
    opacity: 0.7,
  },
  actionButtons: {
    gap: 12,
    marginTop: 8,
    marginBottom: 16,
  },
  button: {
    marginVertical: 4,
  },
  backButton: {
    marginTop: 16,
  },
  dialogTitle: {
    textAlign: 'center',
    marginTop: 8,
  },
  dialogText: {
    textAlign: 'center',
    marginBottom: 12,
  },
  dialogSubtext: {
    textAlign: 'center',
    opacity: 0.8,
    marginBottom: 8,
  },
  dialogNote: {
    textAlign: 'center',
    opacity: 0.6,
    marginTop: 8,
    fontStyle: 'italic',
  },
  boldText: {
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  errorContainer: {
    alignItems: 'center',
    paddingVertical: 24,
    gap: 12,
  },
  errorTitle: {
    color: MD3Colors.error40,
    fontWeight: '600',
    textAlign: 'center',
  },
  errorMessage: {
    textAlign: 'center',
    opacity: 0.8,
    paddingHorizontal: 16,
  },
  scannedCodeText: {
    textAlign: 'center',
    opacity: 0.6,
    marginTop: 8,
  },
  errorHint: {
    textAlign: 'center',
    opacity: 0.6,
    fontStyle: 'italic',
    marginTop: 4,
    paddingHorizontal: 16,
    color: MD3Colors.primary10,
  },
});
