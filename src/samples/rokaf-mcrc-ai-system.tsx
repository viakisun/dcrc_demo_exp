import React, { useEffect } from 'react';
import { StateProvider, useStateContext } from '../components/rokaf-mcrc-ai-system/StateProvider';
import Header from '../components/rokaf-mcrc-ai-system/Header';
import ControlPanel from '../components/rokaf-mcrc-ai-system/ControlPanel';
import AnalysisPanel from '../components/rokaf-mcrc-ai-system/AnalysisPanel';
import MapView from '../components/rokaf-mcrc-ai-system/MapView';
import { Track } from '../components/rokaf-mcrc-ai-system/types';

const ROKAFMCRCAISystemCore = () => {
  const { state, dispatch } = useStateContext();

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: 'SET_CURRENT_TIME', payload: new Date() });
      
      if (state.aiMode === 'ACTIVE') {
        dispatch({
          type: 'SET_AI_CONFIDENCE',
          payload: Math.min(Math.max(state.aiConfidence + (Math.random() - 0.5) * 2, 85), 99)
        });
        
        if (Math.random() < 0.1) {
          dispatch({ type: 'SET_AI_ANALYZING', payload: true });
          setTimeout(() => dispatch({ type: 'SET_AI_ANALYZING', payload: false }), 2000);
        }
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [state.aiMode, state.aiConfidence, dispatch]);

  const handleSelectTrack = (track: Track) => {
    dispatch({ type: 'SET_SELECTED_TRACK', payload: track });
  };

  const setAiMode = (mode: string) => {
    dispatch({ type: 'SET_AI_MODE', payload: mode });
  }

  const setShowPredictions = (show: boolean) => {
    dispatch({ type: 'SET_SHOW_PREDICTIONS', payload: show });
  }

  const setAutoResponse = (auto: boolean) => {
    dispatch({ type: 'SET_AUTO_RESPONSE', payload: auto });
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 font-mono">
      <div className="bg-red-900 text-white text-center py-1 font-bold text-xs">
        ★★ TOP SECRET // AI CLASSIFIED // REL TO ROK ★★
      </div>
      <Header
        currentTime={state.currentTime}
        aiMode={state.aiMode}
        aiConfidence={state.aiConfidence}
        threatLevel={state.threatLevel}
        activeTracks={state.activeTracks.length}
        isAiAnalyzing={state.aiAnalyzing}
      />
      <div className="flex h-[calc(100vh-100px)]">
        <ControlPanel
          aiMode={state.aiMode}
          setAiMode={setAiMode}
          showPredictions={state.showPredictions}
          setShowPredictions={setShowPredictions}
          autoResponse={state.autoResponse}
          setAutoResponse={setAutoResponse}
          aiSystems={state.aiSystems}
          aiAlerts={state.aiAlerts}
          gridSectors={state.gridSectors}
        />
        <MapView
          activeTracks={state.activeTracks}
          gridSectors={state.gridSectors}
          showPredictions={state.showPredictions}
          onSelectTrack={handleSelectTrack}
          aiConfidence={state.aiConfidence}
        />
        <AnalysisPanel
          selectedTrack={state.selectedTrack}
          aiConfidence={state.aiConfidence}
        />
      </div>
      <div className="bg-red-900 text-white text-center py-1 font-bold text-xs">
        ★★ TOP SECRET // AI CLASSIFIED // REL TO ROK ★★
      </div>
    </div>
  );
};

const ROKAFMCRCAISystem = () => {
  return (
    <StateProvider>
      <ROKAFMCRCAISystemCore />
    </StateProvider>
  );
};

export default ROKAFMCRCAISystem;