import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Card, Icon, MD3Colors, Text } from 'react-native-paper';

type IndicatorCardProps = {
  number: number;
  color?: string;
  title: string;
  onPress?: () => void;
};

export function IndicatorCard({
  number,
  title,
  color = MD3Colors.error50,
  onPress,
}: IndicatorCardProps) {
  return (
    <Card style={[styles.card]} mode="elevated" onPress={onPress}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.cardTextContainer}>
          <Text variant="bodySmall" style={styles.cardText}>
            {title}
          </Text>
          <Icon source="circle" size={18} color={color} />
        </View>
        <Text variant="displayMedium" style={styles.cardNumber}>
          {number}
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    elevation: 0,
  },
  cardContent: {
    alignItems: 'center',
    textAlign: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: Platform.OS === 'android' ? 10 : 5,
  },

  cardTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 4,
    paddingHorizontal: Platform.OS === 'android' ? 10 : 5,
  },
  cardNumber: {
    fontWeight: '700',
    color: MD3Colors.primary20,
    textAlign: 'center',
  },
  cardText: {
    color: MD3Colors.primary20,
    height: 35,
  },
});
