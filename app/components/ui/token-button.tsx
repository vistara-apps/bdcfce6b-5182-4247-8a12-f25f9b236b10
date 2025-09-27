import React from 'react';
import { Coins } from 'lucide-react';
import { cn, designSystem } from '../../lib/design-system';
import { Button } from './button';

interface TokenButtonProps {
  tokenSymbol: string;
  pricePerToken: number;
  totalTokens: number;
  availableTokens: number;
  onClick: () => void;
  className?: string;
}

export const TokenButton: React.FC<TokenButtonProps> = ({
  tokenSymbol,
  pricePerToken,
  totalTokens,
  availableTokens,
  onClick,
  className,
}) => {
  const availabilityPercentage = (availableTokens / totalTokens) * 100;

  return (
    <div className={cn('p-4 border rounded-lg bg-white', className)}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Coins className={`w-5 h-5 text-[${designSystem.colors.primary}]`} />
          <span className="font-semibold">{tokenSymbol}</span>
        </div>
        <span className={`text-sm text-[${designSystem.colors.muted}]`}>
          {availableTokens}/{totalTokens} available
        </span>
      </div>

      <div className="mb-3">
        <div className="flex justify-between text-sm mb-1">
          <span className={`text-[${designSystem.colors.muted}]`}>Price per token</span>
          <span className="font-medium">${pricePerToken.toFixed(2)}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full bg-[${designSystem.colors.primary}]`}
            style={{ width: `${availabilityPercentage}%` }}
          ></div>
        </div>
      </div>

      <Button onClick={onClick} className="w-full">
        Invest Now
      </Button>
    </div>
  );
};

