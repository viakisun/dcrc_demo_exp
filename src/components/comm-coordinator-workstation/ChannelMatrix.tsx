import React from 'react';
import { CommChannel } from './types';
import { getStatusColor, getTrafficColor, getPriorityColor } from './utils';

interface ChannelMatrixProps {
  channels: CommChannel[];
  selectedChannel: string;
  onSelectChannel: (frequency: string) => void;
  monitorMode: string;
  onToggleMonitorMode: () => void;
}

const ChannelMatrix: React.FC<ChannelMatrixProps> = ({
  channels,
  selectedChannel,
  onSelectChannel,
  monitorMode,
  onToggleMonitorMode,
}) => {
  return (
    <div className="col-span-8 bg-gray-900/50 backdrop-blur-sm border border-gray-700 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-cyan-400 font-bold text-lg">📡 COMMUNICATION CHANNELS MATRIX</h3>
        <button
          onClick={onToggleMonitorMode}
          className={`px-3 py-1 rounded text-xs font-bold ${monitorMode === 'ALL' ? 'bg-blue-900 text-blue-300' : 'bg-gray-700 text-gray-400'}`}
        >
          {monitorMode === 'ALL' ? 'MONITORING ALL' : 'MONITORING SELECTED'}
        </button>
      </div>

      <div className="grid gap-1 max-h-[calc(100vh-250px)] overflow-y-auto">
        {channels.map((channel) => (
          <div
            key={channel.id}
            onClick={() => onSelectChannel(channel.frequency)}
            className={`grid grid-cols-12 gap-2 p-2 rounded border cursor-pointer transition-all
              ${selectedChannel === channel.frequency ? 'border-cyan-400 bg-cyan-900/30' : 'border-gray-800 hover:border-cyan-600'}
              ${channel.jamming ? 'bg-red-900/30 animate-pulse' : ''}
            `}
          >
            <div className="text-xs text-gray-500">{channel.id}</div>
            <div className="col-span-2 text-xs font-bold text-cyan-300">{channel.frequency}</div>
            <div className="col-span-2 text-xs text-gray-300">{channel.name}</div>
            <div className="text-xs text-purple-400">{channel.type}</div>
            <div className={`text-xs ${getStatusColor(channel.status)}`}>{channel.status}</div>
            <div className="text-xs text-blue-400">{channel.encryption}</div>
            <div className={`text-xs ${getTrafficColor(channel.traffic)}`}>{channel.traffic}</div>
            <div className="text-xs">{channel.quality}%</div>
            <div className={`text-xs ${getPriorityColor(channel.priority)}`}>
              {channel.priority === 'EMERGENCY' && '🚨'}
              {channel.priority === 'CRITICAL' && '⚠️'}
              {channel.priority}
            </div>
            <div className="text-xs">
              {channel.jamming && <span className="text-red-400 font-bold">JAM</span>}
              {!channel.jamming && (
                <span className="text-green-400">{channel.users.length} users</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChannelMatrix;
