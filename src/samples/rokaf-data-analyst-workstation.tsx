import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, Clock,
  Brain, Bot, TrendingUp, BarChart3, Cpu, Network,
  Filter, Database,
  Microscope
} from 'lucide-react';

interface Threat {
  id: string;
  classification: string;
  confidence: number;
  riskLevel: string;
  characteristics: {
    speed: number;
    altitude: number;
    heading: number;
    rcs: number;
    emissionPattern: string;
    flightProfile: string;
  };
  aiAssessment: {
    aircraftType: string;
    probability: number;
    intent: string;
    threatWindow: string;
    recommendedAction: string;
  };
  correlatedData: {
    sigint: string;
    elint: string;
    humint: string;
    osint: string;
  };
  timeline: {
    time: string;
    event: string;
    source: string;
  }[];
}

const DataAnalystWorkstation = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedThreat, setSelectedThreat] = useState<Threat | null>(null);
  const [analysisMode, setAnalysisMode] = useState('REALTIME');
  const [aiProcessing, setAiProcessing] = useState(false);
  const [confidenceLevel, setConfidenceLevel] = useState(87);
  const [dataSource, setDataSource] = useState('ALL_SENSORS');

  // AI 분석 시스템 상태
  const [aiSystems] = useState({
    threatAnalysis: { status: 'ACTIVE', confidence: 94, processing: 156 },
    patternRecognition: { status: 'LEARNING', confidence: 89, processing: 73 },
    behaviorAnalysis: { status: 'ACTIVE', confidence: 92, processing: 204 },
    predictiveModel: { status: 'UPDATING', confidence: 86, processing: 38 },
    signalIntel: { status: 'ACTIVE', confidence: 97, processing: 89 },
    crossCorrelation: { status: 'STANDBY', confidence: 83, processing: 0 }
  });

  // 위협 데이터 분석 결과
  const threatAnalysis = [
    {
      id: 'THR-001',
      classification: 'UNKNOWN_MILITARY',
      confidence: 73,
      riskLevel: 'HIGH',
      characteristics: {
        speed: 540,
        altitude: 32000,
        heading: 45,
        rcs: 0.8,
        emissionPattern: 'MILITARY_RADAR',
        flightProfile: 'INTERCEPT_VECTOR'
      },
      aiAssessment: {
        aircraftType: 'FIGHTER_AIRCRAFT',
        probability: 89,
        intent: 'RECONNAISSANCE',
        threatWindow: '15-20 MIN',
        recommendedAction: 'SCRAMBLE_INTERCEPTOR'
      },
      correlatedData: {
        sigint: 'MILITARY_COMMS_DETECTED',
        elint: 'FIRE_CONTROL_RADAR_OFF',
        humint: 'NO_CORRELATED_ACTIVITY',
        osint: 'RECENT_EXERCISE_ACTIVITY'
      },
      timeline: [
        { time: '14:15Z', event: 'Initial detection', source: 'AN/FPS-117' },
        { time: '14:16Z', event: 'Speed increase detected', source: 'RADAR_FUSION' },
        { time: '14:17Z', event: 'Heading change', source: 'TRACK_CORRELATION' },
        { time: '14:18Z', event: 'AI classification updated', source: 'ML_ENGINE' }
      ]
    },
    {
      id: 'THR-002',
      classification: 'POTENTIAL_STEALTH',
      confidence: 67,
      riskLevel: 'CRITICAL',
      characteristics: {
        speed: 480,
        altitude: 35000,
        heading: 65,
        rcs: 0.001,
        emissionPattern: 'LOW_PROBABILITY_INTERCEPT',
        flightProfile: 'PENETRATION_CORRIDOR'
      },
      aiAssessment: {
        aircraftType: 'STEALTH_FIGHTER',
        probability: 78,
        intent: 'SURVEILLANCE',
        threatWindow: '8-12 MIN',
        recommendedAction: 'ALERT_AIR_DEFENSE'
      },
      correlatedData: {
        sigint: 'ENCRYPTED_BURST_COMMS',
        elint: 'ADVANCED_ECM_DETECTED',
        humint: 'ELEVATED_READINESS',
        osint: 'STRATEGIC_INTEREST_AREA'
      },
      timeline: [
        { time: '14:10Z', event: 'Weak return detected', source: 'AN/FPS-117' },
        { time: '14:12Z', event: 'RCS analysis complete', source: 'AI_PROCESSOR' },
        { time: '14:14Z', event: 'Stealth probability calculated', source: 'ML_CLASSIFIER' },
        { time: '14:19Z', event: 'Threat level escalated', source: 'THREAT_ENGINE' }
      ]
    },
    {
      id: 'THR-003',
      classification: 'CIVILIAN_DEVIATION',
      confidence: 45,
      riskLevel: 'LOW',
      characteristics: {
        speed: 480,
        altitude: 35000,
        heading: 285,
        rcs: 15.2,
        emissionPattern: 'CIVILIAN_TRANSPONDER',
        flightProfile: 'COURSE_DEVIATION'
      },
      aiAssessment: {
        aircraftType: 'COMMERCIAL_AIRLINER',
        probability: 91,
        intent: 'WEATHER_AVOIDANCE',
        threatWindow: 'NON_HOSTILE',
        recommendedAction: 'MONITOR_ONLY'
      },
      correlatedData: {
        sigint: 'CIVILIAN_ATC_COMMS',
        elint: 'WEATHER_RADAR_ACTIVE',
        humint: 'SCHEDULED_FLIGHT',
        osint: 'STORM_SYSTEM_PRESENT'
      },
      timeline: [
        { time: '14:05Z', event: 'Flight plan deviation', source: 'ATC_SYSTEM' },
        { time: '14:07Z', event: 'Weather correlation', source: 'METEOROLOGY' },
        { time: '14:09Z', event: 'Civilian classification', source: 'IFF_SYSTEM' },
        { time: '14:20Z', event: 'Threat downgraded', source: 'AI_FUSION' }
      ]
    }
  ];

  // 실시간 데이터 스트림
  const [dataStreams, setDataStreams] = useState({
    radar: { rate: 1247, quality: 98, latency: 15 },
    sigint: { rate: 843, quality: 92, latency: 23 },
    elint: { rate: 567, quality: 89, latency: 31 },
    imagery: { rate: 234, quality: 94, latency: 45 },
    humint: { rate: 12, quality: 87, latency: 120 },
    osint: { rate: 89, quality: 91, latency: 67 }
  });

  // 분석 메트릭스
  const [analysisMetrics, setAnalysisMetrics] = useState({
    totalTracks: 15,
    threatsIdentified: 3,
    falsePositives: 2,
    confidence: 87,
    processingTime: 2.3,
    accuracy: 94.2,
    coverage: 98.7
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      
      // AI 시스템 시뮬레이션
      if (analysisMode === 'REALTIME') {
        setAiProcessing(Math.random() > 0.7);
        setConfidenceLevel(prev => Math.min(Math.max(prev + (Math.random() - 0.5) * 2, 80), 95));
        
        // 데이터 스트림 업데이트
        setDataStreams(prev => ({
          ...prev,
          radar: { ...prev.radar, rate: prev.radar.rate + Math.floor(Math.random() * 20 - 10) },
          sigint: { ...prev.sigint, rate: prev.sigint.rate + Math.floor(Math.random() * 15 - 7) },
          elint: { ...prev.elint, rate: prev.elint.rate + Math.floor(Math.random() * 10 - 5) }
        }));
        
        // 분석 메트릭스 업데이트
        setAnalysisMetrics(prev => ({
          ...prev,
          confidence: Math.min(Math.max(prev.confidence + (Math.random() - 0.5) * 1, 85), 95),
          accuracy: Math.min(Math.max(prev.accuracy + (Math.random() - 0.5) * 0.5, 90), 98)
        }));
      }
    }, 1500);
    
    return () => clearInterval(timer);
  }, [analysisMode]);

  const renderThreatMatrix = () => {
    return (
      <div className="grid grid-cols-3 gap-4 h-full">
        {threatAnalysis.map(threat => (
          <div 
            key={threat.id}
            className={`bg-gray-950 rounded-lg border-2 p-3 cursor-pointer transition-all ${
              selectedThreat?.id === threat.id ? 'border-yellow-500 bg-yellow-900/10' :
              threat.riskLevel === 'CRITICAL' ? 'border-red-600' :
              threat.riskLevel === 'HIGH' ? 'border-orange-600' :
              'border-green-600'
            }`}
            onClick={() => setSelectedThreat(threat)}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${
                  threat.riskLevel === 'CRITICAL' ? 'bg-red-500 animate-pulse' :
                  threat.riskLevel === 'HIGH' ? 'bg-orange-500' : 'bg-green-500'
                }`}></div>
                <span className="text-xs font-bold text-green-300">{threat.id}</span>
              </div>
              <span className="text-xs text-purple-400">{threat.confidence}%</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="text-yellow-400 font-bold">{threat.classification}</div>
              <div className={`font-bold ${
                threat.riskLevel === 'CRITICAL' ? 'text-red-400' :
                threat.riskLevel === 'HIGH' ? 'text-orange-400' : 'text-green-400'
              }`}>
                RISK: {threat.riskLevel}
              </div>
              
              <div className="space-y-1 text-[10px]">
                <div>Speed: {threat.characteristics.speed}kt</div>
                <div>Alt: FL{Math.floor(threat.characteristics.altitude/100)}</div>
                <div>RCS: {threat.characteristics.rcs}m²</div>
                <div>Profile: {threat.characteristics.flightProfile}</div>
              </div>

              <div className="border-t border-gray-700 pt-2">
                <div className="text-blue-400 font-bold">AI ASSESSMENT</div>
                <div className="text-[10px] space-y-1">
                  <div>Type: {threat.aiAssessment.aircraftType}</div>
                  <div>Intent: {threat.aiAssessment.intent}</div>
                  <div>Window: {threat.aiAssessment.threatWindow}</div>
                </div>
              </div>

              <div className="mt-2">
                <div className={`text-[10px] px-2 py-1 rounded text-center font-bold ${
                  threat.aiAssessment.recommendedAction.includes('SCRAMBLE') ? 'bg-red-800 text-red-300' :
                  threat.aiAssessment.recommendedAction.includes('ALERT') ? 'bg-orange-800 text-orange-300' :
                  'bg-green-800 text-green-300'
                }`}>
                  {threat.aiAssessment.recommendedAction.replace('_', ' ')}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderAnalyticsDashboard = () => {
    return (
      <div className="grid grid-cols-2 gap-4 h-full">
        {/* 실시간 메트릭스 */}
        <div className="bg-gray-950 rounded-lg border border-green-600 p-3">
          <h4 className="text-sm font-bold text-green-400 mb-3 flex items-center">
            <TrendingUp className="w-4 h-4 mr-2" />
            ANALYSIS METRICS
          </h4>
          <div className="space-y-3">
            {Object.entries(analysisMetrics).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center">
                <span className="text-xs text-green-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-green-300 font-bold">
                    {typeof value === 'number' ? 
                      (key.includes('Time') ? `${value.toFixed(1)}s` :
                       key.includes('Rate') || key.includes('confidence') || key.includes('accuracy') || key.includes('coverage') ? `${value.toFixed(1)}%` :
                       value.toString()) : value}
                  </span>
                  {typeof value === 'number' && (
                    <div className="w-16 h-1 bg-gray-700 rounded">
                      <div 
                        className="h-1 bg-green-500 rounded" 
                        style={{ width: `${Math.min((value / (key.includes('Time') ? 5 : 100)) * 100, 100)}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 데이터 스트림 상태 */}
        <div className="bg-gray-950 rounded-lg border border-blue-600 p-3">
          <h4 className="text-sm font-bold text-blue-400 mb-3 flex items-center">
            <Database className="w-4 h-4 mr-2" />
            DATA STREAMS
          </h4>
          <div className="space-y-2">
            {Object.entries(dataStreams).map(([source, data]) => (
              <div key={source} className="border border-gray-700 rounded p-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-blue-300 uppercase">{source}</span>
                  <span className={`text-[10px] px-1 py-0.5 rounded ${
                    data.quality > 95 ? 'bg-green-900 text-green-300' :
                    data.quality > 85 ? 'bg-yellow-900 text-yellow-300' : 'bg-red-900 text-red-300'
                  }`}>
                    {data.quality}%
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1 text-[10px]">
                  <div>Rate: {data.rate}/sec</div>
                  <div>Latency: {data.latency}ms</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI 시스템 상태 */}
        <div className="bg-gray-950 rounded-lg border border-purple-600 p-3">
          <h4 className="text-sm font-bold text-purple-400 mb-3 flex items-center">
            <Brain className="w-4 h-4 mr-2" />
            AI PROCESSING
          </h4>
          <div className="space-y-2">
            {Object.entries(aiSystems).map(([system, data]) => (
              <div key={system} className="border border-gray-700 rounded p-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-purple-300 capitalize">
                    {system.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className={`text-[10px] px-1 py-0.5 rounded ${
                    data.status === 'ACTIVE' ? 'bg-green-900 text-green-300' :
                    data.status === 'LEARNING' ? 'bg-blue-900 text-blue-300' :
                    data.status === 'UPDATING' ? 'bg-yellow-900 text-yellow-300' :
                    'bg-gray-700 text-gray-400'
                  }`}>
                    {data.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1 text-[10px]">
                  <div>Confidence: {data.confidence}%</div>
                  <div>Processing: {data.processing}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 위협 트렌드 */}
        <div className="bg-gray-950 rounded-lg border border-yellow-600 p-3">
          <h4 className="text-sm font-bold text-yellow-400 mb-3 flex items-center">
            <BarChart3 className="w-4 h-4 mr-2" />
            THREAT TRENDS
          </h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-yellow-600">Last 1 Hour:</span>
              <span className="text-yellow-300">23 Detections</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-yellow-600">Classification Rate:</span>
              <span className="text-green-400">94.2%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-yellow-600">False Positives:</span>
              <span className="text-orange-400">2.1%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-yellow-600">Critical Threats:</span>
              <span className="text-red-400">1 Active</span>
            </div>
            
            {/* 미니 차트 시뮬레이션 */}
            <div className="mt-3 h-8 bg-gray-800 rounded flex items-end space-x-1 p-1">
              {[12, 8, 15, 23, 18, 9, 14, 19, 11, 16].map((value, index) => (
                <div 
                  key={index}
                  className="bg-yellow-500 rounded-t"
                  style={{ height: `${(value / 25) * 100}%`, width: '8%' }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-green-300 font-mono">
      {/* 헤더 */}
      <div className="bg-red-900 text-white text-center py-1 font-bold text-xs">
        ★★ TOP SECRET // REL TO ROKAF // DATA ANALYST WORKSTATION ★★
      </div>

      {/* 워크스테이션 헤더 */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-700 rounded-full flex items-center justify-center border-2 border-purple-400">
              <Brain className="w-8 h-8 text-purple-200" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-purple-300">DATA ANALYST</h1>
              <p className="text-sm text-purple-500">KE-14 Sector - SSG Choi M.K. - Intelligence Fusion</p>
            </div>
            <div className="flex space-x-2">
              <div className={`px-3 py-1 rounded text-sm font-bold border-2 ${
                aiProcessing ? 'bg-blue-900 text-blue-300 border-blue-400 animate-pulse' : 'bg-green-900 text-green-300 border-green-400'
              }`}>
                {aiProcessing ? 'AI PROCESSING' : 'AI READY'}
              </div>
              <div className="px-2 py-1 bg-purple-900 text-purple-300 rounded text-xs font-bold">
                {threatAnalysis.length} THREATS
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-8 text-xs">
            <div className="text-center">
              <div className="text-green-400 font-bold text-lg">{currentTime.toLocaleTimeString('en-GB')}</div>
              <div className="text-green-600">ANALYSIS TIME</div>
            </div>
            <div className="text-center">
              <div className="text-purple-400 font-bold">{confidenceLevel.toFixed(0)}%</div>
              <div className="text-purple-600">AI CONFIDENCE</div>
            </div>
            <div className="text-center">
              <div className="text-yellow-400 font-bold">SSG Choi M.K.</div>
              <div className="text-yellow-600">DATA ANALYST</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-140px)]">
        {/* 좌측: 분석 제어 패널 */}
        <div className="w-80 bg-gray-800 border-r border-gray-700 p-4 space-y-4 overflow-y-auto">
          {/* 분석 모드 제어 */}
          <div className="bg-gray-900 rounded-lg p-3">
            <h3 className="text-sm font-bold text-purple-400 mb-3 flex items-center">
              <Cpu className="w-4 h-4 mr-2" />
              ANALYSIS MODE
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-purple-600 block mb-1">Processing Mode</label>
                <select 
                  value={analysisMode} 
                  onChange={(e) => setAnalysisMode(e.target.value)}
                  className="w-full bg-gray-800 text-purple-400 text-xs border border-gray-600 rounded px-2 py-1"
                >
                  <option value="REALTIME">REAL-TIME ANALYSIS</option>
                  <option value="BATCH">BATCH PROCESSING</option>
                  <option value="HISTORICAL">HISTORICAL ANALYSIS</option>
                  <option value="PREDICTIVE">PREDICTIVE MODELING</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-purple-600 block mb-1">Data Sources</label>
                <select 
                  value={dataSource} 
                  onChange={(e) => setDataSource(e.target.value)}
                  className="w-full bg-gray-800 text-purple-400 text-xs border border-gray-600 rounded px-2 py-1"
                >
                  <option value="ALL_SENSORS">ALL SENSORS</option>
                  <option value="RADAR_ONLY">RADAR ONLY</option>
                  <option value="SIGINT_ELINT">SIGINT/ELINT</option>
                  <option value="MULTI_INT">MULTI-INT FUSION</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-purple-600 block mb-1">AI Confidence Threshold: {confidenceLevel.toFixed(0)}%</label>
                <input 
                  type="range" 
                  min="70" 
                  max="95" 
                  value={confidenceLevel}
                  onChange={(e) => setConfidenceLevel(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* 위협 분류 필터 */}
          <div className="bg-gray-900 rounded-lg p-3">
            <h3 className="text-sm font-bold text-yellow-400 mb-3 flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              THREAT FILTERS
            </h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="military" defaultChecked className="text-red-400" />
                <label htmlFor="military" className="text-xs text-green-600">Military Aircraft</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="stealth" defaultChecked className="text-purple-400" />
                <label htmlFor="stealth" className="text-xs text-green-600">Stealth Signatures</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="civilian" defaultChecked className="text-green-400" />
                <label htmlFor="civilian" className="text-xs text-green-600">Civilian Deviations</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="unknown" defaultChecked className="text-yellow-400" />
                <label htmlFor="unknown" className="text-xs text-green-600">Unknown Types</label>
              </div>
              <div className="border-t border-gray-700 pt-2 mt-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="critical" defaultChecked className="text-red-500" />
                  <label htmlFor="critical" className="text-xs text-green-600">Critical Risk Only</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="correlated" defaultChecked className="text-blue-400" />
                  <label htmlFor="correlated" className="text-xs text-green-600">Multi-Source Correlated</label>
                </div>
              </div>
            </div>
          </div>

          {/* 분석 도구 */}
          <div className="bg-gray-900 rounded-lg p-3">
            <h3 className="text-sm font-bold text-blue-400 mb-3 flex items-center">
              <Microscope className="w-4 h-4 mr-2" />
              ANALYSIS TOOLS
            </h3>
            <div className="space-y-2">
              <button 
                onClick={() => setAiProcessing(true)}
                className="w-full bg-purple-800 hover:bg-purple-700 text-white py-1 px-2 rounded text-xs"
              >
                RUN DEEP ANALYSIS
              </button>
              <button className="w-full bg-blue-800 hover:bg-blue-700 text-white py-1 px-2 rounded text-xs">
                PATTERN CORRELATION
              </button>
              <button className="w-full bg-green-800 hover:bg-green-700 text-white py-1 px-2 rounded text-xs">
                BEHAVIORAL MODELING
              </button>
              <button className="w-full bg-yellow-800 hover:bg-yellow-700 text-white py-1 px-2 rounded text-xs">
                THREAT PREDICTION
              </button>
              <button className="w-full bg-orange-800 hover:bg-orange-700 text-white py-1 px-2 rounded text-xs">
                EXPORT ASSESSMENT
              </button>
            </div>
          </div>

          {/* 데이터 소스 상태 */}
          <div className="bg-gray-900 rounded-lg p-3">
            <h3 className="text-sm font-bold text-green-400 mb-3 flex items-center">
              <Network className="w-4 h-4 mr-2" />
              DATA SOURCES
            </h3>
            <div className="space-y-1 text-xs">
              {Object.entries(dataStreams).map(([source, data]) => (
                <div key={source} className="flex justify-between items-center">
                  <span className="text-green-600 capitalize">{source}:</span>
                  <div className="flex items-center space-x-1">
                    <div className={`w-2 h-2 rounded-full ${
                      data.quality > 95 ? 'bg-green-500' :
                      data.quality > 85 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    <span className="text-green-300">{data.quality}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI 학습 상태 */}
          <div className="bg-purple-900/20 rounded-lg p-3 border border-purple-700">
            <h3 className="text-sm font-bold text-purple-400 mb-3 flex items-center">
              <Bot className="w-4 h-4 mr-2" />
              AI LEARNING
            </h3>
            <div className="text-xs space-y-2">
              <div>Model: ROKAF-THREAT-ANALYSIS-v3.2</div>
              <div>Training Data: 2.3M samples</div>
              <div>Last Update: {currentTime.toLocaleDateString()}</div>
              <div className="mt-2">
                <div className="flex justify-between mb-1">
                  <span>Learning Progress:</span>
                  <span>{confidenceLevel.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${confidenceLevel}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 중앙: 위협 매트릭스 */}
        <div className="flex-1 bg-gray-900 p-4">
          <div className="h-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-green-400">THREAT ANALYSIS MATRIX</h2>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-blue-800 text-blue-300 rounded text-xs">
                  MATRIX VIEW
                </button>
                <button className="px-3 py-1 bg-gray-700 text-gray-400 rounded text-xs">
                  TIMELINE VIEW
                </button>
                <button className="px-3 py-1 bg-gray-700 text-gray-400 rounded text-xs">
                  GEOGRAPHIC VIEW
                </button>
              </div>
            </div>
            {renderThreatMatrix()}
          </div>
        </div>

        {/* 우측: 상세 분석 및 대시보드 */}
        <div className="w-96 bg-gray-800 border-l border-gray-700 p-4 space-y-4 overflow-y-auto">
          {/* 선택된 위협 상세 분석 */}
          {selectedThreat && (
            <div className="bg-gray-900 rounded-lg p-3 border-l-4 border-red-500">
              <h3 className="text-sm font-bold text-red-400 mb-3 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2" />
                THREAT ANALYSIS: {selectedThreat.id}
              </h3>
              <div className="text-xs space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-green-600">Classification:</div>
                  <div className="text-yellow-300">{selectedThreat.classification}</div>
                  <div className="text-green-600">Confidence:</div>
                  <div className="text-purple-400 font-bold">{selectedThreat.confidence}%</div>
                  <div className="text-green-600">Risk Level:</div>
                  <div className={`font-bold ${
                    selectedThreat.riskLevel === 'CRITICAL' ? 'text-red-400' :
                    selectedThreat.riskLevel === 'HIGH' ? 'text-orange-400' : 'text-green-400'
                  }`}>{selectedThreat.riskLevel}</div>
                </div>

                <div className="border-t border-gray-700 pt-2 mt-3">
                  <div className="text-blue-400 font-bold mb-2">CHARACTERISTICS</div>
                  <div className="grid grid-cols-2 gap-1 text-[10px]">
                    <div>Speed: {selectedThreat.characteristics.speed}kt</div>
                    <div>Alt: FL{Math.floor(selectedThreat.characteristics.altitude/100)}</div>
                    <div>Heading: {selectedThreat.characteristics.heading.toString().padStart(3, '0')}°</div>
                    <div>RCS: {selectedThreat.characteristics.rcs}m²</div>
                  </div>
                  <div className="mt-1 text-[10px]">
                    <div>Emission: {selectedThreat.characteristics.emissionPattern}</div>
                    <div>Profile: {selectedThreat.characteristics.flightProfile}</div>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-2 mt-3">
                  <div className="text-purple-400 font-bold mb-2">AI ASSESSMENT</div>
                  <div className="space-y-1 text-[10px]">
                    <div>Type: {selectedThreat.aiAssessment.aircraftType}</div>
                    <div>Probability: {selectedThreat.aiAssessment.probability}%</div>
                    <div>Intent: {selectedThreat.aiAssessment.intent}</div>
                    <div>Time Window: {selectedThreat.aiAssessment.threatWindow}</div>
                    <div className="mt-2 p-1 bg-red-900/30 rounded text-center font-bold">
                      {selectedThreat.aiAssessment.recommendedAction.replace(/_/g, ' ')}
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-2 mt-3">
                  <div className="text-yellow-400 font-bold mb-2">CORRELATED DATA</div>
                  <div className="space-y-1 text-[10px]">
                    <div>SIGINT: {selectedThreat.correlatedData.sigint}</div>
                    <div>ELINT: {selectedThreat.correlatedData.elint}</div>
                    <div>HUMINT: {selectedThreat.correlatedData.humint}</div>
                    <div>OSINT: {selectedThreat.correlatedData.osint}</div>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-2 mt-3">
                  <div className="text-green-400 font-bold mb-2">TIMELINE</div>
                  <div className="space-y-1">
                    {selectedThreat.timeline.map((event, index) => (
                      <div key={index} className="text-[10px] border-l-2 border-blue-500 pl-2">
                        <div className="text-blue-400">{event.time}</div>
                        <div className="text-green-300">{event.event}</div>
                        <div className="text-gray-500">{event.source}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 분석 대시보드 */}
          <div className="bg-gray-900 rounded-lg p-3">
            <h3 className="text-sm font-bold text-green-400 mb-3 flex items-center">
              <BarChart3 className="w-4 h-4 mr-2" />
              ANALYTICS DASHBOARD
            </h3>
            <div className="h-64">
              {renderAnalyticsDashboard()}
            </div>
          </div>

          {/* 분석 작업 큐 */}
          <div className="bg-gray-900 rounded-lg p-3">
            <h3 className="text-sm font-bold text-orange-400 mb-3 flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              ANALYSIS QUEUE
            </h3>
            <div className="text-xs space-y-2">
              <div className="flex justify-between items-center p-2 bg-blue-900/20 rounded">
                <span>Pattern Recognition</span>
                <span className="text-blue-400">PROCESSING</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-yellow-900/20 rounded">
                <span>Behavioral Analysis</span>
                <span className="text-yellow-400">QUEUED</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-purple-900/20 rounded">
                <span>Threat Modeling</span>
                <span className="text-purple-400">PENDING</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 분류 표시 */}
      <div className="bg-red-900 text-white text-center py-1 font-bold text-xs">
        ★★ TOP SECRET // REL TO ROKAF // DATA ANALYST WORKSTATION ★★
      </div>
    </div>
  );
};

export default DataAnalystWorkstation;