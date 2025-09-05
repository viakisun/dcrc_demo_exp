import { Threat, AISystem, DataStream, AnalysisMetrics } from './types';

export const threatAnalysis: Threat[] = [
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

export const aiSystems: { [key: string]: AISystem } = {
    threatAnalysis: { status: 'ACTIVE', confidence: 94, processing: 156 },
    patternRecognition: { status: 'LEARNING', confidence: 89, processing: 73 },
    behaviorAnalysis: { status: 'ACTIVE', confidence: 92, processing: 204 },
    predictiveModel: { status: 'UPDATING', confidence: 86, processing: 38 },
    signalIntel: { status: 'ACTIVE', confidence: 97, processing: 89 },
    crossCorrelation: { status: 'STANDBY', confidence: 83, processing: 0 }
};

export const dataStreams: { [key: string]: DataStream } = {
    radar: { rate: 1247, quality: 98, latency: 15 },
    sigint: { rate: 843, quality: 92, latency: 23 },
    elint: { rate: 567, quality: 89, latency: 31 },
    imagery: { rate: 234, quality: 94, latency: 45 },
    humint: { rate: 12, quality: 87, latency: 120 },
    osint: { rate: 89, quality: 91, latency: 67 }
};

export const analysisMetrics: AnalysisMetrics = {
    totalTracks: 15,
    threatsIdentified: 3,
    falsePositives: 2,
    confidence: 87,
    processingTime: 2.3,
    accuracy: 94.2,
    coverage: 98.7
};
