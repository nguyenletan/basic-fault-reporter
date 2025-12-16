import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

interface NavigationButtonsProps {
  currentStep: 1 | 2 | 3;
  hasAbnormalNoise: boolean;
  canProceed: boolean;
  isAnalyzing: boolean;
  showAnalysisResults: boolean;
  onCancel: () => void;
  onBack: () => void;
  onNext: () => void;
  onAnalyze: () => void;
  onStartOver: () => void;
  onSave: () => void;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentStep,
  hasAbnormalNoise,
  canProceed,
  isAnalyzing,
  showAnalysisResults,
  onCancel,
  onBack,
  onNext,
  onAnalyze,
  onStartOver,
  onSave,
}) => {
  // Post-analysis buttons
  if (showAnalysisResults) {
    return (
      <View style={styles.navigationButtons}>
        <Button mode="outlined" onPress={onStartOver} style={styles.navButton}>
          Start Over
        </Button>
        <Button mode="contained" onPress={onSave} style={styles.navButton}>
          Save Analysis
        </Button>
      </View>
    );
  }

  // Step 1: Show Cancel and Next
  if (currentStep === 1) {
    return (
      <View style={styles.navigationButtons}>
        <Button mode="outlined" onPress={onCancel} style={styles.navButton}>
          Cancel
        </Button>
        <Button mode="contained" onPress={onNext} style={styles.navButton} disabled={!canProceed}>
          Next Step
        </Button>
      </View>
    );
  }

  // Step 2: Show Back and Next/Analyze
  if (currentStep === 2) {
    return (
      <View style={styles.finalNavigationButtons}>
        {hasAbnormalNoise ? (
          <Button mode="contained" onPress={onNext} style={styles.navButton} disabled={!canProceed}>
            Next Step
          </Button>
        ) : (
          <>
            <Button mode="contained" style={styles.navButton}>
              Submit
            </Button>
            <Button
              mode="contained"
              onPress={onAnalyze}
              style={styles.navButton}
              disabled={!canProceed || isAnalyzing}
              loading={isAnalyzing}
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze with AI'}
            </Button>
          </>
        )}
        <Button mode="contained-tonal" onPress={onBack} style={styles.navButton}>
          Back
        </Button>
      </View>
    );
  }

  // Step 3: Show Back and Analyze
  if (currentStep === 3) {
    return (
      <View style={styles.finalNavigationButtons}>
        <Button mode="contained" style={styles.navButton}>
          Submit
        </Button>
        <Button
          mode="contained"
          onPress={onAnalyze}
          style={styles.navButton}
          disabled={!canProceed || isAnalyzing}
          loading={isAnalyzing}
        >
          {isAnalyzing ? 'Analyzing...' : 'Analyze with AI'}
        </Button>
        <Button mode="contained-tonal" onPress={onBack} style={styles.navButton}>
          Back
        </Button>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  navigationButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },

  finalNavigationButtons: {
    marginTop: 8,
    flexDirection: 'column',
    gap: 12,
  },
  navButton: {
    flex: 1,
  },
});
