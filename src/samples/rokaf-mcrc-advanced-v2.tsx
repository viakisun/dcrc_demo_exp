import React, { useEffect } from 'react';
import { StateProvider, useStateContext } from '../components/rokaf-mcrc-advanced-v2/StateProvider';
import Header from '../components/rokaf-mcrc-advanced-v2/Header';
import ControlPanel from '../components/rokaf-mcrc-advanced-v2/ControlPanel';
import MapView from '../components/rokaf-mcrc-advanced-v2/MapView';
import TrackDetails from '../components/rokaf-mcrc-advanced-v2/TrackDetails';
import { Track } from '../components/rokaf-mcrc-advanced-v2/types';

const ROKAFMCRCAdvancedCore = () => {
  const { state, dispatch } = useStateContext();

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: 'SET_CURRENT_TIME', payload: new Date() });
    }, 1000);
    return () => clearInterval(timer);
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 font-mono">
      <div className="bg-red-900 text-white text-center py-1 font-bold text-xs">
        ★★ TOP SECRET // REL TO ROK // MCRC ADVANCED V2 ★★
      </div>
      <Header
        currentTime={state.currentTime}
        threatLevel={state.threatLevel}
        alertLevel={state.alertLevel}
      />
      <div className="flex h-[calc(100vh-100px)] p-2 gap-2">
        <ControlPanel
          radarMode={state.radarMode}
          onRadarModeChange={(mode) => dispatch({ type: 'SET_RADAR_MODE', payload: mode })}
          showTrails={state.showTrails}
          onToggleShowTrails={() => dispatch({ type: 'TOGGLE_SHOW_TRAILS' })}
          alertLevel={state.alertLevel}
          onAlertLevelChange={(level) => dispatch({ type: 'SET_ALERT_LEVEL', payload: level })}
        />
        <div className="flex-1 flex flex-col gap-2">
          <MapView
            tracks={state.tracks}
            groundThreats={state.groundThreats}
            onSelectTrack={(track: Track) => dispatch({ type: 'SET_SELECTED_TRACK', payload: track })}
            showTrails={state.showTrails}
          />
        </div>
        <div className="w-96 flex flex-col gap-2">
          <TrackDetails selectedTrack={state.selectedTrack} />
        </div>
      </div>
    </div>
  );
};

const ROKAFMCRCAdvanced = () => {
  return (
    <StateProvider>
      <ROKAFMCRCAdvancedCore />
    </StateProvider>
  );
};

export default ROKAFMCRCAdvanced;