import React from 'react';
import { MessageSquare } from 'lucide-react';
import { CommLogEntry } from './types';

interface CommLogProps {
  commLog: CommLogEntry[];
}

const CommLog: React.FC<CommLogProps> = ({ commLog }) => {
  const getPriorityColor = (priority: CommLogEntry['priority']) => {
    const colors = {
      ROUTINE: 'border-gray-600 bg-gray-800/10',
      PRIORITY: 'border-yellow-400 bg-yellow-900/10',
      URGENT: 'border-orange-400 bg-orange-900/10',
    };
    return colors[priority];
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 p-4 rounded-lg">
      <h3 className="text-sm font-bold text-gray-300 mb-3 flex items-center">
        <MessageSquare className="w-4 h-4 mr-2" />
        COMMUNICATION LOG
      </h3>
      <div className="space-y-2 text-xs max-h-48 overflow-y-auto">
        {commLog.map((log, index) => (
          <div key={index} className={`p-2 rounded border-l-2 ${getPriorityColor(log.priority)}`}>
            <div className="flex justify-between items-start mb-1">
              <span className="text-gray-200 font-bold">{log.from} to {log.to}</span>
              <span className="text-purple-300">{log.channel}</span>
            </div>
            <div className="text-gray-300">{log.message}</div>
            <div className="text-gray-500 text-[10px] mt-1">{log.time.toLocaleTimeString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommLog;
