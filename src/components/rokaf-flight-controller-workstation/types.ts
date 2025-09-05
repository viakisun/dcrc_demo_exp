export type AircraftStatus = 'EMERGENCY' | 'VECTORING' | 'CLIMBING' | 'TRAINING';

export interface Aircraft {
  id: string;
  callsign: string;
  type: string;
  position: { x: number; y: number };
  vector: { dx: number; dy: number };
  flightPlan: {
    departure: string;
    destination: string;
    route: string;
    currentWaypoint: string;
    nextWaypoint: string;
    eta: string;
    fuel: number;
  };
  navigation: {
    currentAlt: number;
    assignedAlt: number;
    currentHdg: number;
    assignedHdg: number;
    currentSpd: number;
    assignedSpd: number;
    verticalRate: number;
    turnRate: number;
  };
  communications: {
    frequency: string;
    lastContact: string;
    contactQuality: string;
    responseTime: string;
    pilot: string;
  };
  status: AircraftStatus;
  clearanceLevel: string;
  priority: string;
  separation: {
    nearest: string;
    distance: number;
    verticalSep: number;
    conflictLevel: string;
  };
}

export interface Airway {
  id: string;
  type: 'AIRWAY';
  path: { x: number; y: number }[];
  color: string;
}

export interface Waypoint {
  id: string;
  type: 'WAYPOINT';
  position: { x: number; y: number };
  name: string;
}

export interface WeatherData {
  position: { x: number; y: number };
  type: 'TURBULENCE' | 'PRECIPITATION' | 'WIND_SHEAR';
  severity: 'LIGHT' | 'MODERATE' | 'SEVERE';
  alt: string;
}

export interface CommLogEntry {
  time: Date;
  from: string;
  message: string;
  frequency: string;
  response: 'PENDING' | 'ROGER' | 'WILCO' | 'CLEARED' | 'STANDBY';
}
