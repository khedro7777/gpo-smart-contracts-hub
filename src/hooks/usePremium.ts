
import { useState, useEffect } from 'react';

interface PremiumStatus {
  isPremium: boolean;
  tier: 'free' | 'basic' | 'premium' | 'enterprise';
  expiresAt: string | null;
  features: string[];
}

export const usePremium = () => {
  const [premiumStatus, setPremiumStatus] = useState<PremiumStatus>({
    isPremium: false,
    tier: 'free',
    expiresAt: null,
    features: []
  });

  useEffect(() => {
    // Mock premium status - in real app, this would come from API
    const mockPremiumStatus: PremiumStatus = {
      isPremium: false, // Set to false to show upgrade prompts
      tier: 'free',
      expiresAt: null,
      features: []
    };
    setPremiumStatus(mockPremiumStatus);
  }, []);

  return {
    ...premiumStatus,
    checkAccess: (requiredTier: string = 'premium') => {
      if (requiredTier === 'free') return true;
      return premiumStatus.isPremium && 
             ['basic', 'premium', 'enterprise'].includes(premiumStatus.tier);
    }
  };
};
