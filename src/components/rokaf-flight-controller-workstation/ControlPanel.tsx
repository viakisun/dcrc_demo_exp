import React from 'react';
import { Radio, Navigation2, Plane, Zap, Eye, ArrowLeft, ArrowRight, ArrowUp, ArrowDown } from 'lucide-react';
import { Aircraft } from './types';

interface ControlPanelProps {
  selectedFreq: string;
  onFreqChange: (freq: string) => void;
  transmitting: boolean;
  onTransmit: () => void;
  vectorMode: string;
  onVectorModeChange: (mode: string) => void;
  controlledAircraft: Aircraft[];
  selectedAircraft: Aircraft | null;
  onSelectAircraft: (aircraft: Aircraft) => void;
  onVectorCommand: (aircraft: Aircraft, command: string) => void;
  weatherLayer: boolean;
  onToggleWeatherLayer: () => void;
  routeDisplay: string;
  onRouteDisplayChange: (display: string) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = (props) => {
  const {
    selectedFreq, onFreqChange, transmitting, onTransmit, vectorMode, onVectorModeChange,
    controlledAircraft, selectedAircraft, onSelectAircraft, onVectorCommand,
    weatherLayer, onToggleWeatherLayer, routeDisplay, onRouteDisplayChange
  } = props;

  return (
    <div className="w-80 bg-gray-800/50 backdrop-blur-sm border-r border-gray-700 p-4 space-y-4 overflow-y-auto">
      <div className="bg-gray-900/50 rounded-lg p-3">
        <h3 className="text-sm font-bold text-purple-400 mb-3 flex items-center">
          <Radio className="w-4 h-4 mr-2" />
          COMMUNICATION
        </h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-400 block mb-1">Active Frequency</label>
            <select
              value={selectedFreq}
              onChange={(e) => onFreqChange(e.target.value)}
              className="w-full bg-gray-800 text-purple-300 text-xs border border-gray-600 rounded px-2 py-1"
            >
              <option value="251.75">251.75 - PRIMARY</option>
              <option value="243.00">243.00 - SECONDARY</option>
              <option value="255.40">255.40 - SAR</option>
              <option value="279.15">279.15 - TRAINING</option>
              <option value="311.00">311.00 - COMMAND</option>
            </select>
          </div>
          <button
            className={`w-full py-2 px-3 rounded text-xs font-bold ${
              transmitting ? 'bg-red-800 text-red-300 animate-pulse' : 'bg-green-800 hover:bg-green-700 text-white'
            }`}
            onClick={onTransmit}
          >
            {transmitting ? 'TRANSMITTING' : 'PUSH TO TALK'}
          </button>
        </div>
      </div>

      <div className="bg-gray-900/50 rounded-lg p-3">
        <h3 className="text-sm font-bold text-blue-400 mb-3 flex items-center">
          <Navigation2 className="w-4 h-4 mr-2" />
          VECTORING MODE
        </h3>
        <div className="flex space-x-1">
          <button
            onClick={() => onVectorModeChange('MANUAL')}
            className={`flex-1 py-1 px-2 rounded text-xs ${
              vectorMode === 'MANUAL' ? 'bg-blue-800 text-blue-300' : 'bg-gray-700 text-gray-400'
            }`}
          >
            MANUAL
          </button>
          <button
            onClick={() => onVectorModeChange('AUTO')}
            className={`flex-1 py-1 px-2 rounded text-xs ${
              vectorMode === 'AUTO' ? 'bg-blue-800 text-blue-300' : 'bg-gray-700 text-gray-400'
            }`}
          >
            AUTO
          </button>
        </div>
      </div>

      <div className="bg-gray-900/50 rounded-lg p-3">
        <h3 className="text-sm font-bold text-green-400 mb-3 flex items-center">
          <Plane className="w-4 h-4 mr-2" />
          CONTROLLED AIRCRAFT
        </h3>
        <div className="space-y-2 text-xs max-h-48 overflow-y-auto">
          {controlledAircraft.map(aircraft => (
            <div
              key={aircraft.id}
              className={`p-2 rounded border cursor-pointer transition-all ${
                selectedAircraft?.id === aircraft.id ? 'border-yellow-500 bg-yellow-900/20' :
                aircraft.priority === 'EMERGENCY' ? 'border-red-600 bg-red-900/20' :
                'border-gray-600 hover:border-blue-500'
              }`}
              onClick={() => onSelectAircraft(aircraft)}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-200 font-bold">{aircraft.callsign}</span>
                <span className={`px-1 py-0.5 rounded text-[10px] ${
                  aircraft.priority === 'EMERGENCY' ? 'bg-red-900 text-red-300' : 'bg-blue-900 text-blue-300'
                }`}>
                  {aircraft.priority}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1 text-[10px] text-gray-400">
                <div>Alt: FL{Math.floor(aircraft.navigation.currentAlt/100)}</div>
                <div>Spd: {aircraft.navigation.currentSpd}kt</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-900/50 rounded-lg p-3">
        <h3 className="text-sm font-bold text-yellow-400 mb-3 flex items-center">
          <Zap className="w-4 h-4 mr-2" />
          QUICK COMMANDS
        </h3>
        {selectedAircraft ? (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-1">
              <button
                onClick={() => onVectorCommand(selectedAircraft, 'turn left heading 270')}
                className="bg-blue-800 hover:bg-blue-700 text-white py-1 px-2 rounded text-[10px] flex items-center justify-center"
              >
                <ArrowLeft className="w-3 h-3 mr-1" />
                L TURN
              </button>
              <button
                onClick={() => onVectorCommand(selectedAircraft, 'turn right heading 090')}
                className="bg-blue-800 hover:bg-blue-700 text-white py-1 px-2 rounded text-[10px] flex items-center justify-center"
              >
                <ArrowRight className="w-3 h-3 mr-1" />
                R TURN
              </button>
              <button
                onClick={() => onVectorCommand(selectedAircraft, 'climb and maintain FL250')}
                className="bg-green-800 hover:bg-green-700 text-white py-1 px-2 rounded text-[10px] flex items-center justify-center"
              >
                <ArrowUp className="w-3 h-3 mr-1" />
                CLIMB
              </button>
              <button
                onClick={() => onVectorCommand(selectedAircraft, 'descend and maintain FL100')}
                className="bg-orange-800 hover:bg-orange-700 text-white py-1 px-2 rounded text-[10px] flex items-center justify-center"
              >
                <ArrowDown className="w-3 h-3 mr-1" />
                DESCEND
              </button>
            </div>
          </div>
        ) : (
          <div className="text-gray-500 text-xs text-center py-4">
            Select aircraft for commands
          </div>
        )}
      </div>

      <div className="bg-gray-900/50 rounded-lg p-3">
        <h3 className="text-sm font-bold text-green-400 mb-3 flex items-center">
          <Eye className="w-4 h-4 mr-2" />
          DISPLAY OPTIONS
        </h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="weather"
              checked={weatherLayer}
              onChange={onToggleWeatherLayer}
              className="text-blue-400"
            />
            <label htmlFor="weather" className="text-xs text-gray-300">Weather Layer</label>
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Route Display</label>
            <select
              value={routeDisplay}
              onChange={(e) => onRouteDisplayChange(e.target.value)}
              className="w-full bg-gray-800 text-green-300 text-xs border border-gray-600 rounded px-2 py-1"
            >
              <option value="ALL">Show All Routes</option>
              <option value="ACTIVE">Active Routes Only</option>
              <option value="SELECTED">Selected Aircraft</option>
              <option value="NONE">Hide Routes</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
