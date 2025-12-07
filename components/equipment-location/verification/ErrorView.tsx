import { ThemedView } from '@/components/themed-view';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon, MD2Colors, MD3Colors, Text } from 'react-native-paper';

interface ErrorViewProps {
  errorMessage: string;
  scannedCode: string;
  onRescan: () => void;
}

export function ErrorView({ errorMessage, scannedCode, onRescan }: ErrorViewProps) {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.centerContent}>
        <Icon source="alert-circle" size={80} color={MD3Colors.error40} />
        <Text variant="headlineSmall" style={styles.errorTitle}>
          Verification Failed
        </Text>
        <Text variant="bodyLarge" style={styles.errorMessage}>
          {errorMessage}
        </Text>
        {scannedCode && (
          <Text variant="bodySmall" style={styles.scannedCodeText}>
            Scanned code: {scannedCode}
          </Text>
        )}
        <View style={styles.errorActions}>
          <Button mode="contained" icon="qrcode-scan" onPress={onRescan}>
            Try Again
          </Button>
          <Button mode="outlined" onPress={() => router.back()}>
            Go Back
          </Button>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 16,
  },
  errorTitle: {
    color: MD3Colors.error40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorMessage: {
    textAlign: 'center',
    color: MD2Colors.grey700,
    paddingHorizontal: 32,
  },
  scannedCodeText: {
    textAlign: 'center',
    color: MD2Colors.grey500,
    fontFamily: 'monospace',
  },
  errorActions: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 24,
  },
});
