export interface RadarTrack {
  id: string;
  callsign: string;
  type: string;
  position: {
    x: number;
    y: number;
    range: number;
    bearing: number;
    elevation: number;
  };
  vector: {
    dx: number;
    dy: number;
    speed: number;
    heading: number;
  };
  radarData: {
    primaryReturn: boolean;
    secondaryReturn: boolean;
    signalStrength: number;
    rcs: number;
    squawk: string;
    mode: string;
    iff: string;
    doppler: number;
    snr: number;
  };
  classification: string;
  trackQuality: string;
  lastDetection: string;
  radarSource: string[];
}

export interface RadarSystem {
  id: string;
  type: string;
  status: string;
  power: number;
  range: number;
  bearing: string;
  elevation: number;
}

export interface RadarPerformance {
  detectionRate: number;
  falseAlarmRate: number;
  trackingAccuracy: number;
  rangeAccuracy: number;
  bearingAccuracy: number;
  elevationAccuracy: number;
  weatherClutter: string;
  groundClutter: string;
  jamming: string;
}
