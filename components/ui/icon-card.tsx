import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Icon, MD3Colors, Text } from 'react-native-paper';

type IconCardProps = {
  icon: string;
  iconColor?: string;
  title: string;
  onPress?: () => void;
};

export function IconCard({ icon, title, iconColor, onPress }: IconCardProps) {
  return (
    <Card style={[styles.card]} mode="elevated" onPress={onPress}>
      <Card.Content style={styles.cardContent}>
        <Icon source={icon} size={56} color={iconColor || MD3Colors.primary20} />
        <Text variant="titleLarge" style={styles.cardText} numberOfLines={2}>
          {title}
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 160,
  },
  cardContent: {
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingTop: 18,
  },
  cardText: {
    textAlign: 'center',
    color: MD3Colors.primary20,
  },
  cardIcon: {
    textAlign: 'center',
  },
});
