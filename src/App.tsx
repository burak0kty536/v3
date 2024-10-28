import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { WalletManager } from './components/WalletManager';
import { TradingInterface } from './components/TradingInterface';
import { Settings } from './components/Settings';
import { Activity } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="border-b border-gray-800 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-blue-500" />
            <h1 className="text-xl font-bold">Multi-Chain Trading Bot</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <Tabs defaultValue="trading" className="space-y-4">
          <TabsList>
            <TabsTrigger value="trading">Trading</TabsTrigger>
            <TabsTrigger value="wallets">Wallets</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="trading">
            <TradingInterface />
          </TabsContent>

          <TabsContent value="wallets">
            <WalletManager />
          </TabsContent>

          <TabsContent value="settings">
            <Settings />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default App;