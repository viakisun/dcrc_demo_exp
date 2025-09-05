import React from 'react';
import { CommChannel } from './types';
import { getStatusColor } from './utils';

interface ChannelDetailsProps {
  selectedChannelData: CommChannel | undefined;
}

const ChannelDetails: React.FC<ChannelDetailsProps> = ({ selectedChannelData }) => {
  if (!selectedChannelData) {
    return (
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 p-4 rounded-lg">
        <h4 className="text-cyan-400 font-bold mb-2">🎯 SELECTED CHANNEL DETAILS</h4>
        <div className="text-gray-400">No channel selected</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 p-4 rounded-lg">
      <h4 className="text-cyan-400 font-bold mb-2">🎯 SELECTED CHANNEL DETAILS</h4>
      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-400">Frequency:</span>
          <span className="text-cyan-300 font-bold">{selectedChannelData.frequency} MHz</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Name:</span>
          <span className="text-gray-200">{selectedChannelData.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Status:</span>
          <span className={getStatusColor(selectedChannelData.status)}>{selectedChannelData.status}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Encryption:</span>
          <span className="text-blue-300">{selectedChannelData.encryption}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Quality:</span>
          <span className="text-green-300">{selectedChannelData.quality}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Power:</span>
          <span className="text-yellow-300">{selectedChannelData.power}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Range:</span>
          <span className="text-purple-300">{selectedChannelData.range} NM</span>
        </div>
        <div className="mt-2">
          <span className="text-gray-400">Active Users:</span>
          <div className="mt-1 space-y-1">
            {selectedChannelData.users.map((user, idx) => (
              <div key={idx} className="text-green-300 text-xs">• {user}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelDetails;
