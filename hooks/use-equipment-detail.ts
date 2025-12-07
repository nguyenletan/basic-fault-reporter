import { equipmentDetailService } from '@/services/equipment-detail';
import { EquipmentDetail } from '@/types/types';
import { useEffect, useState } from 'react';
import { MD2Colors } from 'react-native-paper';

export const useEquipmentDetail = (id: string) => {
  const [equipment, setEquipment] = useState<EquipmentDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadEquipmentDetail();
  }, [id]);

  const loadEquipmentDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await equipmentDetailService.getEquipmentDetail(id);

      if (response.success && response.data) {
        setEquipment(response.data);
      } else {
        setError(response.error || 'Failed to load equipment details');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Error loading equipment detail:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ONLINE':
        return MD2Colors.teal500;
      case 'OFFLINE':
        return MD2Colors.red500;
      case 'MAINTENANCE':
        return MD2Colors.orange500;
      case 'ERROR':
        return MD2Colors.red700;
      default:
        return MD2Colors.grey500;
    }
  };

  const getHealthStatusColor = (status: 'good' | 'warning' | 'critical') => {
    switch (status) {
      case 'good':
        return MD2Colors.teal500;
      case 'warning':
        return MD2Colors.orange500;
      case 'critical':
        return MD2Colors.red500;
      default:
        return MD2Colors.grey500;
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return 'trending-up';
      case 'down':
        return 'trending-down';
      case 'stable':
        return 'trending-neutral';
      default:
        return 'minus';
    }
  };

  const getAnnualEnergyChartData = () => {
    if (!equipment?.annualEnergyConsumption?.data) {
      return null;
    }

    const dataPoints: { value: number; label: string }[] = [];

    equipment.annualEnergyConsumption.data.forEach((yearData) => {
      dataPoints.push(
        { value: yearData.quarters.q1, label: 'Q1' },
        { value: yearData.quarters.q2, label: 'Q2' },
        { value: yearData.quarters.q3, label: 'Q3' },
        { value: yearData.quarters.q4, label: 'Q4' }
      );
    });

    return {
      data: dataPoints,
      years: equipment.annualEnergyConsumption.data.map((d) => d.year),
    };
  };

  const getAssetReliabilityChartData = () => {
    if (!equipment?.assetReliability?.data) {
      return null;
    }

    const maintenanceData: { value: number; label: string }[] = [];
    const partsData: { value: number }[] = [];
    const energyData: { value: number }[] = [];

    equipment.assetReliability.data.forEach((yearData) => {
      maintenanceData.push(
        { value: yearData.quarters.q1.maintenance, label: 'Q1' },
        { value: yearData.quarters.q2.maintenance, label: 'Q2' },
        { value: yearData.quarters.q3.maintenance, label: 'Q3' },
        { value: yearData.quarters.q4.maintenance, label: 'Q4' }
      );
      partsData.push(
        { value: yearData.quarters.q1.parts },
        { value: yearData.quarters.q2.parts },
        { value: yearData.quarters.q3.parts },
        { value: yearData.quarters.q4.parts }
      );
      energyData.push(
        { value: yearData.quarters.q1.energy },
        { value: yearData.quarters.q2.energy },
        { value: yearData.quarters.q3.energy },
        { value: yearData.quarters.q4.energy }
      );
    });

    return {
      maintenanceData,
      partsData,
      energyData,
      years: equipment.assetReliability.data.map((d) => d.year),
    };
  };

  const getReliabilityChartData = () => {
    if (!equipment?.reliability?.data) {
      return null;
    }

    const mtbfData: { value: number; label: string }[] = [];
    const mttrData: { value: number }[] = [];

    equipment.reliability.data.forEach((yearData) => {
      mtbfData.push(
        { value: yearData.quarters.q1.mtbf, label: 'Q1' },
        { value: yearData.quarters.q2.mtbf, label: 'Q2' },
        { value: yearData.quarters.q3.mtbf, label: 'Q3' },
        { value: yearData.quarters.q4.mtbf, label: 'Q4' }
      );
      mttrData.push(
        { value: yearData.quarters.q1.mttr },
        { value: yearData.quarters.q2.mttr },
        { value: yearData.quarters.q3.mttr },
        { value: yearData.quarters.q4.mttr }
      );
    });

    return {
      mtbfData,
      mttrData,
      years: equipment.reliability.data.map((d) => d.year),
    };
  };

  return {
    equipment,
    loading,
    error,
    getStatusColor,
    getHealthStatusColor,
    getTrendIcon,
    getAnnualEnergyChartData,
    getAssetReliabilityChartData,
    getReliabilityChartData,
    refetch: loadEquipmentDetail,
  };
};
