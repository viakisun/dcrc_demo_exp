import React, { useState, useEffect } from 'react';
import { 
  Shield, Target, Navigation, Radar, Radio, Satellite,
  AlertTriangle, CheckCircle, XCircle, Clock, Battery,
  Eye, Camera, Crosshair, Map, Globe, Zap, Activity,
  Users, Settings, Bell, Download, Upload, RefreshCw,
  Plane, Wind, Thermometer, CloudRain, Sun, Moon,
  Lock, Unlock, Key, FileText, Headphones, Mic,
  Flame, Skull, Minus, Plus, Maximize, Minimize,
  Brain, Bot, TrendingUp, BarChart3, Cpu, Network,
  AlertCircle, PlayCircle, PauseCircle, FastForward,
  Volume2, VolumeX, Phone, PhoneCall, MessageSquare,
  MonitorSpeaker, Layers, MapPin, Route
} from 'lucide-react';

const ROKAFSectorKE14Detail = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedOperator, setSelectedOperator] = useState('OPS-01');
  const [commsChannel, setCommsChannel] = useState('PRIMARY');
  const [alertStatus, setAlertStatus] = useState('GREEN');
  const [selectedTrack, setSelectedTrack] = useState(null);

  // 섹터 KE-14 담당 운영진
  const operatorStations = [
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

  // KE-14 섹터 내 상세 항적
  const sectorTracks = [
    {
      id: 'KE14-001',
      callsign: 'VIPER-03',
      type: 'F-16C',
      position: { x: 180, y: 220 },
      vector: { dx: -5, dy: 8 },
      altitude: 25000,
      speed: 420,
      heading: 078,
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
      heading: 045,
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

  // 활성 통신 로그
  const [commLog, setCommLog] = useState([
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

  const renderOperatorStation = (operator) => {
    const isSelected = selectedOperator === operator.id;
    const statusColors = {
      'ACTIVE': 'border-green-500 bg-green-900/20',
      'STANDBY': 'border-yellow-500 bg-yellow-900/20',
      'OFFLINE': 'border-red-500 bg-red-900/20'
    };

    const workloadColors = {
      'HIGH': 'text-red-400',
      'MODERATE': 'text-yellow-400', 
      'LOW': 'text-green-400'
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
            {operator.commChannels.slice(0, 2).map(channel => (
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

  const renderTrack = (track) => {
    const colors = {
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
        
        {/* 벡터 표시 */}
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
      {/* 섹터 전용 헤더 */}
      <div className="bg-red-900 text-white text-center py-1 font-bold text-xs">
        ★★ TOP SECRET // REL TO ROKAF // SECTOR KE-14 OPERATIONS ★★
      </div>

      {/* 섹터 상세 헤더 */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center border-2 border-blue-400">
              <Target className="w-8 h-8 text-blue-200" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-blue-300">SECTOR KE-14</h1>
              <p className="text-sm text-blue-500">Detailed Operations Center - Eastern Central Zone</p>
            </div>
            <div className="flex space-x-2">
              <div className={`px-3 py-1 rounded text-sm font-bold border-2 ${
                alertStatus === 'GREEN' ? 'bg-green-900 text-green-300 border-green-400' :
                alertStatus === 'YELLOW' ? 'bg-yellow-900 text-yellow-300 border-yellow-400' :
                'bg-red-900 text-red-300 border-red-400'
              }`}>
                ALERT {alertStatus}
              </div>
              <div className="px-2 py-1 bg-blue-900 text-blue-300 rounded text-xs font-bold">
                6 OPERATORS
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-8 text-xs">
            <div className="text-center">
              <div className="text-green-400 font-bold text-lg">{currentTime.toLocaleTimeString('en-GB')}</div>
              <div className="text-green-600">LOCAL / ZULU {currentTime.toUTCString().slice(17, 25)}</div>
            </div>
            <div className="text-center">
              <div className="text-blue-400 font-bold text-lg">{sectorTracks.length}</div>
              <div className="text-blue-600">ACTIVE TRACKS</div>
            </div>
            <div className="text-center">
              <div className="text-purple-400 font-bold">CPT Park M.S.</div>
              <div className="text-purple-600">SECTOR COMMANDER</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-140px)]">
        {/* 좌측: 운영진 상태 패널 */}
        <div className="w-80 bg-gray-800 border-r border-gray-700 p-4 space-y-4 overflow-y-auto">
          {/* 운영진 스테이션 현황 */}
          <div className="bg-gray-900 rounded-lg p-3">
            <h3 className="text-sm font-bold text-blue-400 mb-3 flex items-center">
              <Users className="w-4 h-4 mr-2" />
              OPERATOR STATIONS
            </h3>
            <div className="space-y-2">
              {operatorStations.map(operator => renderOperatorStation(operator))}
            </div>
          </div>

          {/* 섹터 통계 */}
          <div className="bg-gray-900 rounded-lg p-3">
            <h3 className="text-sm font-bold text-green-400 mb-3 flex items-center">
              <BarChart3 className="w-4 h-4 mr-2" />
              SECTOR STATISTICS
            </h3>
            <div className="text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-green-600">Total Aircraft:</span>
                <span className="text-green-300 font-bold">{sectorTracks.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-600">Friendly:</span>
                <span className="text-green-400">{sectorTracks.filter(t => t.status === 'FRIENDLY').length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-600">Unknown:</span>
                <span className="text-yellow-400">{sectorTracks.filter(t => t.status === 'UNKNOWN').length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-600">Active Controllers:</span>
                <span className="text-blue-400">{operatorStations.filter(o => o.status === 'ACTIVE').length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-600">Comm Channels:</span>
                <span className="text-purple-400">15 Active</span>
              </div>
            </div>
          </div>

          {/* 통신 채널 상태 */}
          <div className="bg-gray-900 rounded-lg p-3">
            <h3 className="text-sm font-bold text-purple-400 mb-3 flex items-center">
              <Radio className="w-4 h-4 mr-2" />
              COMM CHANNELS
            </h3>
            <div className="text-xs space-y-2">
              {[
                { freq: '251.75', name: 'PRIMARY AIR-GROUND', status: 'ACTIVE', users: 3 },
                { freq: '243.00', name: 'SECONDARY A-G', status: 'ACTIVE', users: 2 },
                { freq: '255.40', name: 'SAR COORDINATION', status: 'ACTIVE', users: 1 },
                { freq: '279.15', name: 'MEDEVAC FREQ', status: 'ACTIVE', users: 1 },
                { freq: '311.00', name: 'COMMAND NET', status: 'ACTIVE', users: 4 },
                { freq: '295.80', name: 'INTER-SECTOR', status: 'STANDBY', users: 0 }
              ].map(channel => (
                <div key={channel.freq} className="flex justify-between items-center p-1 border border-gray-600 rounded">
                  <div>
                    <div className="text-purple-300 font-bold">{channel.freq}</div>
                    <div className="text-green-600 text-[10px]">{channel.name}</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-xs font-bold ${
                      channel.status === 'ACTIVE' ? 'text-green-400' :
                      channel.status === 'SECURE' ? 'text-blue-400' : 'text-yellow-400'
                    }`}>
                      {channel.status}
                    </div>
                    <div className="text-gray-400 text-[10px]">{channel.users} users</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 긴급 대응 */}
          <div className="bg-red-900/20 rounded-lg p-3 border border-red-700">
            <h3 className="text-sm font-bold text-red-400 mb-3 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2" />
              EMERGENCY ACTIONS
            </h3>
            <div className="space-y-2">
              <button 
                onClick={() => setAlertStatus(alertStatus === 'GREEN' ? 'YELLOW' : alertStatus === 'YELLOW' ? 'RED' : 'GREEN')}
                className="w-full bg-red-800 hover:bg-red-700 text-white py-1 px-2 rounded text-xs"
              >
                ESCALATE ALERT LEVEL
              </button>
              <button className="w-full bg-orange-800 hover:bg-orange-700 text-white py-1 px-2 rounded text-xs">
                REQUEST ASSISTANCE
              </button>
              <button className="w-full bg-purple-800 hover:bg-purple-700 text-white py-1 px-2 rounded text-xs">
                ACTIVATE BACKUP
              </button>
            </div>
          </div>
        </div>

        {/* 중앙: 섹터 상세 지도 */}
        <div className="flex-1 bg-gray-900 relative overflow-hidden">
          {/* 섹터 KE-14 상세 지도 */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
            {/* 섹터 경계선 */}
            <defs>
              <pattern id="sectorGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#sectorGrid)" />
            
            {/* 섹터 경계 */}
            <rect x="20" y="20" width="360" height="260" fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray="10,5" />
            <text x="200" y="35" fill="#3b82f6" fontSize="16" textAnchor="middle" fontWeight="bold">SECTOR KE-14 BOUNDARY</text>
            
            {/* 지형 요소 */}
            <path 
              d="M 150 120 L 170 110 L 190 115 L 210 125 L 220 140 L 225 160 L 220 180 L 210 195 L 190 200 L 170 195 L 150 180 L 140 160 L 145 140 Z" 
              fill="rgba(34, 197, 94, 0.2)" 
              stroke="#22c55e" 
              strokeWidth="1"
            />
            
            {/* 항로 */}
            <path d="M 50 150 L 350 150" stroke="#60a5fa" strokeWidth="2" strokeDasharray="5,5" />
            <text x="200" y="145" fill="#60a5fa" fontSize="10" textAnchor="middle">AIRWAY A123</text>
            
            <path d="M 200 50 L 200 250" stroke="#60a5fa" strokeWidth="2" strokeDasharray="5,5" />
            <text x="205" y="150" fill="#60a5fa" fontSize="10">V456</text>

            {/* 위험 구역 */}
            <circle cx="300" cy="100" r="25" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2" strokeDasharray="3,3" />
            <text x="300" y="105" fill="#ef4444" fontSize="8" textAnchor="middle" fontWeight="bold">RESTRICTED</text>
            
            {/* 공항/기지 */}
            <rect x="95" y="195" width="10" height="10" fill="#22c55e" />
            <text x="110" y="205" fill="#22c55e" fontSize="10">RKJK</text>

            {/* 의료시설 */}
            <circle cx="120" cy="240" r="5" fill="#f59e0b" />
            <text x="130" y="245" fill="#f59e0b" fontSize="8">HOSPITAL</text>
          </svg>

          {/* 항적 표시 */}
          <div className="absolute inset-0">
            {sectorTracks.map(track => renderTrack(track))}
          </div>

          {/* 섹터 상태 표시 */}
          <div className="absolute top-4 right-4 bg-gray-900/80 rounded-lg p-3 border border-blue-700">
            <div className="text-sm text-blue-400 font-bold mb-2">KE-14 SECTOR STATUS</div>
            <div className="text-xs text-green-400 space-y-1">
              <div>Sector Size: <span className="text-green-300">50nm x 60nm</span></div>
              <div>Altitude Band: <span className="text-green-300">FL100-FL450</span></div>
              <div>Primary Radar: <span className="text-green-300">ONLINE 99%</span></div>
              <div>Coverage: <span className="text-green-300">FULL</span></div>
            </div>
          </div>

          {/* 조작원별 항적 할당 표시 */}
          <div className="absolute bottom-4 left-4 bg-gray-900/80 rounded-lg p-3 border border-gray-700">
            <div className="text-sm text-green-400 font-bold mb-2">TRACK ASSIGNMENTS</div>
            <div className="text-xs space-y-1">
              {operatorStations.filter(op => op.status === 'ACTIVE').map(op => {
                const assignedTracks = sectorTracks.filter(track => track.controller === op.id);
                return (
                  <div key={op.id} className="flex justify-between">
                    <span className="text-blue-400">{op.id}:</span>
                    <span className="text-green-300">{assignedTracks.length} tracks</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 우측: 상세 운영 정보 */}
        <div className="w-96 bg-gray-800 border-l border-gray-700 p-4 space-y-4 overflow-y-auto">
          {/* 선택된 운영진 상세 정보 */}
          {selectedOperator && (
            <div className="bg-gray-900 rounded-lg p-3 border-l-4 border-blue-500">
              <h3 className="text-sm font-bold text-blue-400 mb-3 flex items-center">
                <Users className="w-4 h-4 mr-2" />
                OPERATOR DETAIL: {selectedOperator}
              </h3>
              {(() => {
                const op = operatorStations.find(o => o.id === selectedOperator);
                const assignedTracks = sectorTracks.filter(t => t.controller === selectedOperator);
                return (
                  <div className="text-xs space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-green-600">Name:</div>
                      <div className="text-green-300">{op.operator}</div>
                      <div className="text-green-600">Role:</div>
                      <div className="text-green-300">{op.role}</div>
                      <div className="text-green-600">Station:</div>
                      <div className="text-green-300">{op.station}</div>
                      <div className="text-green-600">Workload:</div>
                      <div className={`font-bold ${
                        op.workload === 'HIGH' ? 'text-red-400' :
                        op.workload === 'MODERATE' ? 'text-yellow-400' : 'text-green-400'
                      }`}>{op.workload}</div>
                      <div className="text-green-600">Assigned Tracks:</div>
                      <div className="text-blue-400">{assignedTracks.length}</div>
                    </div>
                    
                    <div className="mt-3 pt-2 border-t border-gray-700">
                      <div className="text-green-400 font-bold mb-1">Communication Channels:</div>
                      <div className="flex flex-wrap gap-1">
                        {op.commChannels.map(channel => (
                          <span key={channel} className="bg-purple-900/50 text-purple-300 px-1 py-0.5 rounded text-[10px]">
                            {channel}
                          </span>
                        ))}
                      </div>
                    </div>

                    {assignedTracks.length > 0 && (
                      <div className="mt-3 pt-2 border-t border-gray-700">
                        <div className="text-green-400 font-bold mb-1">Assigned Aircraft:</div>
                        {assignedTracks.map(track => (
                          <div key={track.id} className="text-green-300 text-[10px] mb-1">
                            {track.callsign} ({track.type}) - FL{Math.floor(track.altitude/100)}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}

          {/* 통신 로그 */}
          <div className="bg-gray-900 rounded-lg p-3">
            <h3 className="text-sm font-bold text-purple-400 mb-3 flex items-center">
              <MessageSquare className="w-4 h-4 mr-2" />
              COMMUNICATION LOG
            </h3>
            <div className="text-xs space-y-2 max-h-40 overflow-y-auto">
              {commLog.map((comm, index) => (
                <div key={index} className={`p-2 rounded border-l-2 ${
                  comm.priority === 'URGENT' ? 'border-red-500 bg-red-900/20' :
                  comm.priority === 'PRIORITY' ? 'border-orange-500 bg-orange-900/20' : 
                  'border-blue-500 bg-blue-900/20'
                }`}>
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-green-300 font-bold">{comm.from} → {comm.to}</span>
                    <span className="text-purple-400">{comm.channel}</span>
                  </div>
                  <div className="text-green-400">{comm.message}</div>
                  <div className="text-gray-500 text-[10px] mt-1">
                    {comm.time.toLocaleTimeString()} - {comm.priority}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 항적 상세 목록 */}
          <div className="bg-gray-900 rounded-lg p-3">
            <h3 className="text-sm font-bold text-green-400 mb-3 flex items-center">
              <Crosshair className="w-4 h-4 mr-2" />
              TRACK DETAILS
            </h3>
            <div className="text-xs space-y-2 max-h-64 overflow-y-auto">
              {sectorTracks.map(track => (
                <div 
                  key={track.id} 
                  className={`border rounded p-2 cursor-pointer transition-all ${
                    selectedTrack?.id === track.id ? 'border-blue-500 bg-blue-900/20' :
                    track.status === 'FRIENDLY' ? 'border-green-600' :
                    track.status === 'UNKNOWN' ? 'border-yellow-600' : 'border-red-600'
                  }`}
                  onClick={() => setSelectedTrack(track)}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-green-300 font-bold">{track.callsign}</span>
                    <span className={`px-1 py-0.5 rounded text-[10px] ${
                      track.status === 'FRIENDLY' ? 'bg-green-900 text-green-300' :
                      track.status === 'UNKNOWN' ? 'bg-yellow-900 text-yellow-300' :
                      'bg-red-900 text-red-300'
                    }`}>
                      {track.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-[10px]">
                    <div>Type: {track.type}</div>
                    <div>Mission: {track.mission}</div>
                    <div>Alt: FL{Math.floor(track.altitude/100)}</div>
                    <div>Speed: {track.speed}kt</div>
                    <div>Hdg: {track.heading.toString().padStart(3, '0')}</div>
                    <div>Fuel: {track.fuel}%</div>
                    <div>Freq: {track.commsFreq}</div>
                    <div>Sqwk: {track.squawk}</div>
                  </div>
                  <div className="text-blue-400 text-[10px] mt-1">
                    Controller: {track.controller} | Last: {track.lastContact}
                  </div>
                  <div className="text-green-600 text-[10px]">
                    Pilot: {track.pilot}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 섹터 운영 도구 */}
          <div className="bg-gray-900 rounded-lg p-3">
            <h3 className="text-sm font-bold text-yellow-400 mb-3 flex items-center">
              <Settings className="w-4 h-4 mr-2" />
              SECTOR TOOLS
            </h3>
            <div className="space-y-2">
              <button className="w-full bg-blue-800 hover:bg-blue-700 text-white py-1 px-2 rounded text-xs">
                HANDOFF TO ADJACENT
              </button>
              <button className="w-full bg-green-800 hover:bg-green-700 text-white py-1 px-2 rounded text-xs">
                REQUEST HIGHER LEVEL
              </button>
              <button className="w-full bg-purple-800 hover:bg-purple-700 text-white py-1 px-2 rounded text-xs">
                COORDINATE WITH TOWER
              </button>
              <button className="w-full bg-orange-800 hover:bg-orange-700 text-white py-1 px-2 rounded text-xs">
                WEATHER UPDATE
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 분류 표시 */}
      <div className="bg-red-900 text-white text-center py-1 font-bold text-xs">
        ★★ TOP SECRET // REL TO ROKAF // SECTOR KE-14 OPERATIONS ★★
      </div>
    </div>
  );
};

export default ROKAFSectorKE14Detail;