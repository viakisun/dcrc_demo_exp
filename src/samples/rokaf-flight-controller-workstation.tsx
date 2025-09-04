import React, { useState, useEffect } from 'react';
import { 
  Target, Navigation, Radio,
  AlertTriangle,
  Eye, Zap,
  Settings,
  Plane,
  MessageSquare,
  Navigation2, ArrowUp, ArrowDown, ArrowLeft, ArrowRight
} from 'lucide-react';

interface Aircraft {
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
  status: string;
  clearanceLevel: string;
  priority: string;
  separation: {
    nearest: string;
    distance: number;
    verticalSep: number;
    conflictLevel: string;
  };
}

const FlightControllerWorkstation = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedAircraft, setSelectedAircraft] = useState<Aircraft | null>(null);
  const [vectorMode, setVectorMode] = useState('MANUAL');
  const [selectedFreq, setSelectedFreq] = useState('251.75');
  const [transmitting, setTransmitting] = useState(false);
  const [weatherLayer, setWeatherLayer] = useState(true);
  const [routeDisplay, setRouteDisplay] = useState('ALL');

  // 관제 중인 항공기들 (Flight Controller 전담)
  const controlledAircraft = [
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

  // 항로 및 웨이포인트
  const airwaysAndWaypoints = [
    { id: 'ALPHA-1', type: 'AIRWAY', path: [{x: 100, y: 150}, {x: 200, y: 160}, {x: 300, y: 170}], color: '#60a5fa' },
    { id: 'BRAVO-2', type: 'WAYPOINT', position: {x: 200, y: 160}, name: 'BRAVO-2' },
    { id: 'CHARLIE-3', type: 'WAYPOINT', position: {x: 300, y: 170}, name: 'CHARLIE-3' },
    { id: 'DELTA-4', type: 'AIRWAY', path: [{x: 150, y: 200}, {x: 250, y: 180}, {x: 350, y: 160}], color: '#34d399' },
    { id: 'ECHO-5', type: 'WAYPOINT', position: {x: 250, y: 180}, name: 'ECHO-5' },
    { id: 'FOXTROT-6', type: 'WAYPOINT', position: {x: 350, y: 160}, name: 'FOXTROT-6' }
  ];

  // 기상 정보
  const weatherData = [
    { position: {x: 180, y: 120}, type: 'TURBULENCE', severity: 'MODERATE', alt: 'FL250-350' },
    { position: {x: 320, y: 220}, type: 'PRECIPITATION', severity: 'LIGHT', alt: 'SFC-FL100' },
    { position: {x: 260, y: 160}, type: 'WIND_SHEAR', severity: 'LIGHT', alt: 'FL180-220' }
  ];

  // 통신 로그
  const [commLog, setCommLog] = useState([
    { time: new Date(), from: 'VIPER-03', message: 'Request vector direct CHARLIE-3', frequency: '251.75', response: 'PENDING' },
    { time: new Date(Date.now() - 30000), from: 'FC', message: 'CARGO-12, climb and maintain FL180', frequency: '243.00', response: 'ROGER' },
    { time: new Date(Date.now() - 60000), from: 'RESCUE-07', message: 'Emergency direct to hospital, souls on board 3', frequency: '255.40', response: 'CLEARED' },
    { time: new Date(Date.now() - 90000), from: 'FC', message: 'HAWK-15, turn right heading 320, climb FL100', frequency: '279.15', response: 'WILCO' }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleVectorCommand = (aircraft: Aircraft, command: string) => {
    const newComm = {
      time: new Date(),
      from: 'FC',
      message: `${aircraft.callsign}, ${command}`,
      frequency: aircraft.communications.frequency,
      response: 'STANDBY'
    };
    setCommLog(prev => [newComm, ...prev.slice(0, 9)]);
    setTransmitting(true);
    setTimeout(() => setTransmitting(false), 2000);
  };

  const renderNavigationDisplay = () => {
    return (
      <div className="relative w-full h-full bg-gray-950 rounded-lg border-2 border-blue-600 overflow-hidden">
        {/* 내비게이션 디스플레이 배경 */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 400">
          <defs>
            <pattern id="navGrid" width="25" height="25" patternUnits="userSpaceOnUse">
              <path d="M 25 0 L 0 0 0 25" fill="none" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          
          {/* 그리드 배경 */}
          <rect width="100%" height="100%" fill="url(#navGrid)" />
          
          {/* 항공로 표시 */}
          {airwaysAndWaypoints.filter(item => item.type === 'AIRWAY').map(airway => (
            <g key={airway.id}>
              <path
                d={`M ${airway.path.map(p => `${p.x} ${p.y}`).join(' L ')}`}
                stroke={airway.color}
                strokeWidth="2"
                strokeDasharray="5,5"
                fill="none"
              />
              <text x={airway.path[Math.floor(airway.path.length/2)].x} y={airway.path[Math.floor(airway.path.length/2)].y - 10} 
                    fill={airway.color} fontSize="10" textAnchor="middle">{airway.id}</text>
            </g>
          ))}
          
          {/* 웨이포인트 표시 */}
          {airwaysAndWaypoints.filter(item => item.type === 'WAYPOINT').map(waypoint => (
            <g key={waypoint.id}>
              <circle cx={waypoint.position.x} cy={waypoint.position.y} r="4" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" />
              <text x={waypoint.position.x} y={waypoint.position.y - 15} fill="#fbbf24" fontSize="9" textAnchor="middle" fontWeight="bold">{waypoint.name}</text>
            </g>
          ))}
          
          {/* 기상 정보 */}
          {weatherLayer && weatherData.map((weather, index) => (
            <g key={index}>
              <circle cx={weather.position.x} cy={weather.position.y} r="15" 
                     fill={weather.type === 'TURBULENCE' ? 'rgba(239, 68, 68, 0.3)' : 
                           weather.type === 'PRECIPITATION' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(245, 158, 11, 0.3)'}
                     stroke={weather.type === 'TURBULENCE' ? '#ef4444' : 
                            weather.type === 'PRECIPITATION' ? '#3b82f6' : '#f59e0b'}
                     strokeWidth="1" strokeDasharray="3,3" />
              <text x={weather.position.x} y={weather.position.y + 25} fill="#94a3b8" fontSize="8" textAnchor="middle">
                {weather.type.split('_')[0]}
              </text>
            </g>
          ))}
          
          {/* 공항/기지 */}
          <rect x="95" y="145" width="10" height="10" fill="#22c55e" />
          <text x="110" y="155" fill="#22c55e" fontSize="9">RKJK</text>
          <rect x="345" y="155" width="10" height="10" fill="#22c55e" />
          <text x="360" y="165" fill="#22c55e" fontSize="9">RKSS</text>
        </svg>

        {/* 항공기 표시 */}
        <div className="absolute inset-0">
          {controlledAircraft.map(aircraft => {
            const isSelected = selectedAircraft?.id === aircraft.id;
            const statusColors = {
              'EMERGENCY': 'text-red-400 bg-red-900/30 border-red-400',
              'VECTORING': 'text-blue-400 bg-blue-900/30 border-blue-400',
              'CLIMBING': 'text-green-400 bg-green-900/30 border-green-400',
              'TRAINING': 'text-purple-400 bg-purple-900/30 border-purple-400'
            };

            return (
              <div
                key={aircraft.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all ${
                  isSelected ? 'z-20 scale-110' : 'z-10'
                }`}
                style={{ left: `${aircraft.position.x}px`, top: `${aircraft.position.y}px` }}
                onClick={() => setSelectedAircraft(aircraft)}
              >
                {/* 항공기 심볼 */}
                <div className={`relative ${statusColors[aircraft.status]} border-2 rounded-lg p-2`}>
                  <Plane className={`w-5 h-5 transform rotate-${Math.round(aircraft.navigation.currentHdg / 45) * 45}`} />
                  
                  {/* 비행 벡터 */}
                  <svg className="absolute top-6 left-6 pointer-events-none" width="40" height="40">
                    <line 
                      x1="0" y1="0" 
                      x2={aircraft.vector.dx * 2} 
                      y2={aircraft.vector.dy * 2}
                      stroke="currentColor" strokeWidth="2"
                    />
                    <line 
                      x1={aircraft.vector.dx * 2} 
                      y1={aircraft.vector.dy * 2}
                      x2={aircraft.vector.dx * 2 - 3} 
                      y2={aircraft.vector.dy * 2 - 3}
                      stroke="currentColor" strokeWidth="2"
                    />
                  </svg>
                  
                  {/* 항공기 정보 라벨 */}
                  <div className={`absolute top-8 left-8 bg-gray-900/90 rounded px-2 py-1 text-[9px] font-mono border ${
                    isSelected ? 'border-yellow-400 bg-yellow-900/20' : 'border-gray-600'
                  }`}>
                    <div className="font-bold">{aircraft.callsign}</div>
                    <div>FL{Math.floor(aircraft.navigation.currentAlt/100)}</div>
                    <div>{aircraft.navigation.currentSpd}kt</div>
                    <div>HDG {aircraft.navigation.currentHdg.toString().padStart(3, '0')}</div>
                    {aircraft.navigation.assignedAlt !== aircraft.navigation.currentAlt && (
                      <div className="text-yellow-400">→FL{Math.floor(aircraft.navigation.assignedAlt/100)}</div>
                    )}
                    {aircraft.navigation.assignedHdg !== aircraft.navigation.currentHdg && (
                      <div className="text-blue-400">→{aircraft.navigation.assignedHdg.toString().padStart(3, '0')}°</div>
                    )}
                  </div>
                  
                  {/* 우선순위 표시 */}
                  {aircraft.priority === 'EMERGENCY' && (
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                      <AlertTriangle className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 디스플레이 정보 */}
        <div className="absolute top-4 left-4 bg-gray-900/80 rounded-lg p-2 text-xs">
          <div className="text-blue-400 font-bold mb-1">NAVIGATION DISPLAY</div>
          <div className="text-green-300">Scale: 1:500,000</div>
          <div className="text-green-300">Mode: {vectorMode}</div>
          <div className="text-green-300">Weather: {weatherLayer ? 'ON' : 'OFF'}</div>
        </div>

        {/* 분리 기준 */}
        <div className="absolute bottom-4 right-4 bg-gray-900/80 rounded-lg p-2 text-xs">
          <div className="text-yellow-400 font-bold mb-1">SEPARATION STANDARDS</div>
          <div className="text-green-300">Horizontal: 5nm</div>
          <div className="text-green-300">Vertical: 1000ft</div>
          <div className="text-green-300">Emergency: PRIORITY</div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-green-300 font-mono">
      {/* 헤더 */}
      <div className="bg-red-900 text-white text-center py-1 font-bold text-xs">
        ★★ TOP SECRET // REL TO ROKAF // FLIGHT CONTROLLER WORKSTATION ★★
      </div>

      {/* 워크스테이션 헤더 */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center border-2 border-blue-400">
              <Navigation className="w-8 h-8 text-blue-200" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-blue-300">FLIGHT CONTROLLER</h1>
              <p className="text-sm text-blue-500">KE-14 Sector - SrA Lee H.S. - Vectoring Station</p>
            </div>
            <div className="flex space-x-2">
              <div className={`px-3 py-1 rounded text-sm font-bold border-2 ${
                transmitting ? 'bg-red-900 text-red-300 border-red-400 animate-pulse' : 'bg-green-900 text-green-300 border-green-400'
              }`}>
                {transmitting ? 'TRANSMITTING' : 'STANDBY'}
              </div>
              <div className="px-2 py-1 bg-blue-900 text-blue-300 rounded text-xs font-bold">
                {controlledAircraft.length} AIRCRAFT
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-8 text-xs">
            <div className="text-center">
              <div className="text-green-400 font-bold text-lg">{currentTime.toLocaleTimeString('en-GB')}</div>
              <div className="text-green-600">CONTROL TIME</div>
            </div>
            <div className="text-center">
              <div className="text-blue-400 font-bold">SrA Lee H.S.</div>
              <div className="text-blue-600">FLIGHT CONTROLLER</div>
            </div>
            <div className="text-center">
              <div className="text-purple-400 font-bold">{selectedFreq}</div>
              <div className="text-purple-600">ACTIVE FREQ</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-140px)]">
        {/* 좌측: 항공기 제어 패널 */}
        <div className="w-80 bg-gray-800 border-r border-gray-700 p-4 space-y-4 overflow-y-auto">
          {/* 통신 제어 */}
          <div className="bg-gray-900 rounded-lg p-3">
            <h3 className="text-sm font-bold text-purple-400 mb-3 flex items-center">
              <Radio className="w-4 h-4 mr-2" />
              COMMUNICATION
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-purple-600 block mb-1">Active Frequency</label>
                <select 
                  value={selectedFreq} 
                  onChange={(e) => setSelectedFreq(e.target.value)}
                  className="w-full bg-gray-800 text-purple-400 text-xs border border-gray-600 rounded px-2 py-1"
                >
                  <option value="251.75">251.75 - PRIMARY</option>
                  <option value="243.00">243.00 - SECONDARY</option>
                  <option value="255.40">255.40 - SAR</option>
                  <option value="279.15">279.15 - TRAINING</option>
                  <option value="311.00">311.00 - COMMAND</option>
                </select>
              </div>
              <div className="flex space-x-2">
                <button 
                  className={`flex-1 py-2 px-3 rounded text-xs font-bold ${
                    transmitting ? 'bg-red-800 text-red-300 animate-pulse' : 'bg-green-800 hover:bg-green-700 text-white'
                  }`}
                  onClick={() => {setTransmitting(true); setTimeout(() => setTransmitting(false), 3000);}}
                >
                  {transmitting ? 'TX' : 'PUSH TO TALK'}
                </button>
              </div>
            </div>
          </div>

          {/* 벡터링 모드 */}
          <div className="bg-gray-900 rounded-lg p-3">
            <h3 className="text-sm font-bold text-blue-400 mb-3 flex items-center">
              <Navigation2 className="w-4 h-4 mr-2" />
              VECTORING MODE
            </h3>
            <div className="space-y-2">
              <div className="flex space-x-1">
                <button 
                  onClick={() => setVectorMode('MANUAL')}
                  className={`flex-1 py-1 px-2 rounded text-xs ${
                    vectorMode === 'MANUAL' ? 'bg-blue-800 text-blue-300' : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  MANUAL
                </button>
                <button 
                  onClick={() => setVectorMode('AUTO')}
                  className={`flex-1 py-1 px-2 rounded text-xs ${
                    vectorMode === 'AUTO' ? 'bg-blue-800 text-blue-300' : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  AUTO
                </button>
                <button 
                  onClick={() => setVectorMode('CONFLICT')}
                  className={`flex-1 py-1 px-2 rounded text-xs ${
                    vectorMode === 'CONFLICT' ? 'bg-red-800 text-red-300' : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  CONFLICT
                </button>
              </div>
            </div>
          </div>

          {/* 관제 중인 항공기 목록 */}
          <div className="bg-gray-900 rounded-lg p-3">
            <h3 className="text-sm font-bold text-green-400 mb-3 flex items-center">
              <Plane className="w-4 h-4 mr-2" />
              CONTROLLED AIRCRAFT
            </h3>
            <div className="space-y-2 text-xs">
              {controlledAircraft.map(aircraft => (
                <div 
                  key={aircraft.id}
                  className={`p-2 rounded border cursor-pointer transition-all ${
                    selectedAircraft?.id === aircraft.id ? 'border-yellow-500 bg-yellow-900/20' :
                    aircraft.priority === 'EMERGENCY' ? 'border-red-600 bg-red-900/20' :
                    'border-gray-600 hover:border-blue-500'
                  }`}
                  onClick={() => setSelectedAircraft(aircraft)}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-green-300 font-bold">{aircraft.callsign}</span>
                    <span className={`px-1 py-0.5 rounded text-[10px] ${
                      aircraft.priority === 'EMERGENCY' ? 'bg-red-900 text-red-300' :
                      aircraft.priority === 'ROUTINE' ? 'bg-green-900 text-green-300' :
                      'bg-blue-900 text-blue-300'
                    }`}>
                      {aircraft.priority}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-[10px]">
                    <div>Alt: FL{Math.floor(aircraft.navigation.currentAlt/100)}</div>
                    <div>Spd: {aircraft.navigation.currentSpd}kt</div>
                    <div>Hdg: {aircraft.navigation.currentHdg.toString().padStart(3, '0')}°</div>
                    <div>Status: {aircraft.status}</div>
                  </div>
                  <div className="text-blue-400 text-[10px] mt-1">
                    {aircraft.communications.lastContact} • {aircraft.communications.frequency}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 빠른 명령어 */}
          <div className="bg-gray-900 rounded-lg p-3">
            <h3 className="text-sm font-bold text-yellow-400 mb-3 flex items-center">
              <Zap className="w-4 h-4 mr-2" />
              QUICK COMMANDS
            </h3>
            {selectedAircraft && (
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-1">
                  <button 
                    onClick={() => handleVectorCommand(selectedAircraft, 'turn left heading 270')}
                    className="bg-blue-800 hover:bg-blue-700 text-white py-1 px-2 rounded text-[10px] flex items-center justify-center"
                  >
                    <ArrowLeft className="w-3 h-3 mr-1" />
                    L TURN
                  </button>
                  <button 
                    onClick={() => handleVectorCommand(selectedAircraft, 'turn right heading 090')}
                    className="bg-blue-800 hover:bg-blue-700 text-white py-1 px-2 rounded text-[10px] flex items-center justify-center"
                  >
                    <ArrowRight className="w-3 h-3 mr-1" />
                    R TURN
                  </button>
                  <button 
                    onClick={() => handleVectorCommand(selectedAircraft, 'climb and maintain FL250')}
                    className="bg-green-800 hover:bg-green-700 text-white py-1 px-2 rounded text-[10px] flex items-center justify-center"
                  >
                    <ArrowUp className="w-3 h-3 mr-1" />
                    CLIMB
                  </button>
                  <button 
                    onClick={() => handleVectorCommand(selectedAircraft, 'descend and maintain FL100')}
                    className="bg-orange-800 hover:bg-orange-700 text-white py-1 px-2 rounded text-[10px] flex items-center justify-center"
                  >
                    <ArrowDown className="w-3 h-3 mr-1" />
                    DESCEND
                  </button>
                </div>
                <button 
                  onClick={() => handleVectorCommand(selectedAircraft, 'proceed direct to destination')}
                  className="w-full bg-purple-800 hover:bg-purple-700 text-white py-1 px-2 rounded text-xs"
                >
                  DIRECT ROUTING
                </button>
                <button 
                  onClick={() => handleVectorCommand(selectedAircraft, 'reduce speed to 250 knots')}
                  className="w-full bg-yellow-800 hover:bg-yellow-700 text-white py-1 px-2 rounded text-xs"
                >
                  SPEED CONTROL
                </button>
              </div>
            )}
            {!selectedAircraft && (
              <div className="text-gray-500 text-xs text-center py-4">
                Select aircraft for commands
              </div>
            )}
          </div>

          {/* 디스플레이 옵션 */}
          <div className="bg-gray-900 rounded-lg p-3">
            <h3 className="text-sm font-bold text-green-400 mb-3 flex items-center">
              <Eye className="w-4 h-4 mr-2" />
              DISPLAY OPTIONS
            </h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="weather" 
                  checked={weatherLayer}
                  onChange={(e) => setWeatherLayer(e.target.checked)}
                  className="text-blue-400" 
                />
                <label htmlFor="weather" className="text-xs text-green-600">Weather Layer</label>
              </div>
              <div>
                <label className="text-xs text-green-600 block mb-1">Route Display</label>
                <select 
                  value={routeDisplay} 
                  onChange={(e) => setRouteDisplay(e.target.value)}
                  className="w-full bg-gray-800 text-green-400 text-xs border border-gray-600 rounded px-2 py-1"
                >
                  <option value="ALL">Show All Routes</option>
                  <option value="ACTIVE">Active Routes Only</option>
                  <option value="SELECTED">Selected Aircraft</option>
                  <option value="NONE">Hide Routes</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* 중앙: 내비게이션 디스플레이 */}
        <div className="flex-1 bg-gray-900 p-4">
          {renderNavigationDisplay()}
        </div>

        {/* 우측: 상세 정보 및 통신 */}
        <div className="w-96 bg-gray-800 border-l border-gray-700 p-4 space-y-4 overflow-y-auto">
          {/* 선택된 항공기 상세 정보 */}
          {selectedAircraft && (
            <div className="bg-gray-900 rounded-lg p-3 border-l-4 border-blue-500">
              <h3 className="text-sm font-bold text-blue-400 mb-3 flex items-center">
                <Target className="w-4 h-4 mr-2" />
                AIRCRAFT DETAIL: {selectedAircraft.callsign}
              </h3>
              <div className="text-xs space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-green-600">Aircraft:</div>
                  <div className="text-green-300">{selectedAircraft.type}</div>
                  <div className="text-green-600">Pilot:</div>
                  <div className="text-green-300">{selectedAircraft.communications.pilot}</div>
                  <div className="text-green-600">Current Alt:</div>
                  <div className="text-green-300">{selectedAircraft.navigation.currentAlt}ft</div>
                  <div className="text-green-600">Assigned Alt:</div>
                  <div className={`font-bold ${
                    selectedAircraft.navigation.assignedAlt !== selectedAircraft.navigation.currentAlt ? 'text-yellow-400' : 'text-green-300'
                  }`}>{selectedAircraft.navigation.assignedAlt}ft</div>
                  <div className="text-green-600">Current Hdg:</div>
                  <div className="text-green-300">{selectedAircraft.navigation.currentHdg.toString().padStart(3, '0')}°</div>
                  <div className="text-green-600">Assigned Hdg:</div>
                  <div className={`font-bold ${
                    selectedAircraft.navigation.assignedHdg !== selectedAircraft.navigation.currentHdg ? 'text-blue-400' : 'text-green-300'
                  }`}>{selectedAircraft.navigation.assignedHdg.toString().padStart(3, '0')}°</div>
                  <div className="text-green-600">Speed:</div>
                  <div className="text-green-300">{selectedAircraft.navigation.currentSpd}kt</div>
                  <div className="text-green-600">Vert Rate:</div>
                  <div className={`${
                    selectedAircraft.navigation.verticalRate > 0 ? 'text-green-400' :
                    selectedAircraft.navigation.verticalRate < 0 ? 'text-orange-400' : 'text-gray-400'
                  }`}>
                    {selectedAircraft.navigation.verticalRate > 0 ? '+' : ''}{selectedAircraft.navigation.verticalRate} fpm
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-2 mt-3">
                  <div className="text-yellow-400 font-bold mb-2">FLIGHT PLAN</div>
                  <div className="space-y-1 text-[10px]">
                    <div>From: {selectedAircraft.flightPlan.departure}</div>
                    <div>To: {selectedAircraft.flightPlan.destination}</div>
                    <div>Route: {selectedAircraft.flightPlan.route}</div>
                    <div>Current: {selectedAircraft.flightPlan.currentWaypoint}</div>
                    <div>Next: {selectedAircraft.flightPlan.nextWaypoint}</div>
                    <div>ETA: {selectedAircraft.flightPlan.eta}</div>
                    <div>Fuel: {selectedAircraft.flightPlan.fuel}%</div>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-2 mt-3">
                  <div className="text-purple-400 font-bold mb-2">SEPARATION</div>
                  <div className="space-y-1 text-[10px]">
                    <div>Nearest: {selectedAircraft.separation.nearest}</div>
                    <div>Distance: {selectedAircraft.separation.distance}nm</div>
                    <div>Vertical: {selectedAircraft.separation.verticalSep}ft</div>
                    <div className={`${
                      selectedAircraft.separation.conflictLevel === 'NONE' ? 'text-green-400' :
                      selectedAircraft.separation.conflictLevel === 'MONITOR' ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      Conflict: {selectedAircraft.separation.conflictLevel}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 통신 로그 */}
          <div className="bg-gray-900 rounded-lg p-3">
            <h3 className="text-sm font-bold text-purple-400 mb-3 flex items-center">
              <MessageSquare className="w-4 h-4 mr-2" />
              COMMUNICATION LOG
            </h3>
            <div className="text-xs space-y-2 max-h-48 overflow-y-auto">
              {commLog.map((comm, index) => (
                <div key={index} className={`p-2 rounded border-l-2 ${
                  comm.from === 'FC' ? 'border-blue-500 bg-blue-900/20' : 'border-green-500 bg-green-900/20'
                }`}>
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-green-300 font-bold">{comm.from}</span>
                    <span className="text-purple-400">{comm.frequency}</span>
                  </div>
                  <div className="text-green-400">{comm.message}</div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-gray-500 text-[10px]">{comm.time.toLocaleTimeString()}</span>
                    <span className={`text-[10px] ${
                      comm.response === 'ROGER' ? 'text-green-400' :
                      comm.response === 'WILCO' ? 'text-blue-400' :
                      comm.response === 'CLEARED' ? 'text-purple-400' :
                      comm.response === 'PENDING' ? 'text-yellow-400' : 'text-gray-400'
                    }`}>
                      {comm.response}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 제어 도구 */}
          <div className="bg-gray-900 rounded-lg p-3">
            <h3 className="text-sm font-bold text-yellow-400 mb-3 flex items-center">
              <Settings className="w-4 h-4 mr-2" />
              CONTROL TOOLS
            </h3>
            <div className="space-y-2">
              <button className="w-full bg-green-800 hover:bg-green-700 text-white py-1 px-2 rounded text-xs">
                COORDINATE HANDOFF
              </button>
              <button className="w-full bg-blue-800 hover:bg-blue-700 text-white py-1 px-2 rounded text-xs">
                REQUEST CLEARANCE
              </button>
              <button className="w-full bg-purple-800 hover:bg-purple-700 text-white py-1 px-2 rounded text-xs">
                WEATHER DEVIATION
              </button>
              <button className="w-full bg-orange-800 hover:bg-orange-700 text-white py-1 px-2 rounded text-xs">
                EMERGENCY ASSIST
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 분류 표시 */}
      <div className="bg-red-900 text-white text-center py-1 font-bold text-xs">
        ★★ TOP SECRET // REL TO ROKAF // FLIGHT CONTROLLER WORKSTATION ★★
      </div>
    </div>
  );
};

export default FlightControllerWorkstation;