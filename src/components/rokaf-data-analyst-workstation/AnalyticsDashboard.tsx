import React from 'react';
import { TrendingUp, Database, Brain, BarChart3 } from 'lucide-react';
import { AnalysisMetrics, DataStream, AISystem } from './types';

interface AnalyticsDashboardProps {
  metrics: AnalysisMetrics;
  dataStreams: { [key: string]: DataStream };
  aiSystems: { [key: string]: AISystem };
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ metrics, dataStreams, aiSystems }) => {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700 h-full">
      <h3 className="text-sm font-bold text-gray-300 mb-3 flex items-center">
        ANALYTICS DASHBOARD
      </h3>
      <div className="grid grid-cols-2 gap-4 h-[calc(100%-30px)]">
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-3">
          <h4 className="text-sm font-bold text-green-400 mb-3 flex items-center">
            <TrendingUp className="w-4 h-4 mr-2" />
            ANALYSIS METRICS
          </h4>
          <div className="space-y-3">
            {Object.entries(metrics).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center">
                <span className="text-xs text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-200 font-bold">
                    {typeof value === 'number' ?
                      (key.includes('Time') ? `${value.toFixed(1)}s` :
                       key.includes('Rate') || key.includes('confidence') || key.includes('accuracy') || key.includes('coverage') ? `${value.toFixed(1)}%` :
                       value.toString()) : value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg border border-gray-800 p-3">
          <h4 className="text-sm font-bold text-blue-400 mb-3 flex items-center">
            <Database className="w-4 h-4 mr-2" />
            DATA STREAMS
          </h4>
          <div className="space-y-2">
            {Object.entries(dataStreams).map(([source, data]) => (
              <div key={source} className="border border-gray-700 rounded p-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-blue-300 uppercase">{source}</span>
                  <span className={`text-[10px] px-1 py-0.5 rounded ${
                    data.quality > 95 ? 'bg-green-900 text-green-300' :
                    data.quality > 85 ? 'bg-yellow-900 text-yellow-300' : 'bg-red-900 text-red-300'
                  }`}>
                    {data.quality}%
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1 text-[10px]">
                  <div>Rate: {data.rate}/sec</div>
                  <div>Latency: {data.latency}ms</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg border border-gray-800 p-3">
          <h4 className="text-sm font-bold text-purple-400 mb-3 flex items-center">
            <Brain className="w-4 h-4 mr-2" />
            AI PROCESSING
          </h4>
          <div className="space-y-2">
            {Object.entries(aiSystems).map(([system, data]) => (
              <div key={system} className="border border-gray-700 rounded p-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-purple-300 capitalize">
                    {system.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className={`text-[10px] px-1 py-0.5 rounded ${
                    data.status === 'ACTIVE' ? 'bg-green-900 text-green-300' :
                    data.status === 'LEARNING' ? 'bg-blue-900 text-blue-300' :
                    data.status === 'UPDATING' ? 'bg-yellow-900 text-yellow-300' :
                    'bg-gray-700 text-gray-400'
                  }`}>
                    {data.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1 text-[10px]">
                  <div>Confidence: {data.confidence}%</div>
                  <div>Processing: {data.processing}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg border border-gray-800 p-3">
          <h4 className="text-sm font-bold text-yellow-400 mb-3 flex items-center">
            <BarChart3 className="w-4 h-4 mr-2" />
            THREAT TRENDS
          </h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400">Last 1 Hour:</span>
              <span className="text-yellow-300">23 Detections</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400">Classification Rate:</span>
              <span className="text-green-400">94.2%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400">False Positives:</span>
              <span className="text-orange-400">2.1%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400">Critical Threats:</span>
              <span className="text-red-400">1 Active</span>
            </div>

            <div className="mt-3 h-8 bg-gray-800 rounded flex items-end space-x-1 p-1">
              {[12, 8, 15, 23, 18, 9, 14, 19, 11, 16].map((value, index) => (
                <div
                  key={index}
                  className="bg-yellow-500 rounded-t"
                  style={{ height: `${(value / 25) * 100}%`, width: '8%' }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
