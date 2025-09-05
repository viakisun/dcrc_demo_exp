import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Threat } from './types';

interface ThreatDetailsProps {
  selectedThreat: Threat | null;
}

const ThreatDetails: React.FC<ThreatDetailsProps> = ({ selectedThreat }) => {
  if (!selectedThreat) {
    return (
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 p-4 rounded-lg h-full">
        <h3 className="text-sm font-bold text-gray-400 mb-3 flex items-center">
          <AlertTriangle className="w-4 h-4 mr-2" />
          THREAT ANALYSIS
        </h3>
        <div className="text-gray-500">No threat selected</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border-l-4 border-red-500 p-4 rounded-lg h-full overflow-y-auto">
      <h3 className="text-sm font-bold text-red-400 mb-3 flex items-center">
        <AlertTriangle className="w-4 h-4 mr-2" />
        THREAT ANALYSIS: {selectedThreat.id}
      </h3>
      <div className="text-xs space-y-3">
        <div>
          <div className="text-gray-400">Classification:</div>
          <div className="text-yellow-300 font-bold">{selectedThreat.classification}</div>
        </div>
        <div>
          <div className="text-gray-400">Confidence:</div>
          <div className="text-purple-400 font-bold">{selectedThreat.confidence}%</div>
        </div>
        <div>
          <div className="text-gray-400">Risk Level:</div>
          <div className={`font-bold ${
            selectedThreat.riskLevel === 'CRITICAL' ? 'text-red-400' :
            selectedThreat.riskLevel === 'HIGH' ? 'text-orange-400' : 'text-green-400'
          }`}>{selectedThreat.riskLevel}</div>
        </div>

        <div className="border-t border-gray-700 pt-2">
          <div className="text-blue-400 font-bold mb-2">CHARACTERISTICS</div>
          <div className="grid grid-cols-2 gap-1 text-[10px]">
            <div>Speed: {selectedThreat.characteristics.speed}kt</div>
            <div>Alt: FL{Math.floor(selectedThreat.characteristics.altitude/100)}</div>
            <div>Heading: {selectedThreat.characteristics.heading.toString().padStart(3, '0')}°</div>
            <div>RCS: {selectedThreat.characteristics.rcs}m²</div>
          </div>
          <div className="mt-1 text-[10px]">
            <div>Emission: {selectedThreat.characteristics.emissionPattern}</div>
            <div>Profile: {selectedThreat.characteristics.flightProfile}</div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-2">
          <div className="text-purple-400 font-bold mb-2">AI ASSESSMENT</div>
          <div className="space-y-1 text-[10px]">
            <div>Type: {selectedThreat.aiAssessment.aircraftType}</div>
            <div>Probability: {selectedThreat.aiAssessment.probability}%</div>
            <div>Intent: {selectedThreat.aiAssessment.intent}</div>
            <div>Time Window: {selectedThreat.aiAssessment.threatWindow}</div>
            <div className="mt-2 p-1 bg-red-900/30 rounded text-center font-bold">
              {selectedThreat.aiAssessment.recommendedAction.replace(/_/g, ' ')}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-2">
          <div className="text-yellow-400 font-bold mb-2">CORRELATED DATA</div>
          <div className="space-y-1 text-[10px]">
            <div>SIGINT: {selectedThreat.correlatedData.sigint}</div>
            <div>ELINT: {selectedThreat.correlatedData.elint}</div>
            <div>HUMINT: {selectedThreat.correlatedData.humint}</div>
            <div>OSINT: {selectedThreat.correlatedData.osint}</div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-2">
          <div className="text-green-400 font-bold mb-2">TIMELINE</div>
          <div className="space-y-1">
            {selectedThreat.timeline.map((event, index) => (
              <div key={index} className="text-[10px] border-l-2 border-blue-500 pl-2">
                <div className="text-blue-400">{event.time}</div>
                <div className="text-gray-300">{event.event}</div>
                <div className="text-gray-500">{event.source}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreatDetails;
