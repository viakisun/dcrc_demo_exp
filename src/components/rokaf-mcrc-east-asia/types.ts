export type TrackStatus = 'FRIENDLY' | 'UNKNOWN' | 'POTENTIAL_THREAT';

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
}

export interface GridSector {
  id: string;
  controller: string;
  tracks: number;
  threat: string;
  color: string;
}
