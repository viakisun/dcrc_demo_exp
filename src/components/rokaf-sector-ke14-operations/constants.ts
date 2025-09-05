import { Operator, SectorTrack, CommLogEntry } from './types';

export const operatorStations: Operator[] = [
    {
      id: 'OPS-01',
      role: 'SECTOR COMMANDER',
      operator: 'CPT Park M.S.',
      station: 'COMMAND CONSOLE',
      responsibility: 'Overall Sector Control',
      status: 'ACTIVE',
      workload: 'MODERATE',
      commChannels: ['COMMAND', 'INTER-SECTOR', 'EMERGENCY']
    },
    {
      id: 'OPS-02',
      role: 'RADAR CONTROLLER',
      operator: 'LT Kim J.W.',
      station: 'RADAR SCOPE A',
      responsibility: 'Primary Radar Monitoring',
      status: 'ACTIVE',
      workload: 'HIGH',
      commChannels: ['RADAR-NET', 'PILOT-COMMS', 'TRACKER']
    },
    {
      id: 'OPS-03',
      role: 'FLIGHT CONTROLLER',
      operator: 'SrA Lee H.S.',
      station: 'FLIGHT CONTROL',
      responsibility: 'Aircraft Vectoring',
      status: 'ACTIVE',
      workload: 'HIGH',
      commChannels: ['AIR-GROUND', 'APPROACH', 'TOWER']
    },
    {
      id: 'OPS-04',
      role: 'DATA ANALYST',
      operator: 'SSG Choi M.K.',
      station: 'DATA TERMINAL',
      responsibility: 'Threat Analysis & Intel',
      status: 'ACTIVE',
      workload: 'MODERATE',
      commChannels: ['INTEL-NET', 'DATA-LINK', 'FUSION']
    },
    {
      id: 'OPS-05',
      role: 'COMM COORDINATOR',
      operator: 'SrA Jung D.H.',
      station: 'COMMS CONSOLE',
      responsibility: 'Communications Management',
      status: 'ACTIVE',
      workload: 'MODERATE',
      commChannels: ['ALL-NETS', 'SATCOM', 'CRYPTO']
    },
    {
      id: 'OPS-06',
      role: 'BACKUP CONTROLLER',
      operator: 'A1C Park S.J.',
      station: 'BACKUP STATION',
      responsibility: 'Standby & Support',
      status: 'STANDBY',
      workload: 'LOW',
      commChannels: ['BACKUP-NET', 'TRAINING']
    }
];

export const sectorTracks: SectorTrack[] = [
    {
      id: 'KE14-001',
      callsign: 'VIPER-03',
      type: 'F-16C',
      position: { x: 180, y: 220 },
      vector: { dx: -5, dy: 8 },
      altitude: 25000,
      speed: 420,
      heading: 78,
      status: 'FRIENDLY',
      mission: 'CAP',
      fuel: 72,
      controller: 'OPS-03',
      pilot: 'CPT Kim D.W.',
      commsFreq: '251.75',
      squawk: '7701',
      lastContact: '30 sec ago'
    },
    {
      id: 'KE14-002',
      callsign: 'CARGO-12',
      type: 'C-130J',
      position: { x: 220, y: 180 },
      vector: { dx: 12, dy: -3 },
      altitude: 15000,
      speed: 280,
      heading: 125,
      status: 'FRIENDLY',
      mission: 'TRANSPORT',
      fuel: 85,
      controller: 'OPS-02',
      pilot: 'MAJ Lee S.H.',
      commsFreq: '243.00',
      squawk: '7702',
      lastContact: '45 sec ago'
    },
    {
      id: 'KE14-003',
      callsign: 'UNKNOWN',
      type: '?',
      position: { x: 160, y: 160 },
      vector: { dx: 18, dy: 12 },
      altitude: 32000,
      speed: 540,
      heading: 45,
      status: 'UNKNOWN',
      mission: '?',
      fuel: '?',
      controller: 'OPS-04',
      pilot: '?',
      commsFreq: 'NO RESPONSE',
      squawk: '7600',
      lastContact: 'NO CONTACT'
    },
];

export const commLog: CommLogEntry[] = [
    { time: new Date(), from: 'VIPER-03', to: 'OPS-03', message: 'Request vector to target area Alpha', priority: 'ROUTINE', channel: 'AIR-GROUND' },
    { time: new Date(Date.now() - 30000), from: 'OPS-04', to: 'INTEL-NET', message: 'Unknown track classification request - Squawk 7600', priority: 'PRIORITY', channel: 'DATA-LINK' },
    { time: new Date(Date.now() - 60000), from: 'CARGO-12', to: 'OPS-02', message: 'Requesting flight level change to FL200 due weather', priority: 'ROUTINE', channel: 'AIR-GROUND' },
    { time: new Date(Date.now() - 90000), from: 'OPS-01', to: 'MCRC', message: 'KE-14 sector status normal, 5 active tracks', priority: 'ROUTINE', channel: 'COMMAND' },
    { time: new Date(Date.now() - 120000), from: 'RESCUE-07', to: 'OPS-03', message: 'Medical emergency, requesting priority handling', priority: 'URGENT', channel: 'SAR-COORD' }
];
