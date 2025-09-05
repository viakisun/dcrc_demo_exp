import { CommChannel, SystemStatus, CommActivity, CommStats } from './types';

export const commChannels: CommChannel[] = [
    {
      id: 'CH-01', frequency: '251.75', name: 'PRIMARY AIR-GROUND', type: 'UHF',
      status: 'ACTIVE', encryption: 'AES-256', users: ['VIPER-03', 'CARGO-12', 'FC'],
      traffic: 'HIGH', quality: 98, power: 85, range: 150, jamming: false, priority: 'CRITICAL'
    },
    {
      id: 'CH-02', frequency: '243.00', name: 'SECONDARY AIR-GROUND', type: 'UHF',
      status: 'ACTIVE', encryption: 'AES-256', users: ['CARGO-12', 'FC'],
      traffic: 'MEDIUM', quality: 95, power: 78, range: 120, jamming: false, priority: 'HIGH'
    },
    {
      id: 'CH-03', frequency: '255.40', name: 'SAR COORDINATION', type: 'UHF',
      status: 'EMERGENCY', encryption: 'CLEAR', users: ['RESCUE-07', 'HOSPITAL'],
      traffic: 'URGENT', quality: 92, power: 90, range: 180, jamming: false, priority: 'EMERGENCY'
    },
    {
      id: 'CH-04', frequency: '311.00', name: 'COMMAND NET', type: 'VHF',
      status: 'SECURE', encryption: 'AES-256', users: ['SECTOR CMD', 'MCRC'],
      traffic: 'LOW', quality: 99, power: 95, range: 200, jamming: false, priority: 'CRITICAL'
    },
    {
      id: 'CH-05', frequency: '387.90', name: 'SATCOM-1', type: 'SATCOM',
      status: 'ONLINE', encryption: 'TRANSEC', users: ['GLOBAL NET'],
      traffic: 'MEDIUM', quality: 89, power: 82, range: 999, jamming: false, priority: 'HIGH'
    },
    {
      id: 'CH-06', frequency: '121.50', name: 'EMERGENCY', type: 'VHF',
      status: 'MONITOR', encryption: 'NONE', users: ['ALL CIVIL'],
      traffic: 'LOW', quality: 85, power: 75, range: 100, jamming: false, priority: 'EMERGENCY'
    },
    {
      id: 'CH-07', frequency: '279.15', name: 'MEDEVAC', type: 'UHF',
      status: 'ACTIVE', encryption: 'BASIC', users: ['HAWK-15', 'MEDICAL'],
      traffic: 'URGENT', quality: 94, power: 88, range: 160, jamming: false, priority: 'EMERGENCY'
    },
    {
      id: 'CH-08', frequency: '142.37', name: 'APPROACH CONTROL', type: 'VHF',
      status: 'BUSY', encryption: 'NONE', users: ['RKJK TWR', 'CIVIL AC'],
      traffic: 'HIGH', quality: 91, power: 77, range: 80, jamming: false, priority: 'ROUTINE'
    },
    {
      id: 'CH-09', frequency: '357.80', name: 'INTEL-NET', type: 'UHF',
      status: 'CLASSIFIED', encryption: 'TOP SECRET', users: ['ANALYST'],
      traffic: 'LOW', quality: 97, power: 93, range: 120, jamming: false, priority: 'CLASSIFIED'
    },
    {
      id: 'CH-10', frequency: '415.25', name: 'LINK-16', type: 'DATALINK',
      status: 'DATA-ONLY', encryption: 'LINK-16', users: ['NATO UNITS'],
      traffic: 'DATA', quality: 96, power: 91, range: 300, jamming: false, priority: 'HIGH'
    },
    {
      id: 'CH-11', frequency: '225.10', name: 'BACKUP PRIMARY', type: 'UHF',
      status: 'STANDBY', encryption: 'AES-256', users: ['STANDBY'],
      traffic: 'NONE', quality: 100, power: 85, range: 150, jamming: false, priority: 'BACKUP'
    },
    {
      id: 'CH-12', frequency: '338.15', name: 'HAVEQUICK', type: 'ANTI-JAM',
      status: 'HOP-MODE', encryption: 'HAVEQUICK', users: ['VIPER-03'],
      traffic: 'SECURE', quality: 93, power: 87, range: 120, jamming: true, priority: 'CRITICAL'
    },
    {
      id: 'CH-13', frequency: '290.60', name: 'GROUND OPS', type: 'UHF',
      status: 'LOCAL', encryption: 'BASIC', users: ['GROUND CREW'],
      traffic: 'ROUTINE', quality: 88, power: 65, range: 25, jamming: false, priority: 'ROUTINE'
    },
    {
      id: 'CH-14', frequency: '395.55', name: 'WEATHER NET', type: 'UHF',
      status: 'AUTO', encryption: 'NONE', users: ['WEATHER STN'],
      traffic: 'DATA', quality: 90, power: 70, range: 200, jamming: false, priority: 'ROUTINE'
    },
    {
      id: 'CH-15', frequency: '444.20', name: 'RELAY-1', type: 'REPEATER',
      status: 'RELAY', encryption: 'VARIABLE', users: ['REMOTE UNITS'],
      traffic: 'MEDIUM', quality: 92, power: 95, range: 400, jamming: false, priority: 'HIGH'
    }
];

export const systemStatus: SystemStatus[] = [
    { name: 'Main Transmitter', status: 'ONLINE', power: 92, temp: 68, load: 'NORMAL' },
    { name: 'Backup Transmitter', status: 'STANDBY', power: 85, temp: 45, load: 'STANDBY' },
    { name: 'Encryption Module', status: 'SECURE', power: 0, temp: 0, load: 67 },
    { name: 'Antenna System', status: 'OPTIMAL', power: 0, temp: 0, load: 'VSWR 1.2:1' },
    { name: 'Power Supply', status: 'STABLE', power: 0, temp: 0, load: '28.4V 15.8A' },
    { name: 'Cooling System', status: 'NORMAL', power: 0, temp: 22, load: '45% RH' }
];

export const commActivity: CommActivity[] = [
    { time: '14:25:43', channel: '251.75', type: 'VOICE', from: 'VIPER-03', to: 'FC', priority: 'ROUTINE', duration: '0:12', content: 'Request vector to waypoint ALPHA' },
    { time: '14:25:31', channel: '255.40', type: 'VOICE', from: 'RESCUE-07', to: 'HOSPITAL', priority: 'URGENT', duration: '0:28', content: 'MEDEVAC inbound ETA 8 minutes' },
    { time: '14:25:18', channel: '311.00', type: 'DATA', from: 'MCRC', to: 'SECTOR CMD', priority: 'HIGH', duration: '0:03', content: 'Threat level update GREEN->YELLOW' },
    { time: '14:25:05', channel: '279.15', type: 'VOICE', from: 'HAWK-15', to: 'MEDICAL', priority: 'EMERGENCY', duration: '0:15', content: 'Patient status critical - need priority' },
    { time: '14:24:52', channel: '243.00', type: 'VOICE', from: 'CARGO-12', to: 'FC', priority: 'ROUTINE', duration: '0:08', content: 'Requesting descent to FL180' },
    { time: '14:24:39', channel: '387.90', type: 'DATA', from: 'SATCOM', to: 'ALL', priority: 'HIGH', duration: '0:01', content: 'Weather update - storm system approaching' }
];

export const commStats: CommStats = {
    totalMessages: 847,
    voiceMessages: 234,
    dataMessages: 613,
    emergencyMessages: 12,
    encryptionRate: 94.7,
    averageQuality: 92.3,
    channelsActive: 12,
    channelsStandby: 3
};
