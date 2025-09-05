import { Aircraft, Airway, Waypoint, WeatherData, CommLogEntry } from './types';

export const controlledAircraft: Aircraft[] = [
    {
      id: 'FC-001',
      callsign: 'VIPER-03',
      type: 'F-16C',
      position: { x: 280, y: 200 },
      vector: { dx: -8, dy: 6 },
      flightPlan: {
        departure: 'RKJK',
        destination: 'RKSS',
        route: 'ALPHA-1 → BRAVO-2 → CHARLIE-3',
        currentWaypoint: 'BRAVO-2',
        nextWaypoint: 'CHARLIE-3',
        eta: '14:45Z',
        fuel: 72
      },
      navigation: {
        currentAlt: 25000,
        assignedAlt: 25000,
        currentHdg: 78,
        assignedHdg: 85,
        currentSpd: 420,
        assignedSpd: 420,
        verticalRate: 0,
        turnRate: 0
      },
      communications: {
        frequency: '251.75',
        lastContact: '30 sec ago',
        contactQuality: 'CLEAR',
        responseTime: 'IMMEDIATE',
        pilot: 'CPT Kim D.W.'
      },
      status: 'VECTORING',
      clearanceLevel: 'CLEARED_DIRECT',
      priority: 'ROUTINE',
      separation: {
        nearest: 'CARGO-12',
        distance: 12.5,
        verticalSep: 10000,
        conflictLevel: 'NONE'
      }
    },
    {
      id: 'FC-002',
      callsign: 'CARGO-12',
      type: 'C-130J',
      position: { x: 320, y: 160 },
      vector: { dx: 8, dy: -6 },
      flightPlan: {
        departure: 'RKSO',
        destination: 'RKJB',
        route: 'DELTA-4 → ECHO-5 → FOXTROT-6',
        currentWaypoint: 'ECHO-5',
        nextWaypoint: 'FOXTROT-6',
        eta: '15:20Z',
        fuel: 85
      },
      navigation: {
        currentAlt: 15000,
        assignedAlt: 18000,
        currentHdg: 125,
        assignedHdg: 125,
        currentSpd: 280,
        assignedSpd: 280,
        verticalRate: 800,
        turnRate: 0
      },
      communications: {
        frequency: '243.00',
        lastContact: '45 sec ago',
        contactQuality: 'CLEAR',
        responseTime: 'NORMAL',
        pilot: 'MAJ Lee S.H.'
      },
      status: 'CLIMBING',
      clearanceLevel: 'CLIMB_MAINTAIN',
      priority: 'ROUTINE',
      separation: {
        nearest: 'VIPER-03',
        distance: 12.5,
        verticalSep: 10000,
        conflictLevel: 'NONE'
      }
    },
    {
      id: 'FC-003',
      callsign: 'RESCUE-07',
      type: 'UH-60',
      position: { x: 240, y: 280 },
      vector: { dx: -2, dy: -8 },
      flightPlan: {
        departure: 'MEDICAL',
        destination: 'HOSPITAL',
        route: 'DIRECT ROUTING',
        currentWaypoint: 'HOSPITAL',
        nextWaypoint: 'HOSPITAL',
        eta: '14:30Z',
        fuel: 65
      },
      navigation: {
        currentAlt: 2000,
        assignedAlt: 2000,
        currentHdg: 275,
        assignedHdg: 275,
        currentSpd: 140,
        assignedSpd: 140,
        verticalRate: 0,
        turnRate: -2
      },
      communications: {
        frequency: '255.40',
        lastContact: '15 sec ago',
        contactQuality: 'CLEAR',
        responseTime: 'IMMEDIATE',
        pilot: 'CPT Yoon H.J.'
      },
      status: 'EMERGENCY',
      clearanceLevel: 'PRIORITY_DIRECT',
      priority: 'EMERGENCY',
      separation: {
        nearest: 'CIVILIAN-01',
        distance: 8.2,
        verticalSep: 3000,
        conflictLevel: 'MONITOR'
      }
    },
    {
      id: 'FC-004',
      callsign: 'HAWK-15',
      type: 'KAI-Surion',
      position: { x: 200, y: 240 },
      vector: { dx: 12, dy: -4 },
      flightPlan: {
        departure: 'RKJK',
        destination: 'TRAINING',
        route: 'TRAINING AREA ALPHA',
        currentWaypoint: 'TRAINING',
        nextWaypoint: 'RETURN',
        eta: '16:00Z',
        fuel: 78
      },
      navigation: {
        currentAlt: 8000,
        assignedAlt: 10000,
        currentHdg: 310,
        assignedHdg: 320,
        currentSpd: 160,
        assignedSpd: 160,
        verticalRate: 500,
        turnRate: 1
      },
      communications: {
        frequency: '279.15',
        lastContact: '25 sec ago',
        contactQuality: 'READABLE',
        responseTime: 'NORMAL',
        pilot: 'CPT Lim J.S.'
      },
      status: 'TRAINING',
      clearanceLevel: 'CLEARED_AREA',
      priority: 'LOW',
      separation: {
        nearest: 'RESCUE-07',
        distance: 6.8,
        verticalSep: 6000,
        conflictLevel: 'NONE'
      }
    }
];

export const airwaysAndWaypoints: (Airway | Waypoint)[] = [
  { id: 'ALPHA-1', type: 'AIRWAY', path: [{x: 100, y: 150}, {x: 200, y: 160}, {x: 300, y: 170}], color: '#60a5fa' },
  { id: 'BRAVO-2', type: 'WAYPOINT', position: {x: 200, y: 160}, name: 'BRAVO-2' },
  { id: 'CHARLIE-3', type: 'WAYPOINT', position: {x: 300, y: 170}, name: 'CHARLIE-3' },
  { id: 'DELTA-4', type: 'AIRWAY', path: [{x: 150, y: 200}, {x: 250, y: 180}, {x: 350, y: 160}], color: '#34d399' },
  { id: 'ECHO-5', type: 'WAYPOINT', position: {x: 250, y: 180}, name: 'ECHO-5' },
  { id: 'FOXTROT-6', type: 'WAYPOINT', position: {x: 350, y: 160}, name: 'FOXTROT-6' }
];

export const weatherData: WeatherData[] = [
  { position: {x: 180, y: 120}, type: 'TURBULENCE', severity: 'MODERATE', alt: 'FL250-350' },
  { position: {x: 320, y: 220}, type: 'PRECIPITATION', severity: 'LIGHT', alt: 'SFC-FL100' },
  { position: {x: 260, y: 160}, type: 'WIND_SHEAR', severity: 'LIGHT', alt: 'FL180-220' }
];

export const commLog: CommLogEntry[] = [
  { time: new Date(), from: 'VIPER-03', message: 'Request vector direct CHARLIE-3', frequency: '251.75', response: 'PENDING' },
  { time: new Date(Date.now() - 30000), from: 'FC', message: 'CARGO-12, climb and maintain FL180', frequency: '243.00', response: 'ROGER' },
  { time: new Date(Date.now() - 60000), from: 'RESCUE-07', message: 'Emergency direct to hospital, souls on board 3', frequency: '255.40', response: 'CLEARED' },
  { time: new Date(Date.now() - 90000), from: 'FC', message: 'HAWK-15, turn right heading 320, climb FL100', frequency: '279.15', response: 'WILCO' }
];
