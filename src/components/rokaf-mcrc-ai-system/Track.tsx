import React from 'react';
import { Bot } from 'lucide-react';
import { Track as TrackType } from './types';
import AIPrediction from './AIPrediction';

interface TrackProps {
  track: TrackType;
  showPredictions: boolean;
  onSelectTrack: (track: TrackType) => void;
}

const Track: React.FC<TrackProps> = ({ track, showPredictions, onSelectTrack }) => {
  const statusColors: Record<TrackType['status'], string> = {
    FRIENDLY: track.aiClassification === 'FULL_AI_CONTROL' ? 'text-purple-400 bg-purple-900/30 border-purple-400' : 'text-green-400 bg-green-900/30 border-green-400',
    UNKNOWN: 'text-yellow-400 bg-yellow-900/30 border-yellow-400',
    HOSTILE: 'text-red-400 bg-red-900/30 border-red-400',
  };

  const vectorAngle = Math.atan2(track.vector.dy, track.vector.dx) * 180 / Math.PI;
  const vectorLength = Math.min(track.speed / 25, 25);

  return (
    <div className="absolute">
      {showPredictions && <AIPrediction track={track} />}

      <div
        className={`absolute ${statusColors[track.status]} border-2 rounded-lg p-1.5 text-[10px] font-mono transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:bg-opacity-80 transition-all shadow-lg`}
        style={{
          left: `${track.position.x}px`,
          top: `${track.position.y}px`
        }}
        onClick={() => onSelectTrack(track)}
      >
        <div className="flex items-center space-x-1">
          {track.aiClassification === 'FULL_AI_CONTROL' && (
            <Bot className="w-3 h-3 text-purple-400" />
          )}
          <div className={`w-3 h-3 ${
            track.status === 'FRIENDLY' && track.aiClassification === 'FULL_AI_CONTROL' ? 'bg-purple-400' :
            track.status === 'FRIENDLY' ? 'bg-green-400' :
            track.status === 'UNKNOWN' ? 'bg-yellow-400' : 'bg-red-400'
          } rounded-full`}></div>
          <span className="text-[9px] font-bold">{track.callsign}</span>
        </div>
        <div className="text-[8px] mt-1">
          <div>{track.type}</div>
          <div>{track.altitude}ft</div>
          <div className="text-blue-400">AI: {track.aiConfidence}%</div>
        </div>

        {track.threatLevel > 50 && (
          <div className="absolute -top-2 -right-2">
            <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-[8px] text-white font-bold">{track.threatLevel}</span>
            </div>
          </div>
        )}
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
        <defs>
          <marker id={`ai-arrowhead-${track.id}`} markerWidth="8" markerHeight="6"
            refX="7" refY="3" orient="auto">
            <polygon
              points="0 0, 8 3, 0 6"
              fill={
                track.status === 'FRIENDLY' && track.aiClassification === 'FULL_AI_CONTROL' ? '#a855f7' :
                track.status === 'FRIENDLY' ? '#4ade80' :
                track.status === 'UNKNOWN' ? '#facc15' : '#f87171'
              }
            />
          </marker>
        </defs>
        <line
          x1="30"
          y1="30"
          x2={30 + vectorLength * Math.cos(vectorAngle * Math.PI / 180)}
          y2={30 + vectorLength * Math.sin(vectorAngle * Math.PI / 180)}
          stroke={
            track.status === 'FRIENDLY' && track.aiClassification === 'FULL_AI_CONTROL' ? '#a855f7' :
            track.status === 'FRIENDLY' ? '#4ade80' :
            track.status === 'UNKNOWN' ? '#facc15' : '#f87171'
          }
          strokeWidth="2"
          markerEnd={`url(#ai-arrowhead-${track.id})`}
        />
      </svg>
    </div>
  );
};

export default Track;
