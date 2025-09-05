import React, { useEffect } from 'react';
import { StateProvider, useStateContext } from '../components/rokaf-sector-ke14-operations/StateProvider';
import Header from '../components/rokaf-sector-ke14-operations/Header';
import OperatorStations from '../components/rokaf-sector-ke14-operations/OperatorStations';
import SectorMap from '../components/rokaf-sector-ke14-operations/SectorMap';
import CommLog from '../components/rokaf-sector-ke14-operations/CommLog';
import { SectorTrack } from '../components/rokaf-sector-ke14-operations/types';

const ROKAFSectorKE14DetailCore = () => {
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
        ★★ TOP SECRET // REL TO ROK // SECTOR KE-14 OPERATIONS ★★
      </div>
      <Header
        currentTime={state.currentTime}
        alertStatus={state.alertStatus}
      />
      <div className="flex h-[calc(100vh-100px)] p-2 gap-2">
        <div className="w-1/2 flex flex-col gap-2">
          <OperatorStations
            operators={state.operators}
            selectedOperator={state.selectedOperator}
            onSelectOperator={(id) => dispatch({ type: 'SET_SELECTED_OPERATOR', payload: id })}
          />
          <CommLog commLog={state.commLog} />
        </div>
        <div className="w-1/2">
          <SectorMap
            tracks={state.tracks}
            onSelectTrack={(track: SectorTrack) => dispatch({ type: 'SET_SELECTED_TRACK', payload: track })}
          />
        </div>
      </div>
    </div>
  );
};

const ROKAFSectorKE14Detail = () => {
  return (
    <StateProvider>
      <ROKAFSectorKE14DetailCore />
    </StateProvider>
  );
};

export default ROKAFSectorKE14Detail;