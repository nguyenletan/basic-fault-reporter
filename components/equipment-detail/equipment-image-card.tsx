import { EquipmentDetail } from '@/types/types';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

interface EquipmentImageCardProps {
  equipment: EquipmentDetail;
}

export const EquipmentImageCard = ({ equipment }: EquipmentImageCardProps) => {
  return (
    <Card mode="elevated">
      <Card.Content style={styles.equipmentImageContent}>
        <Image
          source={
            equipment.equipmentImage
              ? { uri: equipment.equipmentImage }
              : require('@/assets/images/equipment-image-example.jpg')
          }
          style={styles.equipmentImage}
          contentFit="cover"
        />
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  equipmentImageContent: {
    padding: 0,
  },
  equipmentImage: {
    width: '100%',
    height: 250,
    borderRadius: 8,
  },
});
