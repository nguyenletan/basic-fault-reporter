export type Priority = 'Critical' | 'High' | 'Routine' | 'Medium' | 'Low';

export type Status = 'New' | 'In Progress' | 'Completed' | 'Waiting AI';

export interface WorkOrder {
  id: number;
  code: string;
  title: string;
  location: string;
  priority: Priority;
  status: Status;
}

export interface Alert {
  id: number;
  code: string;
  title: string;
  location: string;
  priority: Priority;
  status: Status;
  buildingName: string;
  buildingAddress: string;
  plantSystemName: string;
  subSystemDetails: string;
  dueDate?: string;
  equipmentId: string;
}

export interface EquipmentLocation {
  id: string;
  equipmentCode: string;
  equipmentName: string;
  buildingName: string;
  buildingAddress: string;
  floor: string;
  room: string;
  zone?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  accessInstructions?: string;
  nearbyLandmarks?: string[];
  safetyNotes?: string[];
}

export interface EquipmentDetail {
  id: string;
  equipmentCode: string;
  equipmentName: string;
  location: string;
  status: 'ONLINE' | 'OFFLINE' | 'MAINTENANCE' | 'ERROR';
  lastRefresh: string;
  buildingImage?: string | null;
  equipmentImage?: string | null;
  specifications: {
    asset: string;
    installation: string;
    capacity: string;
    model: string;
    manufacturer: string;
    serialNumber: string;
    plantRM: string;
    commissioned: string;
    initialValue: string;
    location: string;
    age: string;
    expectedLifespan: string;
    description: string;
    warrantyExpiry: {
      date: string;
      status: 'good' | 'warning' | 'critical';
    };
  };
  quickHealthStatus: {
    lastService: {
      date: string;
      status: 'good' | 'warning' | 'critical';
    };
    operatingHours: {
      hours: number;
      status: 'good' | 'warning' | 'critical';
    };

    pressure: {
      value: string;
      status: 'good' | 'warning' | 'critical';
      trend: 'up' | 'down' | 'stable';
    };
  };
  iotLiveData: {
    temperature: {
      value: string;
      status: 'good' | 'warning' | 'critical';
      trend: 'up' | 'down' | 'stable';
    };
    energyUse: {
      value: string;
      status: 'good' | 'warning' | 'critical';
      trend: 'up' | 'down' | 'stable';
    };
    flowRate: {
      value: string;
      status: 'good' | 'warning' | 'critical';
      trend: 'up' | 'down' | 'stable';
    };
    pressure: {
      value: string;
      status: 'good' | 'warning' | 'critical';
      trend: 'up' | 'down' | 'stable';
    };
  };
  recentWorkOrders: {
    code: string;
    title: string;
    status: 'Complete' | 'Completed' | 'Checked Data';
    date: string;
  }[];
  technicalDiagrams?: {
    id: string;
    title: string;
    description?: string;
    imageUrl: string;
    type: 'schematic' | 'wiring' | 'plumbing' | 'electrical' | 'general';
    uploadDate?: string;
  }[];
  energyConsumption?: {
    chartImage?: string;
    breakdown: {
      equipmentGroup: number;
      subSystem: number;
      building: number;
    };
    totalConsumption: string;
    period: string;
  };
  annualEnergyConsumption?: {
    data: {
      year: number;
      quarters: {
        q1: number;
        q2: number;
        q3: number;
        q4: number;
      };
    }[];
  };
  assetReliability?: {
    data: {
      year: number;
      quarters: {
        q1: { maintenance: number; parts: number; energy: number };
        q2: { maintenance: number; parts: number; energy: number };
        q3: { maintenance: number; parts: number; energy: number };
        q4: { maintenance: number; parts: number; energy: number };
      };
    }[];
  };
  reliability?: {
    data: {
      year: number;
      quarters: {
        q1: { mtbf: number; mttr: number };
        q2: { mtbf: number; mttr: number };
        q3: { mtbf: number; mttr: number };
        q4: { mtbf: number; mttr: number };
      };
    }[];
  };
}
