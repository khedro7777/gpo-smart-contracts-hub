
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
    // Set to true for testing purposes, change to false to see upgrade prompts
    const mockPremiumStatus: PremiumStatus = {
      isPremium: true, // Set to true for testing, false to show upgrade prompts
      tier: 'premium',
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
      features: [
        'access_all_gateways',
        'unlimited_groups',
        'advanced_analytics',
        'priority_support',
        'api_integration'
      ]
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
