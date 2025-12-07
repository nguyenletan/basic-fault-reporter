import { EquipmentDetail } from '@/types/types';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card } from 'react-native-paper';

interface BuildingImageCardProps {
  equipment: EquipmentDetail;
  id: string;
}

export const BuildingImageCard = ({ equipment, id }: BuildingImageCardProps) => {
  if (!equipment.buildingImage) {
    return null;
  }

  return (
    <Card mode="elevated">
      <Card.Content style={styles.imageCardContent}>
        <Image
          source={{
            uri: equipment.buildingImage
              ? equipment.buildingImage
              : '/assets/images/equipment-image-example.jpg',
          }}
          style={styles.buildingImage}
          contentFit="cover"
        />
      </Card.Content>
      <Card.Actions style={styles.cardActions}>
        <Button
          mode="contained"
          compact={true}
          onPress={() => router.push(`/equipment/${id}/location`)}
        >
          View Details
        </Button>
        <Button
          mode="outlined"
          compact={true}
          onPress={() => router.push(`/equipment/${id}/location`)}
        >
          Sub System Scan
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  imageCardContent: {
    flexDirection: 'column',
    gap: 12,
  },
  buildingImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
