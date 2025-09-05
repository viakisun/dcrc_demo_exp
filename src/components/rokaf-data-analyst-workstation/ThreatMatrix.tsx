import React from 'react';
import { Threat } from './types';

interface ThreatMatrixProps {
  threats: Threat[];
  selectedThreat: Threat | null;
  onSelectThreat: (threat: Threat) => void;
}

const ThreatMatrix: React.FC<ThreatMatrixProps> = ({ threats, selectedThreat, onSelectThreat }) => {
  return (
    <div className="flex-1 bg-gray-900/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-300">THREAT ANALYSIS MATRIX</h2>
        <div className="flex space-x-2">
          <button className="px-3 py-1 bg-blue-800 text-blue-300 rounded text-xs">
            MATRIX VIEW
          </button>
          <button className="px-3 py-1 bg-gray-700 text-gray-400 rounded text-xs">
            TIMELINE VIEW
          </button>
          <button className="px-3 py-1 bg-gray-700 text-gray-400 rounded text-xs">
            GEOGRAPHIC VIEW
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 h-[calc(100%-40px)]">
        {threats.map(threat => (
          <div
            key={threat.id}
            className={`bg-gray-900 rounded-lg border-2 p-3 cursor-pointer transition-all ${
              selectedThreat?.id === threat.id ? 'border-yellow-500 bg-yellow-900/20' :
              threat.riskLevel === 'CRITICAL' ? 'border-red-600 hover:border-red-400' :
              threat.riskLevel === 'HIGH' ? 'border-orange-600 hover:border-orange-400' :
              'border-green-600 hover:border-green-400'
            }`}
            onClick={() => onSelectThreat(threat)}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${
                  threat.riskLevel === 'CRITICAL' ? 'bg-red-500 animate-pulse' :
                  threat.riskLevel === 'HIGH' ? 'bg-orange-500' : 'bg-green-500'
                }`}></div>
                <span className="text-xs font-bold text-gray-400">{threat.id}</span>
              </div>
              <span className="text-xs text-purple-400">{threat.confidence}%</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="text-yellow-300 font-bold">{threat.classification}</div>
              <div className={`font-bold ${
                threat.riskLevel === 'CRITICAL' ? 'text-red-400' :
                threat.riskLevel === 'HIGH' ? 'text-orange-400' : 'text-green-400'
              }`}>
                RISK: {threat.riskLevel}
              </div>

              <div className="space-y-1 text-[10px] text-gray-400">
                <div>Speed: {threat.characteristics.speed}kt</div>
                <div>Alt: FL{Math.floor(threat.characteristics.altitude/100)}</div>
                <div>RCS: {threat.characteristics.rcs}m²</div>
              </div>

              <div className="border-t border-gray-700 pt-2 mt-2">
                <div className="text-blue-400 font-bold">AI ASSESSMENT</div>
                <div className="text-[10px] space-y-1 text-gray-300">
                  <div>Type: {threat.aiAssessment.aircraftType}</div>
                  <div>Intent: {threat.aiAssessment.intent}</div>
                </div>
              </div>

              <div className="mt-2">
                <div className={`text-[10px] px-2 py-1 rounded text-center font-bold ${
                  threat.aiAssessment.recommendedAction.includes('SCRAMBLE') ? 'bg-red-800 text-red-300' :
                  threat.aiAssessment.recommendedAction.includes('ALERT') ? 'bg-orange-800 text-orange-300' :
                  'bg-green-800 text-green-300'
                }`}>
                  {threat.aiAssessment.recommendedAction.replace('_', ' ')}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThreatMatrix;
