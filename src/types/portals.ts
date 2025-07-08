
export interface Portal {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  icon: string;
  color: string;
  route: string;
  isActive: boolean;
  requiresKyc?: boolean;
  requiresPoints?: boolean;
  minimumPoints?: number;
  features: PortalFeature[];
}

export interface PortalFeature {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  isEnabled: boolean;
}

export interface PortalStats {
  totalUsers: number;
  activeUsers: number;
  totalTransactions: number;
  revenue: number;
  growthRate: number;
  averageRating: number;
}

export interface PortalDashboard {
  portalId: string;
  stats: PortalStats;
  recentActivity: PortalActivity[];
  notifications: PortalNotification[];
  settings: PortalSettings;
}

export interface PortalActivity {
  id: string;
  userId: string;
  userName: string;
  action: string;
  timestamp: string;
  details: any;
}

export interface PortalNotification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

export interface PortalSettings {
  isPublic: boolean;
  autoApproval: boolean;
  requiresModeration: boolean;
  maxParticipants: number;
  commissionRate: number;
  allowCrossPortal: boolean;
}
