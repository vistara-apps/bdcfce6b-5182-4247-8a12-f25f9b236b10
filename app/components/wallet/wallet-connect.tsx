import React from 'react';
import { Wallet } from 'lucide-react';
import { cn, designSystem } from '../../lib/design-system';
import { Button } from '../ui/button';

interface WalletConnectProps {
  isConnected?: boolean;
  address?: string;
  onConnect?: () => void;
  onDisconnect?: () => void;
  className?: string;
}

export const WalletConnect: React.FC<WalletConnectProps> = ({
  isConnected = false,
  address,
  onConnect,
  onDisconnect,
  className,
}) => {
  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (isConnected && address) {
    return (
      <div className={cn('flex items-center space-x-2', className)}>
        <div className={`flex items-center space-x-2 px-3 py-2 bg-[${designSystem.colors.surface}] border rounded-lg`}>
          <Wallet className={`w-4 h-4 text-[${designSystem.colors.primary}]`} />
          <span className="text-sm font-medium">{formatAddress(address)}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={onDisconnect}
            className="text-xs"
          >
            Disconnect
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Button
      onClick={onConnect}
      className={cn('flex items-center space-x-2', className)}
    >
      <Wallet className="w-4 h-4" />
      <span>Connect Wallet</span>
    </Button>
  );
};

