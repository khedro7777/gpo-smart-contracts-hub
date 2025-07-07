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

export interface FreelancerStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalEarnings: number;
  averageRating: number;
  completionRate: number;
  responseTime: string;
  clientSatisfaction: number;
}

export interface FreelancerProject {
  id: string;
  title: string;
  client: string;
  clientId: string;
  description: string;
  budget: number;
  deadline: string;
  status: 'active' | 'completed' | 'pending' | 'cancelled';
  progress: number;
  category: string;
  skills: string[];
  startDate: string;
  estimatedHours: number;
  hourlyRate?: number;
  milestones?: FreelancerMilestone[];
  attachments?: string[];
}

export interface FreelancerMilestone {
  id: string;
  title: string;
  description: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'completed' | 'approved' | 'revision_requested';
  completedAt?: string;
}

export interface FreelancerDashboard {
  freelancerId: string;
  profile: FreelancerProfile;
  stats: FreelancerStats;
  projects: FreelancerProject[];
  earnings: FreelancerEarnings;
  opportunities: ProjectOpportunity[];
  reviews: ClientReview[];
  notifications: FreelancerNotification[];
}

export interface FreelancerProfile {
  id: string;
  name: string;
  avatar: string;
  title: string;
  bio: string;
  skills: string[];
  category: string;
  rating: number;
  completedProjects: number;
  memberSince: string;
  hourlyRate: number;
  availability: 'available' | 'busy' | 'offline';
  languages: string[];
  certifications?: string[];
  portfolio?: PortfolioItem[];
}

export interface FreelancerEarnings {
  thisMonth: number;
  lastMonth: number;
  total: number;
  pending: number;
  withdrawn: number;
  available: number;
  monthlyHistory: MonthlyEarning[];
}

export interface MonthlyEarning {
  month: string;
  amount: number;
  projects: number;
}

export interface ProjectOpportunity {
  id: string;
  title: string;
  description: string;
  client: string;
  budget: number;
  deadline: string;
  skills: string[];
  category: string;
  postedAt: string;
  applicants: number;
  status: 'open' | 'closed' | 'in_progress';
  priority: 'low' | 'medium' | 'high';
}

export interface ClientReview {
  id: string;
  clientName: string;
  clientAvatar: string;
  projectTitle: string;
  rating: number;
  comment: string;
  reviewDate: string;
  projectId: string;
}

export interface FreelancerNotification {
  id: string;
  type: 'project_update' | 'new_opportunity' | 'payment' | 'message' | 'review';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
  metadata?: any;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  skills: string[];
  url?: string;
  completedAt: string;
}
