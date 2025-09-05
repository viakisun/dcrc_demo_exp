import React from 'react';
import { Bot, BarChart3, Network, TrendingUp } from 'lucide-react';
import { Track } from './types';

interface AnalysisPanelProps {
  selectedTrack: Track | null;
  aiConfidence: number;
}

const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ selectedTrack, aiConfidence }) => {
  return (
    <aside className="w-96 bg-gray-800/50 backdrop-blur-sm border-l border-gray-700 p-4 space-y-4 overflow-y-auto">
      {selectedTrack && (
        <div className="bg-gray-900/50 rounded-lg p-3 border-l-4 border-purple-500">
          <h3 className="text-sm font-bold text-purple-400 mb-3 flex items-center">
            <Bot className="w-4 h-4 mr-2" />
            AI TRACK ANALYSIS
          </h3>
          <div className="text-xs space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="text-gray-400">Callsign:</div>
              <div className="text-gray-200 font-bold">{selectedTrack.callsign}</div>
              <div className="text-gray-400">AI Classification:</div>
              <div className="text-purple-300">{selectedTrack.aiClassification}</div>
              <div className="text-gray-400">AI Confidence:</div>
              <div className="text-purple-400 font-bold">{selectedTrack.aiConfidence}%</div>
              <div className="text-gray-400">Threat Level:</div>
              <div className={`font-bold ${
                selectedTrack.threatLevel > 80 ? 'text-red-400' :
                selectedTrack.threatLevel > 50 ? 'text-orange-400' :
                selectedTrack.threatLevel > 20 ? 'text-yellow-400' : 'text-green-400'
              }`}>
                {selectedTrack.threatLevel}%
              </div>
              <div className="text-gray-400">Predicted Path:</div>
              <div className="text-blue-300">{selectedTrack.predictedPath}</div>
              <div className="text-gray-400">AI Recommendation:</div>
              <div className="text-yellow-300">{selectedTrack.aiRecommendation}</div>
            </div>
            <div className="mt-3 pt-2 border-t border-gray-700">
              <div className="text-purple-400 font-bold">AI STATUS</div>
              <div className={`px-2 py-1 rounded text-center text-xs mt-1 ${
                selectedTrack.aiClassification === 'FULL_AI_CONTROL' ? 'bg-purple-900 text-purple-300' :
                selectedTrack.status === 'FRIENDLY' ? 'bg-green-900 text-green-300' :
                selectedTrack.status === 'UNKNOWN' ? 'bg-yellow-900 text-yellow-300' :
                'bg-red-900 text-red-300'
              }`}>
                {selectedTrack.aiClassification}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gray-900/50 rounded-lg p-3">
        <h3 className="text-sm font-bold text-blue-400 mb-3 flex items-center">
          <BarChart3 className="w-4 h-4 mr-2" />
          AI PATTERN ANALYSIS
        </h3>
        <div className="text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400">Formation Detection:</span>
            <span className="text-blue-300">3 Groups Identified</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Anomaly Detection:</span>
            <span className="text-yellow-300">2 Anomalies</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Route Prediction:</span>
            <span className="text-green-300">89% Accurate</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Threat Assessment:</span>
            <span className="text-red-300">3 High Risk</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-900/50 rounded-lg p-3">
        <h3 className="text-sm font-bold text-purple-400 mb-3 flex items-center">
          <Network className="w-4 h-4 mr-2" />
          AI LEARNING STATUS
        </h3>
        <div className="text-xs space-y-2">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-gray-400">Neural Network:</span>
              <span className="text-purple-300">Training</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{width: `${aiConfidence}%`}}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-gray-400">Data Processing:</span>
              <span className="text-purple-300">Real-time</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{width: '96%'}}></div>
            </div>
          </div>
          <div className="text-purple-400 text-center mt-2">
            AI Model: ROKAF-GPT-Defense v2.1
          </div>
        </div>
      </div>

      <div className="bg-gray-900/50 rounded-lg p-3">
        <h3 className="text-sm font-bold text-yellow-400 mb-3 flex items-center">
          <TrendingUp className="w-4 h-4 mr-2" />
          AI PREDICTIONS
        </h3>
        <div className="text-xs space-y-2">
          <div className="p-2 bg-yellow-900/20 rounded border border-yellow-700">
            <div className="text-yellow-300 font-bold">Next 5 Minutes:</div>
            <div className="text-yellow-400">• BANDIT-1 intercept vector detected</div>
            <div className="text-yellow-400">• Recommend scramble from KE-10</div>
          </div>
          <div className="p-2 bg-blue-900/20 rounded border border-blue-700">
            <div className="text-blue-300 font-bold">Next 15 Minutes:</div>
            <div className="text-blue-400">• Weather degradation expected</div>
            <div className="text-blue-400">• Alternative routing suggested</div>
          </div>
          <div className="p-2 bg-green-900/20 rounded border border-green-700">
            <div className="text-green-300 font-bold">Mission Success:</div>
            <div className="text-green-400">• Current strategy: 94% success rate</div>
            <div className="text-green-400">• AI optimization available</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AnalysisPanel;
