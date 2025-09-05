import { Track, GridSector, AISystem, AIAlert } from './types';

export const gridSectors: GridSector[] = [
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

export const activeTracks: Track[] = [
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

export const aiSystems: { [key: string]: AISystem } = {
    threatAnalysis: { status: 'ACTIVE', confidence: 96, lastUpdate: 'Real-time' },
    patternRecognition: { status: 'LEARNING', confidence: 92, lastUpdate: '2 sec ago' },
    predictiveModeling: { status: 'ACTIVE', confidence: 89, lastUpdate: '1 sec ago' },
    autoClassification: { status: 'ACTIVE', confidence: 97, lastUpdate: 'Real-time' },
    missionPlanning: { status: 'STANDBY', confidence: 88, lastUpdate: '5 sec ago' },
    resourceOptimization: { status: 'ACTIVE', confidence: 94, lastUpdate: '3 sec ago' }
};

export const aiAlerts: AIAlert[] = [
    { id: 1, type: 'THREAT', message: 'AI detected potential hostile formation', confidence: 87, time: new Date(), priority: 'HIGH' },
    { id: 2, type: 'PATTERN', message: 'Unusual flight pattern identified in JE-10', confidence: 92, time: new Date(), priority: 'MEDIUM' },
    { id: 3, type: 'PREDICTION', message: 'Projected intercept point calculated', confidence: 95, time: new Date(), priority: 'HIGH' },
    { id: 4, type: 'ANOMALY', message: 'Communication anomaly detected', confidence: 78, time: new Date(), priority: 'LOW' }
];
