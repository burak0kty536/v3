import React, { useState } from 'react';
import { ChainSelector } from './ChainSelector';
import { TokenScanner } from './TokenScanner';
import { TradingControls } from './TradingControls';
import { SecurityChecks } from './SecurityChecks';
import { PriceChart } from './PriceChart';
import { TradeHistory } from './TradeHistory';
import { MempoolMonitor } from './MempoolMonitor';
import { PortfolioManager } from './PortfolioManager';
import { AutoTrader } from './AutoTrader';
import { TokenAnalytics } from './TokenAnalytics';
import { Wallet, BarChart3, Shield, History, Activity, Briefcase, Settings2 } from 'lucide-react';

export const TradingInterface = () => {
  const [selectedChain, setSelectedChain] = useState('solana');
  const [selectedToken, setSelectedToken] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  
  return (
    <div className="space-y-6">
      {/* Top Row - Chain Selection & Portfolio */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chain & Token Selection */}
        <div className="lg:col-span-2 bg-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <Wallet className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-semibold">Chain & Token</h3>
          </div>
          <div className="space-y-4">
            <ChainSelector value={selectedChain} onChange={setSelectedChain} />
            <TokenScanner chain={selectedChain} onTokenSelect={setSelectedToken} />
          </div>
        </div>

        {/* Portfolio Summary */}
        <div>
          <PortfolioManager chain={selectedChain} walletAddress={walletAddress} />
        </div>
      </div>

      {/* Middle Row - Charts & Trading */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Price Chart & Analytics */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              <h3 className="text-lg font-semibold">Price Chart</h3>
            </div>
            <PriceChart chain={selectedChain} tokenAddress={selectedToken} />
          </div>
          
          <TokenAnalytics chain={selectedChain} tokenAddress={selectedToken} />
        </div>

        {/* Trading Controls & Security */}
        <div className="space-y-4">
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <Settings2 className="h-5 w-5 text-blue-500" />
              <h3 className="text-lg font-semibold">Trading Controls</h3>
            </div>
            <TradingControls chain={selectedChain} tokenAddress={selectedToken} />
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-blue-500" />
              <h3 className="text-lg font-semibold">Security</h3>
            </div>
            <SecurityChecks chain={selectedChain} tokenAddress={selectedToken} />
          </div>
        </div>
      </div>

      {/* Bottom Row - Auto Trading & Monitoring */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Auto Trading */}
        <AutoTrader chain={selectedChain} tokenAddress={selectedToken} />

        {/* Mempool Monitor */}
        <MempoolMonitor chain={selectedChain} />
      </div>

      {/* Trade History */}
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <History className="h-5 w-5 text-blue-500" />
          <h3 className="text-lg font-semibold">Trade History</h3>
        </div>
        <TradeHistory chain={selectedChain} />
      </div>
    </div>
  );
};