import React from 'react';
import { Plane, Skull } from 'lucide-react';
import { Track, GroundThreat, TrackStatus, ThreatStatus } from './types';

interface MapViewProps {
  tracks: Track[];
  groundThreats: GroundThreat[];
  selectedTrack: Track | null;
  onSelectTrack: (track: Track) => void;
  showTrails: boolean;
}

const MapView: React.FC<MapViewProps> = ({ tracks, groundThreats, selectedTrack, onSelectTrack, showTrails }) => {
  const renderTrack = (track: Track) => {
    const colors: Record<TrackStatus, string> = {
      'FRIENDLY': 'text-green-400 bg-green-900/30 border-green-400',
      'UNKNOWN': 'text-yellow-400 bg-yellow-900/30 border-yellow-400',
      'HOSTILE': 'text-red-400 bg-red-900/30 border-red-400'
    };
    const vectorLength = Math.min(track.speed / 25, 25);

    return (
      <div key={track.id} className="absolute">
        <div
          className={`absolute ${colors[track.status]} border-2 rounded-lg p-1.5 text-[10px] font-mono transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:bg-opacity-80 transition-all shadow-lg`}
          style={{
            left: `${track.position.x}px`,
            top: `${track.position.y}px`
          }}
          onClick={() => onSelectTrack(track)}
        >
          <div className="flex items-center space-x-1">
            <Plane className="w-3 h-3" />
            <span className="text-[9px] font-bold">{track.callsign}</span>
          </div>
        </div>

        <svg
          className="absolute pointer-events-none"
          style={{
            left: `${track.position.x}px`,
            top: `${track.position.y}px`,
            transform: 'translate(-50%, -50%)'
          }}
          width="60"
          height="60"
        >
          <line
            x1="30"
            y1="30"
            x2={30 + vectorLength * Math.cos(track.vector.dx)}
            y2={30 + vectorLength * Math.sin(track.vector.dy)}
            stroke={colors[track.status].split(' ')[0]}
            strokeWidth="2"
          />
        </svg>

        {showTrails && (
          <svg
            className="absolute pointer-events-none"
            style={{
              left: `${track.position.x}px`,
              top: `${track.position.y}px`,
              transform: 'translate(-50%, -50%)'
            }}
            width="120"
            height="120"
          >
            <path
              d={`M 60,60 L ${60 - track.vector.dx * 3},${60 - track.vector.dy * 3}`}
              stroke={colors[track.status].split(' ')[0]}
              strokeWidth="1"
              strokeDasharray="3,3"
              opacity="0.4"
              fill="none"
            />
          </svg>
        )}
      </div>
    );
  };

  const renderGroundThreat = (threat: GroundThreat) => {
    const threatColors: Record<ThreatStatus, string> = {
      'HIGH': '#ef4444',
      'MEDIUM': '#f97316',
      'LOW': '#eab308'
    };

    return (
      <div key={threat.id} className="absolute">
        <svg
          className="absolute pointer-events-none"
          style={{
            left: `${threat.position.x}px`,
            top: `${threat.position.y}px`,
            transform: 'translate(-50%, -50%)'
          }}
          width={threat.range / 2}
          height={threat.range / 2}
        >
          <circle
            cx={threat.range / 4}
            cy={threat.range / 4}
            r={threat.range / 4}
            fill="none"
            stroke={threatColors[threat.threat]}
            strokeWidth="1"
            strokeDasharray="4,4"
            opacity="0.3"
          />
        </svg>

        <div
          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          style={{
            left: `${threat.position.x}px`,
            top: `${threat.position.y}px`
          }}
        >
          <div className="bg-red-900/60 border border-red-400 rounded p-1">
            <Skull className="w-3 h-3 text-red-400" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 bg-gray-900 relative overflow-hidden rounded-lg border border-gray-700">
      {tracks.map(renderTrack)}
      {groundThreats.map(renderGroundThreat)}
    </div>
  );
};

export default MapView;
