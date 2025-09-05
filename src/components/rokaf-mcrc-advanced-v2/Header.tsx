import React from 'react';
import { Radar } from 'lucide-react';

interface HeaderProps {
  currentTime: Date;
  threatLevel: string;
  alertLevel: string;
}

const Header: React.FC<HeaderProps> = ({ currentTime, threatLevel, alertLevel }) => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-red-700 rounded-full flex items-center justify-center border-2 border-red-400">
            <Radar className="w-8 h-8 text-red-200" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-red-300">ROKAF MCRC Advanced</h1>
            <p className="text-sm text-red-500">Master Control and Reporting Center - v2</p>
          </div>
        </div>

        <div className="flex items-center space-x-8 text-xs">
          <div className="text-center">
            <div className="text-green-400 font-bold text-lg">{currentTime.toLocaleTimeString('en-GB')}</div>
            <div className="text-gray-400">SYSTEM TIME</div>
          </div>
          <div className="text-center">
            <div className="text-yellow-400 font-bold">{threatLevel}</div>
            <div className="text-gray-400">THREAT LEVEL</div>
          </div>
          <div className="text-center">
            <div className={`font-bold ${
              alertLevel === 'HIGH' ? 'text-red-400 animate-pulse' :
              alertLevel === 'MEDIUM' ? 'text-orange-400' :
              'text-green-400'
            }`}>{alertLevel}</div>
            <div className="text-gray-400">ALERT LEVEL</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
