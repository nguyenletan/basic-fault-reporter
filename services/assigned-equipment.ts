// Service for managing assigned equipment/plants for the current user

// Mock assigned equipment codes for demo
// In a real app, this would come from user profile/API
const ASSIGNED_EQUIPMENT_CODES = [
  'EQ-001', // HVAC Unit
  'EQ-003', // Emergency Generator
  'EQ-004', // Elevator
];

export interface AssignedEquipmentService {
  isEquipmentAssigned: (equipmentCode: string) => boolean;
  getAssignedEquipmentCodes: () => string[];
  addAssignedEquipment: (equipmentCode: string) => void;
  removeAssignedEquipment: (equipmentCode: string) => void;
}

export const assignedEquipmentService: AssignedEquipmentService = {
  /**
   * Check if an equipment code is assigned to the current user
   * @param equipmentCode - The equipment code to check
   * @returns true if assigned, false otherwise
   */
  isEquipmentAssigned: (equipmentCode: string): boolean => {
    return ASSIGNED_EQUIPMENT_CODES.includes(equipmentCode);
  },

  /**
   * Get all assigned equipment codes for the current user
   * @returns Array of assigned equipment codes
   */
  getAssignedEquipmentCodes: (): string[] => {
    return [...ASSIGNED_EQUIPMENT_CODES];
  },

  /**
   * Add equipment to the user's assigned list (for demo/testing)
   * @param equipmentCode - The equipment code to add
   */
  addAssignedEquipment: (equipmentCode: string): void => {
    if (!ASSIGNED_EQUIPMENT_CODES.includes(equipmentCode)) {
      ASSIGNED_EQUIPMENT_CODES.push(equipmentCode);
    }
  },

  /**
   * Remove equipment from the user's assigned list (for demo/testing)
   * @param equipmentCode - The equipment code to remove
   */
  removeAssignedEquipment: (equipmentCode: string): void => {
    const index = ASSIGNED_EQUIPMENT_CODES.indexOf(equipmentCode);
    if (index > -1) {
      ASSIGNED_EQUIPMENT_CODES.splice(index, 1);
    }
  },
};

/**
 * Demo Notes:
 *
 * Currently Assigned Equipment (for demo):
 * - EQ-001 (HVAC Unit) - ✅ Will show success
 * - EQ-003 (Emergency Generator) - ✅ Will show success
 * - EQ-004 (Elevator) - ✅ Will show success
 *
 * Not Assigned:
 * - EQ-002 (Chiller Unit) - ❌ Will show warning
 * - EQ-005 (Fire Pump) - ❌ Will show warning
 * - EQ-006 (Boiler) - ❌ Will show warning
 *
 * In a production app, this would:
 * 1. Fetch from user profile API
 * 2. Sync with backend on login
 * 3. Update based on work order assignments
 */
