import React, { useEffect } from 'react';
import { StateProvider, useStateContext } from '../components/comm-coordinator-workstation/StateProvider';
import Header from '../components/comm-coordinator-workstation/Header';
import ChannelMatrix from '../components/comm-coordinator-workstation/ChannelMatrix';
import ChannelDetails from '../components/comm-coordinator-workstation/ChannelDetails';
import SystemStatus from '../components/comm-coordinator-workstation/SystemStatus';
import CommStatistics from '../components/comm-coordinator-workstation/CommStatistics';
import ControlPanel from '../components/comm-coordinator-workstation/ControlPanel';
import CommLog from '../components/comm-coordinator-workstation/CommLog';

const CommCoordinatorWorkstationCore = () => {
  const { state, dispatch } = useStateContext();

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: 'SET_CURRENT_TIME', payload: new Date() });
    }, 1000);
    return () => clearInterval(timer);
  }, [dispatch]);

  const selectedChannelData = state.commChannels.find(ch => ch.frequency === state.selectedChannel);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 font-mono p-2">
      <Header
        currentTime={state.currentTime}
        jamDetection={state.jamDetection}
        encryptionLevel={state.encryptionLevel}
        operator="SrA Jung D.H."
      />
      <main className="grid grid-cols-12 gap-2 mt-2 h-[calc(100vh-150px)]">
        <ChannelMatrix
          channels={state.commChannels}
          selectedChannel={state.selectedChannel}
          onSelectChannel={(freq) => dispatch({ type: 'SET_SELECTED_CHANNEL', payload: freq })}
          monitorMode={state.monitorMode}
          onToggleMonitorMode={() => dispatch({ type: 'TOGGLE_MONITOR_MODE' })}
        />
        <div className="col-span-4 space-y-2">
          <ChannelDetails selectedChannelData={selectedChannelData} />
          <SystemStatus systemStatus={state.systemStatus} />
          <CommStatistics stats={state.commStats} />
          <ControlPanel
            jamDetection={state.jamDetection}
            onToggleJamDetection={() => dispatch({ type: 'TOGGLE_JAM_DETECTION' })}
            relayMode={state.relayMode}
            onToggleRelayMode={() => dispatch({ type: 'TOGGLE_RELAY_MODE' })}
          />
        </div>
      </main>
      <CommLog activity={state.commActivity} />
      <div className="bg-red-900 text-white text-center py-1 font-bold text-xs mt-2">
        ★★ TOP SECRET // REL TO ROK // COMM COORDINATOR WORKSTATION ★★
      </div>
    </div>
  );
};

const CommCoordinatorWorkstation = () => {
  return (
    <StateProvider>
      <CommCoordinatorWorkstationCore />
    </StateProvider>
  );
};

export default CommCoordinatorWorkstation;