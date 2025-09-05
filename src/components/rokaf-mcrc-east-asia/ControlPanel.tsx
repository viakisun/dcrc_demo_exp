import React from 'react';
import { Target, Activity, Crosshair, AlertTriangle } from 'lucide-react';
import { GridSector, Track } from './types';

interface ControlPanelProps {
  gridSectors: GridSector[];
  selectedGrid: string;
  onSelectGrid: (grid: string) => void;
  selectedTrack: Track | null;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ gridSectors, selectedGrid, onSelectGrid, selectedTrack }) => {
  return (
    <div className="w-80 bg-gray-800/50 backdrop-blur-sm border-r border-gray-700 p-4 space-y-4 overflow-y-auto">
      <div className="bg-gray-900/50 rounded-lg p-3">
        <h3 className="text-sm font-bold text-green-400 mb-3 flex items-center">
          <Target className="w-4 h-4 mr-2" />
          SECTOR STATUS
        </h3>
        <div className="space-y-2 text-xs">
          {gridSectors.map(sector => (
            <div
              key={sector.id}
              className={`flex justify-between items-center p-2 rounded border ${
                selectedGrid === sector.id ? 'bg-blue-900/30 border-blue-500' : 'border-gray-600'
              } cursor-pointer hover:border-green-500 transition-colors`}
              onClick={() => onSelectGrid(sector.id)}
            >
              <div>
                <div className="text-gray-200 font-bold">{sector.id}</div>
                <div className="text-gray-400">{sector.controller}</div>
              </div>
              <div className="text-right">
                <div className="text-gray-300">{sector.tracks} TRK</div>
                <div className={`text-xs ${
                  sector.threat === 'LOW' ? 'text-green-500' :
                  sector.threat === 'MEDIUM' ? 'text-yellow-500' : 'text-red-500'
                }`}>
                  {sector.threat}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-900/50 rounded-lg p-3">
        <h3 className="text-sm font-bold text-green-400 mb-3 flex items-center">
          <Activity className="w-4 h-4 mr-2" />
          SYSTEM STATUS
        </h3>
        <div className="space-y-2 text-xs">
          {[
            { name: 'PRIMARY RADAR', status: 'ONLINE' },
            { name: 'SECONDARY RADAR', status: 'ONLINE' },
            { name: 'DATALINK', status: 'SECURE' },
            { name: 'SATCOM', status: 'ONLINE' },
          ].map(sys => (
            <div key={sys.name} className="flex justify-between items-center">
              <span className="text-gray-400">{sys.name}</span>
              <span className="text-green-400">{sys.status}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-900/50 rounded-lg p-3">
        <h3 className="text-sm font-bold text-green-400 mb-3 flex items-center">
          <Crosshair className="w-4 h-4 mr-2" />
          SELECTED TRACK
        </h3>
        {selectedTrack ? (
          <div className="text-xs space-y-1">
            <div className="text-gray-200 font-bold">{selectedTrack.callsign}</div>
            <div className="text-gray-400">Type: {selectedTrack.type}</div>
            <div className="text-gray-400">Alt: {selectedTrack.altitude}ft</div>
            <div className="text-gray-400">Speed: {selectedTrack.speed}kt</div>
            <div className={`font-bold ${
              selectedTrack.status === 'FRIENDLY' ? 'text-green-400' :
              selectedTrack.status === 'UNKNOWN' ? 'text-yellow-400' : 'text-red-400'
            }`}>
              Status: {selectedTrack.status}
            </div>
          </div>
        ) : (
          <div className="text-xs text-gray-500">
            Click on a track to view details
          </div>
        )}
      </div>

      <div className="bg-red-900/20 rounded-lg p-3 border border-red-700">
        <h3 className="text-sm font-bold text-red-400 mb-3 flex items-center">
          <AlertTriangle className="w-4 h-4 mr-2" />
          EMERGENCY CONTROL
        </h3>
        <div className="space-y-2">
          <button className="w-full bg-red-800 hover:bg-red-700 text-white py-1 px-2 rounded text-xs">
            SCRAMBLE ALERT
          </button>
          <button className="w-full bg-yellow-800 hover:bg-yellow-700 text-white py-1 px-2 rounded text-xs">
            IDENTIFY UNKNOWN
          </button>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
