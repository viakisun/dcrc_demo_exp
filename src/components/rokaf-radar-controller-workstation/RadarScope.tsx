import React from 'react';
import { RadarTrack } from './types';

interface RadarScopeProps {
  tracks: RadarTrack[];
  onSelectTrack: (track: RadarTrack) => void;
  radarRange: number;
  radarSweep: number;
}

const RadarScope: React.FC<RadarScopeProps> = ({ tracks, onSelectTrack, radarRange, radarSweep }) => {
  const centerX = 300;
  const centerY = 250;

  return (
    <div className="relative w-full h-full bg-gray-950 rounded-lg border-2 border-green-600 overflow-hidden">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 500">
        <defs>
          <pattern id="radarGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(34, 197, 94, 0.3)" strokeWidth="0.5"/>
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#radarGrid)" />

        {[...Array(4)].map((_, i) => (
          <circle key={i} cx={centerX} cy={centerY} r={(i + 1) * 50} fill="none" stroke="#22c55e" strokeWidth="1" opacity="0.6" />
        ))}

        <line x1={centerX} y1={centerY - 200} x2={centerX} y2={centerY + 200} stroke="#22c55e" strokeWidth="1" opacity="0.4" />
        <line x1={centerX - 200} y1={centerY} x2={centerX + 200} y2={centerY} stroke="#22c55e" strokeWidth="1" opacity="0.4" />

        <line
          x1={centerX}
          y1={centerY}
          x2={centerX + 200 * Math.cos((radarSweep - 90) * Math.PI / 180)}
          y2={centerY + 200 * Math.sin((radarSweep - 90) * Math.PI / 180)}
          stroke="#4ade80"
          strokeWidth="2"
          opacity="0.8"
        />
      </svg>

      <div className="absolute inset-0">
        {tracks.map(track => {
          const trackX = centerX + (track.position.range / radarRange) * 200 * Math.cos((track.position.bearing - 90) * Math.PI / 180);
          const trackY = centerY + (track.position.range / radarRange) * 200 * Math.sin((track.position.bearing - 90) * Math.PI / 180);

          return (
            <div
              key={track.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{ left: `${trackX}px`, top: `${trackY}px` }}
              onClick={() => onSelectTrack(track)}
            >
              <div className={`w-4 h-4 rounded-full border-2 ${
                track.classification.includes('FRIENDLY') ? 'bg-green-500 border-green-300' :
                track.classification.includes('UNKNOWN') ? 'bg-yellow-500 border-yellow-300' :
                'bg-red-500 border-red-300'
              }`}></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RadarScope;
