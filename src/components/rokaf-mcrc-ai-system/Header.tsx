import React from 'react';
import { Brain } from 'lucide-react';

interface HeaderProps {
  currentTime: Date;
  aiMode: string;
  aiConfidence: number;
  threatLevel: string;
  activeTracks: number;
  isAiAnalyzing: boolean;
}

const Header: React.FC<HeaderProps> = ({
  currentTime,
  aiMode,
  aiConfidence,
  threatLevel,
  activeTracks,
  isAiAnalyzing,
}) => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-purple-700 rounded-full flex items-center justify-center border-2 border-purple-400">
            <Brain className="w-8 h-8 text-purple-200" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-purple-300">ROK MCRC-AI</h1>
            <p className="text-sm text-purple-500">AI-Integrated Master Control and Reporting Center</p>
          </div>
          <div className="flex space-x-2">
            <div className={`px-3 py-1 rounded text-sm font-bold border-2 ${
              aiMode === 'ACTIVE' ? 'bg-purple-900 text-purple-300 border-purple-400 animate-pulse' : 'bg-gray-700 text-gray-400 border-gray-600'
            }`}>
              AI {aiMode}
            </div>
            {isAiAnalyzing && (
              <div className="px-2 py-1 bg-blue-900 text-blue-300 rounded text-xs font-bold animate-bounce">
                ANALYZING...
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-8 text-xs">
          <div className="text-center">
            <div className="text-green-400 font-bold text-lg">{currentTime.toLocaleTimeString('en-GB', { timeZone: 'Asia/Seoul' })}</div>
            <div className="text-gray-400">KST / ZULU {currentTime.toLocaleTimeString('en-GB', { timeZone: 'UTC' })}</div>
          </div>
          <div className="text-center">
            <div className="text-purple-400 font-bold text-lg">{aiConfidence}%</div>
            <div className="text-gray-400">AI CONFIDENCE</div>
          </div>
          <div className="text-center">
            <div className="text-yellow-400 font-bold">{threatLevel}</div>
            <div className="text-gray-400">THREAT LEVEL</div>
          </div>
          <div className="text-center">
            <div className="text-blue-400 font-bold">{activeTracks}</div>
            <div className="text-gray-400">AI TRACKED</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
