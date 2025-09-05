import React from 'react';
import { Operator, OperatorStatus, Workload } from './types';

interface OperatorStationsProps {
  operators: Operator[];
  selectedOperator: string;
  onSelectOperator: (id: string) => void;
}

const OperatorStations: React.FC<OperatorStationsProps> = ({ operators, selectedOperator, onSelectOperator }) => {
  const getStatusColor = (status: OperatorStatus) => {
    const colors: Record<OperatorStatus, string> = {
      'ACTIVE': 'border-green-500 bg-green-900/20',
      'STANDBY': 'border-yellow-500 bg-yellow-900/20',
      'OFFLINE': 'border-red-500 bg-red-900/20'
    };
    return colors[status];
  };

  const getWorkloadColor = (workload: Workload) => {
    const colors: Record<Workload, string> = {
      'HIGH': 'text-red-400',
      'MODERATE': 'text-yellow-400',
      'LOW': 'text-green-400',
      'NORMAL': 'text-green-400'
    };
    return colors[workload];
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {operators.map((operator) => (
        <div
          key={operator.id}
          className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
            selectedOperator === operator.id ? 'border-blue-500 bg-blue-900/30' : getStatusColor(operator.status)
          }`}
          onClick={() => onSelectOperator(operator.id)}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                operator.status === 'ACTIVE' ? 'bg-green-500 animate-pulse' :
                operator.status === 'STANDBY' ? 'bg-yellow-500' : 'bg-red-500'
              }`}></div>
              <span className="text-gray-200 font-bold text-sm">{operator.id}</span>
            </div>
            <span className={`text-xs font-bold ${getWorkloadColor(operator.workload)}`}>
              {operator.workload}
            </span>
          </div>

          <div className="space-y-1 text-xs">
            <div className="text-gray-300 font-bold">{operator.role}</div>
            <div className="text-gray-400">{operator.operator}</div>
            <div className="text-blue-400">{operator.responsibility}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OperatorStations;
