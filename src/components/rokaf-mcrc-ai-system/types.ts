export interface Track {
  id: string;
  callsign: string;
  type: string;
  mission: string;
  position: { x: number; y: number };
  vector: { dx: number; dy: number };
  speed: number;
  altitude: number;
  status: 'FRIENDLY' | 'UNKNOWN' | 'HOSTILE';
  controller: string;
  fuel: number | string;
  weapons: string;
  pilot: string;
  eta: string;
  aiClassification: string;
  aiConfidence: number;
  predictedPath: string;
  threatLevel: number;
  aiRecommendation: string;
}

export interface AISystem {
  status: 'ACTIVE' | 'LEARNING' | 'STANDBY';
  confidence: number;
  lastUpdate: string;
}

export interface AIAlert {
  id: number;
  type: 'THREAT' | 'PATTERN' | 'PREDICTION' | 'ANOMALY';
  message: string;
  confidence: number;
  time: Date;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface GridSector {
  id: string;
  controller: string;
  tracks: number;
  threat: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  activity: string;
  aiRisk: number;
  predictedThreat: 'STABLE' | 'ESCALATING' | 'CRITICAL' | 'IMMINENT' | 'MONITORING';
}
