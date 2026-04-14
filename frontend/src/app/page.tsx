'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ForgeItem {
  id: string;
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  power: number;
  nftId?: string;
}

export default function HomePage() {
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [forgeItems, setForgeItems] = useState<ForgeItem[]>([]);
  const [forging, setForging] = useState(false);

  const rarityColors = {
    common: 'text-gray-400 border-gray-400',
    rare: 'text-blue-400 border-blue-400',
    epic: 'text-purple-400 border-purple-400',
    legendary: 'text-yellow-400 border-yellow-400',
  };

  const mockItems: ForgeItem[] = [
    { id: '1', name: 'Nebula Sword', rarity: 'legendary', power: 9500 },
    { id: '2', name: 'Star Shield', rarity: 'epic', power: 7200 },
    { id: '3', name: 'Cosmic Orb', rarity: 'rare', power: 4500 },
    { id: '4', name: 'Iron Meteor', rarity: 'common', power: 1200 },
  ];

  useEffect(() => {
    setForgeItems(mockItems);
  }, []);

  const handleConnect = () => {
    setConnected(true);
    setWalletAddress('erd1qqqqqqqqqqqqqpgqtest000000000000000000000000000000000');
  };

  const handleForge = async (itemId: string) => {
    setForging(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setForging(false);
    alert('Item forged successfully on MultiversX!');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-blue-950 text-white">
      {/* Header */}
      <header className="border-b border-purple-800/50 px-6 py-4 flex items-center justify-between backdrop-blur-sm bg-black/20">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🌌</span>
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            CelestialForge
          </h1>
        </div>
        <button
          onClick={handleConnect}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            connected
              ? 'bg-green-800/50 text-green-300 border border-green-600'
              : 'bg-purple-600 hover:bg-purple-500 text-white'
          }`}
        >
          {connected ? `${walletAddress.slice(0, 8)}...${walletAddress.slice(-4)}` : 'Connect xPortal'}
        </button>
      </header>

      {/* Hero */}
      <section className="px-6 py-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-extrabold mb-4"
        >
          Forge Your <span className="text-yellow-400">Destiny</span>
        </motion.h2>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Mint, upgrade and trade cosmic NFT items on MultiversX blockchain with real on-chain forging mechanics.
        </p>
      </section>

      {/* Items Grid */}
      <section className="px-6 pb-16">
        <h3 className="text-xl font-bold mb-6 text-purple-300">Available Items to Forge</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {forgeItems.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.03 }}
              className={`bg-gray-900/60 border rounded-xl p-4 backdrop-blur-sm ${rarityColors[item.rarity]}`}
            >
              <div className="text-3xl mb-2">⚔️</div>
              <h4 className="font-bold text-lg">{item.name}</h4>
              <p className="text-sm capitalize opacity-70 mb-1">{item.rarity}</p>
              <p className="text-sm mb-4">Power: <span className="font-bold">{item.power.toLocaleString()}</span></p>
              <button
                onClick={() => handleForge(item.id)}
                disabled={!connected || forging}
                className="w-full py-2 rounded-lg bg-purple-700 hover:bg-purple-600 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-semibold transition-all"
              >
                {forging ? 'Forging...' : 'Forge on MultiversX'}
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-t border-purple-900/50 px-6 py-6 grid grid-cols-3 gap-4 text-center bg-black/20">
        <div>
          <p className="text-2xl font-bold text-purple-400">1,247</p>
          <p className="text-sm text-gray-500">Items Forged</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-blue-400">843</p>
          <p className="text-sm text-gray-500">Active Crafters</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-yellow-400">12.4K EGLD</p>
          <p className="text-sm text-gray-500">Total Volume</p>
        </div>
      </section>
    </main>
  );
}
