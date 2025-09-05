export interface Threat {
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

export interface AISystem {
  status: string;
  confidence: number;
  processing: number;
}

export interface DataStream {
  rate: number;
  quality: number;
  latency: number;
}

export interface AnalysisMetrics {
  totalTracks: number;
  threatsIdentified: number;
  falsePositives: number;
  confidence: number;
  processingTime: number;
  accuracy: number;
  coverage: number;
}
