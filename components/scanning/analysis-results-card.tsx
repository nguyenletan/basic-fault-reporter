import React from 'react';
import { StyleSheet, View } from 'react-native';
import Markdown from 'react-native-markdown-display';
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
          <Markdown style={markdownStyles}>{analysisResult}</Markdown>
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
});

const markdownStyles = {
  body: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    fontFamily: 'monospace',
  },
  heading1: {
    fontSize: 22,
    fontWeight: 'bold' as 'bold',
    color: '#2c3e50',
    marginTop: 16,
    marginBottom: 8,
    fontFamily: 'monospace',
  },
  heading2: {
    fontSize: 20,
    fontWeight: 'bold' as 'bold',
    color: '#34495e',
    marginTop: 14,
    marginBottom: 8,
    fontFamily: 'monospace',
  },
  heading3: {
    fontSize: 18,
    fontWeight: 'bold' as 'bold',
    color: '#7f8c8d',
    marginTop: 12,
    marginBottom: 6,
    fontFamily: 'monospace',
  },
  strong: {
    fontWeight: 'bold' as 'bold',
    color: '#2c3e50',
    fontFamily: 'monospace',
  },
  list_item: {
    marginVertical: 4,
    fontFamily: 'monospace',
  },
  bullet_list: {
    marginBottom: 8,
  },
  code_inline: {
    backgroundColor: '#f6f8fa',
    padding: 4,
    borderRadius: 4,
    fontFamily: 'monospace',
    fontSize: 14,
  },
};
