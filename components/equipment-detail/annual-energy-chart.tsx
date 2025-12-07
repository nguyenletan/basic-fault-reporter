import { EquipmentDetail } from '@/types/types';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { Card, Divider, Text } from 'react-native-paper';

interface AnnualEnergyChartProps {
  equipment: EquipmentDetail;
  data: { value: number; label: string }[];
  years: string[];
}

export const AnnualEnergyChart = ({ equipment, data, years }: AnnualEnergyChartProps) => {
  if (!equipment.annualEnergyConsumption || !data) {
    return null;
  }

  return (
    <Card mode="elevated">
      <Card.Content>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          ANNUAL ENERGY CONSUMPTION (kWh)
        </Text>
        <Divider style={styles.divider} />

        <View style={styles.annualChartContainer}>
          <LineChart
            data={data}
            width={Dimensions.get('window').width - 100}
            height={200}
            spacing={(Dimensions.get('window').width - 140) / Math.max(data.length - 1, 1)}
            initialSpacing={15}
            endSpacing={15}
            color="#4B55A2"
            thickness={2}
            dataPointsColor="#4B55A2"
            dataPointsRadius={4}
            curved
            areaChart
            startFillColor="rgba(75, 85, 162, 0.3)"
            endFillColor="rgba(75, 85, 162, 0.01)"
            startOpacity={0.9}
            endOpacity={0.2}
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
  annualChartContainer: {
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
