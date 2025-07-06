
import React from 'react';
import { usePremium } from '@/hooks/usePremium';
import PremiumUpgrade from './PremiumUpgrade';

interface PremiumGateProps {
  children: React.ReactNode;
  feature?: string;
  requiredTier?: string;
}

const PremiumGate: React.FC<PremiumGateProps> = ({ 
  children, 
  feature = 'this feature',
  requiredTier = 'premium'
}) => {
  const { checkAccess } = usePremium();

  if (!checkAccess(requiredTier)) {
    return <PremiumUpgrade feature={feature} />;
  }

  return <>{children}</>;
};

export default PremiumGate;
