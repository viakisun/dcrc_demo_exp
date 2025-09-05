import React, { createContext, useReducer, useContext, Dispatch } from 'react';
import { Threat, AISystem, DataStream, AnalysisMetrics } from './types';
import { threatAnalysis, aiSystems, dataStreams, analysisMetrics } from './constants';

interface State {
  currentTime: Date;
  selectedThreat: Threat | null;
  analysisMode: string;
  aiProcessing: boolean;
  confidenceLevel: number;
  dataSource: string;
  threats: Threat[];
  aiSystems: { [key: string]: AISystem };
  dataStreams: { [key: string]: DataStream };
  analysisMetrics: AnalysisMetrics;
}

type Action =
  | { type: 'SET_CURRENT_TIME'; payload: Date }
  | { type: 'SET_SELECTED_THREAT'; payload: Threat | null }
  | { type: 'SET_ANALYSIS_MODE'; payload: string }
  | { type: 'SET_AI_PROCESSING'; payload: boolean }
  | { type: 'SET_CONFIDENCE_LEVEL'; payload: number }
  | { type: 'SET_DATA_SOURCE'; payload: string }
  | { type: 'UPDATE_METRICS' };

const initialState: State = {
  currentTime: new Date(),
  selectedThreat: null,
  analysisMode: 'REALTIME',
  aiProcessing: false,
  confidenceLevel: 87,
  dataSource: 'ALL_SENSORS',
  threats: threatAnalysis,
  aiSystems,
  dataStreams,
  analysisMetrics,
};

const StateContext = createContext<{ state: State; dispatch: Dispatch<Action> } | undefined>(undefined);

const stateReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_CURRENT_TIME':
      return { ...state, currentTime: action.payload };
    case 'SET_SELECTED_THREAT':
      return { ...state, selectedThreat: action.payload };
    case 'SET_ANALYSIS_MODE':
      return { ...state, analysisMode: action.payload };
    case 'SET_AI_PROCESSING':
      return { ...state, aiProcessing: action.payload };
    case 'SET_CONFIDENCE_LEVEL':
      return { ...state, confidenceLevel: action.payload };
    case 'SET_DATA_SOURCE':
      return { ...state, dataSource: action.payload };
    case 'UPDATE_METRICS':
      return {
        ...state,
        aiProcessing: Math.random() > 0.7,
        confidenceLevel: Math.min(Math.max(state.confidenceLevel + (Math.random() - 0.5) * 2, 80), 95),
        dataStreams: {
          ...state.dataStreams,
          radar: { ...state.dataStreams.radar, rate: state.dataStreams.radar.rate + Math.floor(Math.random() * 20 - 10) },
          sigint: { ...state.dataStreams.sigint, rate: state.dataStreams.sigint.rate + Math.floor(Math.random() * 15 - 7) },
          elint: { ...state.dataStreams.elint, rate: state.dataStreams.elint.rate + Math.floor(Math.random() * 10 - 5) },
        },
        analysisMetrics: {
          ...state.analysisMetrics,
          confidence: Math.min(Math.max(state.analysisMetrics.confidence + (Math.random() - 0.5) * 1, 85), 95),
          accuracy: Math.min(Math.max(state.analysisMetrics.accuracy + (Math.random() - 0.5) * 0.5, 90), 98),
        },
      };
    default:
      return state;
  }
};

export const StateProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error('useStateContext must be used within a StateProvider');
  }
  return context;
};
