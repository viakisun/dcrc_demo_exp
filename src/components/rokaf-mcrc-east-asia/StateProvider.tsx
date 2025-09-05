import React, { createContext, useReducer, useContext, Dispatch } from 'react';
import { Track, GridSector } from './types';
import { activeTracks, gridSectors } from './constants';

interface State {
  currentTime: Date;
  selectedTrack: Track | null;
  selectedGrid: string;
  threatLevel: string;
  tracks: Track[];
  gridSectors: GridSector[];
}

type Action =
  | { type: 'SET_CURRENT_TIME'; payload: Date }
  | { type: 'SET_SELECTED_TRACK'; payload: Track | null }
  | { type: 'SET_SELECTED_GRID'; payload: string };

const initialState: State = {
  currentTime: new Date(),
  selectedTrack: null,
  selectedGrid: 'KE-12',
  threatLevel: 'DEFCON-3',
  tracks: activeTracks,
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
