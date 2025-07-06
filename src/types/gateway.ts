
import { LucideIcon } from 'lucide-react';

export interface GatewayConfig {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  href: string;
  requiresKyc?: boolean;
  requiresPoints?: boolean;
  requiresMcp?: boolean;
  tier: 'free' | 'basic' | 'premium' | 'enterprise';
}

export interface ActiveGroup {
  id: string;
  name: string;
  description: string;
  currentPhase: string;
  memberCount: number;
  status: string;
  gatewayType: string;
  maxMembers?: number;
  pointsRequired?: number;
  kycRequired?: boolean;
}
