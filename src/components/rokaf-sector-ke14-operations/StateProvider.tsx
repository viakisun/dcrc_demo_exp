import React, { createContext, useReducer, useContext, Dispatch } from 'react';
import { Operator, SectorTrack, CommLogEntry } from './types';
import { operatorStations, sectorTracks, commLog } from './constants';

interface State {
  currentTime: Date;
  selectedOperator: string;
  alertStatus: string;
  selectedTrack: SectorTrack | null;
  operators: Operator[];
  tracks: SectorTrack[];
  commLog: CommLogEntry[];
}

type Action =
  | { type: 'SET_CURRENT_TIME'; payload: Date }
  | { type: 'SET_SELECTED_OPERATOR'; payload: string }
  | { type: 'SET_ALERT_STATUS'; payload: string }
  | { type: 'SET_SELECTED_TRACK'; payload: SectorTrack | null };

const initialState: State = {
  currentTime: new Date(),
  selectedOperator: 'OPS-01',
  alertStatus: 'GREEN',
  selectedTrack: null,
  operators: operatorStations,
  tracks: sectorTracks,
  commLog,
};

const StateContext = createContext<{ state: State; dispatch: Dispatch<Action> } | undefined>(undefined);

const stateReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_CURRENT_TIME':
      return { ...state, currentTime: action.payload };
    case 'SET_SELECTED_OPERATOR':
      return { ...state, selectedOperator: action.payload };
    case 'SET_ALERT_STATUS':
      return { ...state, alertStatus: action.payload };
    case 'SET_SELECTED_TRACK':
      return { ...state, selectedTrack: action.payload };
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
