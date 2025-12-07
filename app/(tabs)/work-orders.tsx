import { ThemedView } from '@/components/themed-view';
import { IndicatorCard } from '@/components/ui/indicator-card';
import { WorkOrderCard } from '@/components/work-orders/work-order-card';
import { WorkOrderFilters } from '@/components/work-orders/work-order-filters';
import { paperTheme } from '@/constants/paper-theme';
import { WorkOrder } from '@/types/types';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { AnimatedFAB, Text } from 'react-native-paper';

const workOrders: WorkOrder[] = [
  {
    id: 1,
    code: '#WO-4530',
    title: 'Chiller – Low Coolant Pressure',
    location: 'HQ Tower – Level 3',
    priority: 'High',
    status: 'New',
  },
  {
    id: 2,
    code: '#WO-4531',
    title: 'HVAC Unit – Fan Noise',
    location: 'Annex – Level 2',
    priority: 'Medium',
    status: 'In Progress',
  },
  {
    id: 3,
    code: '#WO-4518',
    title: 'Boiler – Sensor Calibration',
    location: 'Plant B – Level 1',
    priority: 'Low',
    status: 'Completed',
  },
  {
    id: 4,
    code: '#WO-4542',
    title: 'Pump – Vibration Alert',
    location: 'HQ Tower – Basement3',
    priority: 'High',
    status: 'Waiting AI',
  },
  {
    id: 5,
    code: '#WO-4545',
    title: 'AHU – Filter Replacement',
    location: 'Annex – Level 4',
    priority: 'Low',
    status: 'New',
  },
  {
    id: 6,
    code: '#WO-4519',
    title: 'Chiller – Low Coolant Pressure',
    location: 'HQ Tower – Level 3',
    priority: 'High',
    status: 'New',
  },
  {
    id: 7,
    code: '#WO-4520',
    title: 'HVAC Unit – Fan Noise',
    location: 'Annex – Level 2',
    priority: 'Medium',
    status: 'In Progress',
  },
  {
    id: 8,
    code: '#WO-4521',
    title: 'Boiler – Sensor Calibration',
    location: 'Plant B – Level 1',
    priority: 'Low',
    status: 'Completed',
  },
  {
    id: 9,
    code: '#WO-4538',
    title: 'Pump – Vibration Alert',
    location: 'HQ Tower – Basement3',
    priority: 'High',
    status: 'Waiting AI',
  },
  {
    id: 10,
    code: '#WO-4539',
    title: 'AHU – Filter Replacement',
    location: 'Annex – Level 4',
    priority: 'Low',
    status: 'New',
  },
];

export default function WorkOrdersScreen() {
  const [value, setValue] = React.useState('All');
  const [isExtended, setIsExtended] = React.useState(true);

  const onScroll = ({ nativeEvent }: { nativeEvent: { contentOffset: { y: number } } }) => {
    const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
    setIsExtended(!(currentScrollPosition <= 0));
  };

  const handleWorkOrderPress = (id: number) => {
    router.push(`/work-order/${id}`);
  };

  const handleNewWorkOrder = () => {
    console.log('Create new work order');
    // TODO: Navigate to new work order screen
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} onScroll={onScroll}>
        <Text variant="displaySmall">All Work Orders</Text>
        <View style={styles.threeColumns}>
          <IndicatorCard
            number={12}
            title="Open Work Orders"
            color={paperTheme.colors.purple}
            onPress={() => router.push('/work-order/open-work-orders')}
          />

          <IndicatorCard number={3} title="Urgent Alerts" color={paperTheme.colors.red} />

          <IndicatorCard number={8} title="Completed Today" color={paperTheme.colors.green} />
        </View>
        <WorkOrderFilters selectedStatus={value} onStatusChange={setValue} />
        {workOrders
          .filter((workOrder) => value === 'All' || workOrder.status === value)
          .map((workOrder) => (
            <WorkOrderCard
              key={workOrder.id}
              workOrder={workOrder}
              onPress={handleWorkOrderPress}
            />
          ))}
      </ScrollView>
      <AnimatedFAB
        icon={'plus'}
        label={'New work order'}
        extended={isExtended}
        onPress={handleNewWorkOrder}
        animateFrom={'right'}
        iconMode={'dynamic'}
        style={[styles.fabStyle]}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: 'absolute',
  },
  threeColumns: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexShrink: 1,
    gap: 12,
    flexGrow: 1,
  },
  smallCard: {
    flex: 1,
    elevation: 2,
  },
  smallCardContent: {
    alignItems: 'center',
    textAlign: 'center',
    gap: 8,
  },
  smallCardText: {
    textAlign: 'center',
  },
});
