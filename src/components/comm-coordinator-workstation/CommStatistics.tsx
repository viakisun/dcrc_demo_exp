import React from 'react';
import { CommStats } from './types';

interface CommStatisticsProps {
  stats: CommStats;
}

const CommStatistics: React.FC<CommStatisticsProps> = ({ stats }) => {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 p-4 rounded-lg">
      <h4 className="text-cyan-400 font-bold mb-2">📊 COMMUNICATION STATISTICS</h4>
      <div className="space-y-1 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-400">Total Messages:</span>
          <span className="text-gray-200 font-bold">{stats.totalMessages}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Voice Messages:</span>
          <span className="text-blue-300">{stats.voiceMessages}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Data Messages:</span>
          <span className="text-cyan-300">{stats.dataMessages}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Emergency Messages:</span>
          <span className="text-red-400 font-bold">{stats.emergencyMessages}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Encryption Rate:</span>
          <span className="text-green-300">{stats.encryptionRate}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Average Quality:</span>
          <span className="text-yellow-300">{stats.averageQuality}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Active Channels:</span>
          <span className="text-green-300">{stats.channelsActive}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Standby Channels:</span>
          <span className="text-yellow-300">{stats.channelsStandby}</span>
        </div>
      </div>
    </div>
  );
};

export default CommStatistics;
