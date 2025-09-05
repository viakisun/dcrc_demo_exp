import React from 'react';
import { SectorTrack, TrackStatus } from './types';

interface SectorMapProps {
  tracks: SectorTrack[];
  onSelectTrack: (track: SectorTrack) => void;
}

const SectorMap: React.FC<SectorMapProps> = ({ tracks, onSelectTrack }) => {
  const renderTrack = (track: SectorTrack) => {
    const colors: Record<TrackStatus, string> = {
      'FRIENDLY': 'text-green-400 bg-green-900/30 border-green-400',
      'UNKNOWN': 'text-yellow-400 bg-yellow-900/30 border-yellow-400',
      'HOSTILE': 'text-red-400 bg-red-900/30 border-red-400'
    };

    return (
      <div key={track.id} className="absolute" style={{ left: `${track.position.x}px`, top: `${track.position.y}px` }}>
        <div
          className={`absolute ${colors[track.status]} border-2 rounded-lg p-2 text-[10px] font-mono transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:bg-opacity-80 transition-all shadow-lg min-w-24`}
          onClick={() => onSelectTrack(track)}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] font-bold">{track.callsign}</span>
            <span className="text-[8px] text-blue-400">{track.controller}</span>
          </div>
          <div className="space-y-0.5">
            <div>{track.type}</div>
            <div>FL{Math.floor(track.altitude/100)}</div>
            <div>{track.speed}kt</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 bg-gray-900 relative overflow-hidden rounded-lg border border-gray-700">
      {tracks.map(renderTrack)}
    </div>
  );
};

export default SectorMap;
