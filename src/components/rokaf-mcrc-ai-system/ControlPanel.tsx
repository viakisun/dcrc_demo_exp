import React from 'react';
import { Brain, Cpu, AlertCircle, TrendingUp, Bot } from 'lucide-react';
import { AISystem, AIAlert, GridSector } from './types';

interface ControlPanelProps {
  aiMode: string;
  setAiMode: (mode: string) => void;
  showPredictions: boolean;
  setShowPredictions: (show: boolean) => void;
  autoResponse: boolean;
  setAutoResponse: (auto: boolean) => void;
  aiSystems: { [key: string]: AISystem };
  aiAlerts: AIAlert[];
  gridSectors: GridSector[];
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  aiMode,
  setAiMode,
  showPredictions,
  setShowPredictions,
  autoResponse,
  setAutoResponse,
  aiSystems,
  aiAlerts,
  gridSectors,
}) => {
  return (
    <aside className="w-96 bg-gray-800/50 backdrop-blur-sm border-r border-gray-700 p-4 space-y-4 overflow-y-auto">
      <div className="bg-purple-900/20 rounded-lg p-3 border border-purple-700">
        <h3 className="text-sm font-bold text-purple-400 mb-3 flex items-center">
          <Brain className="w-4 h-4 mr-2" />
          AI CONTROL CENTER
        </h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">AI Mode</span>
            <select
              value={aiMode}
              onChange={(e) => setAiMode(e.target.value)}
              className="bg-gray-800 text-purple-400 text-xs border border-purple-600 rounded px-2 py-1"
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="LEARNING">LEARNING</option>
              <option value="STANDBY">STANDBY</option>
              <option value="AUTONOMOUS">AUTONOMOUS</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Show Predictions</span>
            <button
              onClick={() => setShowPredictions(!showPredictions)}
              className={`px-2 py-1 rounded text-xs ${showPredictions ? 'bg-purple-800 text-purple-300' : 'bg-gray-700 text-gray-400'}`}
            >
              {showPredictions ? 'ON' : 'OFF'}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Auto Response</span>
            <button
              onClick={() => setAutoResponse(!autoResponse)}
              className={`px-2 py-1 rounded text-xs ${autoResponse ? 'bg-red-800 text-red-300' : 'bg-gray-700 text-gray-400'}`}
            >
              {autoResponse ? 'ENABLED' : 'DISABLED'}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-900/50 rounded-lg p-3">
        <h3 className="text-sm font-bold text-gray-300 mb-3 flex items-center">
          <Cpu className="w-4 h-4 mr-2" />
          AI SYSTEMS STATUS
        </h3>
        <div className="space-y-2 text-xs">
          {Object.entries(aiSystems).map(([system, data]) => (
            <div key={system} className="flex justify-between items-center">
              <div>
                <div className="text-gray-400 capitalize">{system.replace(/([A-Z])/g, ' $1').trim()}</div>
                <div className="text-gray-500">{data.lastUpdate}</div>
              </div>
              <div className="text-right">
                <div className={`font-bold ${
                  data.status === 'ACTIVE' ? 'text-green-400' :
                  data.status === 'LEARNING' ? 'text-blue-400' : 'text-yellow-400'
                }`}>
                  {data.status}
                </div>
                <div className="text-purple-400">{data.confidence}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-900/50 rounded-lg p-3">
        <h3 className="text-sm font-bold text-yellow-400 mb-3 flex items-center">
          <AlertCircle className="w-4 h-4 mr-2" />
          AI ALERTS ({aiAlerts.length})
        </h3>
        <div className="space-y-2 text-xs max-h-40 overflow-y-auto">
          {aiAlerts.map(alert => (
            <div
              key={alert.id}
              className={`p-2 rounded border-l-4 ${
                alert.priority === 'HIGH' ? 'border-red-500 bg-red-900/20' :
                alert.priority === 'MEDIUM' ? 'border-yellow-500 bg-yellow-900/20' :
                'border-blue-500 bg-blue-900/20'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className={`font-bold ${
                  alert.priority === 'HIGH' ? 'text-red-400' :
                  alert.priority === 'MEDIUM' ? 'text-yellow-400' : 'text-blue-400'
                }`}>
                  {alert.type}
                </div>
                <div className="text-purple-400">{alert.confidence}%</div>
              </div>
              <div className="text-gray-300 mt-1">{alert.message}</div>
              <div className="text-gray-500 text-[10px] mt-1">
                {alert.time.toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-900/50 rounded-lg p-3">
        <h3 className="text-sm font-bold text-gray-300 mb-3 flex items-center">
          <TrendingUp className="w-4 h-4 mr-2" />
          AI SECTOR ANALYSIS
        </h3>
        <div className="space-y-1 text-xs max-h-48 overflow-y-auto">
          {gridSectors.slice(0, 6).map(sector => (
            <div
              key={sector.id}
              className="flex justify-between items-center p-2 rounded border border-gray-700 hover:bg-gray-700/50"
            >
              <div>
                <div className="text-gray-300 font-bold">{sector.id}</div>
                <div className="text-purple-400">AI Risk: {sector.aiRisk}%</div>
              </div>
              <div className="text-right">
                <div className={`text-xs font-bold ${
                  sector.predictedThreat === 'IMMINENT' ? 'text-red-500' :
                  sector.predictedThreat === 'CRITICAL' ? 'text-red-400' :
                  sector.predictedThreat === 'ESCALATING' ? 'text-orange-500' :
                  sector.predictedThreat === 'MONITORING' ? 'text-yellow-500' : 'text-green-500'
                }`}>
                  {sector.predictedThreat}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-red-900/20 rounded-lg p-3 border border-red-700">
        <h3 className="text-sm font-bold text-red-400 mb-3 flex items-center">
          <Bot className="w-4 h-4 mr-2" />
          AI AUTO RESPONSE
        </h3>
        <div className="space-y-2">
          <button
            className="w-full bg-purple-800 hover:bg-purple-700 text-white py-1 px-2 rounded text-xs disabled:opacity-50"
            disabled={!autoResponse}
          >
            AUTO THREAT RESPONSE
          </button>
          <button
            className="w-full bg-blue-800 hover:bg-blue-700 text-white py-1 px-2 rounded text-xs disabled:opacity-50"
            disabled={!autoResponse}
          >
            AI MISSION PLANNING
          </button>
          <button
            className="w-full bg-green-800 hover:bg-green-700 text-white py-1 px-2 rounded text-xs disabled:opacity-50"
            disabled={!autoResponse}
          >
            RESOURCE OPTIMIZATION
          </button>
          <div className="text-xs text-gray-400 text-center mt-2">
            {autoResponse ? 'AI Autonomous Mode Active' : 'Manual Control Only'}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ControlPanel;
