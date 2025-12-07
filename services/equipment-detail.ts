// Equipment Detail API service

import { EquipmentDetail } from '@/types/types';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'https://api.example.com';
const USE_MOCK_DATA = process.env.EXPO_PUBLIC_USE_MOCK_API !== 'false';

export interface EquipmentDetailApiResponse {
  success: boolean;
  data?: EquipmentDetail;
  error?: string;
  message?: string;
}

// Mock data for demo purposes
const MOCK_EQUIPMENT_DETAILS: Record<string, EquipmentDetail> = {
  '1': {
    id: '1',
    equipmentCode: 'Chiller Plant 2',
    equipmentName: 'Chiller Plant 2',
    location: 'HQ Tower - Level 3 - Zone A',
    status: 'ONLINE',
    lastRefresh: '19 Nov 2020-23:31:23',
    buildingImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    equipmentImage: null,
    specifications: {
      asset: 'CHPL-01',
      installation: '21-04-2007',
      capacity: '500',
      model: 'CH-UV',
      manufacturer: 'York',
      serialNumber: '23-6-050',
      commissioned: '2007-04-21',
      plantRM: 'Plant-RM-51',
      initialValue: '1000 EUR',
      location: 'HQ Tower - Level 3 - Zone A',
      age: '10',
      expectedLifespan: '20',
      description:
        'Chiller Plant 2 is a chiller plant located in the HQ Tower - Level 3 - Zone A. It is used to cool the air in the office spaces.',
      warrantyExpiry: {
        date: 'Dec-2025',
        status: 'warning',
      },
    },
    quickHealthStatus: {
      lastService: {
        date: '15 Aug 2025',
        status: 'good',
      },
      operatingHours: {
        hours: 12500,
        status: 'good',
      },
      pressure: {
        value: '2.3 bar',
        status: 'good',
        trend: 'stable',
      },
    },
    iotLiveData: {
      temperature: {
        value: '6.8 °C',
        status: 'good',
        trend: 'stable',
      },
      energyUse: {
        value: '450 kW',
        status: 'good',
        trend: 'down',
      },
      flowRate: {
        value: '2,340 L/min',
        status: 'critical',
        trend: 'up',
      },
      pressure: {
        value: '3.2 bar',
        status: 'good',
        trend: 'stable',
      },
    },
    recentWorkOrders: [
      {
        code: 'WO-8810',
        title: 'Vibration Detected',
        status: 'Completed',
        date: '18 Aug 2025',
      },
      {
        code: 'WO-9775',
        title: 'Vibration Detected',
        status: 'Completed',
        date: '10 Jul 2025',
      },
      {
        code: 'WO-7076',
        title: 'Sensor data exceeds threshold by 10%',
        status: 'Checked Data',
        date: '05 Jun 2025',
      },
    ],
    technicalDiagrams: [
      {
        id: 'diagram-1',
        title: 'System Schematic',
        description: 'Complete chiller plant system schematic diagram',
        imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800',
        type: 'schematic',
        uploadDate: '2024-01-15',
      },
      {
        id: 'diagram-2',
        title: 'Electrical Wiring',
        description: 'Electrical wiring and control panel diagram',
        imageUrl: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800',
        type: 'electrical',
        uploadDate: '2024-02-20',
      },
      {
        id: 'diagram-3',
        title: 'Plumbing Layout',
        description: 'Water flow and piping configuration',
        imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800',
        type: 'plumbing',
        uploadDate: '2024-03-10',
      },
    ],
    energyConsumption: {
      breakdown: {
        equipmentGroup: 35,
        subSystem: 14,
        building: 3,
      },
      totalConsumption: '450 kW',
      period: 'Last 30 days',
    },
    annualEnergyConsumption: {
      data: [
        { year: 2022, quarters: { q1: 55000, q2: 72000, q3: 85000, q4: 110000 } },
        { year: 2023, quarters: { q1: 95000, q2: 105000, q3: 125000, q4: 140000 } },
        { year: 2024, quarters: { q1: 145000, q2: 155000, q3: 165000, q4: 172000 } },
      ],
    },
    assetReliability: {
      data: [
        {
          year: 2019,
          quarters: {
            q1: { maintenance: 60000, parts: 5000, energy: 95000 },
            q2: { maintenance: 70000, parts: 8000, energy: 100000 },
            q3: { maintenance: 80000, parts: 12000, energy: 105000 },
            q4: { maintenance: 85000, parts: 15000, energy: 108000 },
          },
        },
        {
          year: 2020,
          quarters: {
            q1: { maintenance: 75000, parts: 20000, energy: 110000 },
            q2: { maintenance: 95000, parts: 35000, energy: 125000 },
            q3: { maintenance: 110000, parts: 50000, energy: 135000 },
            q4: { maintenance: 130000, parts: 65000, energy: 150000 },
          },
        },
        {
          year: 2021,
          quarters: {
            q1: { maintenance: 145000, parts: 75000, energy: 165000 },
            q2: { maintenance: 160000, parts: 85000, energy: 175000 },
            q3: { maintenance: 175000, parts: 95000, energy: 185000 },
            q4: { maintenance: 190000, parts: 105000, energy: 170000 },
          },
        },
      ],
    },
    reliability: {
      data: [
        {
          year: 2023,
          quarters: {
            q1: { mtbf: 168000, mttr: 8000 },
            q2: { mtbf: 165000, mttr: 10000 },
            q3: { mtbf: 158000, mttr: 12000 },
            q4: { mtbf: 145000, mttr: 15000 },
          },
        },
        {
          year: 2024,
          quarters: {
            q1: { mtbf: 120000, mttr: 18000 },
            q2: { mtbf: 105000, mttr: 22000 },
            q3: { mtbf: 85000, mttr: 28000 },
            q4: { mtbf: 72000, mttr: 32000 },
          },
        },
        {
          year: 2025,
          quarters: {
            q1: { mtbf: 62000, mttr: 35000 },
            q2: { mtbf: 55000, mttr: 38000 },
            q3: { mtbf: 50000, mttr: 42000 },
            q4: { mtbf: 48000, mttr: 45000 },
          },
        },
      ],
    },
  },
  '2': {
    id: '2',
    equipmentCode: 'HVAC Unit 5',
    equipmentName: 'HVAC Unit 5',
    location: 'Annex Building - Level 2 - East Wing',
    status: 'ONLINE',
    lastRefresh: '07 Nov 2025-14:22:10',
    specifications: {
      asset: 'HVAC-05',
      installation: '15-06-2019',
      capacity: '250',
      model: 'AHU-XL',
      manufacturer: 'Carrier',
      serialNumber: 'AHU-789-456',
      plantRM: 'Plant-RM-22',
      commissioned: '2019-06-15',
      initialValue: '500 EUR',
      location: 'Annex Building - Level 2 - East Wing',
      age: '10',
      expectedLifespan: '20',
      description:
        'HVAC Unit 5 is a HVAC unit located in the Annex Building - Level 2 - East Wing. It is used to heat and cool the office spaces.',
      warrantyExpiry: {
        date: 'Jun-2026',
        status: 'good',
      },
    },
    quickHealthStatus: {
      lastService: {
        date: '20 Oct 2025',
        status: 'good',
      },
      operatingHours: {
        hours: 8200,
        status: 'good',
      },
      pressure: {
        value: '1.8 bar',
        status: 'good',
        trend: 'stable',
      },
    },
    iotLiveData: {
      temperature: {
        value: '22.5 °C',
        status: 'good',
        trend: 'stable',
      },
      energyUse: {
        value: '185 kW',
        status: 'good',
        trend: 'stable',
      },
      flowRate: {
        value: '1,850 L/min',
        status: 'good',
        trend: 'stable',
      },
      pressure: {
        value: '1.9 bar',
        status: 'good',
        trend: 'up',
      },
    },
    recentWorkOrders: [
      {
        code: 'WO-9012',
        title: 'Filter Replacement',
        status: 'Completed',
        date: '25 Oct 2025',
      },
      {
        code: 'WO-8901',
        title: 'Routine Inspection',
        status: 'Completed',
        date: '15 Sep 2025',
      },
    ],
    technicalDiagrams: [
      {
        id: 'diagram-hvac-1',
        title: 'HVAC System Overview',
        description: 'Air handling unit layout and ducting system',
        imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800',
        type: 'schematic',
        uploadDate: '2024-06-01',
      },
      {
        id: 'diagram-hvac-2',
        title: 'Control Wiring',
        description: 'HVAC control system wiring diagram',
        imageUrl: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800',
        type: 'wiring',
        uploadDate: '2024-06-15',
      },
    ],
    energyConsumption: {
      breakdown: {
        equipmentGroup: 28,
        subSystem: 18,
        building: 5,
      },
      totalConsumption: '185 kW',
      period: 'Last 30 days',
    },
    annualEnergyConsumption: {
      data: [
        { year: 2022, quarters: { q1: 32000, q2: 45000, q3: 52000, q4: 68000 } },
        { year: 2023, quarters: { q1: 71000, q2: 78000, q3: 85000, q4: 92000 } },
        { year: 2024, quarters: { q1: 95000, q2: 102000, q3: 108000, q4: 115000 } },
      ],
    },
    assetReliability: {
      data: [
        {
          year: 2019,
          quarters: {
            q1: { maintenance: 35000, parts: 3000, energy: 55000 },
            q2: { maintenance: 40000, parts: 5000, energy: 60000 },
            q3: { maintenance: 45000, parts: 8000, energy: 65000 },
            q4: { maintenance: 50000, parts: 10000, energy: 70000 },
          },
        },
        {
          year: 2020,
          quarters: {
            q1: { maintenance: 48000, parts: 12000, energy: 72000 },
            q2: { maintenance: 55000, parts: 18000, energy: 78000 },
            q3: { maintenance: 62000, parts: 25000, energy: 85000 },
            q4: { maintenance: 70000, parts: 32000, energy: 92000 },
          },
        },
        {
          year: 2021,
          quarters: {
            q1: { maintenance: 75000, parts: 38000, energy: 98000 },
            q2: { maintenance: 82000, parts: 45000, energy: 105000 },
            q3: { maintenance: 90000, parts: 52000, energy: 112000 },
            q4: { maintenance: 98000, parts: 60000, energy: 120000 },
          },
        },
      ],
    },
    reliability: {
      data: [
        {
          year: 2023,
          quarters: {
            q1: { mtbf: 185000, mttr: 5000 },
            q2: { mtbf: 180000, mttr: 6000 },
            q3: { mtbf: 175000, mttr: 7000 },
            q4: { mtbf: 170000, mttr: 8000 },
          },
        },
        {
          year: 2024,
          quarters: {
            q1: { mtbf: 165000, mttr: 9000 },
            q2: { mtbf: 158000, mttr: 11000 },
            q3: { mtbf: 150000, mttr: 13000 },
            q4: { mtbf: 142000, mttr: 15000 },
          },
        },
        {
          year: 2025,
          quarters: {
            q1: { mtbf: 135000, mttr: 17000 },
            q2: { mtbf: 128000, mttr: 19000 },
            q3: { mtbf: 120000, mttr: 21000 },
            q4: { mtbf: 115000, mttr: 23000 },
          },
        },
      ],
    },
  },
  '3': {
    id: '3',
    equipmentCode: 'Boiler System 1',
    equipmentName: 'Boiler System 1',
    location: 'Plant B - Level 1 - Central Plant',
    status: 'MAINTENANCE',
    lastRefresh: '07 Nov 2025-09:15:45',
    specifications: {
      asset: 'BOIL-01',
      installation: '10-03-2018',
      capacity: '400',
      model: 'CB-700-400',
      manufacturer: 'Cleaver-Brooks',
      serialNumber: 'CB-123-789',
      plantRM: 'Plant-RM-01',
      commissioned: '2018-03-10',
      initialValue: '1000 EUR',
      location: 'Plant B - Level 1 - Central Plant',
      age: '10',
      expectedLifespan: '20',
      warrantyExpiry: {
        date: 'Mar-2024',
        status: 'warning',
      },
      description:
        'Boiler System 1 is a boiler system located in the Plant B - Level 1 - Central Plant. It is used to heat the office spaces.',
    },
    quickHealthStatus: {
      lastService: {
        date: '05 Nov 2025',
        status: 'warning',
      },
      operatingHours: {
        hours: 15800,
        status: 'warning',
      },
      pressure: {
        value: '4.2 bar',
        status: 'warning',
        trend: 'up',
      },
    },
    iotLiveData: {
      temperature: {
        value: '85.3 °C',
        status: 'warning',
        trend: 'up',
      },
      energyUse: {
        value: '620 kW',
        status: 'warning',
        trend: 'up',
      },
      flowRate: {
        value: '980 L/min',
        status: 'good',
        trend: 'stable',
      },
      pressure: {
        value: '4.5 bar',
        status: 'warning',
        trend: 'up',
      },
    },
    recentWorkOrders: [
      {
        code: 'WO-9123',
        title: 'Pressure Sensor Calibration',
        status: 'Completed',
        date: '05 Nov 2025',
      },
      {
        code: 'WO-8834',
        title: 'Annual Inspection',
        status: 'Completed',
        date: '20 Oct 2025',
      },
    ],
    technicalDiagrams: [
      {
        id: 'diagram-boiler-1',
        title: 'Boiler System Schematic',
        description: 'Complete boiler system layout with safety valves',
        imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800',
        type: 'schematic',
        uploadDate: '2024-03-01',
      },
      {
        id: 'diagram-boiler-2',
        title: 'Gas Line Configuration',
        description: 'Natural gas supply and distribution system',
        imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800',
        type: 'plumbing',
        uploadDate: '2024-03-15',
      },
      {
        id: 'diagram-boiler-3',
        title: 'Electrical Controls',
        description: 'Boiler control system and safety interlocks',
        imageUrl: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800',
        type: 'electrical',
        uploadDate: '2024-03-20',
      },
    ],
    energyConsumption: {
      breakdown: {
        equipmentGroup: 42,
        subSystem: 22,
        building: 8,
      },
      totalConsumption: '620 kW',
      period: 'Last 30 days',
    },
    annualEnergyConsumption: {
      data: [
        { year: 2022, quarters: { q1: 120000, q2: 145000, q3: 168000, q4: 195000 } },
        { year: 2023, quarters: { q1: 210000, q2: 225000, q3: 248000, q4: 275000 } },
        { year: 2024, quarters: { q1: 290000, q2: 315000, q3: 340000, q4: 365000 } },
      ],
    },
    assetReliability: {
      data: [
        {
          year: 2019,
          quarters: {
            q1: { maintenance: 85000, parts: 8000, energy: 120000 },
            q2: { maintenance: 95000, parts: 12000, energy: 130000 },
            q3: { maintenance: 105000, parts: 18000, energy: 140000 },
            q4: { maintenance: 115000, parts: 25000, energy: 155000 },
          },
        },
        {
          year: 2020,
          quarters: {
            q1: { maintenance: 110000, parts: 30000, energy: 160000 },
            q2: { maintenance: 125000, parts: 42000, energy: 175000 },
            q3: { maintenance: 140000, parts: 55000, energy: 190000 },
            q4: { maintenance: 158000, parts: 70000, energy: 210000 },
          },
        },
        {
          year: 2021,
          quarters: {
            q1: { maintenance: 170000, parts: 82000, energy: 225000 },
            q2: { maintenance: 185000, parts: 95000, energy: 240000 },
            q3: { maintenance: 200000, parts: 110000, energy: 255000 },
            q4: { maintenance: 220000, parts: 125000, energy: 270000 },
          },
        },
      ],
    },
    reliability: {
      data: [
        {
          year: 2023,
          quarters: {
            q1: { mtbf: 145000, mttr: 12000 },
            q2: { mtbf: 138000, mttr: 14000 },
            q3: { mtbf: 130000, mttr: 16000 },
            q4: { mtbf: 120000, mttr: 19000 },
          },
        },
        {
          year: 2024,
          quarters: {
            q1: { mtbf: 110000, mttr: 22000 },
            q2: { mtbf: 98000, mttr: 25000 },
            q3: { mtbf: 85000, mttr: 28000 },
            q4: { mtbf: 75000, mttr: 32000 },
          },
        },
        {
          year: 2025,
          quarters: {
            q1: { mtbf: 68000, mttr: 35000 },
            q2: { mtbf: 62000, mttr: 38000 },
            q3: { mtbf: 58000, mttr: 40000 },
            q4: { mtbf: 55000, mttr: 42000 },
          },
        },
      ],
    },
  },
};

const simulateNetworkDelay = (ms: number = 1000): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const getMockEquipmentDetail = async (equipmentId: string): Promise<EquipmentDetailApiResponse> => {
  await simulateNetworkDelay(1000);

  const detail = MOCK_EQUIPMENT_DETAILS[equipmentId];

  if (detail) {
    return {
      success: true,
      data: detail,
    };
  } else {
    return {
      success: false,
      error: `Equipment details not found for ID: ${equipmentId}`,
    };
  }
};

export const equipmentDetailService = {
  getEquipmentDetail: async (equipmentId: string): Promise<EquipmentDetailApiResponse> => {
    if (USE_MOCK_DATA) {
      console.log('🎭 Using mock data for equipment detail - Equipment ID:', equipmentId);
      return getMockEquipmentDetail(equipmentId);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/equipment/${equipmentId}/detail`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          success: false,
          error: errorData.message || `HTTP error! status: ${response.status}`,
        };
      }

      const data: EquipmentDetail = await response.json();

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('Error fetching equipment detail:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch equipment detail',
      };
    }
  },
};
