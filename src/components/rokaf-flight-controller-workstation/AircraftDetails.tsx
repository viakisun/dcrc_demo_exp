import React from 'react';
import { Target } from 'lucide-react';
import { Aircraft } from './types';

interface AircraftDetailsProps {
  selectedAircraft: Aircraft | null;
}

const AircraftDetails: React.FC<AircraftDetailsProps> = ({ selectedAircraft }) => {
  if (!selectedAircraft) {
    return (
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 p-4 rounded-lg h-full">
        <h3 className="text-sm font-bold text-gray-400 mb-3 flex items-center">
          <Target className="w-4 h-4 mr-2" />
          AIRCRAFT DETAIL
        </h3>
        <div className="text-gray-500">No aircraft selected</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border-l-4 border-blue-500 p-4 rounded-lg h-full overflow-y-auto">
      <h3 className="text-sm font-bold text-blue-400 mb-3 flex items-center">
        <Target className="w-4 h-4 mr-2" />
        AIRCRAFT DETAIL: {selectedAircraft.callsign}
      </h3>
      <div className="text-xs space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div className="text-gray-400">Aircraft:</div>
          <div className="text-gray-200">{selectedAircraft.type}</div>
          <div className="text-gray-400">Pilot:</div>
          <div className="text-gray-200">{selectedAircraft.communications.pilot}</div>
          <div className="text-gray-400">Current Alt:</div>
          <div className="text-gray-200">{selectedAircraft.navigation.currentAlt}ft</div>
          <div className="text-gray-400">Assigned Alt:</div>
          <div className={`font-bold ${
            selectedAircraft.navigation.assignedAlt !== selectedAircraft.navigation.currentAlt ? 'text-yellow-400' : 'text-gray-200'
          }`}>{selectedAircraft.navigation.assignedAlt}ft</div>
          <div className="text-gray-400">Current Hdg:</div>
          <div className="text-gray-200">{selectedAircraft.navigation.currentHdg.toString().padStart(3, '0')}°</div>
          <div className="text-gray-400">Assigned Hdg:</div>
          <div className={`font-bold ${
            selectedAircraft.navigation.assignedHdg !== selectedAircraft.navigation.currentHdg ? 'text-blue-400' : 'text-gray-200'
          }`}>{selectedAircraft.navigation.assignedHdg.toString().padStart(3, '0')}°</div>
          <div className="text-gray-400">Speed:</div>
          <div className="text-gray-200">{selectedAircraft.navigation.currentSpd}kt</div>
        </div>

        <div className="border-t border-gray-700 pt-2">
          <div className="text-yellow-400 font-bold mb-2">FLIGHT PLAN</div>
          <div className="space-y-1 text-[10px]">
            <div>From: {selectedAircraft.flightPlan.departure} To: {selectedAircraft.flightPlan.destination}</div>
            <div>Route: {selectedAircraft.flightPlan.route}</div>
            <div>Next WPT: {selectedAircraft.flightPlan.nextWaypoint}</div>
            <div>ETA: {selectedAircraft.flightPlan.eta}</div>
            <div>Fuel: {selectedAircraft.flightPlan.fuel}%</div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-2">
          <div className="text-purple-400 font-bold mb-2">SEPARATION</div>
          <div className="space-y-1 text-[10px]">
            <div>Nearest: {selectedAircraft.separation.nearest}</div>
            <div>Dist: {selectedAircraft.separation.distance}nm</div>
            <div>Vert Sep: {selectedAircraft.separation.verticalSep}ft</div>
            <div className={`${
              selectedAircraft.separation.conflictLevel === 'NONE' ? 'text-green-400' :
              selectedAircraft.separation.conflictLevel === 'MONITOR' ? 'text-yellow-400' : 'text-red-400'
            }`}>
              Conflict: {selectedAircraft.separation.conflictLevel}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AircraftDetails;
