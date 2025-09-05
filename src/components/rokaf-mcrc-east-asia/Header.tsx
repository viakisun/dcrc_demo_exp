import React from 'react';
import { Radar } from 'lucide-react';

interface HeaderProps {
  currentTime: Date;
  threatLevel: string;
}

const Header: React.FC<HeaderProps> = ({ currentTime, threatLevel }) => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center border-2 border-green-400">
            <Radar className="w-6 h-6 text-green-200" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-green-300">ROK MCRC</h1>
            <p className="text-xs text-green-500">Master Control and Reporting Center - East Asia</p>
          </div>
        </div>

        <div className="flex items-center space-x-6 text-xs">
          <div className="text-center">
            <div className="text-green-400 font-bold">{currentTime.toLocaleTimeString('en-GB', { timeZone: 'Asia/Seoul' })} KST</div>
            <div className="text-gray-400">ZULU {currentTime.toLocaleTimeString('en-GB', { timeZone: 'UTC' })}</div>
          </div>
          <div className="text-center">
            <div className="text-yellow-400 font-bold">{threatLevel}</div>
            <div className="text-gray-400">ALERT LEVEL</div>
          </div>
          <div className="text-center">
            <div className="text-blue-400 font-bold">CLASS-A</div>
            <div className="text-gray-400">AIRSPACE</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
