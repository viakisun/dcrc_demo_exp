import React, { useState, useEffect } from 'react';
import { 
  Target, Radar, Radio,
  Crosshair, Zap, Activity,
  Settings,
  Plane, CloudRain,
  Flame, Skull
} from 'lucide-react';

interface Track {
  id: string;
  callsign: string;
  type: string;
  mission: string;
  position: { x: number; y: number };
  vector: { dx: number; dy: number };
  speed: number;
  altitude: number;
  status: string;
  controller: string;
  fuel: number | string;
  weapons: string;
  pilot: string;
  eta: string;
}

const ROKAFMCRCAdvanced = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedGrid, setSelectedGrid] = useState('KE-12');
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [threatLevel] = useState('FPCON-BRAVO');
  const [radarMode, setRadarMode] = useState('WIDE_AREA');
  const [showTrails, setShowTrails] = useState(true);
  const [alertLevel, setAlertLevel] = useState('NORMAL');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 확장된 동아시아 격자 체계 (15개 구역)
  const gridSectors = [
    { id: 'IE-06', controller: 'LT Col Park S.H.', tracks: 8, threat: 'LOW', activity: 'NORMAL', color: 'green' },
    { id: 'IE-10', controller: 'MAJ Kim D.W.', tracks: 15, threat: 'LOW', activity: 'PATROL', color: 'green' },
    { id: 'IE-14', controller: 'CPT Lee J.S.', tracks: 12, threat: 'MEDIUM', activity: 'ALERT', color: 'yellow' },
    { id: 'JE-06', controller: 'MAJ Choi H.K.', tracks: 23, threat: 'LOW', activity: 'NORMAL', color: 'green' },
    { id: 'JE-10', controller: 'CPT Park J.H.', tracks: 31, threat: 'HIGH', activity: 'INTERCEPT', color: 'red' },
    { id: 'JE-14', controller: 'LT Kim M.J.', tracks: 18, threat: 'MEDIUM', activity: 'CAP', color: 'yellow' },
    { id: 'KE-06', controller: 'COL Jung S.M.', tracks: 45, threat: 'CRITICAL', activity: 'SCRAMBLE', color: 'red' },
    { id: 'KE-10', controller: 'MAJ Jung H.W.', tracks: 38, threat: 'HIGH', activity: 'VECTOR', color: 'red' },
    { id: 'KE-14', controller: 'CPT Park M.S.', tracks: 27, threat: 'MEDIUM', activity: 'MONITOR', color: 'yellow' },
    { id: 'LE-06', controller: 'LT Song K.Y.', tracks: 19, threat: 'LOW', activity: 'PATROL', color: 'green' },
    { id: 'LE-10', controller: 'CPT Kim J.H.', tracks: 33, threat: 'MEDIUM', activity: 'ALERT', color: 'yellow' },
    { id: 'LE-14', controller: 'MAJ Lee D.S.', tracks: 22, threat: 'LOW', activity: 'NORMAL', color: 'green' },
    { id: 'ME-06', controller: 'CPT Yoo H.J.', tracks: 14, threat: 'LOW', activity: 'SEARCH', color: 'green' },
    { id: 'ME-10', controller: 'MAJ Seo M.K.', tracks: 26, threat: 'MEDIUM', activity: 'TRACK', color: 'yellow' },
    { id: 'ME-14', controller: 'LT Col Lim J.W.', tracks: 17, threat: 'LOW', activity: 'NORMAL', color: 'green' }
  ];

  // 확장된 항공기/드론/위협 추적 시스템
  const activeTracks = [
    // 아군 전투기
    { 
      id: 'KAF001', callsign: 'VIPER-01', type: 'F-16C', mission: 'CAP',
      position: { x: 420, y: 180 }, vector: { dx: -8, dy: 6 },
      speed: 420, altitude: 28000, status: 'FRIENDLY', controller: 'KE-10',
      fuel: 68, weapons: 'AIM-120C x4', pilot: 'CPT Kim S.H.', eta: '15:30Z'
    },
    { 
      id: 'KAF002', callsign: 'VIPER-02', type: 'F-16C', mission: 'CAP',
      position: { x: 440, y: 200 }, vector: { dx: -6, dy: 8 },
      speed: 415, altitude: 27000, status: 'FRIENDLY', controller: 'KE-10',
      fuel: 72, weapons: 'AIM-120C x4', pilot: 'CPT Lee J.W.', eta: '15:35Z'
    },
    // 차세대 전투기
    { 
      id: 'KAF003', callsign: 'STEALTH-01', type: 'F-35A', mission: 'DCA',
      position: { x: 380, y: 160 }, vector: { dx: 12, dy: -4 },
      speed: 480, altitude: 35000, status: 'FRIENDLY', controller: 'JE-10',
      fuel: 85, weapons: 'AIM-120C x2, AIM-9X x2', pilot: 'MAJ Park H.S.', eta: '16:00Z'
    },
    // 드론 편대
    { 
      id: 'UAV001', callsign: 'HAWK-01', type: 'MQ-9 Reaper', mission: 'ISR',
      position: { x: 340, y: 200 }, vector: { dx: 3, dy: -2 },
      speed: 135, altitude: 18000, status: 'FRIENDLY', controller: 'JE-14',
      fuel: 92, weapons: 'Hellfire x2', pilot: 'SGT Kim M.J.', eta: '18:45Z'
    },
    { 
      id: 'UAV002', callsign: 'GHOST-02', type: 'KUS-FS', mission: 'SEAD',
      position: { x: 320, y: 220 }, vector: { dx: 5, dy: 1 },
      speed: 180, altitude: 15000, status: 'FRIENDLY', controller: 'JE-14',
      fuel: 78, weapons: 'AGM-88 x4', pilot: 'SGT Park D.K.', eta: '17:20Z'
    },
    // 민간기
    { 
      id: 'CIV001', callsign: 'KAL-123', type: 'B777-300', mission: 'CIVIL',
      position: { x: 450, y: 250 }, vector: { dx: -12, dy: 3 },
      speed: 485, altitude: 37000, status: 'FRIENDLY', controller: 'KE-14',
      fuel: 65, weapons: 'NONE', pilot: 'CPT civilian', eta: '14:55Z'
    },
    { 
      id: 'CIV002', callsign: 'AAR-456', type: 'A320', mission: 'CIVIL',
      position: { x: 520, y: 180 }, vector: { dx: -15, dy: -2 },
      speed: 460, altitude: 39000, status: 'FRIENDLY', controller: 'KE-14',
      fuel: 58, weapons: 'NONE', pilot: 'CPT civilian', eta: '15:15Z'
    },
    // 미식별/적 위협
    { 
      id: 'UNK001', callsign: 'UNKNOWN-1', type: '?', mission: '?',
      position: { x: 280, y: 160 }, vector: { dx: 18, dy: 12 },
      speed: 540, altitude: 32000, status: 'UNKNOWN', controller: 'JE-06',
      fuel: '?', weapons: '?', pilot: '?', eta: '?'
    },
    { 
      id: 'THR001', callsign: 'BANDIT-1', type: 'J-20?', mission: 'HOSTILE',
      position: { x: 250, y: 140 }, vector: { dx: 22, dy: 15 },
      speed: 620, altitude: 35000, status: 'HOSTILE', controller: 'JE-06',
      fuel: '?', weapons: 'UNKNOWN', pilot: '?', eta: '?'
    },
    // 정찰기
    { 
      id: 'REC001', callsign: 'SENTRY-01', type: 'E-737', mission: 'AEW',
      position: { x: 400, y: 120 }, vector: { dx: -3, dy: 8 },
      speed: 280, altitude: 30000, status: 'FRIENDLY', controller: 'IE-10',
      fuel: 88, weapons: 'NONE', pilot: 'MAJ Choi S.K.', eta: '19:30Z'
    },
    // 공중급유기
    { 
      id: 'TKR001', callsign: 'SHELL-01', type: 'KC-330', mission: 'AAR',
      position: { x: 360, y: 280 }, vector: { dx: 2, dy: -6 },
      speed: 240, altitude: 25000, status: 'FRIENDLY', controller: 'LE-10',
      fuel: 95, weapons: 'NONE', pilot: 'LT Col Kim H.W.', eta: '16:45Z'
    }
  ];

  // 지상 위협 요소
  const groundThreats = [
    { id: 'SAM001', type: 'SA-21 GROWLER', position: { x: 230, y: 180 }, range: 400, status: 'ACTIVE', threat: 'HIGH' },
    { id: 'SAM002', type: 'SA-20 GARGOYLE', position: { x: 200, y: 200 }, range: 300, status: 'ACTIVE', threat: 'MEDIUM' },
    { id: 'RAD001', type: 'BIG BIRD RADAR', position: { x: 180, y: 160 }, range: 500, status: 'SCANNING', threat: 'LOW' },
    { id: 'AAA001', type: 'ZSU-23-4', position: { x: 260, y: 220 }, range: 25, status: 'STANDBY', threat: 'LOW' }
  ];

  const renderTrack = (track) => {
    const colors = {
      'FRIENDLY': 'text-green-400 bg-green-900/30 border-green-400',
      'UNKNOWN': 'text-yellow-400 bg-yellow-900/30 border-yellow-400',
      'HOSTILE': 'text-red-400 bg-red-900/30 border-red-400'
    };

    const shapes = {
      'FRIENDLY': 'rounded-full',
      'UNKNOWN': 'rounded-sm',
      'HOSTILE': 'rounded-none rotate-45'
    };

    const vectorAngle = Math.atan2(track.vector.dy, track.vector.dx) * 180 / Math.PI;
    const vectorLength = Math.min(track.speed / 25, 25);

    return (
      <div key={track.id} className="absolute">
        {/* 메인 트랙 표시 */}
        <div 
          className={`absolute ${colors[track.status]} ${shapes[track.status]} border-2 p-1.5 text-[10px] font-mono transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:bg-opacity-80 transition-all shadow-lg`}
          style={{ 
            left: `${track.position.x}px`, 
            top: `${track.position.y}px`
          }}
          onClick={() => setSelectedTrack(track)}
        >
          <div className="flex items-center space-x-1">
            <div className={`w-3 h-3 ${
              track.status === 'FRIENDLY' ? 'bg-green-400' : 
              track.status === 'UNKNOWN' ? 'bg-yellow-400' : 'bg-red-400'
            } ${shapes[track.status]}`}></div>
            <span className="text-[9px] font-bold">{track.callsign}</span>
          </div>
          <div className="text-[8px] mt-1">
            <div>{track.type}</div>
            <div>{track.altitude}ft</div>
          </div>
        </div>
        
        {/* 향상된 속도/방향 벡터 */}
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
            <marker id={`arrowhead-${track.id}`} markerWidth="8" markerHeight="6" 
              refX="7" refY="3" orient="auto">
              <polygon 
                points="0 0, 8 3, 0 6"
                fill={
                  track.status === 'FRIENDLY' ? '#4ade80' : 
                  track.status === 'UNKNOWN' ? '#facc15' : '#f87171'
                }
              />
            </marker>
          </defs>
          <line 
            x1="30" 
            y1="30" 
            x2={30 + vectorLength * Math.cos(vectorAngle * Math.PI / 180)} 
            y2={30 + vectorLength * Math.sin(vectorAngle * Math.PI / 180)}
            stroke={
              track.status === 'FRIENDLY' ? '#4ade80' : 
              track.status === 'UNKNOWN' ? '#facc15' : '#f87171'
            }
            strokeWidth="2"
            markerEnd={`url(#arrowhead-${track.id})`}
          />
        </svg>

        {/* 항적 꼬리 (조건부 표시) */}
        {showTrails && (
          <svg 
            className="absolute pointer-events-none"
            style={{ 
              left: `${track.position.x}px`, 
              top: `${track.position.y}px`,
              transform: 'translate(-50%, -50%)'
            }}
            width="120" 
            height="120"
          >
            <path
              d={`M 60,60 L ${60 - track.vector.dx * 3},${60 - track.vector.dy * 3} L ${60 - track.vector.dx * 6},${60 - track.vector.dy * 6} L ${60 - track.vector.dx * 9},${60 - track.vector.dy * 9}`}
              stroke={
                track.status === 'FRIENDLY' ? '#4ade80' : 
                track.status === 'UNKNOWN' ? '#facc15' : '#f87171'
              }
              strokeWidth="1"
              strokeDasharray="3,3"
              opacity="0.4"
              fill="none"
            />
          </svg>
        )}
      </div>
    );
  };

  const renderGroundThreat = (threat) => {
    const threatColors = {
      'HIGH': '#ef4444',
      'MEDIUM': '#f97316', 
      'LOW': '#eab308'
    };

    return (
      <div key={threat.id} className="absolute">
        {/* 위협 범위 원 */}
        <svg
          className="absolute pointer-events-none"
          style={{ 
            left: `${threat.position.x}px`, 
            top: `${threat.position.y}px`,
            transform: 'translate(-50%, -50%)'
          }}
          width={threat.range / 2}
          height={threat.range / 2}
        >
          <circle 
            cx={threat.range / 4} 
            cy={threat.range / 4} 
            r={threat.range / 4}
            fill="none"
            stroke={threatColors[threat.threat]}
            strokeWidth="1"
            strokeDasharray="4,4"
            opacity="0.3"
          />
        </svg>
        
        {/* 위협 아이콘 */}
        <div 
          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          style={{ 
            left: `${threat.position.x}px`, 
            top: `${threat.position.y}px`
          }}
        >
          <div className="bg-red-900/60 border border-red-400 rounded p-1">
            <Skull className="w-3 h-3 text-red-400" />
          </div>
          <div className="text-[8px] text-red-400 text-center mt-1 font-mono">
            {threat.type.split(' ')[0]}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-green-300 font-mono">
      {/* TOP SECRET 헤더 */}
      <div className="bg-red-900 text-white text-center py-1 font-bold text-xs">
        ★★ TOP SECRET // REL TO ROKAF ★★
      </div>

      {/* 향상된 메인 헤더 */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-700 rounded-full flex items-center justify-center border-2 border-green-400 animate-pulse">
              <Radar className="w-8 h-8 text-green-200" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-green-300">ROKAF MCRC-II</h1>
              <p className="text-sm text-green-500">Master Control and Reporting Center - Next Generation</p>
            </div>
            <div className="flex space-x-2">
              <div className={`px-2 py-1 rounded text-xs font-bold ${
                alertLevel === 'NORMAL' ? 'bg-green-900 text-green-300' :
                alertLevel === 'ALERT' ? 'bg-yellow-900 text-yellow-300' : 'bg-red-900 text-red-300'
              }`}>
                {alertLevel}
              </div>
              <div className="px-2 py-1 bg-blue-900 text-blue-300 rounded text-xs font-bold">
                OPSEC GREEN
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-8 text-xs">
            <div className="text-center">
              <div className="text-green-400 font-bold text-lg">{currentTime.toLocaleTimeString('en-GB', { timeZone: 'Asia/Seoul' })}</div>
              <div className="text-green-600">KST / ZULU {currentTime.toLocaleTimeString('en-GB', { timeZone: 'UTC' })}</div>
            </div>
            <div className="text-center">
              <div className="text-yellow-400 font-bold text-lg">{threatLevel}</div>
              <div className="text-yellow-600">FORCE PROTECTION</div>
            </div>
            <div className="text-center">
              <div className="text-blue-400 font-bold">AIRSPACE-1</div>
              <div className="text-blue-600">CONTROLLED</div>
            </div>
            <div className="text-center">
              <div className="text-purple-400 font-bold">{activeTracks.length}</div>
              <div className="text-purple-600">ACTIVE TRACKS</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-140px)]">
        {/* 확장된 좌측 제어판 */}
        <div className="w-96 bg-gray-800 border-r border-gray-700 p-4 space-y-4 overflow-y-auto">
          {/* 제어 옵션 */}
          <div className="bg-gray-900 rounded-lg p-3">
            <h3 className="text-sm font-bold text-green-400 mb-3 flex items-center">
              <Settings className="w-4 h-4 mr-2" />
              DISPLAY CONTROL
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-green-600">Radar Mode</span>
                <select 
                  value={radarMode} 
                  onChange={(e) => setRadarMode(e.target.value)}
                  className="bg-gray-800 text-green-400 text-xs border border-gray-600 rounded px-2 py-1"
                >
                  <option value="WIDE_AREA">WIDE AREA</option>
                  <option value="SECTOR_ZOOM">SECTOR ZOOM</option>
                  <option value="THREAT_FOCUS">THREAT FOCUS</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-green-600">Show Trails</span>
                <button 
                  onClick={() => setShowTrails(!showTrails)}
                  className={`px-2 py-1 rounded text-xs ${showTrails ? 'bg-green-800 text-green-300' : 'bg-gray-700 text-gray-400'}`}
                >
                  {showTrails ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>
          </div>

          {/* 확장된 격자 구역 현황 */}
          <div className="bg-gray-900 rounded-lg p-3">
            <h3 className="text-sm font-bold text-green-400 mb-3 flex items-center">
              <Target className="w-4 h-4 mr-2" />
              SECTOR STATUS (15 GRIDS)
            </h3>
            <div className="space-y-1 text-xs max-h-48 overflow-y-auto">
              {gridSectors.map(sector => (
                <div 
                  key={sector.id}
                  className={`flex justify-between items-center p-2 rounded border ${
                    selectedGrid === sector.id ? 'bg-blue-900/30 border-blue-500' : 'border-gray-600'
                  } cursor-pointer hover:border-green-500 transition-colors`}
                  onClick={() => setSelectedGrid(sector.id)}
                >
                  <div>
                    <div className="text-green-300 font-bold">{sector.id}</div>
                    <div className="text-green-600 text-[10px]">{sector.controller}</div>
                    <div className="text-blue-400 text-[10px]">{sector.activity}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-bold">{sector.tracks}</div>
                    <div className={`text-[10px] ${
                      sector.threat === 'LOW' ? 'text-green-500' :
                      sector.threat === 'MEDIUM' ? 'text-yellow-500' : 
                      sector.threat === 'HIGH' ? 'text-orange-500' : 'text-red-500'
                    }`}>
                      {sector.threat}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 향상된 시스템 상태 */}
          <div className="bg-gray-900 rounded-lg p-3">
            <h3 className="text-sm font-bold text-green-400 mb-3 flex items-center">
              <Activity className="w-4 h-4 mr-2" />
              SYSTEM STATUS
            </h3>
            <div className="space-y-2 text-xs">
              {[
                { name: 'AN/FPS-117', status: 'ONLINE', param: '6.0s', quality: 98 },
                { name: 'AN/TPS-43G', status: 'ONLINE', param: 'MODE-S', quality: 95 },
                { name: 'LINK-16 TDL', status: 'SECURE', param: 'NPG-1', quality: 99 },
                { name: 'SATCOM MILSTAR', status: 'ONLINE', param: 'EHF', quality: 97 },
                { name: 'IFF MODE-4/5', status: 'ACTIVE', param: 'CRYPTO', quality: 100 },
                { name: 'AEGIS SPY-1D', status: 'STANDBY', param: 'READY', quality: 92 },
                { name: 'PATRIOT AN/MPQ', status: 'TRACKING', param: 'TBM', quality: 94 },
                { name: 'THAAD AN/TPY-2', status: 'SEARCH', param: 'X-BAND', quality: 96 }
              ].map(sys => (
                <div key={sys.name} className="flex justify-between items-center">
                  <span className="text-green-600">{sys.name}</span>
                  <div className="text-right">
                    <span className="text-green-400">{sys.status}</span>
                    <div className="text-green-500">{sys.param} ({sys.quality}%)</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 위협 평가 */}
          <div className="bg-red-900/20 rounded-lg p-3 border border-red-700">
            <h3 className="text-sm font-bold text-red-400 mb-3 flex items-center">
              <Flame className="w-4 h-4 mr-2" />
              THREAT ASSESSMENT
            </h3>
            <div className="space-y-2 text-xs">
              {groundThreats.map(threat => (
                <div key={threat.id} className="flex justify-between items-center">
                  <span className="text-red-300">{threat.id}</span>
                  <div className="text-right">
                    <div className="text-red-400">{threat.type}</div>
                    <div className={`${
                      threat.threat === 'HIGH' ? 'text-red-500' :
                      threat.threat === 'MEDIUM' ? 'text-orange-500' : 'text-yellow-500'
                    }`}>
                      {threat.status} - {threat.threat}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 고급 제어 */}
          <div className="bg-purple-900/20 rounded-lg p-3 border border-purple-700">
            <h3 className="text-sm font-bold text-purple-400 mb-3 flex items-center">
              <Zap className="w-4 h-4 mr-2" />
              BATTLE MANAGEMENT
            </h3>
            <div className="space-y-2">
              <button 
                onClick={() => setAlertLevel(alertLevel === 'NORMAL' ? 'ALERT' : alertLevel === 'ALERT' ? 'CRITICAL' : 'NORMAL')}
                className="w-full bg-purple-800 hover:bg-purple-700 text-white py-1 px-2 rounded text-xs"
              >
                ESCALATE ALERT LEVEL
              </button>
              <button className="w-full bg-red-800 hover:bg-red-700 text-white py-1 px-2 rounded text-xs">
                ACTIVATE AIR DEFENSE
              </button>
              <button className="w-full bg-orange-800 hover:bg-orange-700 text-white py-1 px-2 rounded text-xs">
                LAUNCH INTERCEPTORS
              </button>
              <button className="w-full bg-blue-800 hover:bg-blue-700 text-white py-1 px-2 rounded text-xs">
                COORDINATE STRIKE
              </button>
            </div>
          </div>
        </div>

        {/* 향상된 중앙 지도 영역 */}
        <div className="flex-1 bg-gray-900 relative overflow-hidden">
          {/* 고해상도 동아시아 지도 배경 */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 700">
            {/* 정밀 격자 체계 */}
            <defs>
              <pattern id="grid" width="66" height="46" patternUnits="userSpaceOnUse">
                <path d="M 66 0 L 0 0 0 46" fill="none" stroke="rgba(34, 197, 94, 0.3)" strokeWidth="0.5"/>
              </pattern>
              <pattern id="majorGrid" width="200" height="140" patternUnits="userSpaceOnUse">
                <path d="M 200 0 L 0 0 0 140" fill="none" stroke="rgba(34, 197, 94, 0.6)" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <rect width="100%" height="100%" fill="url(#majorGrid)" />
            
            {/* 격자 라벨 (5x3 = 15개 구역) */}
            {['IE-06', 'IE-10', 'IE-14'].map((label, i) => (
              <text key={label} x={150 + i*200} y={90} fill="#22c55e" fontSize="14" textAnchor="middle" fontWeight="bold">{label}</text>
            ))}
            {['JE-06', 'JE-10', 'JE-14'].map((label, i) => (
              <text key={label} x={150 + i*200} y={230} fill="#22c55e" fontSize="14" textAnchor="middle" fontWeight="bold">{label}</text>
            ))}
            {['KE-06', 'KE-10', 'KE-14'].map((label, i) => (
              <text key={label} x={150 + i*200} y={370} fill="#22c55e" fontSize="14" textAnchor="middle" fontWeight="bold">{label}</text>
            ))}
            {['LE-06', 'LE-10', 'LE-14'].map((label, i) => (
              <text key={label} x={150 + i*200} y={510} fill="#22c55e" fontSize="14" textAnchor="middle" fontWeight="bold">{label}</text>
            ))}
            {['ME-06', 'ME-10', 'ME-14'].map((label, i) => (
              <text key={label} x={150 + i*200} y={650} fill="#22c55e" fontSize="14" textAnchor="middle" fontWeight="bold">{label}</text>
            ))}

            {/* 상세 한반도 지형 */}
            <path 
              d="M 480 280 L 495 270 L 510 275 L 525 285 L 535 310 L 540 340 L 535 370 L 525 395 L 515 405 L 500 410 L 485 405 L 470 395 L 460 370 L 465 340 L 480 310 Z" 
              fill="rgba(34, 197, 94, 0.3)" 
              stroke="#22c55e" 
              strokeWidth="2"
            />
            
            {/* 상세 DMZ */}
            <line x1="460" y1="310" x2="540" y2="310" stroke="#ef4444" strokeWidth="3" strokeDasharray="6,6" />
            <text x="500" y="305" fill="#ef4444" fontSize="12" textAnchor="middle" fontWeight="bold">DMZ - 비무장지대</text>

            {/* 중국 대륙 */}
            <path 
              d="M 50 200 L 150 220 L 250 240 L 350 260 L 400 290 L 420 330 L 400 370 L 350 400 L 250 420 L 150 440 L 50 460" 
              fill="none" 
              stroke="rgba(34, 197, 94, 0.7)" 
              strokeWidth="3"
            />
            <text x="250" y="330" fill="#22c55e" fontSize="18" fontWeight="bold">CHINA (PRC)</text>

            {/* 일본 열도 상세 */}
            <ellipse cx="650" cy="330" rx="45" ry="120" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2" />
            <ellipse cx="720" cy="350" rx="30" ry="90" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2" />
            <ellipse cx="780" cy="370" rx="20" ry="60" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2" />
            <text x="650" y="335" fill="#22c55e" fontSize="16" textAnchor="middle" fontWeight="bold">JAPAN</text>

            {/* 러시아 연방 */}
            <line x1="50" y1="150" x2="950" y2="150" stroke="rgba(34, 197, 94, 0.7)" strokeWidth="3" />
            <text x="500" y="140" fill="#22c55e" fontSize="18" textAnchor="middle" fontWeight="bold">RUSSIAN FEDERATION</text>

            {/* 북한 */}
            <path 
              d="M 480 220 L 500 210 L 520 215 L 535 230 L 540 250 L 535 280 L 500 310 L 480 310 L 465 280 L 470 250 L 480 230 Z" 
              fill="rgba(239, 68, 68, 0.2)" 
              stroke="#ef4444" 
              strokeWidth="2"
            />
            <text x="500" y="265" fill="#ef4444" fontSize="12" textAnchor="middle" fontWeight="bold">DPRK</text>

            {/* 주요 도시 표시 */}
            <circle cx="500" cy="380" r="3" fill="#22c55e" />
            <text x="505" y="385" fill="#22c55e" fontSize="10">SEOUL</text>
            <circle cx="520" cy="420" r="2" fill="#22c55e" />
            <text x="525" y="425" fill="#22c55e" fontSize="10">BUSAN</text>
          </svg>

          {/* 지상 위협 표시 */}
          <div className="absolute inset-0">
            {groundThreats.map(threat => renderGroundThreat(threat))}
          </div>

          {/* 실시간 항적 표시 */}
          <div className="absolute inset-0">
            {activeTracks.map(track => renderTrack(track))}
          </div>

          {/* 향상된 레이더 스위프 */}
          <div className="absolute top-4 right-4 w-32 h-32 bg-green-900/20 rounded-full border-2 border-green-600 flex items-center justify-center">
            <div className="animate-spin w-full h-full flex items-center justify-center">
              <div className="w-28 h-0.5 bg-gradient-to-r from-green-400 via-green-300 to-transparent origin-left"></div>
            </div>
            <div className="absolute text-xs text-green-400 bottom-2">1200NM</div>
            <div className="absolute text-xs text-green-600 top-2">{radarMode}</div>
          </div>

          {/* 실시간 상태 표시 */}
          <div className="absolute bottom-4 left-4 bg-gray-900/80 rounded-lg p-2 border border-gray-700">
            <div className="text-xs text-green-400 space-y-1">
              <div>총 항적: <span className="text-green-300 font-bold">{activeTracks.length}</span></div>
              <div>아군: <span className="text-green-300">{activeTracks.filter(t => t.status === 'FRIENDLY').length}</span></div>
              <div>미식별: <span className="text-yellow-300">{activeTracks.filter(t => t.status === 'UNKNOWN').length}</span></div>
              <div>적성: <span className="text-red-300">{activeTracks.filter(t => t.status === 'HOSTILE').length}</span></div>
            </div>
          </div>
        </div>

        {/* 확장된 우측 정보 패널 */}
        <div className="w-96 bg-gray-800 border-l border-gray-700 p-4 space-y-4 overflow-y-auto">
          {/* 선택된 항적 상세 정보 */}
          {selectedTrack && (
            <div className="bg-gray-900 rounded-lg p-3 border-l-4 border-blue-500">
              <h3 className="text-sm font-bold text-blue-400 mb-3 flex items-center">
                <Crosshair className="w-4 h-4 mr-2" />
                TRACK DETAILS
              </h3>
              <div className="text-xs space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-green-600">Callsign:</div>
                  <div className="text-green-300 font-bold">{selectedTrack.callsign}</div>
                  <div className="text-green-600">Type:</div>
                  <div className="text-green-300">{selectedTrack.type}</div>
                  <div className="text-green-600">Mission:</div>
                  <div className="text-green-300">{selectedTrack.mission}</div>
                  <div className="text-green-600">Altitude:</div>
                  <div className="text-green-300">{selectedTrack.altitude}ft</div>
                  <div className="text-green-600">Speed:</div>
                  <div className="text-green-300">{selectedTrack.speed}kt</div>
                  <div className="text-green-600">Fuel:</div>
                  <div className="text-green-300">{selectedTrack.fuel}%</div>
                  <div className="text-green-600">Weapons:</div>
                  <div className="text-green-300">{selectedTrack.weapons}</div>
                  <div className="text-green-600">Pilot:</div>
                  <div className="text-green-300">{selectedTrack.pilot}</div>
                  <div className="text-green-600">ETA RTB:</div>
                  <div className="text-green-300">{selectedTrack.eta}</div>
                  <div className="text-green-600">Controller:</div>
                  <div className="text-green-300">{selectedTrack.controller}</div>
                </div>
                <div className="mt-3 pt-2 border-t border-gray-700">
                  <div className={`px-2 py-1 rounded text-center font-bold ${
                    selectedTrack.status === 'FRIENDLY' ? 'bg-green-900 text-green-300' :
                    selectedTrack.status === 'UNKNOWN' ? 'bg-yellow-900 text-yellow-300' :
                    'bg-red-900 text-red-300'
                  }`}>
                    {selectedTrack.status}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 임무별 항적 분류 */}
          <div className="bg-gray-900 rounded-lg p-3">
            <h3 className="text-sm font-bold text-green-400 mb-3 flex items-center">
              <Plane className="w-4 h-4 mr-2" />
              MISSION BREAKDOWN
            </h3>
            <div className="space-y-2 text-xs">
              {Object.entries(
                activeTracks.reduce((acc, track) => {
                  acc[track.mission] = (acc[track.mission] || 0) + 1;
                  return acc;
                }, {})
              ).map(([mission, count]) => (
                <div key={mission} className="flex justify-between items-center">
                  <span className="text-green-600">{mission}</span>
                  <span className="text-green-300 font-bold">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 실시간 통신 로그 */}
          <div className="bg-gray-900 rounded-lg p-3">
            <h3 className="text-sm font-bold text-green-400 mb-3 flex items-center">
              <Radio className="w-4 h-4 mr-2" />
              COMM LOG
            </h3>
            <div className="text-xs space-y-1 max-h-32 overflow-y-auto">
              <div className="text-green-600">[{currentTime.toLocaleTimeString()}] VIPER-01: Fuel check 68%</div>
              <div className="text-yellow-600">[{currentTime.toLocaleTimeString()}] UNKNOWN-1: No IFF response</div>
              <div className="text-red-600">[{currentTime.toLocaleTimeString()}] BANDIT-1: Hostile track confirmed</div>
              <div className="text-green-600">[{currentTime.toLocaleTimeString()}] HAWK-01: ISR mission complete</div>
            </div>
          </div>

          {/* 날씨 및 환경 정보 */}
          <div className="bg-gray-900 rounded-lg p-3">
            <h3 className="text-sm font-bold text-green-400 mb-3 flex items-center">
              <CloudRain className="w-4 h-4 mr-2" />
              ENVIRONMENTAL
            </h3>
            <div className="text-xs space-y-1">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-green-600">RKSS Wind:</div>
                <div className="text-green-300">280°/18kt G25kt</div>
                <div className="text-green-600">Visibility:</div>
                <div className="text-green-300">15km</div>
                <div className="text-green-600">Cloud Base:</div>
                <div className="text-green-300">2800ft AGL</div>
                <div className="text-green-600">QNH:</div>
                <div className="text-green-300">1015.8 hPa</div>
                <div className="text-green-600">Temperature:</div>
                <div className="text-green-300">18°C</div>
                <div className="text-green-600">Dewpoint:</div>
                <div className="text-green-300">12°C</div>
              </div>
              <div className="mt-2 text-yellow-500">
                <div>⚠ SIGMET: Severe turbulence FL280-380</div>
                <div>⚠ AIRMET: Mountain wave activity</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 분류 표시 */}
      <div className="bg-red-900 text-white text-center py-1 font-bold text-xs">
        ★★ TOP SECRET // REL TO ROKAF ★★
      </div>
    </div>
  );
};

export default ROKAFMCRCAdvanced;