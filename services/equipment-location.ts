// Equipment Location API service

import { EquipmentLocation } from '@/types/types';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'https://api.example.com';
const USE_MOCK_DATA = process.env.EXPO_PUBLIC_USE_MOCK_API !== 'false'; // Default to true for demo

export interface EquipmentLocationApiResponse {
  success: boolean;
  data?: EquipmentLocation;
  error?: string;
  message?: string;
}

// Mock data for demo purposes
const MOCK_EQUIPMENT_LOCATIONS: Record<string, EquipmentLocation> = {
  '1': {
    id: '1',
    equipmentCode: '#EQ-001',
    equipmentName: 'Chiller - Low Coolant Pressure',
    buildingName: 'HQ Tower',
    buildingAddress: '123 Business District, Singapore 018956',
    floor: 'Level 3',
    room: 'Mechanical Room 3A',
    zone: 'North Wing',
    coordinates: {
      latitude: 1.2844,
      longitude: 103.8607,
    },
    accessInstructions:
      'Take the north elevator to Level 3. Exit and turn right. Mechanical Room 3A is at the end of the corridor. Access requires mechanical room key card.',
    nearbyLandmarks: [
      'Near the north stairwell',
      'Adjacent to server room 3B',
      'Opposite conference room 3.5',
    ],
    safetyNotes: [
      'Wear PPE: Hard hat, safety glasses, and gloves required',
      'High noise area - hearing protection recommended',
      'Watch for wet floors - coolant leaks possible',
      'Emergency shutoff valve located at entrance',
    ],
  },
  '2': {
    id: '2',
    equipmentCode: '#EQ-002',
    equipmentName: 'HVAC Unit - Fan Noise',
    buildingName: 'Annex Building',
    buildingAddress: '456 Commerce Avenue, Singapore 018957',
    floor: 'Level 2',
    room: 'AHU Room 2B',
    zone: 'East Wing',
    coordinates: {
      latitude: 1.2855,
      longitude: 103.862,
    },
    accessInstructions:
      'Access via east wing service corridor. Take service elevator to Level 2. AHU Room 2B requires facilities team access card.',
    nearbyLandmarks: [
      'Near east elevator lobby',
      'Behind electrical room 2E',
      'Next to rooftop access door',
    ],
    safetyNotes: [
      'Lock-out/Tag-out procedures required before maintenance',
      'High voltage equipment present',
      'Ensure proper ventilation before entering',
      'Two-person minimum for HVAC work',
    ],
  },
  '3': {
    id: '3',
    equipmentCode: '#EQ-003',
    equipmentName: 'Boiler - Sensor Calibration',
    buildingName: 'Plant B',
    buildingAddress: '789 Industrial Road, Singapore 629234',
    floor: 'Level 1',
    room: 'Boiler Room BR1',
    zone: 'Central Plant',
    coordinates: {
      latitude: 1.29,
      longitude: 103.865,
    },
    accessInstructions:
      'Enter through main plant entrance. Follow red pipe markings to Boiler Room BR1. Authorized personnel only.',
    nearbyLandmarks: [
      'Main plant control room is 20m west',
      'Emergency eye wash station at entrance',
      'Fuel storage area to the south',
    ],
    safetyNotes: [
      'DANGER: Hot surfaces and high pressure equipment',
      'Confined space entry procedures required',
      'Gas detection equipment mandatory',
      'Emergency shower and eye wash station available',
      'Fire extinguisher located at entrance',
    ],
  },
};

// Simulate API delay for realistic demo
const simulateNetworkDelay = (ms: number = 1200): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Get mock equipment location by equipment ID
 */
const getMockEquipmentLocation = async (
  equipmentId: string
): Promise<EquipmentLocationApiResponse> => {
  await simulateNetworkDelay(1200);

  const location = MOCK_EQUIPMENT_LOCATIONS[equipmentId];

  if (location) {
    return {
      success: true,
      data: location,
    };
  } else {
    return {
      success: false,
      error: `Equipment location not found for ID: ${equipmentId}`,
    };
  }
};

export const equipmentLocationService = {
  /**
   * Get equipment location by equipment ID
   * @param equipmentId - The equipment ID from the alert
   * @returns Equipment location details
   */
  getEquipmentLocation: async (equipmentId: string): Promise<EquipmentLocationApiResponse> => {
    // Use mock data if enabled (default for demo)
    if (USE_MOCK_DATA) {
      console.log('🎭 Using mock data for equipment location - Equipment ID:', equipmentId);
      return getMockEquipmentLocation(equipmentId);
    }

    // Real API call
    try {
      const response = await fetch(`${API_BASE_URL}/equipment/${equipmentId}/location`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add authentication headers if needed
          // 'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          success: false,
          error: errorData.message || `HTTP error! status: ${response.status}`,
        };
      }

      const data: EquipmentLocation = await response.json();

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('Error fetching equipment location:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch equipment location',
      };
    }
  },
};
