import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Divider, Icon, MD2Colors, Text } from 'react-native-paper';

interface AnalysisResultsCardProps {
  analysisResult: string;
}

export function AnalysisResultsCard({ analysisResult }: AnalysisResultsCardProps) {
  return (
    <Card mode="elevated" style={styles.resultsCard}>
      <Card.Content>
        <View style={styles.sectionHeader}>
          <Icon source="file-document-check" size={24} color={MD2Colors.amber600} />
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Analysis Results
          </Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.resultsContainer}>
          <Text variant="bodyMedium" style={styles.resultsText}>
            {analysisResult}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  resultsCard: {
    backgroundColor: '#F3E5F5',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  sectionTitle: {
    fontWeight: '600',
  },
  divider: {
    marginBottom: 16,
  },
  resultsContainer: {
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  resultsText: {
    lineHeight: 24,
    fontFamily: 'monospace',
  },
});
