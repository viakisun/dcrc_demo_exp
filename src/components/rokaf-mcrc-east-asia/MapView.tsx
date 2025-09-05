import React from 'react';
import { Track, TrackStatus } from './types';

interface MapViewProps {
  tracks: Track[];
  onSelectTrack: (track: Track) => void;
}

const MapView: React.FC<MapViewProps> = ({ tracks, onSelectTrack }) => {
  const renderTrack = (track: Track) => {
    const colors: Record<TrackStatus, string> = {
      'FRIENDLY': 'text-green-400 bg-green-900/30 border-green-400',
      'UNKNOWN': 'text-yellow-400 bg-yellow-900/30 border-yellow-400',
      'POTENTIAL_THREAT': 'text-red-400 bg-red-900/30 border-red-400'
    };
    const vectorLength = Math.min(track.speed / 30, 20);

    return (
      <div key={track.id} className="absolute" style={{ left: `${track.position.x}px`, top: `${track.position.y}px` }}>
        <div
          className={`absolute ${colors[track.status]} border rounded-lg p-1 text-[10px] font-mono transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:bg-opacity-80 transition-all`}
          onClick={() => onSelectTrack(track)}
        >
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 ${
              track.status === 'FRIENDLY' ? 'bg-green-400' :
              track.status === 'UNKNOWN' ? 'bg-yellow-400' : 'bg-red-400'
            } rounded-full`}></div>
            <span className="text-[8px]">{track.callsign}</span>
          </div>
        </div>

        <svg
          className="absolute pointer-events-none"
          style={{ transform: 'translate(-50%, -50%)' }}
          width="40"
          height="40"
        >
          <line
            x1="20"
            y1="20"
            x2={20 + vectorLength * Math.cos(Math.atan2(track.vector.dy, track.vector.dx))}
            y2={20 + vectorLength * Math.sin(Math.atan2(track.vector.dy, track.vector.dx))}
            stroke={
              track.status === 'FRIENDLY' ? '#4ade80' :
              track.status === 'UNKNOWN' ? '#facc15' : '#f87171'
            }
            strokeWidth="2"
          />
        </svg>
      </div>
    );
  };

  return (
    <div className="flex-1 bg-gray-900 relative overflow-hidden rounded-lg border border-gray-700">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600">
        <defs>
          <pattern id="grid" width="80" height="60" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 60" fill="none" stroke="rgba(107, 114, 128, 0.3)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {['JE-08', 'JE-12', 'JE-16'].map((label, i) => (
          <text key={label} x={120 + i*160} y={100} fill="#6b7280" fontSize="12" textAnchor="middle" fontWeight="bold">{label}</text>
        ))}
        {['KE-08', 'KE-12', 'KE-16'].map((label, i) => (
          <text key={label} x={120 + i*160} y={220} fill="#6b7280" fontSize="12" textAnchor="middle" fontWeight="bold">{label}</text>
        ))}
        {['LE-08', 'LE-12', 'LE-16'].map((label, i) => (
          <text key={label} x={120 + i*160} y={340} fill="#6b7280" fontSize="12" textAnchor="middle" fontWeight="bold">{label}</text>
        ))}

        <path
          d="M 380 160 L 390 150 L 400 155 L 410 165 L 415 180 L 420 200 L 415 220 L 410 240 L 405 250 L 395 255 L 385 250 L 375 240 L 370 220 L 375 200 L 380 180 Z"
          fill="rgba(34, 197, 94, 0.1)"
          stroke="#4ade80"
          strokeWidth="1"
        />

        <line x1="370" y1="180" x2="420" y2="180" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" />
        <text x="395" y="175" fill="#ef4444" fontSize="10" textAnchor="middle" fontWeight="bold">DMZ</text>

        <path
          d="M 100 100 L 150 120 L 200 140 L 250 160 L 300 180 L 320 200 L 300 240 L 250 260 L 200 280 L 150 300 L 100 320"
          fill="none"
          stroke="rgba(107, 114, 128, 0.7)"
          strokeWidth="2"
        />
        <text x="200" y="200" fill="#6b7280" fontSize="14" fontWeight="bold">CHINA</text>

        <ellipse cx="520" cy="200" rx="35" ry="90" fill="rgba(34, 197, 94, 0.1)" stroke="#4ade80" strokeWidth="1" />
        <ellipse cx="580" cy="220" rx="25" ry="70" fill="rgba(34, 197, 94, 0.1)" stroke="#4ade80" strokeWidth="1" />
        <text x="520" y="205" fill="#6b7280" fontSize="14" textAnchor="middle" fontWeight="bold">JAPAN</text>

        <line x1="100" y1="80" x2="700" y2="80" stroke="rgba(107, 114, 128, 0.7)" strokeWidth="2" />
        <text x="400" y="75" fill="#6b7280" fontSize="14" textAnchor="middle" fontWeight="bold">RUSSIA</text>

        <circle cx="280" cy="160" r="30" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2" strokeDasharray="3,3" />
        <text x="280" y="165" fill="#ef4444" fontSize="10" textAnchor="middle" fontWeight="bold">THREAT</text>
      </svg>

      <div className="absolute inset-0">
        {tracks.map(renderTrack)}
      </div>
    </div>
  );
};

export default MapView;
