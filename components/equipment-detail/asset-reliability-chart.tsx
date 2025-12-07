import { EquipmentDetail } from '@/types/types';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { Card, Divider, Text } from 'react-native-paper';

interface AssetReliabilityChartProps {
  equipment: EquipmentDetail;
  maintenanceData: { value: number; label: string }[];
  partsData: { value: number }[];
  energyData: { value: number }[];
  years: string[];
}

export const AssetReliabilityChart = ({
  equipment,
  maintenanceData,
  partsData,
  energyData,
  years,
}: AssetReliabilityChartProps) => {
  if (!equipment.assetReliability || !maintenanceData) {
    return null;
  }

  return (
    <Card mode="elevated">
      <Card.Content>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          ASSET RELIABILITY
        </Text>
        <Divider style={styles.divider} />

        {/* Legend */}
        <View style={styles.reliabilityLegendContainer}>
          <Text variant="bodySmall" style={styles.reliabilityCostsLabel}>
            Costs (€)
          </Text>
          <View style={styles.reliabilityLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, styles.legendDotMaintenance]} />
              <Text variant="bodySmall" style={styles.legendText}>
                Maintenance
              </Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, styles.legendDotParts]} />
              <Text variant="bodySmall" style={styles.legendText}>
                Parts
              </Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, styles.legendDotEnergy]} />
              <Text variant="bodySmall" style={styles.legendText}>
                Energy
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.reliabilityChartContainer}>
          <LineChart
            data={maintenanceData}
            data2={partsData}
            data3={energyData}
            width={Dimensions.get('window').width - 100}
            height={200}
            spacing={
              (Dimensions.get('window').width - 140) / Math.max(maintenanceData.length - 1, 1)
            }
            initialSpacing={15}
            endSpacing={15}
            color="#C8BFE7"
            color2="#4B55A2"
            color3="#8965E0"
            thickness={2}
            dataPointsColor="#C8BFE7"
            dataPointsColor2="#4B55A2"
            dataPointsColor3="#8965E0"
            dataPointsRadius={3}
            curved
            xAxisColor="#E8E8E8"
            yAxisColor="#E8E8E8"
            rulesColor="#E8E8E8"
            yAxisTextStyle={{ color: '#666666', fontSize: 10 }}
            xAxisLabelTextStyle={{ color: '#666666', fontSize: 10 }}
            hideRules={false}
            noOfSections={4}
            formatYLabel={(value: string) => {
              const num = parseInt(value, 10);
              if (num >= 1000) {
                return `${(num / 1000).toFixed(0)}k`;
              }
              return value;
            }}
          />

          {/* Year labels */}
          <View style={styles.yearLabelsContainer}>
            {years.map((year) => (
              <Text key={year} variant="labelSmall" style={styles.yearLabel}>
                {year}
              </Text>
            ))}
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
  reliabilityLegendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    flexWrap: 'wrap',
    gap: 8,
  },
  reliabilityCostsLabel: {
    color: '#666666',
    fontWeight: '500',
  },
  reliabilityLegend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flexWrap: 'wrap',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendDotMaintenance: {
    backgroundColor: '#C8BFE7',
  },
  legendDotParts: {
    backgroundColor: '#4B55A2',
  },
  legendDotEnergy: {
    backgroundColor: '#8965E0',
  },
  legendText: {
    color: '#333333',
    fontSize: 12,
  },
  reliabilityChartContainer: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#E8E0F0',
    overflow: 'hidden',
  },
  yearLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 48,
    marginTop: 8,
  },
  yearLabel: {
    color: '#666666',
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
});
