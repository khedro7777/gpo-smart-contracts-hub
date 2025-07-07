
export interface DashboardStats {
  totalUsers: number;
  activeGroups: number;
  completedProjects: number;
  revenue: number;
  growth: number;
}

export interface ModuleStats {
  activeUsers: number;
  totalTransactions: number;
  completionRate: number;
  averageRating: number;
  revenue: number;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  module: string;
  timestamp: string;
  details?: any;
}

export interface ModuleDashboard {
  id: string;
  name: string;
  type: 'procurement' | 'marketing' | 'company_formation' | 'freelancer' | 'investment';
  stats: ModuleStats;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  settings: ModuleSettings;
  permissions: ModulePermissions;
}

export interface ModuleSettings {
  autoApproval: boolean;
  maxMembers: number;
  minPointsRequired: number;
  notificationsEnabled: boolean;
  crossModuleAccess: string[];
}

export interface ModulePermissions {
  canCreateGroups: boolean;
  canManageMembers: boolean;
  canViewAnalytics: boolean;
  canModifySettings: boolean;
}

export interface SuperAdminDashboard {
  modules: ModuleDashboard[];
  totalStats: DashboardStats;
  recentActivity: ActivityLog[];
  userRoles: UserRole[];
  systemHealth: SystemHealth;
}

export interface SystemHealth {
  uptime: number;
  responseTime: number;
  activeConnections: number;
  errorRate: number;
}

export interface UserRole {
  id: string;
  userId: string;
  userName: string;
  role: 'super_admin' | 'group_manager' | 'user';
  permissions: string[];
  assignedAt: string;
  assignedBy: string;
}

export interface GroupManagerDashboard {
  groupId: string;
  groupName: string;
  memberCount: number;
  pendingInvitations: number;
  groupStats: GroupStats;
  permissions: GroupManagerPermissions;
  modules: string[];
}

export interface GroupStats {
  completedProjects: number;
  activeProjects: number;
  memberEngagement: number;
  averageRating: number;
}

export interface GroupManagerPermissions {
  canInviteMembers: boolean;
  canRemoveMembers: boolean;
  canModifyGroup: boolean;
  canAccessModules: string[];
  canViewReports: boolean;
}

export interface DashboardNotification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  module?: string;
  timestamp: string;
  isRead: boolean;
}
