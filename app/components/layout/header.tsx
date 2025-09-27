'use client';

import React from 'react';
import Link from 'next/link';
import { Home, BarChart3 } from 'lucide-react';
import { designSystem } from '../../lib/design-system';
import { WalletConnect } from '../wallet/wallet-connect';
import { useWallet } from '../../hooks/useWallet';

export const Header: React.FC = () => {
  const { isConnected, address, connect, disconnect } = useWallet();

  return (
    <header className={`bg-[${designSystem.colors.surface}] border-b border-gray-200 px-6 py-4`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-2">
            <div className={`w-8 h-8 bg-[${designSystem.colors.primary}] rounded-lg flex items-center justify-center`}>
              <span className="text-white font-bold text-sm">TP</span>
            </div>
            <span className={`text-xl font-bold text-[${designSystem.colors.text}]`}>
              TokenProp Tours
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className={`flex items-center space-x-1 text-[${designSystem.colors.muted}] hover:text-[${designSystem.colors.text}] transition-colors`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            {isConnected && (
              <Link
                href="/dashboard"
                className={`flex items-center space-x-1 text-[${designSystem.colors.muted}] hover:text-[${designSystem.colors.text}] transition-colors`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
            )}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <WalletConnect
            isConnected={isConnected}
            address={address || undefined}
            onConnect={connect}
            onDisconnect={disconnect}
          />
        </div>
      </div>
    </header>
  );
};

