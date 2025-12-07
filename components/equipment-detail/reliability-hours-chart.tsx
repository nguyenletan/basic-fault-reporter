import { EquipmentDetail } from '@/types/types';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { Card, Divider, Text } from 'react-native-paper';

interface ReliabilityHoursChartProps {
  equipment: EquipmentDetail;
  mtbfData: { value: number; label: string }[];
  mttrData: { value: number }[];
  years: string[];
}

export const ReliabilityHoursChart = ({
  equipment,
  mtbfData,
  mttrData,
  years,
}: ReliabilityHoursChartProps) => {
  if (!equipment.reliability || !mtbfData) {
    return null;
  }

  return (
    <Card mode="elevated">
      <Card.Content>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          RELIABILITY (HOURS)
        </Text>
        <Divider style={styles.divider} />

        {/* Legend */}
        <View style={styles.reliabilityHoursLegend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, styles.legendDotMtbf]} />
            <Text variant="bodySmall" style={styles.legendText}>
              Mean Time Between Failure
            </Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, styles.legendDotMttr]} />
            <Text variant="bodySmall" style={styles.legendText}>
              Mean Time to Repair
            </Text>
          </View>
        </View>

        <View style={styles.reliabilityChartContainer}>
          <LineChart
            data={mtbfData}
            data2={mttrData}
            width={Dimensions.get('window').width - 100}
            height={200}
            spacing={(Dimensions.get('window').width - 140) / Math.max(mtbfData.length - 1, 1)}
            initialSpacing={15}
            endSpacing={15}
            color="#4B55A2"
            color2="#C8BFE7"
            thickness={2}
            dataPointsColor="#4B55A2"
            dataPointsColor2="#C8BFE7"
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
  reliabilityHoursLegend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 16,
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
  legendDotMtbf: {
    backgroundColor: '#4B55A2',
  },
  legendDotMttr: {
    backgroundColor: '#C8BFE7',
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
