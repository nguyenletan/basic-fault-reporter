import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

interface ActionButtonsProps {
  photosCount: number;
  minPhotos: number;
  isAnalyzing: boolean;
  hasAnalysisResult: boolean;
  onAnalyze: () => void;
  onReset: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export function ActionButtons({
  photosCount,
  minPhotos,
  isAnalyzing,
  hasAnalysisResult,
  onAnalyze,
  onReset,
  onSave,
  onCancel,
}: ActionButtonsProps) {
  return (
    <View style={styles.actionButtons}>
      <Button
        mode="contained"
        icon="brain"
        onPress={onAnalyze}
        disabled={photosCount < minPhotos || isAnalyzing}
        loading={isAnalyzing}
        style={styles.button}
      >
        {isAnalyzing ? 'Analyzing...' : 'Analyze with AI'}
      </Button>
      {!hasAnalysisResult ? (
        photosCount > 0 && (
          <Button
            mode="outlined"
            icon="refresh"
            onPress={onReset}
            disabled={isAnalyzing}
            style={styles.button}
          >
            Start Over
          </Button>
        )
      ) : (
        <>
          <Button mode="contained" icon="content-save" onPress={onSave} style={styles.button}>
            Save Analysis
          </Button>
          <Button mode="outlined" icon="refresh" onPress={onReset} style={styles.button}>
            New Scan
          </Button>
        </>
      )}
      <Button mode="text" onPress={onCancel} style={styles.button}>
        Cancel
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  actionButtons: {
    gap: 12,
    marginTop: 8,
    marginBottom: 16,
  },
  button: {},
});
