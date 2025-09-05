import { GridSector, Track } from './types';

export const gridSectors: GridSector[] = [
    { id: 'JE-08', controller: 'MAJ Lee S.K.', tracks: 15, threat: 'LOW', color: 'green' },
    { id: 'JE-12', controller: 'CPT Park J.H.', tracks: 23, threat: 'LOW', color: 'green' },
    { id: 'JE-16', controller: 'LT Kim M.J.', tracks: 8, threat: 'LOW', color: 'green' },
    { id: 'KE-08', controller: 'CPT Choi D.H.', tracks: 31, threat: 'MEDIUM', color: 'yellow' },
    { id: 'KE-12', controller: 'MAJ Jung H.W.', tracks: 18, threat: 'HIGH', color: 'red' },
    { id: 'KE-16', controller: 'CPT Park M.S.', tracks: 8, threat: 'LOW', color: 'green' },
    { id: 'LE-08', controller: 'LT Song K.Y.', tracks: 12, threat: 'LOW', color: 'green' },
    { id: 'LE-12', controller: 'CPT Kim J.H.', tracks: 27, threat: 'MEDIUM', color: 'yellow' },
    { id: 'LE-16', controller: 'MAJ Lee D.S.', tracks: 14, threat: 'LOW', color: 'green' }
];

export const activeTracks: Track[] = [
    {
      id: 'KAF001',
      callsign: 'ROKAF-001',
      type: 'F-35A',
      mission: 'CAP',
      position: { x: 420, y: 180 },
      vector: { dx: -12, dy: 8 },
      speed: 450,
      altitude: 25000,
      status: 'FRIENDLY',
      controller: 'KE-12'
    },
    {
      id: 'KAF002',
      callsign: 'ROKAF-002',
      type: 'KAI-Surion',
      mission: 'SAR',
      position: { x: 380, y: 220 },
      vector: { dx: 6, dy: -4 },
      speed: 180,
      altitude: 3000,
      status: 'FRIENDLY',
      controller: 'KE-08'
    },
    {
      id: 'UNK001',
      callsign: 'UNKNOWN',
      type: '?',
      mission: '?',
      position: { x: 320, y: 160 },
      vector: { dx: 15, dy: 10 },
      speed: 520,
      altitude: 28000,
      status: 'UNKNOWN',
      controller: 'JE-16'
    },
    {
      id: 'CIV001',
      callsign: 'KAL-123',
      type: 'B777',
      mission: 'CIVIL',
      position: { x: 450, y: 250 },
      vector: { dx: -8, dy: 2 },
      speed: 480,
      altitude: 35000,
      status: 'FRIENDLY',
      controller: 'KE-16'
    },
    {
      id: 'DRONE001',
      callsign: 'HAWK-01',
      type: 'MQ-9',
      mission: 'ISR',
      position: { x: 340, y: 200 },
      vector: { dx: 3, dy: -2 },
      speed: 120,
      altitude: 18000,
      status: 'FRIENDLY',
      controller: 'JE-12'
    },
    {
      id: 'THREAT001',
      callsign: 'UNKNOWN',
      type: 'J-20?',
      mission: '?',
      position: { x: 280, y: 180 },
      vector: { dx: 18, dy: 12 },
      speed: 580,
      altitude: 32000,
      status: 'POTENTIAL_THREAT',
      controller: 'JE-08'
    }
];
