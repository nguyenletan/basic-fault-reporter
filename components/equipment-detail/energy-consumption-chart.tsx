import { EquipmentDetail } from '@/types/types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { Card, Divider, Text } from 'react-native-paper';

interface EnergyConsumptionChartProps {
  equipment: EquipmentDetail;
}

export const EnergyConsumptionChart = ({ equipment }: EnergyConsumptionChartProps) => {
  if (!equipment.energyConsumption) {
    return null;
  }

  return (
    <Card mode="elevated">
      <Card.Content>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          ENERGY CONSUMPTION BY SYSTEM
        </Text>
        <Divider style={styles.divider} />

        <View style={styles.energyConsumptionContainer}>
          <View style={styles.chartContainer}>
            <PieChart
              data={[
                {
                  value: equipment.energyConsumption.breakdown.equipmentGroup,
                  color: '#4B55A2',
                  text: `${equipment.energyConsumption.breakdown.equipmentGroup}%`,
                  textColor: '#FFFFFF',
                },
                {
                  value: equipment.energyConsumption.breakdown.subSystem,
                  color: '#8965E0',
                  text: `${equipment.energyConsumption.breakdown.subSystem}%`,
                  textColor: '#FFFFFF',
                },
                {
                  value: equipment.energyConsumption.breakdown.building,
                  color: '#C8BFE7',
                  text: `${equipment.energyConsumption.breakdown.building}%`,
                  textColor: '#333333',
                },
              ]}
              radius={70}
              innerRadius={40}
              showText
              textSize={11}
              focusOnPress
              showValuesAsLabels
              textBackgroundRadius={12}
            />
          </View>

          <View style={styles.breakdownList}>
            <View style={styles.breakdownItem}>
              <View style={styles.breakdownLeft}>
                <View style={[styles.breakdownDot, { backgroundColor: '#4B55A2' }]} />
                <Text variant="bodyMedium" style={styles.breakdownLabel}>
                  % of Equipment Group
                </Text>
              </View>
              <Text variant="titleMedium" style={styles.breakdownValue}>
                {equipment.energyConsumption.breakdown.equipmentGroup}%
              </Text>
            </View>

            <View style={styles.breakdownItem}>
              <View style={styles.breakdownLeft}>
                <View style={[styles.breakdownDot, { backgroundColor: '#8965E0' }]} />
                <Text variant="bodyMedium" style={styles.breakdownLabel}>
                  % of Sub-system
                </Text>
              </View>
              <Text variant="titleMedium" style={styles.breakdownValue}>
                {equipment.energyConsumption.breakdown.subSystem}%
              </Text>
            </View>

            <View style={styles.breakdownItem}>
              <View style={styles.breakdownLeft}>
                <View style={[styles.breakdownDot, { backgroundColor: '#C8BFE7' }]} />
                <Text variant="bodyMedium" style={styles.breakdownLabel}>
                  % of Building
                </Text>
              </View>
              <Text variant="titleMedium" style={styles.breakdownValue}>
                {equipment.energyConsumption.breakdown.building}%
              </Text>
            </View>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontWeight: '600',
    marginBottom: 8,
  },
  divider: {
    marginBottom: 12,
  },
  energyConsumptionContainer: {
    gap: 16,
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  breakdownList: {
    gap: 12,
    marginBottom: 16,
  },
  breakdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  breakdownLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  breakdownDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  breakdownLabel: {
    flex: 1,
  },
  breakdownValue: {
    fontWeight: '600',
  },
});
