import React, { useEffect, useState } from 'react';
import { Activity, AlertTriangle } from 'lucide-react';
import { MempoolMonitor as MempoolService } from '../services/mempool/MempoolMonitor';
import { formatAddress, formatTimestamp } from '../utils/format';

interface MempoolMonitorProps {
  chain: string;
  onSuspiciousActivity?: (tx: MempoolTransaction) => void;
}

export const MempoolMonitor: React.FC<MempoolMonitorProps> = ({ chain, onSuspiciousActivity }) => {
  const [transactions, setTransactions] = useState<MempoolTransaction[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);

  useEffect(() => {
    const mempoolService = new MempoolService();
    
    const handleTransaction = (tx: MempoolTransaction) => {
      setTransactions(prev => [tx, ...prev].slice(0, 10));
      if (tx.suspicious && onSuspiciousActivity) {
        onSuspiciousActivity(tx);
      }
    };

    const startMonitoring = () => {
      setIsMonitoring(true);
      mempoolService.startMonitoring(chain, 'wss://your-rpc-url', handleTransaction);
    };

    startMonitoring();

    return () => {
      mempoolService.stopMonitoring(chain);
      setIsMonitoring(false);
    };
  }, [chain, onSuspiciousActivity]);

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-blue-500" />
          <h3 className="text-lg font-semibold">Mempool Monitor</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${isMonitoring ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-sm text-gray-400">
            {isMonitoring ? 'Monitoring' : 'Stopped'}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        {transactions.map((tx) => (
          <div
            key={tx.hash}
            className={`flex items-center justify-between p-3 rounded-lg ${
              tx.suspicious ? 'bg-red-500/10' : 'bg-gray-700/50'
            }`}
          >
            <div className="flex items-center gap-3">
              {tx.suspicious && (
                <AlertTriangle className="h-4 w-4 text-red-500" />
              )}
              <div>
                <div className="font-medium">{formatAddress(tx.hash)}</div>
                <div className="text-sm text-gray-400">
                  {formatTimestamp(tx.timestamp)}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium">
                {tx.value} {chain.toUpperCase()}
              </div>
              <div className="text-sm text-gray-400">
                Gas: {tx.gasPrice} Gwei
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface MempoolTransaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  gasPrice: number;
  timestamp: number;
  suspicious: boolean;
}