import React from 'react';
import { Track as TrackType, GridSector } from './types';
import Track from './Track';

interface MapViewProps {
  activeTracks: TrackType[];
  gridSectors: GridSector[];
  showPredictions: boolean;
  onSelectTrack: (track: TrackType) => void;
  aiConfidence: number;
}

const MapView: React.FC<MapViewProps> = ({
  activeTracks,
  gridSectors,
  showPredictions,
  onSelectTrack,
  aiConfidence
}) => {
  return (
    <main className="flex-1 bg-gray-900 relative overflow-hidden">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 700">
        <defs>
          <pattern id="grid" width="66" height="46" patternUnits="userSpaceOnUse">
            <path d="M 66 0 L 0 0 0 46" fill="none" stroke="rgba(107, 114, 128, 0.3)" strokeWidth="0.5"/>
          </pattern>
          <pattern id="majorGrid" width="200" height="140" patternUnits="userSpaceOnUse">
            <path d="M 200 0 L 0 0 0 140" fill="none" stroke="rgba(107, 114, 128, 0.6)" strokeWidth="1"/>
          </pattern>
          <pattern id="aiThreatPattern" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="2" fill="rgba(239, 68, 68, 0.3)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <rect width="100%" height="100%" fill="url(#majorGrid)" />

        {gridSectors.filter(s => s.aiRisk > 70).map(sector => {
          const sectorX = (['IE', 'JE', 'KE', 'LE', 'ME'].indexOf(sector.id.substring(0, 2))) * 200 + 50;
          const sectorY = (['06', '10', '14'].indexOf(sector.id.substring(3))) * 140 + 50;
          return (
            <rect
              key={sector.id}
              x={sectorX}
              y={sectorY}
              width="200"
              height="140"
              fill="url(#aiThreatPattern)"
              opacity="0.6"
            />
          );
        })}

        {['IE-06', 'IE-10', 'IE-14'].map((label, i) => (
          <text key={label} x={150 + i*200} y={90} fill="#6b7280" fontSize="14" textAnchor="middle" fontWeight="bold">{label}</text>
        ))}
        {['JE-06', 'JE-10', 'JE-14'].map((label, i) => (
          <text key={label} x={150 + i*200} y={230} fill="#6b7280" fontSize="14" textAnchor="middle" fontWeight="bold">{label}</text>
        ))}
        {['KE-06', 'KE-10', 'KE-14'].map((label, i) => (
          <text key={label} x={150 + i*200} y={370} fill="#6b7280" fontSize="14" textAnchor="middle" fontWeight="bold">{label}</text>
        ))}
        {['LE-06', 'LE-10', 'LE-14'].map((label, i) => (
          <text key={label} x={150 + i*200} y={510} fill="#6b7280" fontSize="14" textAnchor="middle" fontWeight="bold">{label}</text>
        ))}
        {['ME-06', 'ME-10', 'ME-14'].map((label, i) => (
          <text key={label} x={150 + i*200} y={650} fill="#6b7280" fontSize="14" textAnchor="middle" fontWeight="bold">{label}</text>
        ))}

        <path
          d="M 480 280 L 495 270 L 510 275 L 525 285 L 535 310 L 540 340 L 535 370 L 525 395 L 515 405 L 500 410 L 485 405 L 470 395 L 460 370 L 465 340 L 480 310 Z"
          fill="rgba(34, 197, 94, 0.1)"
          stroke="#4ade80"
          strokeWidth="1"
        />

        <line x1="460" y1="310" x2="540" y2="310" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,4" />
        <text x="500" y="305" fill="#ef4444" fontSize="10" textAnchor="middle" fontWeight="bold">DMZ</text>

        <path
          d="M 50 200 L 150 220 L 250 240 L 350 260 L 400 290 L 420 330 L 400 370 L 350 400 L 250 420 L 150 440 L 50 460"
          fill="none"
          stroke="rgba(107, 114, 128, 0.7)"
          strokeWidth="2"
        />
        <text x="250" y="330" fill="#6b7280" fontSize="18" fontWeight="bold">CHINA</text>

        <ellipse cx="650" cy="330" rx="45" ry="120" fill="rgba(34, 197, 94, 0.1)" stroke="#4ade80" strokeWidth="1" />
        <text x="650" y="335" fill="#6b7280" fontSize="16" textAnchor="middle" fontWeight="bold">JAPAN</text>
      </svg>

      <div className="absolute inset-0">
        {activeTracks.map(track => (
          <Track
            key={track.id}
            track={track}
            showPredictions={showPredictions}
            onSelectTrack={onSelectTrack}
          />
        ))}
      </div>

      <div className="absolute top-4 right-4 space-y-2">
        <div className="w-32 h-32 bg-purple-900/20 rounded-full border-2 border-purple-600 flex items-center justify-center">
          <div className="animate-spin w-full h-full flex items-center justify-center">
            <div className="w-28 h-0.5 bg-gradient-to-r from-purple-400 via-purple-300 to-transparent origin-left"></div>
          </div>
          <div className="absolute text-xs text-purple-400 bottom-2">AI RADAR</div>
          <div className="absolute text-xs text-purple-600 top-2">1500NM</div>
        </div>
        <div className="bg-gray-900/80 rounded p-2">
          <div className="text-xs text-purple-400">AI Processing</div>
          <div className="text-xs text-green-400">{aiConfidence}% Confidence</div>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 bg-gray-900/90 rounded-lg p-3 border border-purple-700">
        <div className="text-sm text-purple-400 font-bold mb-2">AI REAL-TIME ANALYSIS</div>
        <div className="text-xs text-gray-300 space-y-1">
          <div>Total AI Tracks: <span className="text-purple-300 font-bold">{activeTracks.length}</span></div>
          <div>AI Controlled: <span className="text-purple-300">{activeTracks.filter(t => t.controller === 'AI-SYSTEM').length}</span></div>
          <div>High Threat: <span className="text-red-300">{activeTracks.filter(t => t.threatLevel > 50).length}</span></div>
          <div>Prediction Accuracy: <span className="text-blue-300">{aiConfidence}%</span></div>
          <div className="mt-2 pt-2 border-t border-gray-700">
            <div className="text-yellow-400">Next Update: {Math.floor(Math.random() * 5) + 1}s</div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MapView;
