import React from 'react';
import { Track } from './types';

interface AIPredictionProps {
  track: Track;
}

const AIPrediction: React.FC<AIPredictionProps> = ({ track }) => {
  return (
    <svg
      className="absolute pointer-events-none"
      style={{
        left: `${track.position.x}px`,
        top: `${track.position.y}px`,
        transform: 'translate(-50%, -50%)'
      }}
      width="200"
      height="200"
    >
      <path
        d={`M 100,100 Q ${100 + track.vector.dx * 5},${100 + track.vector.dy * 5} ${100 + track.vector.dx * 15},${100 + track.vector.dy * 15}`}
        stroke={track.status === 'HOSTILE' ? '#f87171' : '#60a5fa'}
        strokeWidth="1"
        strokeDasharray="2,4"
        opacity="0.6"
        fill="none"
      />
      <text
        x={100 + track.vector.dx * 10}
        y={100 + track.vector.dy * 10 - 10}
        fill="#60a5fa"
        fontSize="8"
        className="font-mono"
      >
        AI: {track.predictedPath}
      </text>
    </svg>
  );
};

export default AIPrediction;
