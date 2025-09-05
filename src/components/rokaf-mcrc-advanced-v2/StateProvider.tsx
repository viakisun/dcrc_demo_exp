import React, { createContext, useReducer, useContext, Dispatch } from 'react';
import { Track, GroundThreat, GridSector } from './types';
import { activeTracks, groundThreats, gridSectors } from './constants';

interface State {
  currentTime: Date;
  selectedTrack: Track | null;
  selectedGrid: string;
  threatLevel: string;
  radarMode: string;
  showTrails: boolean;
  alertLevel: string;
  tracks: Track[];
  groundThreats: GroundThreat[];
  gridSectors: GridSector[];
}

type Action =
  | { type: 'SET_CURRENT_TIME'; payload: Date }
  | { type: 'SET_SELECTED_TRACK'; payload: Track | null }
  | { type: 'SET_SELECTED_GRID'; payload: string }
  | { type: 'SET_RADAR_MODE'; payload: string }
  | { type: 'TOGGLE_SHOW_TRAILS' }
  | { type: 'SET_ALERT_LEVEL'; payload: string };

const initialState: State = {
  currentTime: new Date(),
  selectedTrack: null,
  selectedGrid: 'KE-12',
  threatLevel: 'FPCON-BRAVO',
  radarMode: 'WIDE_AREA',
  showTrails: true,
  alertLevel: 'NORMAL',
  tracks: activeTracks,
  groundThreats,
  gridSectors,
};

const StateContext = createContext<{ state: State; dispatch: Dispatch<Action> } | undefined>(undefined);

const stateReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_CURRENT_TIME':
      return { ...state, currentTime: action.payload };
    case 'SET_SELECTED_TRACK':
      return { ...state, selectedTrack: action.payload };
    case 'SET_SELECTED_GRID':
      return { ...state, selectedGrid: action.payload };
    case 'SET_RADAR_MODE':
      return { ...state, radarMode: action.payload };
    case 'TOGGLE_SHOW_TRAILS':
      return { ...state, showTrails: !state.showTrails };
    case 'SET_ALERT_LEVEL':
      return { ...state, alertLevel: action.payload };
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
