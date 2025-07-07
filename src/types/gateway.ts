
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
  targetAmount?: number;
  currentAmount?: number;
  deadline?: string;
  requirements?: string[];
  benefits?: string[];
  riskLevel?: 'low' | 'medium' | 'high';
  complianceLevel?: number;
  documents?: DocumentRef[];
}

export interface DocumentRef {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface GroupMembership {
  id: string;
  userId: string;
  groupId: string;
  role: 'member' | 'admin' | 'creator';
  joinedAt: string;
  status: 'active' | 'pending' | 'suspended';
  contributedAmount?: number;
  votingWeight?: number;
}

export interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  assignedTo?: string;
  dueDate?: string;
  completedAt?: string;
  requirements?: string[];
  outputs?: string[];
}

export interface ContractTemplate {
  id: string;
  name: string;
  type: string;
  template: string;
  version: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NegotiationSession {
  id: string;
  groupId: string;
  title: string;
  description: string;
  status: 'active' | 'paused' | 'completed' | 'cancelled';
  participants: string[];
  currentOffer?: any;
  counterOffers?: any[];
  deadline?: string;
  createdAt: string;
  updatedAt: string;
}
