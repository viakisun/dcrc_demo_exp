import React, { useState, useEffect } from 'react';
import { 
  Brain, Bot, TrendingUp, Cpu, Network,
  AlertCircle, BarChart3
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
  aiClassification: string;
  aiConfidence: number;
  predictedPath: string;
  threatLevel: number;
  aiRecommendation: string;
}

const ROKAFMCRCAISystem = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [, setSelectedTrack] = useState<Track | null>(null);
  const [threatLevel] = useState('FPCON-BRAVO');
  const [aiMode, setAiMode] = useState('ACTIVE');
  const [aiConfidence, setAiConfidence] = useState(94);
  const [showPredictions, setShowPredictions] = useState(true);
  const [autoResponse, setAutoResponse] = useState(false);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);

  // AI 시스템 상태
  const [aiSystems] = useState({
    threatAnalysis: { status: 'ACTIVE', confidence: 96, lastUpdate: 'Real-time' },
    patternRecognition: { status: 'LEARNING', confidence: 92, lastUpdate: '2 sec ago' },
    predictiveModeling: { status: 'ACTIVE', confidence: 89, lastUpdate: '1 sec ago' },
    autoClassification: { status: 'ACTIVE', confidence: 97, lastUpdate: 'Real-time' },
    missionPlanning: { status: 'STANDBY', confidence: 88, lastUpdate: '5 sec ago' },
    resourceOptimization: { status: 'ACTIVE', confidence: 94, lastUpdate: '3 sec ago' }
  });

  // AI 탐지 결과 및 예측
  const [aiAlerts] = useState([
    { id: 1, type: 'THREAT', message: 'AI detected potential hostile formation', confidence: 87, time: new Date(), priority: 'HIGH' },
    { id: 2, type: 'PATTERN', message: 'Unusual flight pattern identified in JE-10', confidence: 92, time: new Date(), priority: 'MEDIUM' },
    { id: 3, type: 'PREDICTION', message: 'Projected intercept point calculated', confidence: 95, time: new Date(), priority: 'HIGH' },
    { id: 4, type: 'ANOMALY', message: 'Communication anomaly detected', confidence: 78, time: new Date(), priority: 'LOW' }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      
      // AI 시뮬레이션 업데이트
      if (aiMode === 'ACTIVE') {
        setAiConfidence(prev => Math.min(Math.max(prev + (Math.random() - 0.5) * 2, 85), 99));
        
        // 랜덤 AI 분석 시뮬레이션
        if (Math.random() < 0.1) {
          setAiAnalyzing(true);
          setTimeout(() => setAiAnalyzing(false), 2000);
        }
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [aiMode]);

  // 확장된 격자 시스템 (AI 위험도 평가 포함)
  const gridSectors = [
    { id: 'IE-06', controller: 'LT Col Park S.H.', tracks: 8, threat: 'LOW', activity: 'NORMAL', aiRisk: 15, predictedThreat: 'STABLE' },
    { id: 'IE-10', controller: 'MAJ Kim D.W.', tracks: 15, threat: 'LOW', activity: 'PATROL', aiRisk: 23, predictedThreat: 'STABLE' },
    { id: 'IE-14', controller: 'CPT Lee J.S.', tracks: 12, threat: 'MEDIUM', activity: 'ALERT', aiRisk: 67, predictedThreat: 'ESCALATING' },
    { id: 'JE-06', controller: 'MAJ Choi H.K.', tracks: 23, threat: 'LOW', activity: 'NORMAL', aiRisk: 28, predictedThreat: 'STABLE' },
    { id: 'JE-10', controller: 'CPT Park J.H.', tracks: 31, threat: 'HIGH', activity: 'INTERCEPT', aiRisk: 89, predictedThreat: 'CRITICAL' },
    { id: 'JE-14', controller: 'LT Kim M.J.', tracks: 18, threat: 'MEDIUM', activity: 'CAP', aiRisk: 54, predictedThreat: 'MONITORING' },
    { id: 'KE-06', controller: 'COL Jung S.M.', tracks: 45, threat: 'CRITICAL', activity: 'SCRAMBLE', aiRisk: 95, predictedThreat: 'IMMINENT' },
    { id: 'KE-10', controller: 'MAJ Jung H.W.', tracks: 38, threat: 'HIGH', activity: 'VECTOR', aiRisk: 82, predictedThreat: 'CRITICAL' },
    { id: 'KE-14', controller: 'CPT Park M.S.', tracks: 27, threat: 'MEDIUM', activity: 'MONITOR', aiRisk: 45, predictedThreat: 'STABLE' },
    { id: 'LE-06', controller: 'LT Song K.Y.', tracks: 19, threat: 'LOW', activity: 'PATROL', aiRisk: 31, predictedThreat: 'STABLE' },
    { id: 'LE-10', controller: 'CPT Kim J.H.', tracks: 33, threat: 'MEDIUM', activity: 'ALERT', aiRisk: 58, predictedThreat: 'MONITORING' },
    { id: 'LE-14', controller: 'MAJ Lee D.S.', tracks: 22, threat: 'LOW', activity: 'NORMAL', aiRisk: 19, predictedThreat: 'STABLE' },
    { id: 'ME-06', controller: 'CPT Yoo H.J.', tracks: 14, threat: 'LOW', activity: 'SEARCH', aiRisk: 25, predictedThreat: 'STABLE' },
    { id: 'ME-10', controller: 'MAJ Seo M.K.', tracks: 26, threat: 'MEDIUM', activity: 'TRACK', aiRisk: 48, predictedThreat: 'MONITORING' },
    { id: 'ME-14', controller: 'LT Col Lim J.W.', tracks: 17, threat: 'LOW', activity: 'NORMAL', aiRisk: 22, predictedThreat: 'STABLE' }
  ];

  // AI 강화 항적 시스템
  const activeTracks = [
    { 
      id: 'KAF001', callsign: 'VIPER-01', type: 'F-16C', mission: 'CAP',
      position: { x: 420, y: 180 }, vector: { dx: -8, dy: 6 },
      speed: 420, altitude: 28000, status: 'FRIENDLY', controller: 'KE-10',
      fuel: 68, weapons: 'AIM-120C x4', pilot: 'CPT Kim S.H.', eta: '15:30Z',
      aiClassification: 'CONFIRMED_FRIENDLY', aiConfidence: 99, predictedPath: 'PATROL_ROUTE_A',
      threatLevel: 0, aiRecommendation: 'MAINTAIN_CAP'
    },
    { 
      id: 'UAV001', callsign: 'HAWK-01', type: 'MQ-9 Reaper', mission: 'ISR',
      position: { x: 340, y: 200 }, vector: { dx: 3, dy: -2 },
      speed: 135, altitude: 18000, status: 'FRIENDLY', controller: 'JE-14',
      fuel: 92, weapons: 'Hellfire x2', pilot: 'SGT Kim M.J.', eta: '18:45Z',
      aiClassification: 'AI_AUTONOMOUS', aiConfidence: 97, predictedPath: 'ISR_PATTERN_DELTA',
      threatLevel: 0, aiRecommendation: 'CONTINUE_MISSION'
    },
    { 
      id: 'UNK001', callsign: 'UNKNOWN-1', type: '?', mission: '?',
      position: { x: 280, y: 160 }, vector: { dx: 18, dy: 12 },
      speed: 540, altitude: 32000, status: 'UNKNOWN', controller: 'JE-06',
      fuel: '?', weapons: '?', pilot: '?', eta: '?',
      aiClassification: 'POTENTIAL_HOSTILE', aiConfidence: 73, predictedPath: 'INTERCEPT_VECTOR',
      threatLevel: 67, aiRecommendation: 'IMMEDIATE_IDENTIFICATION'
    },
    { 
      id: 'THR001', callsign: 'BANDIT-1', type: 'J-20?', mission: 'HOSTILE',
      position: { x: 250, y: 140 }, vector: { dx: 22, dy: 15 },
      speed: 620, altitude: 35000, status: 'HOSTILE', controller: 'JE-06',
      fuel: '?', weapons: 'UNKNOWN', pilot: '?', eta: '?',
      aiClassification: 'CONFIRMED_HOSTILE', aiConfidence: 94, predictedPath: 'ATTACK_VECTOR_ALPHA',
      threatLevel: 95, aiRecommendation: 'SCRAMBLE_INTERCEPTORS'
    },
    { 
      id: 'AI001', callsign: 'GHOST-AI', type: 'KAI-LAH', mission: 'AUTO-CAP',
      position: { x: 380, y: 140 }, vector: { dx: 12, dy: 8 },
      speed: 450, altitude: 30000, status: 'FRIENDLY', controller: 'AI-SYSTEM',
      fuel: 78, weapons: 'AI-Guided Missiles', pilot: 'AI_PILOT_ALPHA', eta: 'VARIABLE',
      aiClassification: 'FULL_AI_CONTROL', aiConfidence: 99, predictedPath: 'ADAPTIVE_RESPONSE',
      threatLevel: 0, aiRecommendation: 'AI_AUTONOMOUS_MODE'
    }
  ];

  const renderAITrack = (track) => {
    const colors = {
      'FRIENDLY': track.aiClassification === 'FULL_AI_CONTROL' ? 'text-purple-400 bg-purple-900/30 border-purple-400' : 'text-green-400 bg-green-900/30 border-green-400',
      'UNKNOWN': 'text-yellow-400 bg-yellow-900/30 border-yellow-400',
      'HOSTILE': 'text-red-400 bg-red-900/30 border-red-400'
    };

    const vectorAngle = Math.atan2(track.vector.dy, track.vector.dx) * 180 / Math.PI;
    const vectorLength = Math.min(track.speed / 25, 25);

    return (
      <div key={track.id} className="absolute">
        {/* AI 예측 경로 표시 */}
        {showPredictions && (
          <svg 
            className="absolute pointer-events-none"
            style={{ 
              left: `${track.position.x}px`, 
              top: `${track.position.y}px`,
              transform: 'translate(-50%, -50%)'
            }}
            width="200" 
            height="200"
          >
            <path
              d={`M 100,100 Q ${100 + track.vector.dx * 5},${100 + track.vector.dy * 5} ${100 + track.vector.dx * 15},${100 + track.vector.dy * 15}`}
              stroke={track.status === 'HOSTILE' ? '#f87171' : '#60a5fa'}
              strokeWidth="1"
              strokeDasharray="2,4"
              opacity="0.6"
              fill="none"
            />
            <text 
              x={100 + track.vector.dx * 10} 
              y={100 + track.vector.dy * 10 - 10} 
              fill="#60a5fa" 
              fontSize="8"
              className="font-mono"
            >
              AI: {track.predictedPath}
            </text>
          </svg>
        )}

        {/* 메인 트랙 표시 (AI 강화) */}
        <div 
          className={`absolute ${colors[track.status]} border-2 rounded-lg p-1.5 text-[10px] font-mono transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:bg-opacity-80 transition-all shadow-lg`}
          style={{ 
            left: `${track.position.x}px`, 
            top: `${track.position.y}px`
          }}
          onClick={() => setSelectedTrack(track)}
        >
          <div className="flex items-center space-x-1">
            {track.aiClassification === 'FULL_AI_CONTROL' && (
              <Bot className="w-3 h-3 text-purple-400" />
            )}
            <div className={`w-3 h-3 ${
              track.status === 'FRIENDLY' && track.aiClassification === 'FULL_AI_CONTROL' ? 'bg-purple-400' :
              track.status === 'FRIENDLY' ? 'bg-green-400' : 
              track.status === 'UNKNOWN' ? 'bg-yellow-400' : 'bg-red-400'
            } rounded-full`}></div>
            <span className="text-[9px] font-bold">{track.callsign}</span>
          </div>
          <div className="text-[8px] mt-1">
            <div>{track.type}</div>
            <div>{track.altitude}ft</div>
            <div className="text-blue-400">AI: {track.aiConfidence}%</div>
          </div>
          
          {/* AI 위험도 표시 */}
          {track.threatLevel > 50 && (
            <div className="absolute -top-2 -right-2">
              <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-[8px] text-white font-bold">{track.threatLevel}</span>
              </div>
            </div>
          )}
        </div>
        
        {/* AI 강화 벡터 표시 */}
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
            <marker id={`ai-arrowhead-${track.id}`} markerWidth="8" markerHeight="6" 
              refX="7" refY="3" orient="auto">
              <polygon 
                points="0 0, 8 3, 0 6"
                fill={
                  track.status === 'FRIENDLY' && track.aiClassification === 'FULL_AI_CONTROL' ? '#a855f7' :
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
              track.status === 'FRIENDLY' && track.aiClassification === 'FULL_AI_CONTROL' ? '#a855f7' :
              track.status === 'FRIENDLY' ? '#4ade80' : 
              track.status === 'UNKNOWN' ? '#facc15' : '#f87171'
            }
            strokeWidth="2"
            markerEnd={`url(#ai-arrowhead-${track.id})`}
          />
        </svg>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-green-300 font-mono">
      {/* TOP SECRET 헤더 */}
      <div className="bg-red-900 text-white text-center py-1 font-bold text-xs">
        ★★ TOP SECRET // AI CLASSIFIED // REL TO ROKAF ★★
      </div>

      {/* AI 강화 메인 헤더 */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-700 rounded-full flex items-center justify-center border-2 border-purple-400 animate-pulse">
              <Brain className="w-8 h-8 text-purple-200" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-purple-300">ROKAF MCRC-AI</h1>
              <p className="text-sm text-purple-500">AI-Integrated Master Control and Reporting Center</p>
            </div>
            <div className="flex space-x-2">
              <div className={`px-3 py-1 rounded text-sm font-bold border-2 ${
                aiMode === 'ACTIVE' ? 'bg-purple-900 text-purple-300 border-purple-400 animate-pulse' : 'bg-gray-700 text-gray-400 border-gray-600'
              }`}>
                AI {aiMode}
              </div>
              {aiAnalyzing && (
                <div className="px-2 py-1 bg-blue-900 text-blue-300 rounded text-xs font-bold animate-bounce">
                  ANALYZING...
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-8 text-xs">
            <div className="text-center">
              <div className="text-green-400 font-bold text-lg">{currentTime.toLocaleTimeString('en-GB', { timeZone: 'Asia/Seoul' })}</div>
              <div className="text-green-600">KST / ZULU {currentTime.toLocaleTimeString('en-GB', { timeZone: 'UTC' })}</div>
            </div>
            <div className="text-center">
              <div className="text-purple-400 font-bold text-lg">{aiConfidence}%</div>
              <div className="text-purple-600">AI CONFIDENCE</div>
            </div>
            <div className="text-center">
              <div className="text-yellow-400 font-bold">{threatLevel}</div>
              <div className="text-yellow-600">THREAT LEVEL</div>
            </div>
            <div className="text-center">
              <div className="text-blue-400 font-bold">{activeTracks.length}</div>
              <div className="text-blue-600">AI TRACKED</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-140px)]">
        {/* AI 제어판 */}
        <div className="w-96 bg-gray-800 border-r border-gray-700 p-4 space-y-4 overflow-y-auto">
          {/* AI 시스템 제어 */}
          <div className="bg-purple-900/20 rounded-lg p-3 border border-purple-700">
            <h3 className="text-sm font-bold text-purple-400 mb-3 flex items-center">
              <Brain className="w-4 h-4 mr-2" />
              AI CONTROL CENTER
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-purple-600">AI Mode</span>
                <select 
                  value={aiMode} 
                  onChange={(e) => setAiMode(e.target.value)}
                  className="bg-gray-800 text-purple-400 text-xs border border-purple-600 rounded px-2 py-1"
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="LEARNING">LEARNING</option>
                  <option value="STANDBY">STANDBY</option>
                  <option value="AUTONOMOUS">AUTONOMOUS</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-purple-600">Show Predictions</span>
                <button 
                  onClick={() => setShowPredictions(!showPredictions)}
                  className={`px-2 py-1 rounded text-xs ${showPredictions ? 'bg-purple-800 text-purple-300' : 'bg-gray-700 text-gray-400'}`}
                >
                  {showPredictions ? 'ON' : 'OFF'}
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-purple-600">Auto Response</span>
                <button 
                  onClick={() => setAutoResponse(!autoResponse)}
                  className={`px-2 py-1 rounded text-xs ${autoResponse ? 'bg-red-800 text-red-300' : 'bg-gray-700 text-gray-400'}`}
                >
                  {autoResponse ? 'ENABLED' : 'DISABLED'}
                </button>
              </div>
            </div>
          </div>

          {/* AI 시스템 상태 */}
          <div className="bg-gray-900 rounded-lg p-3">
            <h3 className="text-sm font-bold text-green-400 mb-3 flex items-center">
              <Cpu className="w-4 h-4 mr-2" />
              AI SYSTEMS STATUS
            </h3>
            <div className="space-y-2 text-xs">
              {Object.entries(aiSystems).map(([system, data]) => (
                <div key={system} className="flex justify-between items-center">
                  <div>
                    <div className="text-purple-300 capitalize">{system.replace(/([A-Z])/g, ' $1').trim()}</div>
                    <div className="text-green-600">{data.lastUpdate}</div>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold ${
                      data.status === 'ACTIVE' ? 'text-green-400' :
                      data.status === 'LEARNING' ? 'text-blue-400' : 'text-yellow-400'
                    }`}>
                      {data.status}
                    </div>
                    <div className="text-purple-400">{data.confidence}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI 알림 및 경고 */}
          <div className="bg-gray-900 rounded-lg p-3">
            <h3 className="text-sm font-bold text-yellow-400 mb-3 flex items-center">
              <AlertCircle className="w-4 h-4 mr-2" />
              AI ALERTS ({aiAlerts.length})
            </h3>
            <div className="space-y-2 text-xs max-h-40 overflow-y-auto">
              {aiAlerts.map(alert => (
                <div 
                  key={alert.id} 
                  className={`p-2 rounded border-l-4 ${
                    alert.priority === 'HIGH' ? 'border-red-500 bg-red-900/20' :
                    alert.priority === 'MEDIUM' ? 'border-yellow-500 bg-yellow-900/20' :
                    'border-blue-500 bg-blue-900/20'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className={`font-bold ${
                      alert.priority === 'HIGH' ? 'text-red-400' :
                      alert.priority === 'MEDIUM' ? 'text-yellow-400' : 'text-blue-400'
                    }`}>
                      {alert.type}
                    </div>
                    <div className="text-purple-400">{alert.confidence}%</div>
                  </div>
                  <div className="text-green-300 mt-1">{alert.message}</div>
                  <div className="text-green-600 text-[10px] mt-1">
                    {alert.time.toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI 격자 분석 */}
          <div className="bg-gray-900 rounded-lg p-3">
            <h3 className="text-sm font-bold text-green-400 mb-3 flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              AI SECTOR ANALYSIS
            </h3>
            <div className="space-y-1 text-xs max-h-48 overflow-y-auto">
              {gridSectors.slice(0, 6).map(sector => (
                <div 
                  key={sector.id}
                  className="flex justify-between items-center p-2 rounded border border-gray-600"
                >
                  <div>
                    <div className="text-green-300 font-bold">{sector.id}</div>
                    <div className="text-purple-400">AI Risk: {sector.aiRisk}%</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-xs font-bold ${
                      sector.predictedThreat === 'IMMINENT' ? 'text-red-500' :
                      sector.predictedThreat === 'CRITICAL' ? 'text-red-400' :
                      sector.predictedThreat === 'ESCALATING' ? 'text-orange-500' :
                      sector.predictedThreat === 'MONITORING' ? 'text-yellow-500' : 'text-green-500'
                    }`}>
                      {sector.predictedThreat}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI 자동 대응 */}
          <div className="bg-red-900/20 rounded-lg p-3 border border-red-700">
            <h3 className="text-sm font-bold text-red-400 mb-3 flex items-center">
              <Bot className="w-4 h-4 mr-2" />
              AI AUTO RESPONSE
            </h3>
            <div className="space-y-2">
              <button 
                className="w-full bg-purple-800 hover:bg-purple-700 text-white py-1 px-2 rounded text-xs"
                disabled={!autoResponse}
              >
                AUTO THREAT RESPONSE
              </button>
              <button 
                className="w-full bg-blue-800 hover:bg-blue-700 text-white py-1 px-2 rounded text-xs"
                disabled={!autoResponse}
              >
                AI MISSION PLANNING
              </button>
              <button 
                className="w-full bg-green-800 hover:bg-green-700 text-white py-1 px-2 rounded text-xs"
                disabled={!autoResponse}
              >
                RESOURCE OPTIMIZATION
              </button>
              <div className="text-xs text-gray-400 text-center mt-2">
                {autoResponse ? 'AI Autonomous Mode Active' : 'Manual Control Only'}
              </div>
            </div>
          </div>
        </div>

        {/* AI 강화 지도 영역 */}
        <div className="flex-1 bg-gray-900 relative overflow-hidden">
          {/* 고해상도 지도 배경 */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 700">
            {/* 격자 체계 */}
            <defs>
              <pattern id="grid" width="66" height="46" patternUnits="userSpaceOnUse">
                <path d="M 66 0 L 0 0 0 46" fill="none" stroke="rgba(34, 197, 94, 0.3)" strokeWidth="0.5"/>
              </pattern>
              <pattern id="majorGrid" width="200" height="140" patternUnits="userSpaceOnUse">
                <path d="M 200 0 L 0 0 0 140" fill="none" stroke="rgba(34, 197, 94, 0.6)" strokeWidth="1"/>
              </pattern>
              {/* AI 위험 구역 패턴 */}
              <pattern id="aiThreatPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="2" fill="rgba(239, 68, 68, 0.3)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <rect width="100%" height="100%" fill="url(#majorGrid)" />
            
            {/* AI 위험도가 높은 구역 하이라이트 */}
            {gridSectors.filter(s => s.aiRisk > 70).map(sector => {
              const sectorX = (['IE', 'JE', 'KE', 'LE', 'ME'].indexOf(sector.id.substring(0, 2))) * 200 + 50;
              const sectorY = (['06', '10', '14'].indexOf(sector.id.substring(3))) * 140 + 50;
              return (
                <rect 
                  key={sector.id}
                  x={sectorX} 
                  y={sectorY} 
                  width="200" 
                  height="140" 
                  fill="url(#aiThreatPattern)"
                  opacity="0.6"
                />
              );
            })}
            
            {/* 격자 라벨 */}
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

            {/* 지형 */}
            <path 
              d="M 480 280 L 495 270 L 510 275 L 525 285 L 535 310 L 540 340 L 535 370 L 525 395 L 515 405 L 500 410 L 485 405 L 470 395 L 460 370 L 465 340 L 480 310 Z" 
              fill="rgba(34, 197, 94, 0.3)" 
              stroke="#22c55e" 
              strokeWidth="2"
            />
            
            <line x1="460" y1="310" x2="540" y2="310" stroke="#ef4444" strokeWidth="3" strokeDasharray="6,6" />
            <text x="500" y="305" fill="#ef4444" fontSize="12" textAnchor="middle" fontWeight="bold">DMZ</text>

            <path 
              d="M 50 200 L 150 220 L 250 240 L 350 260 L 400 290 L 420 330 L 400 370 L 350 400 L 250 420 L 150 440 L 50 460" 
              fill="none" 
              stroke="rgba(34, 197, 94, 0.7)" 
              strokeWidth="3"
            />
            <text x="250" y="330" fill="#22c55e" fontSize="18" fontWeight="bold">CHINA</text>

            <ellipse cx="650" cy="330" rx="45" ry="120" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2" />
            <text x="650" y="335" fill="#22c55e" fontSize="16" textAnchor="middle" fontWeight="bold">JAPAN</text>
          </svg>

          {/* AI 항적 표시 */}
          <div className="absolute inset-0">
            {activeTracks.map(track => renderAITrack(track))}
          </div>

          {/* AI 레이더 (다중 모드) */}
          <div className="absolute top-4 right-4 space-y-2">
            <div className="w-32 h-32 bg-purple-900/20 rounded-full border-2 border-purple-600 flex items-center justify-center">
              <div className="animate-spin w-full h-full flex items-center justify-center">
                <div className="w-28 h-0.5 bg-gradient-to-r from-purple-400 via-purple-300 to-transparent origin-left"></div>
              </div>
              <div className="absolute text-xs text-purple-400 bottom-2">AI RADAR</div>
              <div className="absolute text-xs text-purple-600 top-2">1500NM</div>
            </div>
            <div className="bg-gray-900/80 rounded p-2">
              <div className="text-xs text-purple-400">AI Processing</div>
              <div className="text-xs text-green-400">{aiConfidence}% Confidence</div>
            </div>
          </div>

          {/* AI 실시간 분석 표시 */}
          <div className="absolute bottom-4 left-4 bg-gray-900/90 rounded-lg p-3 border border-purple-700">
            <div className="text-sm text-purple-400 font-bold mb-2">AI REAL-TIME ANALYSIS</div>
            <div className="text-xs text-green-400 space-y-1">
              <div>총 AI 추적: <span className="text-purple-300 font-bold">{activeTracks.length}</span></div>
              <div>AI 관제: <span className="text-purple-300">{activeTracks.filter(t => t.controller === 'AI-SYSTEM').length}</span></div>
              <div>위험도 분석: <span className="text-red-300">{activeTracks.filter(t => t.threatLevel > 50).length} HIGH</span></div>
              <div>예측 정확도: <span className="text-blue-300">{aiConfidence}%</span></div>
              <div className="mt-2 pt-2 border-t border-gray-700">
                <div className="text-yellow-400">다음 업데이트: {Math.floor(Math.random() * 5) + 1}초</div>
              </div>
            </div>
          </div>
        </div>

        {/* AI 분석 패널 */}
        <div className="w-96 bg-gray-800 border-l border-gray-700 p-4 space-y-4 overflow-y-auto">
          {/* 선택된 항적 AI 분석 */}
          {selectedTrack && (
            <div className="bg-gray-900 rounded-lg p-3 border-l-4 border-purple-500">
              <h3 className="text-sm font-bold text-purple-400 mb-3 flex items-center">
                <Bot className="w-4 h-4 mr-2" />
                AI TRACK ANALYSIS
              </h3>
              <div className="text-xs space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-green-600">Callsign:</div>
                  <div className="text-green-300 font-bold">{selectedTrack.callsign}</div>
                  <div className="text-green-600">AI Classification:</div>
                  <div className="text-purple-300">{selectedTrack.aiClassification}</div>
                  <div className="text-green-600">AI Confidence:</div>
                  <div className="text-purple-400 font-bold">{selectedTrack.aiConfidence}%</div>
                  <div className="text-green-600">Threat Level:</div>
                  <div className={`font-bold ${
                    selectedTrack.threatLevel > 80 ? 'text-red-400' :
                    selectedTrack.threatLevel > 50 ? 'text-orange-400' :
                    selectedTrack.threatLevel > 20 ? 'text-yellow-400' : 'text-green-400'
                  }`}>
                    {selectedTrack.threatLevel}%
                  </div>
                  <div className="text-green-600">Predicted Path:</div>
                  <div className="text-blue-300">{selectedTrack.predictedPath}</div>
                  <div className="text-green-600">AI Recommendation:</div>
                  <div className="text-yellow-300">{selectedTrack.aiRecommendation}</div>
                </div>
                <div className="mt-3 pt-2 border-t border-gray-700">
                  <div className="text-purple-400 font-bold">AI STATUS</div>
                  <div className={`px-2 py-1 rounded text-center text-xs mt-1 ${
                    selectedTrack.aiClassification === 'FULL_AI_CONTROL' ? 'bg-purple-900 text-purple-300' :
                    selectedTrack.status === 'FRIENDLY' ? 'bg-green-900 text-green-300' :
                    selectedTrack.status === 'UNKNOWN' ? 'bg-yellow-900 text-yellow-300' :
                    'bg-red-900 text-red-300'
                  }`}>
                    {selectedTrack.aiClassification}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AI 패턴 분석 */}
          <div className="bg-gray-900 rounded-lg p-3">
            <h3 className="text-sm font-bold text-blue-400 mb-3 flex items-center">
              <BarChart3 className="w-4 h-4 mr-2" />
              AI PATTERN ANALYSIS
            </h3>
            <div className="text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-blue-600">Formation Detection:</span>
                <span className="text-blue-300">3 Groups Identified</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-600">Anomaly Detection:</span>
                <span className="text-yellow-300">2 Anomalies</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-600">Route Prediction:</span>
                <span className="text-green-300">89% Accurate</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-600">Threat Assessment:</span>
                <span className="text-red-300">3 High Risk</span>
              </div>
            </div>
          </div>

          {/* AI 학습 상태 */}
          <div className="bg-gray-900 rounded-lg p-3">
            <h3 className="text-sm font-bold text-purple-400 mb-3 flex items-center">
              <Network className="w-4 h-4 mr-2" />
              AI LEARNING STATUS
            </h3>
            <div className="text-xs space-y-2">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-purple-600">Neural Network:</span>
                  <span className="text-purple-300">Training</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{width: `${aiConfidence}%`}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-purple-600">Data Processing:</span>
                  <span className="text-purple-300">Real-time</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '96%'}}></div>
                </div>
              </div>
              <div className="text-purple-400 text-center mt-2">
                AI Model: ROKAF-GPT-Defense v2.1
              </div>
            </div>
          </div>

          {/* AI 예측 및 권장사항 */}
          <div className="bg-gray-900 rounded-lg p-3">
            <h3 className="text-sm font-bold text-yellow-400 mb-3 flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              AI PREDICTIONS
            </h3>
            <div className="text-xs space-y-2">
              <div className="p-2 bg-yellow-900/20 rounded border border-yellow-700">
                <div className="text-yellow-300 font-bold">Next 5 Minutes:</div>
                <div className="text-yellow-400">• BANDIT-1 intercept vector detected</div>
                <div className="text-yellow-400">• Recommend scramble from KE-10</div>
              </div>
              <div className="p-2 bg-blue-900/20 rounded border border-blue-700">
                <div className="text-blue-300 font-bold">Next 15 Minutes:</div>
                <div className="text-blue-400">• Weather degradation expected</div>
                <div className="text-blue-400">• Alternative routing suggested</div>
              </div>
              <div className="p-2 bg-green-900/20 rounded border border-green-700">
                <div className="text-green-300 font-bold">Mission Success:</div>
                <div className="text-green-400">• Current strategy: 94% success rate</div>
                <div className="text-green-400">• AI optimization available</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 분류 표시 */}
      <div className="bg-red-900 text-white text-center py-1 font-bold text-xs">
        ★★ TOP SECRET // AI CLASSIFIED // REL TO ROKAF ★★
      </div>
    </div>
  );
};

export default ROKAFMCRCAISystem;