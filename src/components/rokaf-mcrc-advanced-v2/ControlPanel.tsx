import React from 'react';
import { Settings, Eye, Zap } from 'lucide-react';

interface ControlPanelProps {
  radarMode: string;
  onRadarModeChange: (mode: string) => void;
  showTrails: boolean;
  onToggleShowTrails: () => void;
  alertLevel: string;
  onAlertLevelChange: (level: string) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  radarMode,
  onRadarModeChange,
  showTrails,
  onToggleShowTrails,
  alertLevel,
  onAlertLevelChange,
}) => {
  return (
    <div className="w-80 bg-gray-800/50 backdrop-blur-sm border-r border-gray-700 p-4 space-y-4 overflow-y-auto">
      <div className="bg-gray-900/50 rounded-lg p-3">
        <h3 className="text-sm font-bold text-red-400 mb-3 flex items-center">
          <Settings className="w-4 h-4 mr-2" />
          SYSTEM CONTROLS
        </h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-400 block mb-1">Radar Mode</label>
            <select
              value={radarMode}
              onChange={(e) => onRadarModeChange(e.target.value)}
              className="w-full bg-gray-800 text-red-300 text-xs border border-gray-600 rounded px-2 py-1"
            >
              <option value="WIDE_AREA">WIDE AREA SCAN</option>
              <option value="SECTOR_SCAN">SECTOR SCAN</option>
              <option value="TARGET_FOCUS">TARGET FOCUS</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Alert Level</label>
            <select
              value={alertLevel}
              onChange={(e) => onAlertLevelChange(e.target.value)}
              className="w-full bg-gray-800 text-red-300 text-xs border border-gray-600 rounded px-2 py-1"
            >
              <option value="NORMAL">NORMAL</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-gray-900/50 rounded-lg p-3">
        <h3 className="text-sm font-bold text-yellow-400 mb-3 flex items-center">
          <Eye className="w-4 h-4 mr-2" />
          DISPLAY OPTIONS
        </h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Show Track Trails</span>
            <button
              onClick={onToggleShowTrails}
              className={`px-2 py-1 rounded text-xs ${showTrails ? 'bg-blue-800 text-blue-300' : 'bg-gray-700 text-gray-400'}`}
            >
              {showTrails ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-900/50 rounded-lg p-3">
        <h3 className="text-sm font-bold text-orange-400 mb-3 flex items-center">
          <Zap className="w-4 h-4 mr-2" />
          ACTIONS
        </h3>
        <div className="space-y-2">
          <button className="w-full bg-red-800 hover:bg-red-700 text-white py-1 px-2 rounded text-xs">
            ENGAGE HOSTILE
          </button>
          <button className="w-full bg-yellow-800 hover:bg-yellow-700 text-white py-1 px-2 rounded text-xs">
            INTERROGATE UNKNOWN
          </button>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
