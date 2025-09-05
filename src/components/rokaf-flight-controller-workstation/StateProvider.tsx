import React, { createContext, useReducer, useContext, Dispatch } from 'react';
import { Aircraft, Airway, Waypoint, WeatherData, CommLogEntry } from './types';
import { controlledAircraft, airwaysAndWaypoints, weatherData, commLog } from './constants';

interface State {
  currentTime: Date;
  selectedAircraft: Aircraft | null;
  vectorMode: string;
  selectedFreq: string;
  transmitting: boolean;
  weatherLayer: boolean;
  routeDisplay: string;
  controlledAircraft: Aircraft[];
  airwaysAndWaypoints: (Airway | Waypoint)[];
  weatherData: WeatherData[];
  commLog: CommLogEntry[];
}

type Action =
  | { type: 'SET_CURRENT_TIME'; payload: Date }
  | { type: 'SET_SELECTED_AIRCRAFT'; payload: Aircraft | null }
  | { type: 'SET_VECTOR_MODE'; payload: string }
  | { type: 'SET_SELECTED_FREQ'; payload: string }
  | { type: 'SET_TRANSMITTING'; payload: boolean }
  | { type: 'TOGGLE_WEATHER_LAYER' }
  | { type: 'SET_ROUTE_DISPLAY'; payload: string }
  | { type: 'ADD_COMM_LOG'; payload: CommLogEntry };

const initialState: State = {
  currentTime: new Date(),
  selectedAircraft: null,
  vectorMode: 'MANUAL',
  selectedFreq: '251.75',
  transmitting: false,
  weatherLayer: true,
  routeDisplay: 'ALL',
  controlledAircraft,
  airwaysAndWaypoints,
  weatherData,
  commLog,
};

const StateContext = createContext<{ state: State; dispatch: Dispatch<Action> } | undefined>(undefined);

const stateReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_CURRENT_TIME':
      return { ...state, currentTime: action.payload };
    case 'SET_SELECTED_AIRCRAFT':
      return { ...state, selectedAircraft: action.payload };
    case 'SET_VECTOR_MODE':
      return { ...state, vectorMode: action.payload };
    case 'SET_SELECTED_FREQ':
      return { ...state, selectedFreq: action.payload };
    case 'SET_TRANSMITTING':
      return { ...state, transmitting: action.payload };
    case 'TOGGLE_WEATHER_LAYER':
      return { ...state, weatherLayer: !state.weatherLayer };
    case 'SET_ROUTE_DISPLAY':
      return { ...state, routeDisplay: action.payload };
    case 'ADD_COMM_LOG':
      return { ...state, commLog: [action.payload, ...state.commLog.slice(0, 9)] };
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
