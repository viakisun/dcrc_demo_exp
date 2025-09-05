import React, { createContext, useReducer, useContext, Dispatch } from 'react';
import { CommChannel, SystemStatus, CommActivity, CommStats } from './types';
import { commChannels, systemStatus, commActivity, commStats } from './constants';

interface State {
  currentTime: Date;
  selectedChannel: string;
  monitorMode: string;
  encryptionLevel: number;
  jamDetection: boolean;
  relayMode: string;
  commChannels: CommChannel[];
  systemStatus: SystemStatus[];
  commActivity: CommActivity[];
  commStats: CommStats;
}

type Action =
  | { type: 'SET_CURRENT_TIME'; payload: Date }
  | { type: 'SET_SELECTED_CHANNEL'; payload: string }
  | { type: 'TOGGLE_MONITOR_MODE' }
  | { type: 'TOGGLE_JAM_DETECTION' }
  | { type: 'TOGGLE_RELAY_MODE' };

const initialState: State = {
  currentTime: new Date(),
  selectedChannel: '251.75',
  monitorMode: 'ALL',
  encryptionLevel: 95.7,
  jamDetection: false,
  relayMode: 'AUTO',
  commChannels,
  systemStatus,
  commActivity,
  commStats,
};

const StateContext = createContext<{ state: State; dispatch: Dispatch<Action> } | undefined>(undefined);

const stateReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_CURRENT_TIME':
      return { ...state, currentTime: action.payload };
    case 'SET_SELECTED_CHANNEL':
      return { ...state, selectedChannel: action.payload };
    case 'TOGGLE_MONITOR_MODE':
      return { ...state, monitorMode: state.monitorMode === 'ALL' ? 'SELECTED' : 'ALL' };
    case 'TOGGLE_JAM_DETECTION':
      return { ...state, jamDetection: !state.jamDetection };
    case 'TOGGLE_RELAY_MODE':
      return { ...state, relayMode: state.relayMode === 'AUTO' ? 'MANUAL' : 'AUTO' };
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
