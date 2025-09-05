import React from 'react';
import { Brain } from 'lucide-react';

interface HeaderProps {
  currentTime: Date;
  aiProcessing: boolean;
  threatCount: number;
  confidenceLevel: number;
}

const Header: React.FC<HeaderProps> = ({ currentTime, aiProcessing, threatCount, confidenceLevel }) => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-purple-700 rounded-full flex items-center justify-center border-2 border-purple-400">
            <Brain className="w-8 h-8 text-purple-200" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-purple-300">DATA ANALYST</h1>
            <p className="text-sm text-purple-500">KE-14 Sector - SSG Choi M.K. - Intelligence Fusion</p>
          </div>
          <div className="flex space-x-2">
            <div className={`px-3 py-1 rounded text-sm font-bold border-2 ${
              aiProcessing ? 'bg-blue-900 text-blue-300 border-blue-400 animate-pulse' : 'bg-green-900 text-green-300 border-green-400'
            }`}>
              {aiProcessing ? 'AI PROCESSING' : 'AI READY'}
            </div>
            <div className="px-2 py-1 bg-purple-900 text-purple-300 rounded text-xs font-bold">
              {threatCount} THREATS
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-8 text-xs">
          <div className="text-center">
            <div className="text-green-400 font-bold text-lg">{currentTime.toLocaleTimeString('en-GB')}</div>
            <div className="text-gray-400">ANALYSIS TIME</div>
          </div>
          <div className="text-center">
            <div className="text-purple-400 font-bold">{confidenceLevel.toFixed(0)}%</div>
            <div className="text-gray-400">AI CONFIDENCE</div>
          </div>
          <div className="text-center">
            <div className="text-yellow-400 font-bold">SSG Choi M.K.</div>
            <div className="text-gray-400">DATA ANALYST</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
