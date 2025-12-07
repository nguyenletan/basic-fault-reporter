import { AIProvider } from '@/services/ai-fault-detection';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Divider, Icon, MD2Colors, RadioButton, Text } from 'react-native-paper';

interface AIProviderSelectorCardProps {
  selectedAI: AIProvider;
  onSelectAI: (provider: AIProvider) => void;
}

export function AIProviderSelectorCard({ selectedAI, onSelectAI }: AIProviderSelectorCardProps) {
  return (
    <Card mode="elevated">
      <Card.Content>
        <View style={styles.sectionHeader}>
          <Icon source="robot" size={24} color={MD2Colors.green500} />
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Select AI Provider
          </Text>
        </View>
        <Divider style={styles.divider} />
        <RadioButton.Group
          onValueChange={(value) => onSelectAI(value as AIProvider)}
          value={selectedAI}
        >
          <View style={styles.radioItem}>
            <RadioButton.Android value="openai" />
            <View style={styles.radioContent}>
              <Text variant="bodyLarge" style={styles.radioLabel}>
                OpenAI GPT-4 Vision
              </Text>
              <Text variant="bodySmall" style={styles.radioDescription}>
                Advanced image analysis with detailed fault detection
              </Text>
            </View>
          </View>
          <Divider style={styles.radioDivider} />
          <View style={styles.radioItem}>
            <RadioButton.Android value="gemini" />
            <View style={styles.radioContent}>
              <Text variant="bodyLarge" style={styles.radioLabel}>
                Google Gemini Pro Vision
              </Text>
              <Text variant="bodySmall" style={styles.radioDescription}>
                Multimodal AI for comprehensive equipment inspection
              </Text>
            </View>
          </View>
          <Divider style={styles.radioDivider} />
          <View style={styles.radioItem}>
            <RadioButton.Android value="grok" />
            <View style={styles.radioContent}>
              <Text variant="bodyLarge" style={styles.radioLabel}>
                Grok Vision
              </Text>
              <Text variant="bodySmall" style={styles.radioDescription}>
                Real-time analysis with practical maintenance insights
              </Text>
            </View>
          </View>
        </RadioButton.Group>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
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
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  radioContent: {
    flex: 1,
    marginLeft: 8,
  },
  radioLabel: {
    fontWeight: '600',
  },
  radioDescription: {
    opacity: 0.7,
    marginTop: 4,
  },
  radioDivider: {
    marginVertical: 8,
  },
});
