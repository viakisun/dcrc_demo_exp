import React, { useState, useEffect } from 'react';
import { 
  Radio
} from 'lucide-react';

const CommCoordinatorWorkstation = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedChannel, setSelectedChannel] = useState('251.75');
  const [monitorMode, setMonitorMode] = useState('ALL');
  const [encryptionLevel] = useState(95.7);
  const [jamDetection, setJamDetection] = useState(false);
  const [relayMode, setRelayMode] = useState('AUTO');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 통신 채널 데이터 (15개 주요 채널)
  const commChannels = [
    {
      id: 'CH-01', frequency: '251.75', name: 'PRIMARY AIR-GROUND', type: 'UHF',
      status: 'ACTIVE', encryption: 'AES-256', users: ['VIPER-03', 'CARGO-12', 'FC'],
      traffic: 'HIGH', quality: 98, power: 85, range: 150, jamming: false, priority: 'CRITICAL'
    },
    {
      id: 'CH-02', frequency: '243.00', name: 'SECONDARY AIR-GROUND', type: 'UHF', 
      status: 'ACTIVE', encryption: 'AES-256', users: ['CARGO-12', 'FC'],
      traffic: 'MEDIUM', quality: 95, power: 78, range: 120, jamming: false, priority: 'HIGH'
    },
    {
      id: 'CH-03', frequency: '255.40', name: 'SAR COORDINATION', type: 'UHF',
      status: 'EMERGENCY', encryption: 'CLEAR', users: ['RESCUE-07', 'HOSPITAL'],
      traffic: 'URGENT', quality: 92, power: 90, range: 180, jamming: false, priority: 'EMERGENCY'
    },
    {
      id: 'CH-04', frequency: '311.00', name: 'COMMAND NET', type: 'VHF',
      status: 'SECURE', encryption: 'AES-256', users: ['SECTOR CMD', 'MCRC'],
      traffic: 'LOW', quality: 99, power: 95, range: 200, jamming: false, priority: 'CRITICAL'
    },
    {
      id: 'CH-05', frequency: '387.90', name: 'SATCOM-1', type: 'SATCOM',
      status: 'ONLINE', encryption: 'TRANSEC', users: ['GLOBAL NET'],
      traffic: 'MEDIUM', quality: 89, power: 82, range: 999, jamming: false, priority: 'HIGH'
    },
    {
      id: 'CH-06', frequency: '121.50', name: 'EMERGENCY', type: 'VHF',
      status: 'MONITOR', encryption: 'NONE', users: ['ALL CIVIL'],
      traffic: 'LOW', quality: 85, power: 75, range: 100, jamming: false, priority: 'EMERGENCY'
    },
    {
      id: 'CH-07', frequency: '279.15', name: 'MEDEVAC', type: 'UHF',
      status: 'ACTIVE', encryption: 'BASIC', users: ['HAWK-15', 'MEDICAL'],
      traffic: 'URGENT', quality: 94, power: 88, range: 160, jamming: false, priority: 'EMERGENCY'
    },
    {
      id: 'CH-08', frequency: '142.37', name: 'APPROACH CONTROL', type: 'VHF',
      status: 'BUSY', encryption: 'NONE', users: ['RKJK TWR', 'CIVIL AC'],
      traffic: 'HIGH', quality: 91, power: 77, range: 80, jamming: false, priority: 'ROUTINE'
    },
    {
      id: 'CH-09', frequency: '357.80', name: 'INTEL-NET', type: 'UHF',
      status: 'CLASSIFIED', encryption: 'TOP SECRET', users: ['ANALYST'],
      traffic: 'LOW', quality: 97, power: 93, range: 120, jamming: false, priority: 'CLASSIFIED'
    },
    {
      id: 'CH-10', frequency: '415.25', name: 'LINK-16', type: 'DATALINK',
      status: 'DATA-ONLY', encryption: 'LINK-16', users: ['NATO UNITS'],
      traffic: 'DATA', quality: 96, power: 91, range: 300, jamming: false, priority: 'HIGH'
    },
    {
      id: 'CH-11', frequency: '225.10', name: 'BACKUP PRIMARY', type: 'UHF',
      status: 'STANDBY', encryption: 'AES-256', users: ['STANDBY'],
      traffic: 'NONE', quality: 100, power: 85, range: 150, jamming: false, priority: 'BACKUP'
    },
    {
      id: 'CH-12', frequency: '338.15', name: 'HAVEQUICK', type: 'ANTI-JAM',
      status: 'HOP-MODE', encryption: 'HAVEQUICK', users: ['VIPER-03'],
      traffic: 'SECURE', quality: 93, power: 87, range: 120, jamming: true, priority: 'CRITICAL'
    },
    {
      id: 'CH-13', frequency: '290.60', name: 'GROUND OPS', type: 'UHF',
      status: 'LOCAL', encryption: 'BASIC', users: ['GROUND CREW'],
      traffic: 'ROUTINE', quality: 88, power: 65, range: 25, jamming: false, priority: 'ROUTINE'
    },
    {
      id: 'CH-14', frequency: '395.55', name: 'WEATHER NET', type: 'UHF',
      status: 'AUTO', encryption: 'NONE', users: ['WEATHER STN'],
      traffic: 'DATA', quality: 90, power: 70, range: 200, jamming: false, priority: 'ROUTINE'
    },
    {
      id: 'CH-15', frequency: '444.20', name: 'RELAY-1', type: 'REPEATER',
      status: 'RELAY', encryption: 'VARIABLE', users: ['REMOTE UNITS'],
      traffic: 'MEDIUM', quality: 92, power: 95, range: 400, jamming: false, priority: 'HIGH'
    }
  ];

  // 시스템 상태 모니터링
  const systemStatus = [
    { name: 'Main Transmitter', status: 'ONLINE', power: 92, temp: 68, load: 'NORMAL' },
    { name: 'Backup Transmitter', status: 'STANDBY', power: 85, temp: 45, load: 'STANDBY' },
    { name: 'Encryption Module', status: 'SECURE', power: 0, temp: 0, load: 67 },
    { name: 'Antenna System', status: 'OPTIMAL', power: 0, temp: 0, load: 'VSWR 1.2:1' },
    { name: 'Power Supply', status: 'STABLE', power: 0, temp: 0, load: '28.4V 15.8A' },
    { name: 'Cooling System', status: 'NORMAL', power: 0, temp: 22, load: '45% RH' }
  ];

  // 실시간 통신 활동
  const [commActivity] = useState([
    { time: '14:25:43', channel: '251.75', type: 'VOICE', from: 'VIPER-03', to: 'FC', priority: 'ROUTINE', duration: '0:12', content: 'Request vector to waypoint ALPHA' },
    { time: '14:25:31', channel: '255.40', type: 'VOICE', from: 'RESCUE-07', to: 'HOSPITAL', priority: 'URGENT', duration: '0:28', content: 'MEDEVAC inbound ETA 8 minutes' },
    { time: '14:25:18', channel: '311.00', type: 'DATA', from: 'MCRC', to: 'SECTOR CMD', priority: 'HIGH', duration: '0:03', content: 'Threat level update GREEN->YELLOW' },
    { time: '14:25:05', channel: '279.15', type: 'VOICE', from: 'HAWK-15', to: 'MEDICAL', priority: 'EMERGENCY', duration: '0:15', content: 'Patient status critical - need priority' },
    { time: '14:24:52', channel: '243.00', type: 'VOICE', from: 'CARGO-12', to: 'FC', priority: 'ROUTINE', duration: '0:08', content: 'Requesting descent to FL180' },
    { time: '14:24:39', channel: '387.90', type: 'DATA', from: 'SATCOM', to: 'ALL', priority: 'HIGH', duration: '0:01', content: 'Weather update - storm system approaching' }
  ]);

  // 통신 통계
  const commStats = {
    totalMessages: 847,
    voiceMessages: 234,
    dataMessages: 613,
    emergencyMessages: 12,
    encryptionRate: 94.7,
    averageQuality: 92.3,
    channelsActive: 12,
    channelsStandby: 3
  };

  const getStatusColor = (status) => {
    const colors = {
      'ACTIVE': 'text-green-400',
      'ONLINE': 'text-green-400', 
      'SECURE': 'text-blue-400',
      'EMERGENCY': 'text-red-400',
      'URGENT': 'text-orange-400',
      'CLASSIFIED': 'text-purple-400',
      'STANDBY': 'text-yellow-400',
      'MONITOR': 'text-gray-400',
      'BUSY': 'text-orange-300',
      'DATA-ONLY': 'text-cyan-400',
      'HOP-MODE': 'text-pink-400',
      'LOCAL': 'text-gray-300',
      'AUTO': 'text-blue-300',
      'RELAY': 'text-indigo-400',
      'OPTIMAL': 'text-green-400',
      'STABLE': 'text-green-400',
      'NORMAL': 'text-green-400'
    };
    return colors[status] || 'text-gray-400';
  };

  const getTrafficColor = (traffic) => {
    const colors = {
      'HIGH': 'text-red-400',
      'URGENT': 'text-orange-400', 
      'MEDIUM': 'text-yellow-400',
      'LOW': 'text-green-400',
      'NONE': 'text-gray-400',
      'SECURE': 'text-blue-400',
      'DATA': 'text-cyan-400',
      'ROUTINE': 'text-gray-300'
    };
    return colors[traffic] || 'text-gray-400';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'EMERGENCY': 'text-red-500 font-bold',
      'CRITICAL': 'text-red-400 font-bold',
      'URGENT': 'text-orange-400',
      'HIGH': 'text-yellow-400',
      'CLASSIFIED': 'text-purple-400',
      'ROUTINE': 'text-gray-400',
      'BACKUP': 'text-gray-500'
    };
    return colors[priority] || 'text-gray-400';
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-1">
      {/* 상단 헤더 */}
      <div className="bg-gray-900 border border-green-600 mb-2 p-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Radio className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-bold">COMM COORDINATOR WORKSTATION</span>
            </div>
            <div className="text-yellow-400 font-bold">SrA Jung D.H.</div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-green-400">{currentTime.toLocaleTimeString()}</div>
            <div className={`px-2 py-1 rounded text-xs ${jamDetection ? 'bg-red-900 text-red-400' : 'bg-green-900 text-green-400'}`}>
              {jamDetection ? '⚠️ JAM DETECTED' : '✓ NO INTERFERENCE'}
            </div>
            <div className="text-cyan-400">ENCRYPTION: {encryptionLevel.toFixed(1)}%</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-2 h-[calc(100vh-100px)]">
        {/* 좌측: 통신 채널 매트릭스 */}
        <div className="col-span-8 bg-gray-900 border border-green-600 p-3">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-cyan-400 font-bold text-lg">📡 COMMUNICATION CHANNELS MATRIX</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setMonitorMode(monitorMode === 'ALL' ? 'SELECTED' : 'ALL')}
                className={`px-3 py-1 rounded text-xs ${monitorMode === 'ALL' ? 'bg-green-900 text-green-400' : 'bg-gray-800 text-gray-400'}`}
              >
                {monitorMode === 'ALL' ? '🎧 ALL CHANNELS' : '🎯 SELECTED ONLY'}
              </button>
            </div>
          </div>

          {/* 채널 매트릭스 테이블 */}
          <div className="grid gap-1 max-h-[70vh] overflow-y-auto">
            {commChannels.map((channel) => (
              <div
                key={channel.id}
                onClick={() => setSelectedChannel(channel.frequency)}
                className={`grid grid-cols-12 gap-2 p-2 rounded border cursor-pointer transition-all
                  ${selectedChannel === channel.frequency ? 'border-cyan-400 bg-cyan-900/20' : 'border-gray-700 hover:border-green-500'}
                  ${channel.jamming ? 'bg-red-900/20' : ''}
                `}
              >
                <div className="text-xs text-gray-400">{channel.id}</div>
                <div className="col-span-2 text-xs font-bold text-cyan-400">{channel.frequency}</div>
                <div className="col-span-2 text-xs text-gray-300">{channel.name}</div>
                <div className="text-xs text-purple-400">{channel.type}</div>
                <div className={`text-xs ${getStatusColor(channel.status)}`}>{channel.status}</div>
                <div className="text-xs text-blue-400">{channel.encryption}</div>
                <div className={`text-xs ${getTrafficColor(channel.traffic)}`}>{channel.traffic}</div>
                <div className="text-xs">{channel.quality}%</div>
                <div className={`text-xs ${getPriorityColor(channel.priority)}`}>
                  {channel.priority === 'EMERGENCY' && '🚨'}
                  {channel.priority === 'CRITICAL' && '⚠️'}
                  {channel.priority}
                </div>
                <div className="text-xs">
                  {channel.jamming && <span className="text-red-400 font-bold">⚡JAM</span>}
                  {channel.users.length > 0 && (
                    <span className="text-green-400">{channel.users.length} users</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 우측: 상세 정보 및 제어 */}
        <div className="col-span-4 space-y-2">
          {/* 선택된 채널 상세 정보 */}
          <div className="bg-gray-900 border border-green-600 p-3">
            <h4 className="text-cyan-400 font-bold mb-2">🎯 SELECTED CHANNEL DETAILS</h4>
            {(() => {
              const selected = commChannels.find(ch => ch.frequency === selectedChannel);
              return selected ? (
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Frequency:</span>
                    <span className="text-cyan-400 font-bold">{selected.frequency} MHz</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Name:</span>
                    <span className="text-green-400">{selected.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className={getStatusColor(selected.status)}>{selected.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Encryption:</span>
                    <span className="text-blue-400">{selected.encryption}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Quality:</span>
                    <span className="text-green-400">{selected.quality}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Power:</span>
                    <span className="text-yellow-400">{selected.power}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Range:</span>
                    <span className="text-purple-400">{selected.range} NM</span>
                  </div>
                  <div className="mt-2">
                    <span className="text-gray-400">Active Users:</span>
                    <div className="mt-1 space-y-1">
                      {selected.users.map((user, idx) => (
                        <div key={idx} className="text-green-400 text-xs">• {user}</div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-gray-400">No channel selected</div>
              );
            })()}
          </div>

          {/* 시스템 상태 모니터링 */}
          <div className="bg-gray-900 border border-green-600 p-3">
            <h4 className="text-cyan-400 font-bold mb-2">⚙️ SYSTEM STATUS</h4>
            <div className="space-y-1 text-xs">
              {systemStatus.map((system, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-gray-400">{system.name}:</span>
                  <span className={getStatusColor(system.status)}>
                    {system.status}
                    {system.power > 0 && ` ${system.power}%`}
                    {system.temp > 0 && ` ${system.temp}°C`}
                    {typeof system.load === 'string' && ` ${system.load}`}
                    {typeof system.load === 'number' && ` ${system.load}%`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 통신 통계 */}
          <div className="bg-gray-900 border border-green-600 p-3">
            <h4 className="text-cyan-400 font-bold mb-2">📊 COMMUNICATION STATISTICS</h4>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Messages:</span>
                <span className="text-green-400 font-bold">{commStats.totalMessages}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Voice Messages:</span>
                <span className="text-blue-400">{commStats.voiceMessages}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Data Messages:</span>
                <span className="text-cyan-400">{commStats.dataMessages}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Emergency Messages:</span>
                <span className="text-red-400 font-bold">{commStats.emergencyMessages}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Encryption Rate:</span>
                <span className="text-green-400">{commStats.encryptionRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Average Quality:</span>
                <span className="text-yellow-400">{commStats.averageQuality}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Active Channels:</span>
                <span className="text-green-400">{commStats.channelsActive}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Standby Channels:</span>
                <span className="text-yellow-400">{commStats.channelsStandby}</span>
              </div>
            </div>
          </div>

          {/* 제어 패널 */}
          <div className="bg-gray-900 border border-green-600 p-3">
            <h4 className="text-cyan-400 font-bold mb-2">🎛️ CONTROL PANEL</h4>
            <div className="space-y-2">
              <button 
                onClick={() => setJamDetection(!jamDetection)}
                className={`w-full py-2 px-3 rounded text-xs font-bold ${jamDetection ? 'bg-red-900 text-red-400' : 'bg-green-900 text-green-400'}`}
              >
                {jamDetection ? '⚡ JAM DETECTED - ACTIVATE ANTI-JAM' : '✓ NO JAMMING DETECTED'}
              </button>
              
              <button 
                onClick={() => setRelayMode(relayMode === 'AUTO' ? 'MANUAL' : 'AUTO')}
                className={`w-full py-2 px-3 rounded text-xs font-bold ${relayMode === 'AUTO' ? 'bg-blue-900 text-blue-400' : 'bg-purple-900 text-purple-400'}`}
              >
                RELAY MODE: {relayMode}
              </button>

              <button className="w-full py-2 px-3 rounded text-xs font-bold bg-orange-900 text-orange-400 hover:bg-orange-800">
                🔄 FREQUENCY HOP
              </button>

              <button className="w-full py-2 px-3 rounded text-xs font-bold bg-red-900 text-red-400 hover:bg-red-800">
                🚨 EMERGENCY BROADCAST
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 하단: 실시간 통신 로그 */}
      <div className="mt-2 bg-gray-900 border border-green-600 p-3">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-cyan-400 font-bold">📻 REAL-TIME COMMUNICATION LOG</h4>
          <div className="flex space-x-2 text-xs">
            <span className="text-red-400">⚠️ EMERGENCY</span>
            <span className="text-orange-400">🔸 URGENT</span>
            <span className="text-yellow-400">• HIGH</span>
            <span className="text-gray-400">• ROUTINE</span>
          </div>
        </div>
        <div className="grid gap-1 max-h-32 overflow-y-auto">
          {commActivity.map((activity, index) => (
            <div key={index} className={`grid grid-cols-12 gap-2 p-1 text-xs border-l-2 
              ${activity.priority === 'EMERGENCY' ? 'border-red-400 bg-red-900/10' : 
                activity.priority === 'URGENT' ? 'border-orange-400 bg-orange-900/10' : 
                activity.priority === 'HIGH' ? 'border-yellow-400 bg-yellow-900/10' : 
                'border-gray-600 bg-gray-800/10'}`}>
              <div className="text-gray-400">{activity.time}</div>
              <div className="text-cyan-400 font-bold">{activity.channel}</div>
              <div className="text-purple-400">{activity.type}</div>
              <div className="col-span-2 text-green-400">{activity.from} → {activity.to}</div>
              <div className={getPriorityColor(activity.priority)}>{activity.priority}</div>
              <div className="text-yellow-400">{activity.duration}</div>
              <div className="col-span-5 text-gray-300 truncate">{activity.content}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 하단 분류 표시 */}
      <div className="bg-red-900 text-white text-center py-1 font-bold text-xs">
        ★★ TOP SECRET // REL TO ROKAF // COMM COORDINATOR WORKSTATION ★★
      </div>
    </div>
  );
};

export default CommCoordinatorWorkstation;