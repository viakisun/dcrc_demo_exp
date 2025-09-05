import React from 'react';
import { SystemStatus as SystemStatusType } from './types';
import { getStatusColor } from './utils';

interface SystemStatusProps {
  systemStatus: SystemStatusType[];
}

const SystemStatus: React.FC<SystemStatusProps> = ({ systemStatus }) => {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 p-4 rounded-lg">
      <h4 className="text-cyan-400 font-bold mb-2">⚙️ SYSTEM STATUS</h4>
      <div className="space-y-1 text-xs">
        {systemStatus.map((system, index) => (
          <div key={index} className="flex justify-between">
            <span className="text-gray-400">{system.name}:</span>
            <span className={getStatusColor(system.status)}>
              {system.status}
              {system.power > 0 && ` ${system.power}%`}
              {system.temp > 0 && ` ${system.temp}°C`}
              {typeof system.load === 'string' && ` ${system.load}`}
              {typeof system.load === 'number' && ` ${system.load}%`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemStatus;
