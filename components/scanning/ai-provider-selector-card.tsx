import { AIProvider } from '@/services/ai-fault-detection';
import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Card, Divider, Icon, IconButton, MD2Colors, RadioButton, Text } from 'react-native-paper';

interface AIProviderSelectorCardProps {
  selectedAI: AIProvider;
  onSelectAI: (provider: AIProvider) => void;
}

export function AIProviderSelectorCard({ selectedAI, onSelectAI }: AIProviderSelectorCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getProviderName = (provider: AIProvider) => {
    switch (provider) {
      case 'openai':
        return 'OpenAI GPT-5.2 Pro';
      case 'gemini':
        return 'Google Gemini Pro Vision';
      case 'grok':
        return 'Grok Vision';
      default:
        return provider;
    }
  };

  return (
    <Card mode="elevated">
      <Card.Content>
        <Pressable onPress={() => setIsExpanded(!isExpanded)}>
          <View style={styles.sectionHeader}>
            <Icon source="robot" size={24} color={MD2Colors.green500} />
            <View style={styles.headerTextContainer}>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Select AI Provider
              </Text>
              {!isExpanded && (
                <Text variant="bodySmall" style={styles.selectedProvider}>
                  {getProviderName(selectedAI)}
                </Text>
              )}
            </View>
            <IconButton
              icon={isExpanded ? 'chevron-up' : 'chevron-down'}
              size={24}
              onPress={() => setIsExpanded(!isExpanded)}
            />
          </View>
        </Pressable>
        {isExpanded && <Divider style={styles.divider} />}
        {isExpanded && (
          <RadioButton.Group
            onValueChange={(value) => onSelectAI(value as AIProvider)}
            value={selectedAI}
          >
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
              <RadioButton.Android value="openai" />
              <View style={styles.radioContent}>
                <Text variant="bodyLarge" style={styles.radioLabel}>
                  OpenAI GPT-5.2 Pro
                </Text>
                <Text variant="bodySmall" style={styles.radioDescription}>
                  Advanced image analysis with detailed fault detection
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
        )}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTextContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontWeight: '600',
  },
  selectedProvider: {
    opacity: 0.7,
    marginTop: 4,
  },
  divider: {
    marginTop: 12,
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
