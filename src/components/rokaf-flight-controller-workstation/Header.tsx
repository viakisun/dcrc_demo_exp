import React from 'react';
import { Navigation } from 'lucide-react';

interface HeaderProps {
  currentTime: Date;
  transmitting: boolean;
  aircraftCount: number;
  activeFreq: string;
}

const Header: React.FC<HeaderProps> = ({ currentTime, transmitting, aircraftCount, activeFreq }) => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center border-2 border-blue-400">
            <Navigation className="w-8 h-8 text-blue-200" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-blue-300">FLIGHT CONTROLLER</h1>
            <p className="text-sm text-blue-500">KE-14 Sector - SrA Lee H.S. - Vectoring Station</p>
          </div>
          <div className="flex space-x-2">
            <div className={`px-3 py-1 rounded text-sm font-bold border-2 ${
              transmitting ? 'bg-red-900 text-red-300 border-red-400 animate-pulse' : 'bg-green-900 text-green-300 border-green-400'
            }`}>
              {transmitting ? 'TRANSMITTING' : 'STANDBY'}
            </div>
            <div className="px-2 py-1 bg-blue-900 text-blue-300 rounded text-xs font-bold">
              {aircraftCount} AIRCRAFT
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-8 text-xs">
          <div className="text-center">
            <div className="text-green-400 font-bold text-lg">{currentTime.toLocaleTimeString('en-GB')}</div>
            <div className="text-gray-400">CONTROL TIME</div>
          </div>
          <div className="text-center">
            <div className="text-blue-400 font-bold">SrA Lee H.S.</div>
            <div className="text-gray-400">FLIGHT CONTROLLER</div>
          </div>
          <div className="text-center">
            <div className="text-purple-400 font-bold">{activeFreq}</div>
            <div className="text-gray-400">ACTIVE FREQ</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
