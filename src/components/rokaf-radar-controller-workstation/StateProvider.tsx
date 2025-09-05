import React, { createContext, useReducer, useContext, Dispatch } from 'react';
import { RadarTrack, RadarSystem, RadarPerformance } from './types';
import { radarTracks, radarSystems, radarPerformance } from './constants';

interface State {
  currentTime: Date;
  selectedTrack: RadarTrack | null;
  radarMode: string;
  radarRange: number;
  radarSweep: number;
  signalFilter: string;
  trackingMode: string;
  radarSystems: RadarSystem[];
  radarTracks: RadarTrack[];
  radarPerformance: RadarPerformance;
}

type Action =
  | { type: 'SET_CURRENT_TIME'; payload: Date }
  | { type: 'SET_RADAR_SWEEP'; payload: number }
  | { type: 'SET_SELECTED_TRACK'; payload: RadarTrack | null }
  | { type: 'SET_RADAR_MODE'; payload: string }
  | { type: 'SET_RADAR_RANGE'; payload: number }
  | { type: 'SET_SIGNAL_FILTER'; payload: string }
  | { type: 'SET_TRACKING_MODE'; payload: string }
  | { type: 'UPDATE_PERFORMANCE' };

const initialState: State = {
  currentTime: new Date(),
  selectedTrack: null,
  radarMode: 'SEARCH',
  radarRange: 100,
  radarSweep: 0,
  signalFilter: 'ALL',
  trackingMode: 'AUTO',
  radarSystems,
  radarTracks,
  radarPerformance,
};

const StateContext = createContext<{ state: State; dispatch: Dispatch<Action> } | undefined>(undefined);

const stateReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_CURRENT_TIME':
      return { ...state, currentTime: action.payload };
    case 'SET_RADAR_SWEEP':
      return { ...state, radarSweep: action.payload };
    case 'SET_SELECTED_TRACK':
      return { ...state, selectedTrack: action.payload };
    case 'SET_RADAR_MODE':
      return { ...state, radarMode: action.payload };
    case 'SET_RADAR_RANGE':
      return { ...state, radarRange: action.payload };
    case 'SET_SIGNAL_FILTER':
      return { ...state, signalFilter: action.payload };
    case 'SET_TRACKING_MODE':
      return { ...state, trackingMode: action.payload };
    case 'UPDATE_PERFORMANCE':
      return {
        ...state,
        radarPerformance: {
          ...state.radarPerformance,
          detectionRate: Math.min(Math.max(state.radarPerformance.detectionRate + (Math.random() - 0.5) * 0.1, 90), 99),
          falseAlarmRate: Math.max(Math.min(state.radarPerformance.falseAlarmRate + (Math.random() - 0.5) * 0.01, 0.2), 0.05),
          trackingAccuracy: Math.min(Math.max(state.radarPerformance.trackingAccuracy + (Math.random() - 0.5) * 0.1, 95), 99.5),
        }
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
