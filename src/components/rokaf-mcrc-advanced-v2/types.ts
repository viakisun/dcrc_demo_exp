export type TrackStatus = 'FRIENDLY' | 'UNKNOWN' | 'HOSTILE';
export type ThreatStatus = 'HIGH' | 'MEDIUM' | 'LOW';

export interface Track {
  id: string;
  callsign: string;
  type: string;
  mission: string;
  position: { x: number; y: number };
  vector: { dx: number; dy: number };
  speed: number;
  altitude: number;
  status: TrackStatus;
  controller: string;
  fuel?: number | string;
  weapons?: string;
  pilot?: string;
  eta?: string;
}

export interface GroundThreat {
  id: string;
  type: string;
  position: { x: number; y: number };
  range: number;
  status: string;
  threat: ThreatStatus;
}

export interface GridSector {
  id: string;
  controller: string;
  tracks: number;
  threat: string;
  activity: string;
  color: string;
}
