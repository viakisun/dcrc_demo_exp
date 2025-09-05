export const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
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

  export const getTrafficColor = (traffic: string) => {
    const colors: Record<string, string> = {
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

  export const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
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
