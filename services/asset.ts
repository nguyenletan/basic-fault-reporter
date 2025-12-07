// Asset API service for CMMS/IWMS/CAFM/BEE system integration

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'https://api.example.com';
const USE_MOCK_DATA = process.env.EXPO_PUBLIC_USE_MOCK_API !== 'false'; // Default to true for demo

export interface AssetDetails {
  id: string;
  code: string;
  name: string;
  description: string;
  location: string;
  category: string;
  status: 'operational' | 'maintenance' | 'offline' | 'decommissioned';
  manufacturer?: string;
  model?: string;
  serialNumber?: string;
  installDate?: string;
  lastMaintenanceDate?: string;
  nextMaintenanceDate?: string;
  assignedTo?: string;
  specifications?: Record<string, any>;
}

export interface AssetApiResponse {
  success: boolean;
  data?: AssetDetails;
  error?: string;
  message?: string;
}

// Mock data for demo purposes
const MOCK_ASSETS: Record<string, AssetDetails> = {
  'EQ-001': {
    id: '1',
    code: 'EQ-001',
    name: 'HVAC Unit - North Wing',
    description:
      'Primary cooling and heating unit for the north wing of Building A. This unit serves offices 100-150 and conference rooms 1-5.',
    location: 'Building A - Roof, North Section',
    category: 'HVAC',
    status: 'operational',
    manufacturer: 'Carrier',
    model: '30RB-080',
    serialNumber: 'SN-HVAC-123456',
    installDate: '2022-03-15',
    lastMaintenanceDate: '2025-09-15',
    nextMaintenanceDate: '2025-12-15',
    assignedTo: 'John Smith - Facilities Team',
    specifications: {
      capacity: '80 tons',
      power: '460V 3-phase',
      refrigerant: 'R-410A',
    },
  },
  'EQ-002': {
    id: '2',
    code: 'EQ-002',
    name: 'Chiller Unit - Main',
    description:
      'Central chiller system providing cooling water to the entire facility. Critical infrastructure component requiring 24/7 monitoring.',
    location: 'Building A - Mechanical Room B1',
    category: 'Chiller',
    status: 'maintenance',
    manufacturer: 'Trane',
    model: 'CVHE-500',
    serialNumber: 'SN-CHILL-789012',
    installDate: '2020-06-01',
    lastMaintenanceDate: '2025-10-20',
    nextMaintenanceDate: '2025-11-20',
    assignedTo: 'Sarah Johnson - HVAC Specialist',
    specifications: {
      capacity: '500 tons',
      efficiency: '0.45 kW/ton',
      refrigerant: 'R-134a',
    },
  },
  'EQ-003': {
    id: '3',
    code: 'EQ-003',
    name: 'Emergency Generator',
    description:
      'Backup diesel generator providing emergency power to critical systems including data center, emergency lighting, and life safety systems.',
    location: 'Building A - Generator Room G1',
    category: 'Power Systems',
    status: 'operational',
    manufacturer: 'Caterpillar',
    model: 'C32-1000kW',
    serialNumber: 'SN-GEN-345678',
    installDate: '2019-11-10',
    lastMaintenanceDate: '2025-10-01',
    nextMaintenanceDate: '2026-01-01',
    assignedTo: 'Mike Davis - Electrical Team',
    specifications: {
      power: '1000 kW',
      voltage: '480V',
      fuel: 'Diesel',
      tankCapacity: '1000 gallons',
    },
  },
  'EQ-004': {
    id: '4',
    code: 'EQ-004',
    name: 'Elevator - Main Lobby',
    description:
      'Primary passenger elevator serving floors 1-10. High-traffic unit with modern destination dispatch system.',
    location: 'Building A - Main Lobby',
    category: 'Vertical Transport',
    status: 'operational',
    manufacturer: 'Otis',
    model: 'Gen2-Premier',
    serialNumber: 'SN-ELEV-901234',
    installDate: '2021-08-20',
    lastMaintenanceDate: '2025-10-25',
    nextMaintenanceDate: '2025-11-25',
    assignedTo: 'Tom Wilson - Building Operations',
    specifications: {
      capacity: '2500 lbs',
      speed: '500 fpm',
      floors: '10',
    },
  },
  'EQ-005': {
    id: '5',
    code: 'EQ-005',
    name: 'Fire Pump - Primary',
    description:
      'Main fire suppression pump for building sprinkler system. Regularly tested and maintained per NFPA standards.',
    location: 'Building A - Fire Pump Room FP1',
    category: 'Fire Safety',
    status: 'offline',
    manufacturer: 'Peerless',
    model: 'AE-2500',
    serialNumber: 'SN-PUMP-567890',
    installDate: '2020-02-15',
    lastMaintenanceDate: '2025-10-28',
    nextMaintenanceDate: '2025-11-15',
    assignedTo: 'Emergency Services Team',
    specifications: {
      flow: '2500 GPM',
      pressure: '125 PSI',
      motor: '200 HP',
    },
  },
  'EQ-006': {
    id: '6',
    code: 'EQ-006',
    name: 'Boiler - Building Heat',
    description:
      'Natural gas boiler providing hot water for building heating system during winter months.',
    location: 'Building A - Boiler Room BR1',
    category: 'HVAC',
    status: 'decommissioned',
    manufacturer: 'Cleaver-Brooks',
    model: 'CB-700-400',
    serialNumber: 'SN-BOIL-123789',
    installDate: '2015-09-10',
    lastMaintenanceDate: '2024-05-15',
    assignedTo: 'Legacy Systems - Archives',
    specifications: {
      capacity: '400 HP',
      fuel: 'Natural Gas',
      efficiency: '85%',
    },
  },
};

