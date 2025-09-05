import React, { useEffect } from 'react';
import { StateProvider, useStateContext } from '../components/rokaf-flight-controller-workstation/StateProvider';
import Header from '../components/rokaf-flight-controller-workstation/Header';
import ControlPanel from '../components/rokaf-flight-controller-workstation/ControlPanel';
import NavigationDisplay from '../components/rokaf-flight-controller-workstation/NavigationDisplay';
import AircraftDetails from '../components/rokaf-flight-controller-workstation/AircraftDetails';
import CommLog from '../components/rokaf-flight-controller-workstation/CommLog';
import { Aircraft } from '../components/rokaf-flight-controller-workstation/types';

const FlightControllerWorkstationCore = () => {
  const { state, dispatch } = useStateContext();

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: 'SET_CURRENT_TIME', payload: new Date() });
    }, 1000);
    return () => clearInterval(timer);
  }, [dispatch]);

  const handleVectorCommand = (aircraft: Aircraft, command: string) => {
    dispatch({
      type: 'ADD_COMM_LOG',
      payload: {
        time: new Date(),
        from: 'FC',
        message: `${aircraft.callsign}, ${command}`,
        frequency: aircraft.communications.frequency,
        response: 'STANDBY'
      }
    });
    dispatch({ type: 'SET_TRANSMITTING', payload: true });
    setTimeout(() => dispatch({ type: 'SET_TRANSMITTING', payload: false }), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 font-mono">
      <div className="bg-red-900 text-white text-center py-1 font-bold text-xs">
        ★★ TOP SECRET // REL TO ROK // FLIGHT CONTROLLER WORKSTATION ★★
      </div>
      <Header
        currentTime={state.currentTime}
        transmitting={state.transmitting}
        aircraftCount={state.controlledAircraft.length}
        activeFreq={state.selectedFreq}
      />
      <div className="flex h-[calc(100vh-100px)] p-2 gap-2">
        <ControlPanel
          selectedFreq={state.selectedFreq}
          onFreqChange={(freq) => dispatch({ type: 'SET_SELECTED_FREQ', payload: freq })}
          transmitting={state.transmitting}
          onTransmit={() => {
            dispatch({ type: 'SET_TRANSMITTING', payload: true });
            setTimeout(() => dispatch({ type: 'SET_TRANSMITTING', payload: false }), 2000);
          }}
          vectorMode={state.vectorMode}
          onVectorModeChange={(mode) => dispatch({ type: 'SET_VECTOR_MODE', payload: mode })}
          controlledAircraft={state.controlledAircraft}
          selectedAircraft={state.selectedAircraft}
          onSelectAircraft={(aircraft) => dispatch({ type: 'SET_SELECTED_AIRCRAFT', payload: aircraft })}
          onVectorCommand={handleVectorCommand}
          weatherLayer={state.weatherLayer}
          onToggleWeatherLayer={() => dispatch({ type: 'TOGGLE_WEATHER_LAYER' })}
          routeDisplay={state.routeDisplay}
          onRouteDisplayChange={(display) => dispatch({ type: 'SET_ROUTE_DISPLAY', payload: display })}
        />
        <div className="flex-1 bg-gray-900/50 backdrop-blur-sm p-2 rounded-lg border border-gray-700">
          <NavigationDisplay
            controlledAircraft={state.controlledAircraft}
            selectedAircraft={state.selectedAircraft}
            onSelectAircraft={(aircraft) => dispatch({ type: 'SET_SELECTED_AIRCRAFT', payload: aircraft })}
            airwaysAndWaypoints={state.airwaysAndWaypoints}
            weatherLayer={state.weatherLayer}
            weatherData={state.weatherData}
            vectorMode={state.vectorMode}
          />
        </div>
        <div className="w-96 flex flex-col gap-2">
          <AircraftDetails selectedAircraft={state.selectedAircraft} />
          <CommLog commLog={state.commLog} />
        </div>
      </div>
    </div>
  );
};

const FlightControllerWorkstation = () => {
  return (
    <StateProvider>
      <FlightControllerWorkstationCore />
    </StateProvider>
  );
};

export default FlightControllerWorkstation;