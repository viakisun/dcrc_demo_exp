import React, { createContext, useReducer, useContext, Dispatch } from 'react';
import { Track } from './types';
import { activeTracks, gridSectors, aiSystems, aiAlerts } from './constants';

interface State {
  currentTime: Date;
  selectedTrack: Track | null;
  threatLevel: string;
  aiMode: string;
  aiConfidence: number;
  showPredictions: boolean;
  autoResponse: boolean;
  aiAnalyzing: boolean;
  activeTracks: Track[];
  gridSectors: any[];
  aiSystems: any;
  aiAlerts: any[];
}

type Action =
  | { type: 'SET_CURRENT_TIME'; payload: Date }
  | { type: 'SET_SELECTED_TRACK'; payload: Track | null }
  | { type: 'SET_AI_MODE'; payload: string }
  | { type: 'SET_AI_CONFIDENCE'; payload: number }
  | { type: 'SET_SHOW_PREDICTIONS'; payload: boolean }
  | { type: 'SET_AUTO_RESPONSE'; payload: boolean }
  | { type: 'SET_AI_ANALYZING'; payload: boolean };

const initialState: State = {
  currentTime: new Date(),
  selectedTrack: null,
  threatLevel: 'FPCON-BRAVO',
  aiMode: 'ACTIVE',
  aiConfidence: 94,
  showPredictions: true,
  autoResponse: false,
  aiAnalyzing: false,
  activeTracks,
  gridSectors,
  aiSystems,
  aiAlerts,
};

const StateContext = createContext<{ state: State; dispatch: Dispatch<Action> } | undefined>(undefined);

const stateReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_CURRENT_TIME':
      return { ...state, currentTime: action.payload };
    case 'SET_SELECTED_TRACK':
      return { ...state, selectedTrack: action.payload };
    case 'SET_AI_MODE':
      return { ...state, aiMode: action.payload };
    case 'SET_AI_CONFIDENCE':
      return { ...state, aiConfidence: action.payload };
    case 'SET_SHOW_PREDICTIONS':
      return { ...state, showPredictions: action.payload };
    case 'SET_AUTO_RESPONSE':
      return { ...state, autoResponse: action.payload };
    case 'SET_AI_ANALYZING':
      return { ...state, aiAnalyzing: action.payload };
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
