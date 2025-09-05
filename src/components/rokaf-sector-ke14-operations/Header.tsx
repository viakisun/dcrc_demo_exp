import React from 'react';
import { Target } from 'lucide-react';

interface HeaderProps {
  currentTime: Date;
  alertStatus: string;
}

const Header: React.FC<HeaderProps> = ({ currentTime, alertStatus }) => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center border-2 border-blue-400">
            <Target className="w-6 h-6 text-blue-200" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-blue-300">ROKAF SECTOR KE-14</h1>
            <p className="text-xs text-blue-500">Sector Operations Detail</p>
          </div>
        </div>

        <div className="flex items-center space-x-6 text-xs">
          <div className="text-center">
            <div className="text-green-400 font-bold">{currentTime.toLocaleTimeString('en-GB', { timeZone: 'Asia/Seoul' })} KST</div>
            <div className="text-gray-400">ZULU {currentTime.toLocaleTimeString('en-GB', { timeZone: 'UTC' })}</div>
          </div>
          <div className="text-center">
            <div className={`font-bold ${
              alertStatus === 'RED' ? 'text-red-400 animate-pulse' :
              alertStatus === 'YELLOW' ? 'text-yellow-400' :
              'text-green-400'
            }`}>{alertStatus}</div>
            <div className="text-gray-400">ALERT STATUS</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