// Simulate API delay for realistic demo
const simulateNetworkDelay = (ms: number = 1500): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Get mock asset details by equipment code
 * @param equipmentCode - The equipment code scanned from QR code
 * @returns Mock asset details
 */
const getMockAssetDetails = async (equipmentCode: string): Promise<AssetApiResponse> => {
  // Simulate network delay
  await simulateNetworkDelay(1500);

  const asset = MOCK_ASSETS[equipmentCode];

  if (asset) {
    return {
      success: true,
      data: asset,
    };
  } else {
    return {
      success: false,
      error: `Asset not found for code: ${equipmentCode}. Try: EQ-001, EQ-002, EQ-003, EQ-004, EQ-005, or EQ-006`,
    };
  }
};

export const assetService = {
  /**
   * Get asset details by equipment code
   * @param equipmentCode - The equipment code scanned from QR code
   * @returns Asset details from CMMS/IWMS/CAFM/BEE system
   */
  getAssetDetails: async (equipmentCode: string): Promise<AssetApiResponse> => {
    // Use mock data if enabled (default for demo)
    if (USE_MOCK_DATA) {
      console.log('🎭 Using mock data for demo - Equipment Code:', equipmentCode);
      return getMockAssetDetails(equipmentCode);
    }

    // Real API call
    try {
      const response = await fetch(
        `${API_BASE_URL}/asset/details?code=${encodeURIComponent(equipmentCode)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Add authentication headers if needed
            // 'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          success: false,
          error: errorData.message || `HTTP error! status: ${response.status}`,
        };
      }

      const data: AssetDetails = await response.json();

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('Error fetching asset details:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch asset details',
      };
    }
  },

  /**
   * Search assets by various criteria
   * @param params - Search parameters
   * @returns List of matching assets
   */
  searchAssets: async (params: {
    query?: string;
    location?: string;
    category?: string;
    status?: string;
  }): Promise<AssetApiResponse[]> => {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

      const response = await fetch(`${API_BASE_URL}/asset/search?${queryParams.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error searching assets:', error);
      throw error;
    }
  },
};
