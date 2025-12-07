import { equipmentLocationService } from '@/services/equipment-location';
import { EquipmentLocation } from '@/types/types';
import { useCallback, useEffect, useState } from 'react';

export function useEquipmentLocation(id: string) {
  const [location, setLocation] = useState<EquipmentLocation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadEquipmentLocation = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await equipmentLocationService.getEquipmentLocation(id);

      if (response.success && response.data) {
        setLocation(response.data);
      } else {
        setError(response.error || 'Failed to load equipment location');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Error loading equipment location:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadEquipmentLocation();
  }, [loadEquipmentLocation]);

  return {
    location,
    loading,
    error,
    refresh: loadEquipmentLocation,
  };
}
