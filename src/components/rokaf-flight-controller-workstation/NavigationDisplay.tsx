import React from 'react';
import { Plane, AlertTriangle } from 'lucide-react';
import { Aircraft, Airway, Waypoint, WeatherData, AircraftStatus } from './types';

interface NavigationDisplayProps {
  controlledAircraft: Aircraft[];
  selectedAircraft: Aircraft | null;
  onSelectAircraft: (aircraft: Aircraft) => void;
  airwaysAndWaypoints: (Airway | Waypoint)[];
  weatherLayer: boolean;
  weatherData: WeatherData[];
  vectorMode: string;
}

const NavigationDisplay: React.FC<NavigationDisplayProps> = ({
  controlledAircraft,
  selectedAircraft,
  onSelectAircraft,
  airwaysAndWaypoints,
  weatherLayer,
  weatherData,
  vectorMode
}) => {
  return (
    <div className="relative w-full h-full bg-gray-900 rounded-lg border-2 border-blue-600 overflow-hidden">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 400">
        <defs>
          <pattern id="navGrid" width="25" height="25" patternUnits="userSpaceOnUse">
            <path d="M 25 0 L 0 0 0 25" fill="none" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="0.5"/>
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#navGrid)" />

        {airwaysAndWaypoints.filter((item): item is Airway => item.type === 'AIRWAY').map(airway => (
          <g key={airway.id}>
            <path
              d={`M ${airway.path.map(p => `${p.x} ${p.y}`).join(' L ')}`}
              stroke={airway.color}
              strokeWidth="2"
              strokeDasharray="5,5"
              fill="none"
            />
            <text x={airway.path[Math.floor(airway.path.length/2)].x} y={airway.path[Math.floor(airway.path.length/2)].y - 10}
                  fill={airway.color} fontSize="10" textAnchor="middle">{airway.id}</text>
          </g>
        ))}

        {airwaysAndWaypoints.filter((item): item is Waypoint => item.type === 'WAYPOINT').map(waypoint => (
          <g key={waypoint.id}>
            <circle cx={waypoint.position.x} cy={waypoint.position.y} r="4" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" />
            <text x={waypoint.position.x} y={waypoint.position.y - 15} fill="#fbbf24" fontSize="9" textAnchor="middle" fontWeight="bold">{waypoint.name}</text>
          </g>
        ))}

        {weatherLayer && weatherData.map((weather, index) => (
          <g key={index}>
            <circle cx={weather.position.x} cy={weather.position.y} r="15"
                   fill={weather.type === 'TURBULENCE' ? 'rgba(239, 68, 68, 0.3)' :
                         weather.type === 'PRECIPITATION' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(245, 158, 11, 0.3)'}
                   stroke={weather.type === 'TURBULENCE' ? '#ef4444' :
                          weather.type === 'PRECIPITATION' ? '#3b82f6' : '#f59e0b'}
                   strokeWidth="1" strokeDasharray="3,3" />
            <text x={weather.position.x} y={weather.position.y + 25} fill="#94a3b8" fontSize="8" textAnchor="middle">
              {weather.type.split('_')[0]}
            </text>
          </g>
        ))}

        <rect x="95" y="145" width="10" height="10" fill="#22c55e" />
        <text x="110" y="155" fill="#22c55e" fontSize="9">RKJK</text>
        <rect x="345" y="155" width="10" height="10" fill="#22c55e" />
        <text x="360" y="165" fill="#22c55e" fontSize="9">RKSS</text>
      </svg>

      <div className="absolute inset-0">
        {controlledAircraft.map(aircraft => {
          const isSelected = selectedAircraft?.id === aircraft.id;
          const statusColors: Record<AircraftStatus, string> = {
            EMERGENCY: 'text-red-400 bg-red-900/30 border-red-400',
            VECTORING: 'text-blue-400 bg-blue-900/30 border-blue-400',
            CLIMBING: 'text-green-400 bg-green-900/30 border-green-400',
            TRAINING: 'text-purple-400 bg-purple-900/30 border-purple-400'
          };

          return (
            <div
              key={aircraft.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all ${
                isSelected ? 'z-20 scale-110' : 'z-10'
              }`}
              style={{ left: `${aircraft.position.x}px`, top: `${aircraft.position.y}px` }}
              onClick={() => onSelectAircraft(aircraft)}
            >
              <div className={`relative ${statusColors[aircraft.status]} border-2 rounded-lg p-2`}>
                <Plane className="w-5 h-5" style={{ transform: `rotate(${aircraft.navigation.currentHdg}deg)` }} />

                <div className={`absolute top-8 left-8 bg-gray-900/90 rounded px-2 py-1 text-[9px] font-mono border ${
                  isSelected ? 'border-yellow-400 bg-yellow-900/20' : 'border-gray-600'
                }`}>
                  <div className="font-bold">{aircraft.callsign}</div>
                  <div>FL{Math.floor(aircraft.navigation.currentAlt/100)}</div>
                  <div>{aircraft.navigation.currentSpd}kt</div>
                  {aircraft.navigation.assignedAlt !== aircraft.navigation.currentAlt && (
                    <div className="text-yellow-400">→FL{Math.floor(aircraft.navigation.assignedAlt/100)}</div>
                  )}
                </div>

                {aircraft.priority === 'EMERGENCY' && (
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                    <AlertTriangle className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="absolute top-4 left-4 bg-gray-900/80 rounded-lg p-2 text-xs">
        <div className="text-blue-400 font-bold mb-1">NAVIGATION DISPLAY</div>
        <div className="text-gray-300">Scale: 1:500,000</div>
        <div className="text-gray-300">Mode: {vectorMode}</div>
        <div className="text-gray-300">Weather: {weatherLayer ? 'ON' : 'OFF'}</div>
      </div>

      <div className="absolute bottom-4 right-4 bg-gray-900/80 rounded-lg p-2 text-xs">
        <div className="text-yellow-400 font-bold mb-1">SEPARATION STANDARDS</div>
        <div className="text-gray-300">Horizontal: 5nm</div>
        <div className="text-gray-300">Vertical: 1000ft</div>
      </div>
    </div>
  );
};

export default NavigationDisplay;
