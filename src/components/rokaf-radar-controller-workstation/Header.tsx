import React from 'react';
import { Radar } from 'lucide-react';

interface HeaderProps {
  currentTime: Date;
  trackCount: number;
  detectionRate: number;
  trackingAccuracy: number;
}

const Header: React.FC<HeaderProps> = ({ currentTime, trackCount, detectionRate, trackingAccuracy }) => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-green-700 rounded-full flex items-center justify-center border-2 border-green-400 animate-pulse">
            <Radar className="w-8 h-8 text-green-200" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-green-300">RADAR CONTROLLER</h1>
            <p className="text-sm text-green-500">KE-14 Sector - LT Kim J.W. - Station Alpha</p>
          </div>
          <div className="px-2 py-1 bg-blue-900 text-blue-300 rounded text-xs font-bold">
            {trackCount} TRACKS
          </div>
        </div>

        <div className="flex items-center space-x-8 text-xs">
          <div className="text-center">
            <div className="text-green-400 font-bold text-lg">{currentTime.toLocaleTimeString('en-GB')}</div>
            <div className="text-gray-400">RADAR TIME</div>
          </div>
          <div className="text-center">
            <div className="text-green-400 font-bold">{detectionRate.toFixed(1)}%</div>
            <div className="text-gray-400">DETECTION RATE</div>
          </div>
          <div className="text-center">
            <div className="text-green-400 font-bold">{trackingAccuracy.toFixed(1)}%</div>
            <div className="text-gray-400">TRACK ACCURACY</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
