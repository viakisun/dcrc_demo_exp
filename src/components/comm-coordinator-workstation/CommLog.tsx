import React from 'react';
import { CommActivity } from './types';
import { getPriorityColor } from './utils';

interface CommLogProps {
  activity: CommActivity[];
}

const CommLog: React.FC<CommLogProps> = ({ activity }) => {
  return (
    <div className="mt-2 bg-gray-900/50 backdrop-blur-sm border border-gray-700 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-cyan-400 font-bold">📻 REAL-TIME COMMUNICATION LOG</h4>
        <div className="flex space-x-2 text-xs">
          <span className="text-red-400">⚠️ EMERGENCY</span>
          <span className="text-orange-400">🔸 URGENT</span>
          <span className="text-yellow-400">• HIGH</span>
          <span className="text-gray-400">• ROUTINE</span>
        </div>
      </div>
      <div className="grid gap-1 max-h-32 overflow-y-auto">
        {activity.map((log, index) => (
          <div key={index} className={`grid grid-cols-12 gap-2 p-1 text-xs border-l-2
            ${log.priority === 'EMERGENCY' ? 'border-red-400 bg-red-900/10' :
              log.priority === 'URGENT' ? 'border-orange-400 bg-orange-900/10' :
              log.priority === 'HIGH' ? 'border-yellow-400 bg-yellow-900/10' :
              'border-gray-600 bg-gray-800/10'}`}>
            <div className="text-gray-500">{log.time}</div>
            <div className="text-cyan-300 font-bold">{log.channel}</div>
            <div className="text-purple-300">{log.type}</div>
            <div className="col-span-2 text-green-300">{log.from} → {log.to}</div>
            <div className={getPriorityColor(log.priority)}>{log.priority}</div>
            <div className="text-yellow-300">{log.duration}</div>
            <div className="col-span-5 text-gray-300 truncate">{log.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommLog;
