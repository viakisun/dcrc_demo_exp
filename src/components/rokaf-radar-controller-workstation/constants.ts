import { RadarSystem, RadarTrack, RadarPerformance } from './types';

export const radarSystems: RadarSystem[] = [
    { id: 'AN/FPS-117', type: 'LONG RANGE', status: 'ONLINE', power: 95, range: 250, bearing: 'ALL', elevation: 45 },
    { id: 'AN/TPS-43G', type: 'MEDIUM RANGE', status: 'ONLINE', power: 88, range: 150, bearing: '045-225', elevation: 30 },
    { id: 'AN/MPQ-64F', type: 'SHORT RANGE', status: 'ACTIVE', power: 92, range: 75, bearing: 'SECTOR', elevation: 25 },
    { id: 'SECONDARY RADAR', type: 'IFF/SSR', status: 'ONLINE', power: 97, range: 200, bearing: 'ALL', elevation: 90 }
];

export const radarTracks: RadarTrack[] = [
    {
      id: 'TRK-001',
      callsign: 'VIPER-03',
      type: 'F-16C',
      position: { x: 280, y: 180, range: 85, bearing: 78, elevation: 25000 },
      vector: { dx: -12, dy: 8, speed: 420, heading: 78 },
      radarData: {
        primaryReturn: true,
        secondaryReturn: true,
        signalStrength: 95,
        rcs: 2.3,
        squawk: '7701',
        mode: 'MODE-S',
        iff: 'FRIENDLY',
        doppler: 420,
        snr: 45.2
      },
      classification: 'CONFIRMED_FRIENDLY',
      trackQuality: 'HIGH',
      lastDetection: 'CONTINUOUS',
      radarSource: ['AN/FPS-117', 'AN/TPS-43G']
    },
    {
      id: 'TRK-002',
      callsign: 'UNKNOWN',
      type: 'FAST MOVER',
      position: { x: 180, y: 220, range: 125, bearing: 135, elevation: 32000 },
      vector: { dx: 18, dy: 12, speed: 540, heading: 45 },
      radarData: {
        primaryReturn: true,
        secondaryReturn: false,
        signalStrength: 67,
        rcs: 0.8,
        squawk: 'NO REPLY',
        mode: 'NO MODE',
        iff: 'NO_IFF',
        doppler: 540,
        snr: 28.1
      },
      classification: 'UNKNOWN_MILITARY',
      trackQuality: 'MEDIUM',
      lastDetection: 'INTERMITTENT',
      radarSource: ['AN/FPS-117']
    },
    {
      id: 'TRK-003',
      callsign: 'CARGO-12',
      type: 'C-130J',
      position: { x: 320, y: 160, range: 65, bearing: 315, elevation: 15000 },
      vector: { dx: 8, dy: -6, speed: 280, heading: 125 },
      radarData: {
        primaryReturn: true,
        secondaryReturn: true,
        signalStrength: 88,
        rcs: 15.2,
        squawk: '7702',
        mode: 'MODE-C',
        iff: 'FRIENDLY',
        doppler: 280,
        snr: 38.7
      },
      classification: 'CONFIRMED_TRANSPORT',
      trackQuality: 'HIGH',
      lastDetection: 'CONTINUOUS',
      radarSource: ['AN/FPS-117', 'AN/TPS-43G', 'AN/MPQ-64F']
    },
    {
      id: 'TRK-004',
      callsign: 'STEALTH-X',
      type: 'LOW OBSERVABLE',
      position: { x: 200, y: 120, range: 145, bearing: 25, elevation: 35000 },
      vector: { dx: 15, dy: 20, speed: 480, heading: 65 },
      radarData: {
        primaryReturn: false,
        secondaryReturn: false,
        signalStrength: 23,
        rcs: 0.001,
        squawk: 'NO REPLY',
        mode: 'STEALTH',
        iff: 'NO_IFF',
        doppler: 480,
        snr: 12.3
      },
      classification: 'POTENTIAL_STEALTH',
      trackQuality: 'LOW',
      lastDetection: 'SPORADIC',
      radarSource: ['AN/FPS-117']
    },
    {
      id: 'TRK-005',
      callsign: 'RESCUE-07',
      type: 'UH-60',
      position: { x: 240, y: 280, range: 45, bearing: 225, elevation: 2000 },
      vector: { dx: -4, dy: -8, speed: 140, heading: 275 },
      radarData: {
        primaryReturn: true,
        secondaryReturn: true,
        signalStrength: 72,
        rcs: 8.5,
        squawk: '7703',
        mode: 'MODE-A',
        iff: 'FRIENDLY',
        doppler: 140,
        snr: 32.1
      },
      classification: 'CONFIRMED_HELICOPTER',
      trackQuality: 'MEDIUM',
      lastDetection: 'CONTINUOUS',
      radarSource: ['AN/TPS-43G', 'AN/MPQ-64F']
    }
];

export const radarPerformance: RadarPerformance = {
    detectionRate: 94.7,
    falseAlarmRate: 0.12,
    trackingAccuracy: 98.3,
    rangeAccuracy: 15,
    bearingAccuracy: 0.2,
    elevationAccuracy: 0.5,
    weatherClutter: 'LIGHT',
    groundClutter: 'MODERATE',
    jamming: 'NONE_DETECTED'
};
