// Subsystem Verification API service
// Verifies that scanned QR code matches expected equipment and location

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'https://api.example.com';
const USE_MOCK_DATA = process.env.EXPO_PUBLIC_USE_MOCK_API !== 'false'; // Default to true for demo

export interface VerifiedEquipment {
  id: string;
  code: string;
  name: string;
  location: string;
  lastServiceDate: string;
  totalOperatingHours: number;
  openFaultAlerts: number;
  warrantyExpiry: string;
  status: 'operational' | 'maintenance' | 'offline';
}

export interface VerificationResult {
  isVerified: boolean;
  message: string;
  equipment?: VerifiedEquipment;
  lastVerified?: {
    name: string;
    timestamp: string;
  };
}

export interface VerificationApiResponse {
  success: boolean;
  data?: VerificationResult;
  error?: string;
}

export interface VerificationRequest {
  scannedCode: string;
  expectedEquipmentId: string;
  expectedLocation?: string;
}

// Mock data for equipment verification
const MOCK_EQUIPMENT_DATA: Record<string, VerifiedEquipment> = {
  'CHILLER-PLANT-2-ZONE-A': {
    id: '1',
    code: 'CHILLER-PLANT-2-ZONE-A',
    name: 'Chiller Plant 2 – Zone A',
    location: 'HQ Tower - Level 3 - Zone A',
    lastServiceDate: '2025-08-01',
    totalOperatingHours: 5280,
    openFaultAlerts: 3,
    warrantyExpiry: '2026-02-01',
    status: 'operational',
  },
  'HVAC-UNIT-2B-EAST': {
    id: '2',
    code: 'HVAC-UNIT-2B-EAST',
    name: 'HVAC Unit 2B – East Wing',
    location: 'Annex Building - Level 2 - East Wing',
    lastServiceDate: '2025-09-15',
    totalOperatingHours: 4120,
    openFaultAlerts: 1,
    warrantyExpiry: '2026-05-15',
    status: 'operational',
  },
  'BOILER-BR1-CENTRAL': {
    id: '3',
    code: 'BOILER-BR1-CENTRAL',
    name: 'Boiler BR1 – Central Plant',
    location: 'Plant B - Level 1 - Central Plant',
    lastServiceDate: '2025-07-20',
    totalOperatingHours: 8500,
    openFaultAlerts: 0,
    warrantyExpiry: '2025-12-31',
    status: 'operational',
  },
  'EQ-001': {
    id: '1',
    code: 'EQ-001',
    name: 'Chiller Plant 2 – Zone A',
    location: 'HQ Tower - Level 3 - Zone A',
    lastServiceDate: '2025-08-01',
    totalOperatingHours: 5280,
    openFaultAlerts: 3,
    warrantyExpiry: '2026-02-01',
    status: 'operational',
  },
  'EQ-002': {
    id: '2',
    code: 'EQ-002',
    name: 'HVAC Unit – Fan Noise',
    location: 'Annex Building - Level 2 - East Wing',
    lastServiceDate: '2025-09-15',
    totalOperatingHours: 4120,
    openFaultAlerts: 1,
    warrantyExpiry: '2026-05-15',
    status: 'operational',
  },
  'EQ-003': {
    id: '3',
    code: 'EQ-003',
    name: 'Boiler – Sensor Calibration',
    location: 'Plant B - Level 1 - Central Plant',
    lastServiceDate: '2025-07-20',
    totalOperatingHours: 8500,
    openFaultAlerts: 0,
    warrantyExpiry: '2025-12-31',
    status: 'operational',
  },
};

// Map equipment IDs to expected QR codes for verification
const EQUIPMENT_QR_MAPPING: Record<string, string[]> = {
  '1': ['CHILLER-PLANT-2-ZONE-A', 'EQ-001', 'chiller-plant-2'],
  '2': ['HVAC-UNIT-2B-EAST', 'EQ-002', 'hvac-unit-2b'],
  '3': ['BOILER-BR1-CENTRAL', 'EQ-003', 'boiler-br1'],
};

// Simulate API delay
const simulateNetworkDelay = (ms: number = 1500): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Mock verification of scanned QR code against expected equipment
 */
const mockVerifySubsystem = async (
  request: VerificationRequest
): Promise<VerificationApiResponse> => {
  await simulateNetworkDelay(1500);

  const { scannedCode, expectedEquipmentId } = request;

  // Check if the scanned code matches any known equipment
  const equipment =
    MOCK_EQUIPMENT_DATA[scannedCode] || MOCK_EQUIPMENT_DATA[scannedCode.toUpperCase()];

  if (!equipment) {
    return {
      success: true,
      data: {
        isVerified: false,
        message: `Unknown equipment code: ${scannedCode}. Please scan a valid QR code.`,
      },
    };
  }

  // Check if the scanned code matches the expected equipment
  const expectedCodes = EQUIPMENT_QR_MAPPING[expectedEquipmentId] || [];
  const isMatch =
    expectedCodes.some((code) => code.toLowerCase() === scannedCode.toLowerCase()) ||
    equipment.id === expectedEquipmentId;

  if (isMatch) {
    return {
      success: true,
      data: {
        isVerified: true,
        message: 'Equipment verified successfully!',
        equipment,
        lastVerified: {
          name: `${equipment.name}`,
          timestamp: new Date().toISOString(),
        },
      },
    };
  } else {
    return {
      success: true,
      data: {
        isVerified: false,
        message: `This QR code belongs to "${equipment.name}" but you are expected at a different equipment. Please verify you are at the correct location.`,
        equipment,
      },
    };
  }
};

export const subsystemVerificationService = {
  /**
   * Verify scanned QR code against expected equipment
   * @param request - Verification request with scanned code and expected equipment ID
   * @returns Verification result
   */
  verifySubsystem: async (request: VerificationRequest): Promise<VerificationApiResponse> => {
    if (USE_MOCK_DATA) {
      console.log('🎭 Using mock data for subsystem verification');
      console.log('📱 Scanned code:', request.scannedCode);
      console.log('🏭 Expected equipment ID:', request.expectedEquipmentId);
      return mockVerifySubsystem(request);
    }

    // Real API call
    try {
      const response = await fetch(`${API_BASE_URL}/equipment/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          success: false,
          error: errorData.message || `HTTP error! status: ${response.status}`,
        };
      }

      const data: VerificationResult = await response.json();

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('Error verifying subsystem:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to verify equipment',
      };
    }
  },

  /**
   * Get equipment details by code (for manual verification)
   * @param code - Equipment code
   * @returns Equipment details
   */
  getEquipmentByCode: async (
    code: string
  ): Promise<{ success: boolean; data?: VerifiedEquipment; error?: string }> => {
    if (USE_MOCK_DATA) {
      await simulateNetworkDelay(1000);
      const equipment = MOCK_EQUIPMENT_DATA[code] || MOCK_EQUIPMENT_DATA[code.toUpperCase()];

      if (equipment) {
        return { success: true, data: equipment };
      }
      return { success: false, error: `Equipment not found: ${code}` };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/equipment/code/${encodeURIComponent(code)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        return {
          success: false,
          error: `HTTP error! status: ${response.status}`,
        };
      }

      const data: VerifiedEquipment = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching equipment:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch equipment',
      };
    }
  },
};
