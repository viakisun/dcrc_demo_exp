import React, { useEffect } from 'react';
import { StateProvider, useStateContext } from '../components/rokaf-data-analyst-workstation/StateProvider';
import Header from '../components/rokaf-data-analyst-workstation/Header';
import ControlPanel from '../components/rokaf-data-analyst-workstation/ControlPanel';
import ThreatMatrix from '../components/rokaf-data-analyst-workstation/ThreatMatrix';
import ThreatDetails from '../components/rokaf-data-analyst-workstation/ThreatDetails';
import AnalyticsDashboard from '../components/rokaf-data-analyst-workstation/AnalyticsDashboard';
import { Threat } from '../components/rokaf-data-analyst-workstation/types';

const DataAnalystWorkstationCore = () => {
  const { state, dispatch } = useStateContext();

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: 'SET_CURRENT_TIME', payload: new Date() });
      if (state.analysisMode === 'REALTIME') {
        dispatch({ type: 'UPDATE_METRICS' });
      }
    }, 1500);
    
    return () => clearInterval(timer);
  }, [state.analysisMode, dispatch]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 font-mono">
      <div className="bg-red-900 text-white text-center py-1 font-bold text-xs">
        ★★ TOP SECRET // REL TO ROK // DATA ANALYST WORKSTATION ★★
      </div>
      <Header
        currentTime={state.currentTime}
        aiProcessing={state.aiProcessing}
        threatCount={state.threats.length}
        confidenceLevel={state.confidenceLevel}
      />
      <div className="flex h-[calc(100vh-100px)] p-2 gap-2">
        <ControlPanel
          analysisMode={state.analysisMode}
          onAnalysisModeChange={(mode) => dispatch({ type: 'SET_ANALYSIS_MODE', payload: mode })}
          dataSource={state.dataSource}
          onDataSourceChange={(source) => dispatch({ type: 'SET_DATA_SOURCE', payload: source })}
          confidenceLevel={state.confidenceLevel}
          onConfidenceLevelChange={(level) => dispatch({ type: 'SET_CONFIDENCE_LEVEL', payload: level })}
          dataStreams={state.dataStreams}
          onRunAnalysis={() => dispatch({ type: 'SET_AI_PROCESSING', payload: true })}
        />
        <div className="flex-1 flex flex-col gap-2">
          <ThreatMatrix
            threats={state.threats}
            selectedThreat={state.selectedThreat}
            onSelectThreat={(threat: Threat) => dispatch({ type: 'SET_SELECTED_THREAT', payload: threat })}
          />
        </div>
        <div className="w-96 flex flex-col gap-2">
          <ThreatDetails selectedThreat={state.selectedThreat} />
          <AnalyticsDashboard
            metrics={state.analysisMetrics}
            dataStreams={state.dataStreams}
            aiSystems={state.aiSystems}
          />
        </div>
      </div>
    </div>
  );
};

const DataAnalystWorkstation = () => {
  return (
    <StateProvider>
      <DataAnalystWorkstationCore />
    </StateProvider>
  );
};

export default DataAnalystWorkstation;