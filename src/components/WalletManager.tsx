import React, { useState } from 'react';
import { Wallet, Plus, Trash2 } from 'lucide-react';
import { Input } from './ui/input';

export const WalletManager = () => {
  const [wallets, setWallets] = useState<WalletInfo[]>([]);
  const [newWallet, setNewWallet] = useState({
    name: '',
    address: '',
    privateKey: ''
  });

  const addWallet = () => {
    if (newWallet.address && newWallet.privateKey) {
      setWallets([...wallets, { ...newWallet, id: Date.now().toString() }]);
      setNewWallet({ name: '', address: '', privateKey: '' });
    }
  };

  const removeWallet = (id: string) => {
    setWallets(wallets.filter(wallet => wallet.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <Wallet className="h-5 w-5 text-blue-500" />
          <h3 className="text-lg font-semibold">Wallet Management</h3>
        </div>

        <div className="space-y-4">
          {/* Add New Wallet Form */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Wallet Name"
              value={newWallet.name}
              onChange={(e) => setNewWallet({ ...newWallet, name: e.target.value })}
            />
            <Input
              placeholder="Wallet Address"
              value={newWallet.address}
              onChange={(e) => setNewWallet({ ...newWallet, address: e.target.value })}
            />
            <Input
              type="password"
              placeholder="Private Key"
              value={newWallet.privateKey}
              onChange={(e) => setNewWallet({ ...newWallet, privateKey: e.target.value })}
            />
          </div>
          <button
            onClick={addWallet}
            className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Wallet
          </button>
        </div>
      </div>

      {/* Wallet List */}
      <div className="space-y-4">
        {wallets.map((wallet) => (
          <div
            key={wallet.id}
            className="bg-gray-800 rounded-lg p-4 flex items-center justify-between"
          >
            <div>
              <div className="font-medium">{wallet.name || 'Unnamed Wallet'}</div>
              <div className="text-sm text-gray-400">{wallet.address}</div>
            </div>
            <button
              onClick={() => removeWallet(wallet.id)}
              className="p-2 text-red-500 hover:text-red-400 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

interface WalletInfo {
  id: string;
  name: string;
  address: string;
  privateKey: string;
}