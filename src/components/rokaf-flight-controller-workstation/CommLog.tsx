import React from 'react';
import { MessageSquare } from 'lucide-react';
import { CommLogEntry } from './types';

interface CommLogProps {
  commLog: CommLogEntry[];
}

const CommLog: React.FC<CommLogProps> = ({ commLog }) => {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 p-4 rounded-lg">
      <h3 className="text-sm font-bold text-purple-400 mb-3 flex items-center">
        <MessageSquare className="w-4 h-4 mr-2" />
        COMMUNICATION LOG
      </h3>
      <div className="text-xs space-y-2 max-h-48 overflow-y-auto">
        {commLog.map((comm, index) => (
          <div key={index} className={`p-2 rounded border-l-2 ${
            comm.from === 'FC' ? 'border-blue-500 bg-blue-900/20' : 'border-green-500 bg-green-900/20'
          }`}>
            <div className="flex justify-between items-start mb-1">
              <span className="text-gray-200 font-bold">{comm.from}</span>
              <span className="text-purple-300">{comm.frequency}</span>
            </div>
            <div className="text-gray-300">{comm.message}</div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-gray-500 text-[10px]">{comm.time.toLocaleTimeString()}</span>
              <span className={`text-[10px] ${
                comm.response === 'ROGER' ? 'text-green-400' :
                comm.response === 'WILCO' ? 'text-blue-400' :
                comm.response === 'CLEARED' ? 'text-purple-400' :
                comm.response === 'PENDING' ? 'text-yellow-400' : 'text-gray-400'
              }`}>
                {comm.response}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommLog;
