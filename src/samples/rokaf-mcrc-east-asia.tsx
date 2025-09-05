import React, { useEffect } from 'react';
import { StateProvider, useStateContext } from '../components/rokaf-mcrc-east-asia/StateProvider';
import Header from '../components/rokaf-mcrc-east-asia/Header';
import ControlPanel from '../components/rokaf-mcrc-east-asia/ControlPanel';
import MapView from '../components/rokaf-mcrc-east-asia/MapView';
import InfoPanel from '../components/rokaf-mcrc-east-asia/InfoPanel';
import { Track } from '../components/rokaf-mcrc-east-asia/types';

const ROKAFMCRCEastAsiaCore = () => {
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
        ★★ TOP SECRET // REL TO ROK // MCRC EAST ASIA ★★
      </div>
      <Header
        currentTime={state.currentTime}
        threatLevel={state.threatLevel}
      />
      <div className="flex h-[calc(100vh-100px)] p-2 gap-2">
        <ControlPanel
          gridSectors={state.gridSectors}
          selectedGrid={state.selectedGrid}
          onSelectGrid={(grid) => dispatch({ type: 'SET_SELECTED_GRID', payload: grid })}
          selectedTrack={state.selectedTrack}
        />
        <div className="flex-1 flex flex-col gap-2">
          <MapView
            tracks={state.tracks}
            onSelectTrack={(track: Track) => dispatch({ type: 'SET_SELECTED_TRACK', payload: track })}
          />
        </div>
        <InfoPanel
          tracks={state.tracks}
          onSelectTrack={(track: Track) => dispatch({ type: 'SET_SELECTED_TRACK', payload: track })}
        />
      </div>
    </div>
  );
};

const ROKAFMCRCEastAsia = () => {
  return (
    <StateProvider>
      <ROKAFMCRCEastAsiaCore />
    </StateProvider>
  );
};

export default ROKAFMCRCEastAsia;