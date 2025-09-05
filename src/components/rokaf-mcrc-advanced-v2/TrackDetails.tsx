import React from 'react';
import { Target } from 'lucide-react';
import { Track } from './types';

interface TrackDetailsProps {
  selectedTrack: Track | null;
}

const TrackDetails: React.FC<TrackDetailsProps> = ({ selectedTrack }) => {
  if (!selectedTrack) {
    return (
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 p-4 rounded-lg h-full">
        <h3 className="text-sm font-bold text-gray-400 mb-3 flex items-center">
          <Target className="w-4 h-4 mr-2" />
          TRACK DETAIL
        </h3>
        <div className="text-gray-500">No track selected</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border-l-4 border-yellow-500 p-4 rounded-lg h-full overflow-y-auto">
      <h3 className="text-sm font-bold text-yellow-400 mb-3 flex items-center">
        <Target className="w-4 h-4 mr-2" />
        TRACK DETAIL: {selectedTrack.callsign}
      </h3>
      <div className="text-xs space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div className="text-gray-400">Type:</div>
          <div className="text-gray-200">{selectedTrack.type}</div>
          <div className="text-gray-400">Mission:</div>
          <div className="text-gray-200">{selectedTrack.mission}</div>
          <div className="text-gray-400">Speed:</div>
          <div className="text-gray-200">{selectedTrack.speed}kt</div>
          <div className="text-gray-400">Altitude:</div>
          <div className="text-gray-200">{selectedTrack.altitude}ft</div>
          <div className="text-gray-400">Status:</div>
          <div className={`font-bold ${
            selectedTrack.status === 'HOSTILE' ? 'text-red-400' :
            selectedTrack.status === 'UNKNOWN' ? 'text-yellow-400' : 'text-green-400'
          }`}>{selectedTrack.status}</div>
          <div className="text-gray-400">Controller:</div>
          <div className="text-gray-200">{selectedTrack.controller}</div>
        </div>

        <div className="border-t border-gray-700 pt-2">
          <div className="text-blue-400 font-bold mb-2">PILOT & PAYLOAD</div>
          <div className="space-y-1 text-[10px]">
            <div>Pilot: {selectedTrack.pilot}</div>
            <div>Weapons: {selectedTrack.weapons}</div>
            <div>Fuel: {selectedTrack.fuel}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackDetails;
