import React from 'react';

interface ControlPanelProps {
  jamDetection: boolean;
  onToggleJamDetection: () => void;
  relayMode: string;
  onToggleRelayMode: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  jamDetection,
  onToggleJamDetection,
  relayMode,
  onToggleRelayMode,
}) => {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 p-4 rounded-lg">
      <h4 className="text-cyan-400 font-bold mb-2">🎛️ CONTROL PANEL</h4>
      <div className="space-y-2">
        <button
          onClick={onToggleJamDetection}
          className={`w-full py-2 px-3 rounded text-xs font-bold ${jamDetection ? 'bg-red-900 text-red-400' : 'bg-green-900 text-green-400'}`}
        >
          {jamDetection ? 'DEACTIVATE ANTI-JAM' : 'ACTIVATE ANTI-JAM'}
        </button>

        <button
          onClick={onToggleRelayMode}
          className={`w-full py-2 px-3 rounded text-xs font-bold ${relayMode === 'AUTO' ? 'bg-blue-900 text-blue-400' : 'bg-purple-900 text-purple-400'}`}
        >
          RELAY MODE: {relayMode}
        </button>

        <button className="w-full py-2 px-3 rounded text-xs font-bold bg-orange-900 text-orange-400 hover:bg-orange-800">
          FREQUENCY HOP
        </button>

        <button className="w-full py-2 px-3 rounded text-xs font-bold bg-red-900 text-red-400 hover:bg-red-800">
          EMERGENCY BROADCAST
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
