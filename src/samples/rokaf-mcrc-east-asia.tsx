import React, { useState, useEffect } from 'react';
import { 
  Shield, Target, Radar, Radio,
  AlertTriangle,
  Crosshair, Activity,
  Plane, CloudRain
} from 'lucide-react';

const ROKAFMCRCSystem = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedGrid, setSelectedGrid] = useState('KE-12');
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [threatLevel] = useState('DEFCON-3');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 동아시아 격자 체계 (실제 MCRC 격자 시스템 기반)
  const gridSectors = [
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

  // 실시간 항공기/드론 추적 (실제 비행번호 체계)
  const activeTracks = [
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

  const renderTrack = (track) => {
    const colors = {
      'FRIENDLY': 'text-green-400 bg-green-900/30 border-green-400',
      'UNKNOWN': 'text-yellow-400 bg-yellow-900/30 border-yellow-400',
      'POTENTIAL_THREAT': 'text-red-400 bg-red-900/30 border-red-400'
    };

    const vectorAngle = Math.atan2(track.vector.dy, track.vector.dx) * 180 / Math.PI;
    const vectorLength = Math.min(track.speed / 30, 20);

    return (
      <div key={track.id} className="absolute">
        {/* 메인 트랙 표시 */}
        <div 
          className={`absolute ${colors[track.status]} border rounded-lg p-1 text-[10px] font-mono transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:bg-opacity-80 transition-all`}
          style={{ 
            left: `${track.position.x}px`, 
            top: `${track.position.y}px`
          }}
          onClick={() => setSelectedTrack(track)}
        >
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 ${
              track.status === 'FRIENDLY' ? 'bg-green-400' : 
              track.status === 'UNKNOWN' ? 'bg-yellow-400' : 'bg-red-400'
            } rounded-full`}></div>
            <span className="text-[8px]">{track.callsign}</span>
          </div>
        </div>
        
        {/* 속도/방향 벡터 */}
        <svg 
          className="absolute pointer-events-none"
          style={{ 
            left: `${track.position.x}px`, 
            top: `${track.position.y}px`,
            transform: 'translate(-50%, -50%)'
          }}
          width="40" 
          height="40"
        >
          <line 
            x1="20" 
            y1="20" 
            x2={20 + vectorLength * Math.cos(vectorAngle * Math.PI / 180)} 
            y2={20 + vectorLength * Math.sin(vectorAngle * Math.PI / 180)}
            stroke={
              track.status === 'FRIENDLY' ? '#4ade80' : 
              track.status === 'UNKNOWN' ? '#facc15' : '#f87171'
            }
            strokeWidth="2"
            markerEnd="url(#arrowhead)"
          />
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" 
              refX="9" refY="3.5" orient="auto">
              <polygon 
                points="0 0, 10 3.5, 0 7"
                fill={
                  track.status === 'FRIENDLY' ? '#4ade80' : 
                  track.status === 'UNKNOWN' ? '#facc15' : '#f87171'
                }
              />
            </marker>
          </defs>
        </svg>

        {/* 항적 꼬리 (이동 경로) */}
        <svg 
          className="absolute pointer-events-none"
          style={{ 
            left: `${track.position.x}px`, 
            top: `${track.position.y}px`,
            transform: 'translate(-50%, -50%)'
          }}
          width="100" 
          height="100"
        >
          <path
            d={`M 50,50 L ${50 - track.vector.dx * 2},${50 - track.vector.dy * 2} L ${50 - track.vector.dx * 4},${50 - track.vector.dy * 4}`}
            stroke={
              track.status === 'FRIENDLY' ? '#4ade80' : 
              track.status === 'UNKNOWN' ? '#facc15' : '#f87171'
            }
            strokeWidth="1"
            strokeDasharray="2,2"
            opacity="0.5"
            fill="none"
          />
        </svg>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-green-300 font-mono">
      {/* TOP SECRET 헤더 */}
      <div className="bg-red-900 text-white text-center py-1 font-bold text-xs">
        ★★ TOP SECRET // REL TO ROKAF ★★
      </div>

      {/* 메인 헤더 */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center border-2 border-green-400">
              <Radar className="w-6 h-6 text-green-200" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-green-300">ROKAF MCRC</h1>
              <p className="text-xs text-green-500">Master Control and Reporting Center</p>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-xs">
            <div className="text-center">
              <div className="text-green-400 font-bold">{currentTime.toLocaleTimeString('en-GB', { timeZone: 'Asia/Seoul' })} KST</div>
              <div className="text-green-600">ZULU {currentTime.toLocaleTimeString('en-GB', { timeZone: 'UTC' })}</div>
            </div>
            <div className="text-center">
              <div className="text-yellow-400 font-bold">{threatLevel}</div>
              <div className="text-yellow-600">ALERT LEVEL</div>
            </div>
            <div className="text-center">
              <div className="text-blue-400 font-bold">CLASS-A</div>
              <div className="text-blue-600">AIRSPACE</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-120px)]">
        {/* 좌측 제어판 */}
        <div className="w-80 bg-gray-800 border-r border-gray-700 p-4 space-y-4 overflow-y-auto">
          {/* 격자 구역 현황 */}
          <div className="bg-gray-900 rounded-lg p-3">
            <h3 className="text-sm font-bold text-green-400 mb-3 flex items-center">
              <Target className="w-4 h-4 mr-2" />
              SECTOR STATUS
            </h3>
            <div className="space-y-2 text-xs">
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
                    <div className="text-green-600">{sector.controller}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400">{sector.tracks} TRK</div>
                    <div className={`text-xs ${
                      sector.threat === 'LOW' ? 'text-green-500' :
                      sector.threat === 'MEDIUM' ? 'text-yellow-500' : 'text-red-500'
                    }`}>
                      {sector.threat}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 시스템 상태 */}
          <div className="bg-gray-900 rounded-lg p-3">
            <h3 className="text-sm font-bold text-green-400 mb-3 flex items-center">
              <Activity className="w-4 h-4 mr-2" />
              SYSTEM STATUS
            </h3>
            <div className="space-y-2 text-xs">
              {[
                { name: 'PRIMARY RADAR', status: 'ONLINE', sweep: '6 SEC' },
                { name: 'SECONDARY RADAR', status: 'ONLINE', sweep: 'MODE-S' },
                { name: 'DATALINK', status: 'SECURE', sweep: 'CRYPTO' },
                { name: 'SATCOM', status: 'ONLINE', sweep: '99.8%' },
                { name: 'IFF/SIF', status: 'MODE-4', sweep: 'ACTIVE' },
                { name: 'LINK-16', status: 'ONLINE', sweep: 'NPG-1' }
              ].map(sys => (
                <div key={sys.name} className="flex justify-between items-center">
                  <span className="text-green-600">{sys.name}</span>
                  <div className="text-right">
                    <span className="text-green-400">{sys.status}</span>
                    <div className="text-green-500">{sys.sweep}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 선택된 항적 정보 */}
          <div className="bg-gray-900 rounded-lg p-3">
            <h3 className="text-sm font-bold text-green-400 mb-3 flex items-center">
              <Crosshair className="w-4 h-4 mr-2" />
              SELECTED TRACK
            </h3>
            {selectedTrack ? (
              <div className="text-xs space-y-1">
                <div className="text-green-300 font-bold">{selectedTrack.callsign}</div>
                <div className="text-green-600">Type: {selectedTrack.type}</div>
                <div className="text-green-600">Mission: {selectedTrack.mission}</div>
                <div className="text-green-600">Alt: {selectedTrack.altitude}ft</div>
                <div className="text-green-600">Speed: {selectedTrack.speed}kt</div>
                <div className="text-green-600">Controller: {selectedTrack.controller}</div>
                <div className={`${
                  selectedTrack.status === 'FRIENDLY' ? 'text-green-400' :
                  selectedTrack.status === 'UNKNOWN' ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  Status: {selectedTrack.status}
                </div>
              </div>
            ) : (
              <div className="text-xs text-green-600">
                Click on a track to view details
              </div>
            )}
          </div>

          {/* 긴급 제어 */}
          <div className="bg-red-900/20 rounded-lg p-3 border border-red-700">
            <h3 className="text-sm font-bold text-red-400 mb-3 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2" />
              EMERGENCY CONTROL
            </h3>
            <div className="space-y-2">
              <button className="w-full bg-red-800 hover:bg-red-700 text-white py-1 px-2 rounded text-xs">
                SCRAMBLE ALERT
              </button>
              <button className="w-full bg-yellow-800 hover:bg-yellow-700 text-white py-1 px-2 rounded text-xs">
                IDENTIFY UNKNOWN
              </button>
              <button className="w-full bg-blue-800 hover:bg-blue-700 text-white py-1 px-2 rounded text-xs">
                VECTOR INTERCEPT
              </button>
            </div>
          </div>
        </div>

        {/* 중앙 지도 영역 */}
        <div className="flex-1 bg-gray-900 relative overflow-hidden">
          {/* 동아시아 지도 배경 */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600">
            {/* 격자 체계 */}
            <defs>
              <pattern id="grid" width="80" height="60" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 60" fill="none" stroke="rgba(34, 197, 94, 0.3)" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* 격자 라벨 */}
            {['JE-08', 'JE-12', 'JE-16'].map((label, i) => (
              <text key={label} x={120 + i*160} y={100} fill="#22c55e" fontSize="12" textAnchor="middle" fontWeight="bold">{label}</text>
            ))}
            {['KE-08', 'KE-12', 'KE-16'].map((label, i) => (
              <text key={label} x={120 + i*160} y={220} fill="#22c55e" fontSize="12" textAnchor="middle" fontWeight="bold">{label}</text>
            ))}
            {['LE-08', 'LE-12', 'LE-16'].map((label, i) => (
              <text key={label} x={120 + i*160} y={340} fill="#22c55e" fontSize="12" textAnchor="middle" fontWeight="bold">{label}</text>
            ))}

            {/* 한반도 윤곽 (중앙) */}
            <path 
              d="M 380 160 L 390 150 L 400 155 L 410 165 L 415 180 L 420 200 L 415 220 L 410 240 L 405 250 L 395 255 L 385 250 L 375 240 L 370 220 L 375 200 L 380 180 Z" 
              fill="rgba(34, 197, 94, 0.2)" 
              stroke="#22c55e" 
              strokeWidth="2"
            />
            
            {/* DMZ (빨간 점선) */}
            <line x1="370" y1="180" x2="420" y2="180" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" />
            <text x="395" y="175" fill="#ef4444" fontSize="10" textAnchor="middle" fontWeight="bold">DMZ</text>

            {/* 중국 해안선 (서쪽) */}
            <path 
              d="M 100 100 L 150 120 L 200 140 L 250 160 L 300 180 L 320 200 L 300 240 L 250 260 L 200 280 L 150 300 L 100 320" 
              fill="none" 
              stroke="rgba(34, 197, 94, 0.6)" 
              strokeWidth="2"
            />
            <text x="200" y="200" fill="#22c55e" fontSize="14" fontWeight="bold">CHINA</text>

            {/* 일본 열도 (동쪽) */}
            <ellipse cx="520" cy="200" rx="35" ry="90" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2" />
            <ellipse cx="580" cy="220" rx="25" ry="70" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2" />
            <text x="520" y="205" fill="#22c55e" fontSize="14" textAnchor="middle" fontWeight="bold">JAPAN</text>

            {/* 러시아 (북쪽) */}
            <line x1="100" y1="80" x2="700" y2="80" stroke="rgba(34, 197, 94, 0.6)" strokeWidth="2" />
            <text x="400" y="75" fill="#22c55e" fontSize="14" textAnchor="middle" fontWeight="bold">RUSSIA</text>

            {/* 위협 지역 표시 */}
            <circle cx="280" cy="160" r="30" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2" strokeDasharray="3,3" />
            <text x="280" y="165" fill="#ef4444" fontSize="10" textAnchor="middle" fontWeight="bold">THREAT</text>
          </svg>

          {/* 실시간 항적 표시 */}
          <div className="absolute inset-0">
            {activeTracks.map(track => renderTrack(track))}
          </div>

          {/* 레이더 스위프 애니메이션 */}
          <div className="absolute top-4 right-4 w-24 h-24 bg-green-900/20 rounded-full border-2 border-green-600 flex items-center justify-center">
            <div className="animate-spin w-full h-full flex items-center justify-center">
              <div className="w-20 h-0.5 bg-gradient-to-r from-green-400 to-transparent origin-left"></div>
            </div>
            <div className="absolute text-xs text-green-400 bottom-1">800NM</div>
          </div>
        </div>

        {/* 우측 정보 패널 */}
        <div className="w-80 bg-gray-800 border-l border-gray-700 p-4 space-y-4 overflow-y-auto">
          {/* 항적 목록 */}
          <div className="bg-gray-900 rounded-lg p-3">
            <h3 className="text-sm font-bold text-green-400 mb-3 flex items-center">
              <Plane className="w-4 h-4 mr-2" />
              ACTIVE TRACKS ({activeTracks.length})
            </h3>
            <div className="space-y-2 text-xs max-h-60 overflow-y-auto">
              {activeTracks.map(track => (
                <div 
                  key={track.id} 
                  className="border border-gray-600 rounded p-2 cursor-pointer hover:border-green-500"
                  onClick={() => setSelectedTrack(track)}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-green-300 font-bold">{track.callsign}</span>
                    <span className={`px-2 py-1 rounded text-[10px] ${
                      track.status === 'FRIENDLY' ? 'bg-green-900 text-green-300' :
                      track.status === 'UNKNOWN' ? 'bg-yellow-900 text-yellow-300' :
                      'bg-red-900 text-red-300'
                    }`}>
                      {track.status}
                    </span>
                  </div>
                  <div className="text-green-600 space-y-1">
                    <div>Type: {track.type}</div>
                    <div>Mission: {track.mission}</div>
                    <div>Alt: {track.altitude}ft</div>
                    <div>Speed: {track.speed}kt</div>
                    <div>Control: {track.controller}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 기상 정보 */}
          <div className="bg-gray-900 rounded-lg p-3">
            <h3 className="text-sm font-bold text-green-400 mb-3 flex items-center">
              <CloudRain className="w-4 h-4 mr-2" />
              WEATHER (RKSS)
            </h3>
            <div className="text-xs space-y-1">
              <div className="text-green-600">Wind: 270°/15kt G20kt</div>
              <div className="text-green-600">Visibility: 10km</div>
              <div className="text-green-600">Ceiling: 3000ft AGL</div>
              <div className="text-green-600">QNH: 1013.2 hPa</div>
              <div className="text-yellow-500">SIGMET: Turbulence FL250-350</div>
            </div>
          </div>

          {/* 통신 채널 */}
          <div className="bg-gray-900 rounded-lg p-3">
            <h3 className="text-sm font-bold text-green-400 mb-3 flex items-center">
              <Radio className="w-4 h-4 mr-2" />
              COMMS STATUS
            </h3>
            <div className="text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-green-600">Emergency</span>
                <span className="text-green-400">121.5 ✓</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-600">All Call</span>
                <span className="text-green-400">243.0 ✓</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-600">Priority</span>
                <span className="text-green-400">255.4 ✓</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-600">Scramble</span>
                <span className="text-red-400">STANDBY</span>
              </div>
            </div>
          </div>

          {/* 작전 현황 */}
          <div className="bg-gray-900 rounded-lg p-3">
            <h3 className="text-sm font-bold text-green-400 mb-3 flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              OPS STATUS
            </h3>
            <div className="text-xs space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-green-600">중앙 구역</span>
                <div className="text-right">
                  <div className="text-green-400">CPT Kim J.H.</div>
                  <div className="text-green-500">(중앙 구역, 18개 항적)</div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-green-600">KE-14</span>
                <div className="text-right">
                  <div className="text-green-400">CPT Kim J.H.</div>
                  <div className="text-green-500">(서북 구역, 12개 항적)</div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-green-600">KE-16</span>
                <div className="text-right">
                  <div className="text-green-400">CPT Park M.S.</div>
                  <div className="text-green-500">(동북 구역, 8개 항적)</div>
                </div>
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

export default ROKAFMCRCSystem;