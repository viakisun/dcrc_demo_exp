import React from 'react';
import { Target, Zap } from 'lucide-react';
import { RadarTrack } from './types';

interface TrackDetailsProps {
  selectedTrack: RadarTrack | null;
}

const TrackDetails: React.FC<TrackDetailsProps> = ({ selectedTrack }) => {
  if (!selectedTrack) {
    return (
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 p-4 rounded-lg h-full">
        <h3 className="text-sm font-bold text-gray-400 mb-3 flex items-center">
          <Target className="w-4 h-4 mr-2" />
          TRACK ANALYSIS
        </h3>
        <div className="text-gray-500">No track selected</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border-l-4 border-green-500 p-4 rounded-lg h-full overflow-y-auto">
      <h3 className="text-sm font-bold text-green-400 mb-3 flex items-center">
        <Target className="w-4 h-4 mr-2" />
        TRACK ANALYSIS: {selectedTrack.id}
      </h3>
      <div className="text-xs space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div className="text-gray-400">Callsign:</div>
          <div className="text-gray-200">{selectedTrack.callsign}</div>
          <div className="text-gray-400">Classification:</div>
          <div className="text-blue-300">{selectedTrack.classification}</div>
          <div className="text-gray-400">Track Quality:</div>
          <div className={`font-bold ${
            selectedTrack.trackQuality === 'HIGH' ? 'text-green-400' :
            selectedTrack.trackQuality === 'MEDIUM' ? 'text-yellow-400' : 'text-red-400'
          }`}>{selectedTrack.trackQuality}</div>
        </div>

        <div className="border-t border-gray-700 pt-2">
          <div className="text-yellow-400 font-bold mb-2">RADAR DATA</div>
          <div className="grid grid-cols-2 gap-1 text-[10px]">
            <div>Signal Strength:</div>
            <div className="text-yellow-300">{selectedTrack.radarData.signalStrength}dB</div>
            <div>RCS:</div>
            <div className="text-yellow-300">{selectedTrack.radarData.rcs}m²</div>
            <div>Squawk:</div>
            <div className="text-purple-300">{selectedTrack.radarData.squawk}</div>
            <div>IFF:</div>
            <div className={`${
              selectedTrack.radarData.iff === 'FRIENDLY' ? 'text-green-400' : 'text-red-400'
            }`}>{selectedTrack.radarData.iff}</div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-2">
          <div className="text-blue-400 font-bold mb-2">RADAR SOURCES</div>
          <div className="space-y-1">
            {selectedTrack.radarSource.map(source => (
              <div key={source} className="text-blue-300 text-[10px]">• {source}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackDetails;
