import React from 'react';
import { Cpu, Filter, Microscope, Network, Bot } from 'lucide-react';
import { DataStream } from './types';

interface ControlPanelProps {
  analysisMode: string;
  onAnalysisModeChange: (mode: string) => void;
  dataSource: string;
  onDataSourceChange: (source: string) => void;
  confidenceLevel: number;
  onConfidenceLevelChange: (level: number) => void;
  dataStreams: { [key: string]: DataStream };
  onRunAnalysis: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  analysisMode,
  onAnalysisModeChange,
  dataSource,
  onDataSourceChange,
  confidenceLevel,
  onConfidenceLevelChange,
  dataStreams,
  onRunAnalysis,
}) => {
  return (
    <div className="w-80 bg-gray-800/50 backdrop-blur-sm border-r border-gray-700 p-4 space-y-4 overflow-y-auto">
      <div className="bg-gray-900/50 rounded-lg p-3">
        <h3 className="text-sm font-bold text-purple-400 mb-3 flex items-center">
          <Cpu className="w-4 h-4 mr-2" />
          ANALYSIS MODE
        </h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-400 block mb-1">Processing Mode</label>
            <select
              value={analysisMode}
              onChange={(e) => onAnalysisModeChange(e.target.value)}
              className="w-full bg-gray-800 text-purple-300 text-xs border border-gray-600 rounded px-2 py-1"
            >
              <option value="REALTIME">REAL-TIME ANALYSIS</option>
              <option value="BATCH">BATCH PROCESSING</option>
              <option value="HISTORICAL">HISTORICAL ANALYSIS</option>
              <option value="PREDICTIVE">PREDICTIVE MODELING</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Data Sources</label>
            <select
              value={dataSource}
              onChange={(e) => onDataSourceChange(e.target.value)}
              className="w-full bg-gray-800 text-purple-300 text-xs border border-gray-600 rounded px-2 py-1"
            >
              <option value="ALL_SENSORS">ALL SENSORS</option>
              <option value="RADAR_ONLY">RADAR ONLY</option>
              <option value="SIGINT_ELINT">SIGINT/ELINT</option>
              <option value="MULTI_INT">MULTI-INT FUSION</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">AI Confidence Threshold: {confidenceLevel.toFixed(0)}%</label>
            <input
              type="range"
              min="70"
              max="95"
              value={confidenceLevel}
              onChange={(e) => onConfidenceLevelChange(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-900/50 rounded-lg p-3">
        <h3 className="text-sm font-bold text-yellow-400 mb-3 flex items-center">
          <Filter className="w-4 h-4 mr-2" />
          THREAT FILTERS
        </h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="military" defaultChecked className="text-red-400" />
            <label htmlFor="military" className="text-xs text-gray-300">Military Aircraft</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="stealth" defaultChecked className="text-purple-400" />
            <label htmlFor="stealth" className="text-xs text-gray-300">Stealth Signatures</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="civilian" defaultChecked className="text-green-400" />
            <label htmlFor="civilian" className="text-xs text-gray-300">Civilian Deviations</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="unknown" defaultChecked className="text-yellow-400" />
            <label htmlFor="unknown" className="text-xs text-gray-300">Unknown Types</label>
          </div>
        </div>
      </div>

      <div className="bg-gray-900/50 rounded-lg p-3">
        <h3 className="text-sm font-bold text-blue-400 mb-3 flex items-center">
          <Microscope className="w-4 h-4 mr-2" />
          ANALYSIS TOOLS
        </h3>
        <div className="space-y-2">
          <button
            onClick={onRunAnalysis}
            className="w-full bg-purple-800 hover:bg-purple-700 text-white py-1 px-2 rounded text-xs"
          >
            RUN DEEP ANALYSIS
          </button>
          <button className="w-full bg-blue-800 hover:bg-blue-700 text-white py-1 px-2 rounded text-xs">
            PATTERN CORRELATION
          </button>
        </div>
      </div>

      <div className="bg-gray-900/50 rounded-lg p-3">
        <h3 className="text-sm font-bold text-green-400 mb-3 flex items-center">
          <Network className="w-4 h-4 mr-2" />
          DATA SOURCES
        </h3>
        <div className="space-y-1 text-xs">
          {Object.entries(dataStreams).map(([source, data]) => (
            <div key={source} className="flex justify-between items-center">
              <span className="text-gray-400 capitalize">{source}:</span>
              <div className="flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full ${
                  data.quality > 95 ? 'bg-green-500' :
                  data.quality > 85 ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
                <span className="text-gray-300">{data.quality}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-purple-900/20 rounded-lg p-3 border border-purple-700">
        <h3 className="text-sm font-bold text-purple-400 mb-3 flex items-center">
          <Bot className="w-4 h-4 mr-2" />
          AI LEARNING
        </h3>
        <div className="text-xs space-y-2 text-gray-300">
          <div>Model: ROKAF-THREAT-ANALYSIS-v3.2</div>
          <div>Training Data: 2.3M samples</div>
          <div className="mt-2">
            <div className="flex justify-between mb-1">
              <span>Learning Progress:</span>
              <span>{confidenceLevel.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${confidenceLevel}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
