import React from 'react';
import { Plane, CloudRain, Radio } from 'lucide-react';
import { Track } from './types';

interface InfoPanelProps {
  tracks: Track[];
  onSelectTrack: (track: Track) => void;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ tracks, onSelectTrack }) => {
  return (
    <div className="w-80 bg-gray-800/50 backdrop-blur-sm border-l border-gray-700 p-4 space-y-4 overflow-y-auto">
      <div className="bg-gray-900/50 rounded-lg p-3">
        <h3 className="text-sm font-bold text-green-400 mb-3 flex items-center">
          <Plane className="w-4 h-4 mr-2" />
          ACTIVE TRACKS ({tracks.length})
        </h3>
        <div className="space-y-2 text-xs max-h-60 overflow-y-auto">
          {tracks.map(track => (
            <div
              key={track.id}
              className="border border-gray-600 rounded p-2 cursor-pointer hover:border-green-500"
              onClick={() => onSelectTrack(track)}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-200 font-bold">{track.callsign}</span>
                <span className={`px-2 py-1 rounded text-[10px] ${
                  track.status === 'FRIENDLY' ? 'bg-green-900 text-green-300' :
                  track.status === 'UNKNOWN' ? 'bg-yellow-900 text-yellow-300' :
                  'bg-red-900 text-red-300'
                }`}>
                  {track.status}
                </span>
              </div>
              <div className="text-gray-400 space-y-1">
                <div>Type: {track.type}</div>
                <div>Alt: {track.altitude}ft</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-900/50 rounded-lg p-3">
        <h3 className="text-sm font-bold text-green-400 mb-3 flex items-center">
          <CloudRain className="w-4 h-4 mr-2" />
          WEATHER (RKSS)
        </h3>
        <div className="text-xs space-y-1 text-gray-300">
          <div>Wind: 270°/15kt G20kt</div>
          <div>Visibility: 10km</div>
          <div>Ceiling: 3000ft AGL</div>
          <div>QNH: 1013.2 hPa</div>
        </div>
      </div>

      <div className="bg-gray-900/50 rounded-lg p-3">
        <h3 className="text-sm font-bold text-green-400 mb-3 flex items-center">
          <Radio className="w-4 h-4 mr-2" />
          COMMS STATUS
        </h3>
        <div className="text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400">Emergency</span>
            <span className="text-green-400">121.5 ✓</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">All Call</span>
            <span className="text-green-400">243.0 ✓</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Scramble</span>
            <span className="text-red-400">STANDBY</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;
