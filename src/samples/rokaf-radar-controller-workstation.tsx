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
  MonitorSpeaker, Layers, MapPin, Route, Signal,
  Waves, Scan, Gauge, Filter
} from 'lucide-react';

const RadarControllerWorkstation = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [radarMode, setRadarMode] = useState('SEARCH');
  const [radarRange, setRadarRange] = useState(100);
  const [radarSweep, setRadarSweep] = useState(0);
  const [signalFilter, setSignalFilter] = useState('ALL');
  const [trackingMode, setTrackingMode] = useState('AUTO');

  // 레이더 시스템 상태
  const radarSystems = [
    { id: 'AN/FPS-117', type: 'LONG RANGE', status: 'ONLINE', power: 95, range: 250, bearing: 'ALL', elevation: 45 },
    { id: 'AN/TPS-43G', type: 'MEDIUM RANGE', status: 'ONLINE', power: 88, range: 150, bearing: '045-225', elevation: 30 },
    { id: 'AN/MPQ-64F', type: 'SHORT RANGE', status: 'ACTIVE', power: 92, range: 75, bearing: 'SECTOR', elevation: 25 },
    { id: 'SECONDARY RADAR', type: 'IFF/SSR', status: 'ONLINE', power: 97, range: 200, bearing: 'ALL', elevation: 90 }
  ];

  // 상세 레이더 데이터가 있는 항적들
  const radarTracks = [
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

  // 레이더 성능 데이터
  const [radarPerformance, setRadarPerformance] = useState({
    detectionRate: 94.7,
    falseAlarmRate: 0.12,
    trackingAccuracy: 98.3,
    rangeAccuracy: 15,
    bearingAccuracy: 0.2,
    elevationAccuracy: 0.5,
    weatherClutter: 'LIGHT',
    groundClutter: 'MODERATE',
    jamming: 'NONE_DETECTED'
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setRadarSweep(prev => (prev + 6) % 360);
      
      // 레이더 성능 시뮬레이션
      setRadarPerformance(prev => ({
        ...prev,
        detectionRate: Math.min(Math.max(prev.detectionRate + (Math.random() - 0.5) * 0.1, 90), 99),
        falseAlarmRate: Math.max(Math.min(prev.falseAlarmRate + (Math.random() - 0.5) * 0.01, 0.2), 0.05),
        trackingAccuracy: Math.min(Math.max(prev.trackingAccuracy + (Math.random() - 0.5) * 0.1, 95), 99.5)
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const renderRadarScope = () => {
    const centerX = 300;
    const centerY = 250;
    const maxRadius = 200;

    return (
      <div className="relative w-full h-full bg-gray-950 rounded-lg border-2 border-green-600 overflow-hidden">
        {/* 레이더 스코프 배경 */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 500">
          <defs>
            {/* 레이더 그리드 패턴 */}
            <pattern id="radarGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(34, 197, 94, 0.3)" strokeWidth="0.5"/>
            </pattern>
            
            {/* 레이더 스위프 그라디언트 */}
            <defs>
              <radialGradient id="radarSweep" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(34, 197, 94, 0.8)" />
                <stop offset="50%" stopColor="rgba(34, 197, 94, 0.4)" />
                <stop offset="100%" stopColor="rgba(34, 197, 94, 0)" />
              </radialGradient>
            </defs>
          </defs>
          
          {/* 그리드 배경 */}
          <rect width="100%" height="100%" fill="url(#radarGrid)" />
          
          {/* 거리 링 */}
          <circle cx={centerX} cy={centerY} r={50} fill="none" stroke="#22c55e" strokeWidth="1" opacity="0.6" />
          <circle cx={centerX} cy={centerY} r={100} fill="none" stroke="#22c55e" strokeWidth="1" opacity="0.6" />
          <circle cx={centerX} cy={centerY} r={150} fill="none" stroke="#22c55e" strokeWidth="1" opacity="0.6" />
          <circle cx={centerX} cy={centerY} r={200} fill="none" stroke="#22c55e" strokeWidth="1" opacity="0.6" />
          
          {/* 방위선 */}
          <line x1={centerX} y1={centerY - 200} x2={centerX} y2={centerY + 200} stroke="#22c55e" strokeWidth="1" opacity="0.4" />
          <line x1={centerX - 200} y1={centerY} x2={centerX + 200} y2={centerY} stroke="#22c55e" strokeWidth="1" opacity="0.4" />
          <line x1={centerX - 141} y1={centerY - 141} x2={centerX + 141} y2={centerY + 141} stroke="#22c55e" strokeWidth="1" opacity="0.3" />
          <line x1={centerX + 141} y1={centerY - 141} x2={centerX - 141} y2={centerY + 141} stroke="#22c55e" strokeWidth="1" opacity="0.3" />
          
          {/* 레이더 스위프 */}
          <line 
            x1={centerX} 
            y1={centerY} 
            x2={centerX + 200 * Math.cos((radarSweep - 90) * Math.PI / 180)} 
            y2={centerY + 200 * Math.sin((radarSweep - 90) * Math.PI / 180)} 
            stroke="#4ade80" 
            strokeWidth="2" 
            opacity="0.8"
          />
          
          {/* 스위프 트레일 */}
          <path
            d={`M ${centerX} ${centerY} L ${centerX + 200 * Math.cos((radarSweep - 95) * Math.PI / 180)} ${centerY + 200 * Math.sin((radarSweep - 95) * Math.PI / 180)} A 200 200 0 0 1 ${centerX + 200 * Math.cos((radarSweep - 90) * Math.PI / 180)} ${centerY + 200 * Math.sin((radarSweep - 90) * Math.PI / 180)} Z`}
            fill="rgba(34, 197, 94, 0.2)"
          />
          
          {/* 거리 표시 */}
          <text x={centerX + 25} y={centerY - 3} fill="#22c55e" fontSize="10" textAnchor="middle">25</text>
          <text x={centerX + 75} y={centerY - 3} fill="#22c55e" fontSize="10" textAnchor="middle">50</text>
          <text x={centerX + 125} y={centerY - 3} fill="#22c55e" fontSize="10" textAnchor="middle">75</text>
          <text x={centerX + 175} y={centerY - 3} fill="#22c55e" fontSize="10" textAnchor="middle">100</text>
          
          {/* 방위각 표시 */}
          <text x={centerX} y={centerY - 210} fill="#22c55e" fontSize="12" textAnchor="middle" fontWeight="bold">000°</text>
          <text x={centerX + 210} y={centerY + 5} fill="#22c55e" fontSize="12" textAnchor="middle" fontWeight="bold">090°</text>
          <text x={centerX} y={centerY + 220} fill="#22c55e" fontSize="12" textAnchor="middle" fontWeight="bold">180°</text>
          <text x={centerX - 210} y={centerY + 5} fill="#22c55e" fontSize="12" textAnchor="middle" fontWeight="bold">270°</text>
        </svg>

        {/* 항적 표시 */}
        <div className="absolute inset-0">
          {radarTracks.map(track => {
            const trackX = 300 + (track.position.range * 2) * Math.cos((track.position.bearing - 90) * Math.PI / 180);
            const trackY = 250 + (track.position.range * 2) * Math.sin((track.position.bearing - 90) * Math.PI / 180);
            
            return (
              <div
                key={track.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all ${
                  selectedTrack?.id === track.id ? 'z-20' : 'z-10'
                }`}
                style={{ left: `${trackX}px`, top: `${trackY}px` }}
                onClick={() => setSelectedTrack(track)}
              >
                {/* 메인 트랙 심볼 */}
                <div className={`relative ${
                  track.classification.includes('FRIENDLY') ? 'text-green-400' :
                  track.classification.includes('UNKNOWN') ? 'text-yellow-400' :
                  track.classification.includes('STEALTH') ? 'text-purple-400' : 'text-red-400'
                }`}>
                  
                  {/* 트랙 심볼 */}
                  {track.classification.includes('FRIENDLY') ? (
                    <div className="w-4 h-4 bg-green-400 rounded-full border-2 border-green-600"></div>
                  ) : track.classification.includes('STEALTH') ? (
                    <div className="w-4 h-4 bg-purple-400 rotate-45 border-2 border-purple-600"></div>
                  ) : track.classification.includes('UNKNOWN') ? (
                    <div className="w-4 h-4 bg-yellow-400 border-2 border-yellow-600"></div>
                  ) : (
                    <div className="w-4 h-4 bg-red-400 rotate-45 border-2 border-red-600"></div>
                  )}
                  
                  {/* 속도 벡터 */}
                  <svg 
                    className="absolute top-2 left-2 pointer-events-none"
                    width="30" 
                    height="30"
                  >
                    <line 
                      x1="0" 
                      y1="0" 
                      x2={track.vector.speed / 30 * Math.cos(track.vector.heading * Math.PI / 180)} 
                      y2={track.vector.speed / 30 * Math.sin(track.vector.heading * Math.PI / 180)}
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                  
                  {/* 트랙 정보 라벨 */}
                  <div className={`absolute top-6 left-6 bg-gray-900/90 rounded px-1 py-0.5 text-[8px] font-mono border ${
                    selectedTrack?.id === track.id ? 'border-blue-400 bg-blue-900/50' : 'border-gray-600'
                  }`}>
                    <div>{track.callsign}</div>
                    <div>{track.position.range}nm</div>
                    <div>{track.position.bearing.toString().padStart(3, '0')}°</div>
                    <div>FL{Math.floor(track.position.elevation/100)}</div>
                  </div>
                  
                  {/* 신호 강도 표시 */}
                  <div className="absolute -top-2 -right-2">
                    <div className={`w-2 h-2 rounded-full ${
                      track.radarData.signalStrength > 80 ? 'bg-green-500' :
                      track.radarData.signalStrength > 50 ? 'bg-yellow-500' :
                      track.radarData.signalStrength > 30 ? 'bg-orange-500' : 'bg-red-500'
                    }`}></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 레이더 상태 오버레이 */}
        <div className="absolute top-4 left-4 bg-gray-900/80 rounded-lg p-2 text-xs">
          <div className="text-green-400 font-bold mb-1">RADAR STATUS</div>
          <div className="text-green-300">Mode: {radarMode}</div>
          <div className="text-green-300">Range: {radarRange}nm</div>
          <div className="text-green-300">Sweep: {radarSweep.toFixed(0)}°</div>
          <div className="text-green-300">Filter: {signalFilter}</div>
        </div>

        {/* 스케일 정보 */}
        <div className="absolute bottom-4 right-4 bg-gray-900/80 rounded-lg p-2 text-xs">
          <div className="text-green-400 font-bold mb-1">SCALE INFO</div>
          <div className="text-green-300">1 ring = 25nm</div>
          <div className="text-green-300">Max range: 100nm</div>
          <div className="text-green-300">Update: 6 sec</div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-green-300 font-mono">
      {/* 헤더 */}
      <div className="bg-red-900 text-white text-center py-1 font-bold text-xs">
        ★★ TOP SECRET // REL TO ROKAF // RADAR CONTROLLER WORKSTATION ★★
      </div>

      {/* 워크스테이션 헤더 */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-700 rounded-full flex items-center justify-center border-2 border-green-400 animate-pulse">
              <Radar className="w-8 h-8 text-green-200" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-green-300">RADAR CONTROLLER</h1>
              <p className="text-sm text-green-500">KE-14 Sector - LT Kim J.W. - Station Alpha</p>
            </div>
            <div className="flex space-x-2">
              <div className="px-3 py-1 rounded text-sm font-bold bg-green-900 text-green-300 border-2 border-green-400">
                RADAR ACTIVE
              </div>
              <div className="px-2 py-1 bg-blue-900 text-blue-300 rounded text-xs font-bold">
                {radarTracks.length} TRACKS
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-8 text-xs">
            <div className="text-center">
              <div className="text-green-400 font-bold text-lg">{currentTime.toLocaleTimeString('en-GB')}</div>
              <div className="text-green-600">RADAR TIME</div>
            </div>
            <div className="text-center">
              <div className="text-green-400 font-bold">{radarPerformance.detectionRate.toFixed(1)}%</div>
              <div className="text-green-600">DETECTION RATE</div>
            </div>
            <div className="text-center">
              <div className="text-green-400 font-bold">{radarPerformance.trackingAccuracy.toFixed(1)}%</div>
              <div className="text-green-600">TRACK ACCURACY</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-140px)]">
        {/* 좌측: 레이더 제어 패널 */}
        <div className="w-80 bg-gray-800 border-r border-gray-700 p-4 space-y-4 overflow-y-auto">
          {/* 레이더 모드 제어 */}
          <div className="bg-gray-900 rounded-lg p-3">
            <h3 className="text-sm font-bold text-green-400 mb-3 flex items-center">
              <Settings className="w-4 h-4 mr-2" />
              RADAR CONTROL
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-green-600 block mb-1">Radar Mode</label>
                <select 
                  value={radarMode} 
                  onChange={(e) => setRadarMode(e.target.value)}
                  className="w-full bg-gray-800 text-green-400 text-xs border border-gray-600 rounded px-2 py-1"
                >
                  <option value="SEARCH">SEARCH MODE</option>
                  <option value="TRACK">TRACK MODE</option>
                  <option value="TWS">TWS (Track While Scan)</option>
                  <option value="STT">STT (Single Target Track)</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-green-600 block mb-1">Range Scale: {radarRange}nm</label>
                <input 
                  type="range" 
                  min="25" 
                  max="200" 
                  step="25"
                  value={radarRange}
                  onChange={(e) => setRadarRange(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div>
                <label className="text-xs text-green-600 block mb-1">Signal Filter</label>
                <select 
                  value={signalFilter} 
                  onChange={(e) => setSignalFilter(e.target.value)}
                  className="w-full bg-gray-800 text-green-400 text-xs border border-gray-600 rounded px-2 py-1"
                >
                  <option value="ALL">ALL RETURNS</option>
                  <option value="PRIMARY">PRIMARY ONLY</option>
                  <option value="SECONDARY">SECONDARY ONLY</option>
                  <option value="CORRELATED">CORRELATED</option>
                  <option value="MILITARY">MILITARY ONLY</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-green-600 block mb-1">Tracking Mode</label>
                <select 
                  value={trackingMode} 
                  onChange={(e) => setTrackingMode(e.target.value)}
                  className="w-full bg-gray-800 text-green-400 text-xs border border-gray-600 rounded px-2 py-1"
                >
                  <option value="AUTO">AUTO TRACK</option>
                  <option value="MANUAL">MANUAL TRACK</option>
                  <option value="ASSISTED">OPERATOR ASSISTED</option>
                </select>
              </div>
            </div>
          </div>

          {/* 레이더 시스템 상태 */}
          <div className="bg-gray-900 rounded-lg p-3">
            <h3 className="text-sm font-bold text-green-400 mb-3 flex items-center">
              <Activity className="w-4 h-4 mr-2" />
              RADAR SYSTEMS
            </h3>
            <div className="space-y-2 text-xs">
              {radarSystems.map(radar => (
                <div key={radar.id} className="border border-gray-600 rounded p-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-green-300 font-bold">{radar.id}</span>
                    <span className={`px-1 py-0.5 rounded text-[10px] ${
                      radar.status === 'ONLINE' ? 'bg-green-900 text-green-300' :
                      radar.status === 'ACTIVE' ? 'bg-blue-900 text-blue-300' :
                      'bg-yellow-900 text-yellow-300'
                    }`}>
                      {radar.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-[10px]">
                    <div>Type: {radar.type}</div>
                    <div>Power: {radar.power}%</div>
                    <div>Range: {radar.range}nm</div>
                    <div>Elev: {radar.elevation}°</div>
                    <div>Bearing: {radar.bearing}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 성능 모니터 */}
          <div className="bg-gray-900 rounded-lg p-3">
            <h3 className="text-sm font-bold text-yellow-400 mb-3 flex items-center">
              <Gauge className="w-4 h-4 mr-2" />
              PERFORMANCE
            </h3>
            <div className="text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-green-600">Detection Rate:</span>
                <span className="text-green-400 font-bold">{radarPerformance.detectionRate.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-600">False Alarms:</span>
                <span className="text-yellow-400">{radarPerformance.falseAlarmRate.toFixed(2)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-600">Track Accuracy:</span>
                <span className="text-green-400">{radarPerformance.trackingAccuracy.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-600">Range Error:</span>
                <span className="text-green-400">±{radarPerformance.rangeAccuracy}m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-600">Bearing Error:</span>
                <span className="text-green-400">±{radarPerformance.bearingAccuracy}°</span>
              </div>
              <div className="border-t border-gray-700 pt-2 mt-2">
                <div className="flex justify-between">
                  <span className="text-green-600">Weather Clutter:</span>
                  <span className="text-blue-400">{radarPerformance.weatherClutter}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-600">Ground Clutter:</span>
                  <span className="text-yellow-400">{radarPerformance.groundClutter}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-600">Jamming:</span>
                  <span className="text-green-400">{radarPerformance.jamming}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 트랙 필터 */}
          <div className="bg-gray-900 rounded-lg p-3">
            <h3 className="text-sm font-bold text-blue-400 mb-3 flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              TRACK FILTERS
            </h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="friendly" className="text-green-400" defaultChecked />
                <label htmlFor="friendly" className="text-xs text-green-600">Show Friendly</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="unknown" className="text-yellow-400" defaultChecked />
                <label htmlFor="unknown" className="text-xs text-green-600">Show Unknown</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="hostile" className="text-red-400" defaultChecked />
                <label htmlFor="hostile" className="text-xs text-green-600">Show Hostile</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="stealth" className="text-purple-400" defaultChecked />
                <label htmlFor="stealth" className="text-xs text-green-600">Show Stealth</label>
              </div>
              <div className="border-t border-gray-700 pt-2 mt-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="vectors" className="text-blue-400" defaultChecked />
                  <label htmlFor="vectors" className="text-xs text-green-600">Show Vectors</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="history" className="text-purple-400" />
                  <label htmlFor="history" className="text-xs text-green-600">Show History</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 중앙: 메인 레이더 스코프 */}
        <div className="flex-1 bg-gray-900 p-4">
          {renderRadarScope()}
        </div>

        {/* 우측: 트랙 상세 정보 */}
        <div className="w-96 bg-gray-800 border-l border-gray-700 p-4 space-y-4 overflow-y-auto">
          {/* 선택된 트랙 상세 정보 */}
          {selectedTrack && (
            <div className="bg-gray-900 rounded-lg p-3 border-l-4 border-green-500">
              <h3 className="text-sm font-bold text-green-400 mb-3 flex items-center">
                <Target className="w-4 h-4 mr-2" />
                TRACK ANALYSIS: {selectedTrack.id}
              </h3>
              <div className="text-xs space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-green-600">Callsign:</div>
                  <div className="text-green-300">{selectedTrack.callsign}</div>
                  <div className="text-green-600">Classification:</div>
                  <div className="text-blue-300">{selectedTrack.classification}</div>
                  <div className="text-green-600">Track Quality:</div>
                  <div className={`font-bold ${
                    selectedTrack.trackQuality === 'HIGH' ? 'text-green-400' :
                    selectedTrack.trackQuality === 'MEDIUM' ? 'text-yellow-400' : 'text-red-400'
                  }`}>{selectedTrack.trackQuality}</div>
                  <div className="text-green-600">Range:</div>
                  <div className="text-green-300">{selectedTrack.position.range}nm</div>
                  <div className="text-green-600">Bearing:</div>
                  <div className="text-green-300">{selectedTrack.position.bearing.toString().padStart(3, '0')}°</div>
                  <div className="text-green-600">Altitude:</div>
                  <div className="text-green-300">{selectedTrack.position.elevation}ft</div>
                  <div className="text-green-600">Speed:</div>
                  <div className="text-green-300">{selectedTrack.vector.speed}kt</div>
                  <div className="text-green-600">Heading:</div>
                  <div className="text-green-300">{selectedTrack.vector.heading.toString().padStart(3, '0')}°</div>
                </div>

                <div className="border-t border-gray-700 pt-2 mt-3">
                  <div className="text-yellow-400 font-bold mb-2">RADAR DATA</div>
                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div>Primary Return:</div>
                    <div className={selectedTrack.radarData.primaryReturn ? 'text-green-400' : 'text-red-400'}>
                      {selectedTrack.radarData.primaryReturn ? 'YES' : 'NO'}
                    </div>
                    <div>Secondary Return:</div>
                    <div className={selectedTrack.radarData.secondaryReturn ? 'text-green-400' : 'text-red-400'}>
                      {selectedTrack.radarData.secondaryReturn ? 'YES' : 'NO'}
                    </div>
                    <div>Signal Strength:</div>
                    <div className="text-yellow-400">{selectedTrack.radarData.signalStrength}dB</div>
                    <div>RCS:</div>
                    <div className="text-yellow-400">{selectedTrack.radarData.rcs}m²</div>
                    <div>Squawk:</div>
                    <div className="text-purple-400">{selectedTrack.radarData.squawk}</div>
                    <div>Mode:</div>
                    <div className="text-purple-400">{selectedTrack.radarData.mode}</div>
                    <div>IFF:</div>
                    <div className={`${
                      selectedTrack.radarData.iff === 'FRIENDLY' ? 'text-green-400' :
                      selectedTrack.radarData.iff === 'NO_IFF' ? 'text-red-400' : 'text-yellow-400'
                    }`}>{selectedTrack.radarData.iff}</div>
                    <div>Doppler:</div>
                    <div className="text-blue-400">{selectedTrack.radarData.doppler}kt</div>
                    <div>SNR:</div>
                    <div className="text-green-400">{selectedTrack.radarData.snr}dB</div>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-2 mt-3">
                  <div className="text-blue-400 font-bold mb-2">RADAR SOURCES</div>
                  <div className="space-y-1">
                    {selectedTrack.radarSource.map(source => (
                      <div key={source} className="text-blue-300 text-[10px]">• {source}</div>
                    ))}
                  </div>
                  <div className="mt-2 text-[10px] text-gray-400">
                    Last Detection: {selectedTrack.lastDetection}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 전체 트랙 목록 */}
          <div className="bg-gray-900 rounded-lg p-3">
            <h3 className="text-sm font-bold text-green-400 mb-3 flex items-center">
              <Eye className="w-4 h-4 mr-2" />
              ALL TRACKS ({radarTracks.length})
            </h3>
            <div className="space-y-1 text-xs max-h-60 overflow-y-auto">
              {radarTracks.map(track => (
                <div 
                  key={track.id}
                  className={`p-2 rounded border cursor-pointer transition-all ${
                    selectedTrack?.id === track.id ? 'border-blue-500 bg-blue-900/20' :
                    track.classification.includes('FRIENDLY') ? 'border-green-600 hover:border-green-500' :
                    track.classification.includes('UNKNOWN') ? 'border-yellow-600 hover:border-yellow-500' :
                    track.classification.includes('STEALTH') ? 'border-purple-600 hover:border-purple-500' :
                    'border-red-600 hover:border-red-500'
                  }`}
                  onClick={() => setSelectedTrack(track)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-green-300">{track.callsign}</span>
                    <span className={`text-[10px] ${
                      track.trackQuality === 'HIGH' ? 'text-green-400' :
                      track.trackQuality === 'MEDIUM' ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {track.trackQuality}
                    </span>
                  </div>
                  <div className="text-[10px] text-gray-400">
                    {track.position.range}nm • {track.position.bearing.toString().padStart(3, '0')}° • FL{Math.floor(track.position.elevation/100)}
                  </div>
                  <div className="text-[10px] text-blue-400">
                    Signal: {track.radarData.signalStrength}dB • RCS: {track.radarData.rcs}m²
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 레이더 조작 도구 */}
          <div className="bg-gray-900 rounded-lg p-3">
            <h3 className="text-sm font-bold text-purple-400 mb-3 flex items-center">
              <Zap className="w-4 h-4 mr-2" />
              RADAR TOOLS
            </h3>
            <div className="space-y-2">
              <button className="w-full bg-green-800 hover:bg-green-700 text-white py-1 px-2 rounded text-xs">
                INITIATE TRACK
              </button>
              <button className="w-full bg-blue-800 hover:bg-blue-700 text-white py-1 px-2 rounded text-xs">
                REQUEST IFF
              </button>
              <button className="w-full bg-yellow-800 hover:bg-yellow-700 text-white py-1 px-2 rounded text-xs">
                CORRELATE PLOTS
              </button>
              <button className="w-full bg-orange-800 hover:bg-orange-700 text-white py-1 px-2 rounded text-xs">
                DROP TRACK
              </button>
              <button className="w-full bg-purple-800 hover:bg-purple-700 text-white py-1 px-2 rounded text-xs">
                ENHANCE SIGNAL
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 분류 표시 */}
      <div className="bg-red-900 text-white text-center py-1 font-bold text-xs">
        ★★ TOP SECRET // REL TO ROKAF // RADAR CONTROLLER WORKSTATION ★★
      </div>
    </div>
  );
};

export default RadarControllerWorkstation;