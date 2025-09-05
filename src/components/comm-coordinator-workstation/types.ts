export interface CommChannel {
  id: string;
  frequency: string;
  name: string;
  type: string;
  status: string;
  encryption: string;
  users: string[];
  traffic: string;
  quality: number;
  power: number;
  range: number;
  jamming: boolean;
  priority: string;
}

export interface SystemStatus {
  name: string;
  status: string;
  power: number;
  temp: number;
  load: string | number;
}

export interface CommActivity {
  time: string;
  channel: string;
  type: string;
  from: string;
  to: string;
  priority: string;
  duration: string;
  content: string;
}

export interface CommStats {
  totalMessages: number;
  voiceMessages: number;
  dataMessages: number;
  emergencyMessages: number;
  encryptionRate: number;
  averageQuality: number;
  channelsActive: number;
  channelsStandby: number;
}
