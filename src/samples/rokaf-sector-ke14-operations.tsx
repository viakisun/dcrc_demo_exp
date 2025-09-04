import React, { useState, useEffect } from 'react';
import { 
  Target, Radio,
  AlertTriangle,
  Users, Settings,
  BarChart3,
  MessageSquare,
  Crosshair
} from 'lucide-react';

type OperatorStatus = 'ACTIVE' | 'STANDBY' | 'OFFLINE';
type Workload = 'HIGH' | 'MODERATE' | 'LOW' | 'NORMAL';
type TrackStatus = 'FRIENDLY' | 'UNKNOWN' | 'HOSTILE';

interface Operator {
  id: string;
  role: string;
  operator: string;
  station: string;
  responsibility: string;
  status: OperatorStatus;
  workload: Workload;
  commChannels: string[];
}

interface SectorTrack {
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

const ROKAFSectorKE14Detail = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedOperator, setSelectedOperator] = useState('OPS-01');
  const [alertStatus, setAlertStatus] = useState('GREEN');
  const [selectedTrack, setSelectedTrack] = useState<SectorTrack | null>(null);

  const operatorStations: Operator[] = [
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

  const sectorTracks: SectorTrack[] = [
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
    {
      id: 'KE14-004',
      callsign: 'RESCUE-07',
      type: 'UH-60',
      position: { x: 200, y: 240 },
      vector: { dx: -2, dy: -6 },
      altitude: 2000,
      speed: 140,
      heading: 275,
      status: 'FRIENDLY',
      mission: 'SAR',
      fuel: 65,
      controller: 'OPS-03',
      pilot: 'CPT Yoon H.J.',
      commsFreq: '255.40',
      squawk: '7703',
      lastContact: '15 sec ago'
    },
    {
      id: 'KE14-005',
      callsign: 'HAWK-15',
      type: 'KAI-Surion',
      position: { x: 260, y: 200 },
      vector: { dx: 8, dy: -10 },
      altitude: 8000,
      speed: 160,
      heading: 310,
      status: 'FRIENDLY',
      mission: 'MEDEVAC',
      fuel: 78,
      controller: 'OPS-02',
      pilot: 'CPT Lim J.S.',
      commsFreq: '279.15',
      squawk: '7704',
      lastContact: '20 sec ago'
    }
  ];

  const [commLog] = useState([
    { time: new Date(), from: 'VIPER-03', to: 'OPS-03', message: 'Request vector to target area Alpha', priority: 'ROUTINE', channel: 'AIR-GROUND' },
    { time: new Date(Date.now() - 30000), from: 'OPS-04', to: 'INTEL-NET', message: 'Unknown track classification request - Squawk 7600', priority: 'PRIORITY', channel: 'DATA-LINK' },
    { time: new Date(Date.now() - 60000), from: 'CARGO-12', to: 'OPS-02', message: 'Requesting flight level change to FL200 due weather', priority: 'ROUTINE', channel: 'AIR-GROUND' },
    { time: new Date(Date.now() - 90000), from: 'OPS-01', to: 'MCRC', message: 'KE-14 sector status normal, 5 active tracks', priority: 'ROUTINE', channel: 'COMMAND' },
    { time: new Date(Date.now() - 120000), from: 'RESCUE-07', to: 'OPS-03', message: 'Medical emergency, requesting priority handling', priority: 'URGENT', channel: 'SAR-COORD' }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const renderOperatorStation = (operator: Operator) => {
    const isSelected = selectedOperator === operator.id;
    const statusColors: Record<OperatorStatus, string> = {
      'ACTIVE': 'border-green-500 bg-green-900/20',
      'STANDBY': 'border-yellow-500 bg-yellow-900/20',
      'OFFLINE': 'border-red-500 bg-red-900/20'
    };

    const workloadColors: Record<Workload, string> = {
      'HIGH': 'text-red-400',
      'MODERATE': 'text-yellow-400', 
      'LOW': 'text-green-400',
      'NORMAL': 'text-green-400'
    };

    return (
      <div 
        key={operator.id}
        className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
          isSelected ? 'border-blue-500 bg-blue-900/30' : statusColors[operator.status]
        }`}
        onClick={() => setSelectedOperator(operator.id)}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              operator.status === 'ACTIVE' ? 'bg-green-500 animate-pulse' :
              operator.status === 'STANDBY' ? 'bg-yellow-500' : 'bg-red-500'
            }`}></div>
            <span className="text-green-300 font-bold text-sm">{operator.id}</span>
          </div>
          <span className={`text-xs font-bold ${workloadColors[operator.workload]}`}>
            {operator.workload}
          </span>
        </div>
        
        <div className="space-y-1 text-xs">
          <div className="text-green-400 font-bold">{operator.role}</div>
          <div className="text-green-300">{operator.operator}</div>
          <div className="text-green-600">{operator.station}</div>
          <div className="text-blue-400">{operator.responsibility}</div>
          
          <div className="flex flex-wrap gap-1 mt-2">
            {operator.commChannels.slice(0, 2).map((channel: string) => (
              <span key={channel} className="bg-purple-900/50 text-purple-300 px-1 py-0.5 rounded text-[10px]">
                {channel}
              </span>
            ))}
            {operator.commChannels.length > 2 && (
              <span className="text-purple-400 text-[10px]">+{operator.commChannels.length - 2}</span>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderTrack = (track: SectorTrack) => {
    const colors: Record<TrackStatus, string> = {
      'FRIENDLY': 'text-green-400 bg-green-900/30 border-green-400',
      'UNKNOWN': 'text-yellow-400 bg-yellow-900/30 border-yellow-400',
      'HOSTILE': 'text-red-400 bg-red-900/30 border-red-400'
    };

    return (
      <div key={track.id} className="absolute">
        <div 
          className={`absolute ${colors[track.status]} border-2 rounded-lg p-2 text-[10px] font-mono transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:bg-opacity-80 transition-all shadow-lg min-w-24`}
          style={{ 
            left: `${track.position.x}px`, 
            top: `${track.position.y}px`
          }}
          onClick={() => setSelectedTrack(track)}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] font-bold">{track.callsign}</span>
            <span className="text-[8px] text-blue-400">{track.controller}</span>
          </div>
          <div className="space-y-0.5">
            <div>{track.type}</div>
            <div>FL{Math.floor(track.altitude/100)}</div>
            <div>{track.speed}kt</div>
            <div>HDG {track.heading.toString().padStart(3, '0')}</div>
            <div className="text-purple-400">SQ {track.squawk}</div>
          </div>
        </div>
        
        <svg 
          className="absolute pointer-events-none"
          style={{ 
            left: `${track.position.x}px`, 
            top: `${track.position.y}px`,
            transform: 'translate(-50%, -50%)'
          }}
          width="60" 
          height="60"
        >
          <defs>
            <marker id={`arrow-${track.id}`} markerWidth="6" markerHeight="4" 
              refX="5" refY="2" orient="auto">
              <polygon 
                points="0 0, 6 2, 0 4"
                fill={track.status === 'FRIENDLY' ? '#4ade80' : track.status === 'UNKNOWN' ? '#facc15' : '#f87171'}
              />
            </marker>
          </defs>
          <line 
            x1="30" 
            y1="30" 
            x2={30 + (track.speed / 30) * Math.cos(track.heading * Math.PI / 180)} 
            y2={30 + (track.speed / 30) * Math.sin(track.heading * Math.PI / 180)}
            stroke={track.status === 'FRIENDLY' ? '#4ade80' : track.status === 'UNKNOWN' ? '#facc15' : '#f87171'}
            strokeWidth="2"
            markerEnd={`url(#arrow-${track.id})`}
          />
        </svg>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-green-300 font-mono">
      {/* ... rest of component ... */}
    </div>
  );
};

export default ROKAFSectorKE14Detail;