import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, MD3Colors, Text } from 'react-native-paper';

interface StepIndicatorProps {
  currentStep: 1 | 2 | 3;
  hasAbnormalNoise: boolean;
  step1Completed: boolean;
  step2Completed: boolean;
  step3Completed: boolean;
  stepTitle: string;
  stepDescription: string;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  hasAbnormalNoise,
  step1Completed,
  step2Completed,
  step3Completed,
  stepTitle,
  stepDescription,
}) => {
  return (
    <Card mode="outlined" style={styles.stepCard}>
      <Card.Content>
        <View style={styles.stepIndicator}>
          {/* Step 1 */}
          <View style={styles.stepItem}>
            <View
              style={[
                styles.stepCircle,
                currentStep === 1 && styles.stepCircleActive,
                step1Completed && styles.stepCircleCompleted,
              ]}
            >
              <Text
                variant="bodyMedium"
                style={[
                  styles.stepNumber,
                  (currentStep === 1 || step1Completed) &&
                    (step1Completed ? styles.stepNumberActiveCompleted : styles.stepNumberActive),
                ]}
              >
                {step1Completed ? '✓' : '1'}
              </Text>
            </View>
            <Text
              variant="bodySmall"
              style={[styles.stepLabel, currentStep === 1 && styles.stepLabelActive]}
            >
              Overview
            </Text>
          </View>

          {/* Connector 1 */}
          <View style={styles.stepConnector} />

          {/* Step 2 */}
          <View style={styles.stepItem}>
            <View
              style={[
                styles.stepCircle,
                currentStep === 2 && styles.stepCircleActive,
                step2Completed && styles.stepCircleCompleted,
              ]}
            >
              <Text
                variant="bodyMedium"
                style={[
                  styles.stepNumber,
                  (currentStep === 2 || step2Completed) &&
                    (step2Completed ? styles.stepNumberActiveCompleted : styles.stepNumberActive),
                ]}
              >
                {step2Completed ? '✓' : '2'}
              </Text>
            </View>
            <Text
              variant="bodySmall"
              style={[styles.stepLabel, currentStep === 2 && styles.stepLabelActive]}
            >
              Close-Up
            </Text>
          </View>

          {/* Step 3 (conditional) */}
          {hasAbnormalNoise && (
            <>
              <View style={styles.stepConnector} />
              <View style={styles.stepItem}>
                <View
                  style={[
                    styles.stepCircle,
                    currentStep === 3 && styles.stepCircleActive,
                    step3Completed && styles.stepCircleCompleted,
                  ]}
                >
                  <Text
                    variant="bodyMedium"
                    style={[
                      styles.stepNumber,
                      (currentStep === 3 || step3Completed) &&
                        (step3Completed
                          ? styles.stepNumberActiveCompleted
                          : styles.stepNumberActive),
                    ]}
                  >
                    {step3Completed ? '✓' : '3'}
                  </Text>
                </View>
                <Text
                  variant="bodySmall"
                  style={[styles.stepLabel, currentStep === 3 && styles.stepLabelActive]}
                >
                  Video
                </Text>
              </View>
            </>
          )}
        </View>

        {/* Step Description */}
        <View style={styles.stepDescription}>
          <Text variant="titleSmall" style={styles.stepTitle}>
            {stepTitle}
          </Text>
          <Text variant="bodySmall" style={styles.stepSubtitle}>
            {stepDescription}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  stepCard: {
    borderWidth: 2,
  },
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  stepItem: {
    alignItems: 'center',
    gap: 8,
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ccc',
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircleActive: {
    borderColor: MD3Colors.primary40,
  },
  stepCircleCompleted: {
    borderColor: MD3Colors.primary40,
    backgroundColor: MD3Colors.primary40,
  },
  stepNumber: {
    color: MD3Colors.secondary60,
    fontWeight: '600',
  },
  stepNumberActive: {
    color: MD3Colors.primary30,
  },
  stepNumberActiveCompleted: {
    color: MD3Colors.secondary100,
  },
  stepConnector: {
    width: 60,
    height: 2,
    backgroundColor: '#ccc',
    marginHorizontal: 8,
  },
  stepLabel: {
    color: MD3Colors.secondary50,
    fontWeight: '500',
  },
  stepLabelActive: {
    color: MD3Colors.primary20,
    fontWeight: '600',
  },
  stepDescription: {
    alignItems: 'center',
    gap: 4,
  },
  stepTitle: {
    fontWeight: '600',
    textAlign: 'center',
  },
  stepSubtitle: {
    opacity: 0.7,
    textAlign: 'center',
  },
});
