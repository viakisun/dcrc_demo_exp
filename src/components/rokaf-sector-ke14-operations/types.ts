export type OperatorStatus = 'ACTIVE' | 'STANDBY' | 'OFFLINE';
export type Workload = 'HIGH' | 'MODERATE' | 'LOW' | 'NORMAL';
export type TrackStatus = 'FRIENDLY' | 'UNKNOWN' | 'HOSTILE';

export interface Operator {
  id: string;
  role: string;
  operator: string;
  station: string;
  responsibility: string;
  status: OperatorStatus;
  workload: Workload;
  commChannels: string[];
}

export interface SectorTrack {
  id: string;
  callsign: string;
  type: string;
  position: { x: number; y: number };
  vector: { dx: number; dy: number };
  altitude: number;
  speed: number;
  heading: number;
  status: TrackStatus;
  mission: string;
  fuel: number | string;
  controller: string;
  pilot: string;
  commsFreq: string;
  squawk: string;
  lastContact: string;
}

export interface CommLogEntry {
  time: Date;
  from: string;
  to: string;
  message: string;
  priority: 'ROUTINE' | 'PRIORITY' | 'URGENT';
  channel: string;
}
