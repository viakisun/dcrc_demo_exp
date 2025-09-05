import React from 'react';
import { Radio } from 'lucide-react';

interface HeaderProps {
  currentTime: Date;
  jamDetection: boolean;
  encryptionLevel: number;
  operator: string;
}

const Header: React.FC<HeaderProps> = ({ currentTime, jamDetection, encryptionLevel, operator }) => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 px-4 py-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Radio className="w-6 h-6 text-cyan-400" />
            <h1 className="text-xl font-bold text-cyan-300">COMM COORDINATOR WORKSTATION</h1>
          </div>
          <div className="text-yellow-400 font-bold">{operator}</div>
        </div>
        <div className="flex items-center space-x-6">
          <div className="text-gray-300">{currentTime.toLocaleTimeString()}</div>
          <div className={`px-3 py-1 rounded text-xs font-bold border-2 ${jamDetection ? 'border-red-500 bg-red-900 text-red-400' : 'border-green-500 bg-green-900 text-green-400'}`}>
            {jamDetection ? 'JAMMING DETECTED' : 'NO INTERFERENCE'}
          </div>
          <div className="text-blue-400">ENCRYPTION: {encryptionLevel.toFixed(1)}%</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
