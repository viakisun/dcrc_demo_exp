import React from 'react';
import { Settings, Activity, Gauge, Filter } from 'lucide-react';
import { RadarSystem, RadarPerformance } from './types';

interface ControlPanelProps {
  radarMode: string;
  onRadarModeChange: (mode: string) => void;
  radarRange: number;
  onRadarRangeChange: (range: number) => void;
  radarSystems: RadarSystem[];
  radarPerformance: RadarPerformance;
}

const ControlPanel: React.FC<ControlPanelProps> = (props) => {
  const {
    radarMode, onRadarModeChange, radarRange, onRadarRangeChange,
    radarSystems, radarPerformance
  } = props;

  return (
    <div className="w-80 bg-gray-800/50 backdrop-blur-sm border-r border-gray-700 p-4 space-y-4 overflow-y-auto">
      <div className="bg-gray-900/50 rounded-lg p-3">
        <h3 className="text-sm font-bold text-green-400 mb-3 flex items-center">
          <Settings className="w-4 h-4 mr-2" />
          RADAR CONTROL
        </h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-400 block mb-1">Radar Mode</label>
            <select
              value={radarMode}
              onChange={(e) => onRadarModeChange(e.target.value)}
              className="w-full bg-gray-800 text-green-300 text-xs border border-gray-600 rounded px-2 py-1"
            >
              <option value="SEARCH">SEARCH MODE</option>
              <option value="TRACK">TRACK MODE</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Range: {radarRange}nm</label>
            <input
              type="range"
              min="25"
              max="200"
              step="25"
              value={radarRange}
              onChange={(e) => onRadarRangeChange(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-900/50 rounded-lg p-3">
        <h3 className="text-sm font-bold text-green-400 mb-3 flex items-center">
          <Activity className="w-4 h-4 mr-2" />
          RADAR SYSTEMS
        </h3>
        <div className="space-y-2 text-xs">
          {radarSystems.map(radar => (
            <div key={radar.id} className="border border-gray-700 rounded p-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-200 font-bold">{radar.id}</span>
                <span className={`px-1 py-0.5 rounded text-[10px] ${
                  radar.status === 'ONLINE' ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'
                }`}>
                  {radar.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-900/50 rounded-lg p-3">
        <h3 className="text-sm font-bold text-yellow-400 mb-3 flex items-center">
          <Gauge className="w-4 h-4 mr-2" />
          PERFORMANCE
        </h3>
        <div className="text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400">Detection Rate:</span>
            <span className="text-green-400 font-bold">{radarPerformance.detectionRate.toFixed(1)}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">False Alarms:</span>
            <span className="text-yellow-400">{radarPerformance.falseAlarmRate.toFixed(2)}%</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-900/50 rounded-lg p-3">
        <h3 className="text-sm font-bold text-blue-400 mb-3 flex items-center">
          <Filter className="w-4 h-4 mr-2" />
          TRACK FILTERS
        </h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="friendly" className="text-green-400" defaultChecked />
            <label htmlFor="friendly" className="text-xs text-gray-300">Show Friendly</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="unknown" className="text-yellow-400" defaultChecked />
            <label htmlFor="unknown" className="text-xs text-gray-300">Show Unknown</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
