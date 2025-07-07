
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { DashboardService } from '@/services/DashboardService';
import SuperAdminDashboard from '@/components/dashboard/SuperAdminDashboard';
import ModuleDashboard from '@/components/dashboard/ModuleDashboard';
import GroupManagerDashboard from '@/components/dashboard/GroupManagerDashboard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Home } from 'lucide-react';
import { 
  SuperAdminDashboard as SuperAdminDashboardType,
  ModuleDashboard as ModuleDashboardType,
  GroupManagerDashboard as GroupManagerDashboardType
} from '@/types/dashboard';

const MultiLevelDashboard = () => {
  const { dashboardType, id } = useParams<{ dashboardType: string; id?: string }>();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const [userRole, setUserRole] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboard();
  }, [dashboardType, id]);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError(null);

      // Determine user role and load appropriate dashboard
      switch (dashboardType) {
        case 'super-admin':
          const superAdminData = await DashboardService.getSuperAdminDashboard('current-user-id');
          if (superAdminData) {
            setUserRole('super_admin');
            setDashboardData(superAdminData);
          } else {
            setError('Access denied: Super Admin privileges required');
          }
          break;

        case 'module':
          if (!id) {
            setError('Module ID is required');
            break;
          }
          const moduleData = await DashboardService.getModuleDashboard(id, 'current-user-id');
          if (moduleData) {
            setUserRole('module_admin');
            setDashboardData(moduleData);
          } else {
            setError('Access denied: Module access required');
          }
          break;

        case 'group-manager':
          if (!id) {
            setError('Group ID is required');
            break;
          }
          const groupManagerData = await DashboardService.getGroupManagerDashboard('current-user-id', id);
          if (groupManagerData) {
            setUserRole('group_manager');
            setDashboardData(groupManagerData);
          } else {
            setError('Access denied: Group Manager privileges required');
          }
          break;

        default:
          setError('Invalid dashboard type');
      }
    } catch (error) {
      console.error('Error loading dashboard:', error);
      setError('Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  // Super Admin Dashboard Handlers
  const handleCreateModule = async (moduleData: any) => {
    const newModule = await DashboardService.createModule(moduleData);
    if (newModule) {
      // Refresh dashboard
      loadDashboard();
    }
  };

  const handleEditModule = async (moduleId: string, moduleData: any) => {
    // Implementation for editing module
    console.log('Editing module:', moduleId, moduleData);
  };

  const handleDeleteModule = async (moduleId: string) => {
    // Implementation for deleting module
    console.log('Deleting module:', moduleId);
  };

  const handleToggleModule = async (moduleId: string) => {
    // Implementation for toggling module
    console.log('Toggling module:', moduleId);
  };

  const handleAssignRole = async (userId: string, role: string) => {
    const success = await DashboardService.assignRole(userId, role, 'current-admin-id');
    if (success) {
      loadDashboard();
    }
  };

  const handleRevokeRole = async (userId: string, role: string) => {
    const success = await DashboardService.revokeRole(userId, role, 'current-admin-id');
    if (success) {
      loadDashboard();
    }
  };

  // Module Dashboard Handlers
  const handleUpdateSettings = async (settings: any) => {
    // Implementation for updating module settings
    console.log('Updating settings:', settings);
  };

  const handleCrossModuleConnect = async (targetModule: string) => {
    // Implementation for cross-module connection
    console.log('Connecting to module:', targetModule);
  };

  // Group Manager Dashboard Handlers
  const handleInviteMember = async (email: string) => {
    // Implementation for inviting member
    console.log('Inviting member:', email);
  };

  const handleRemoveMember = async (memberId: string) => {
    // Implementation for removing member
    console.log('Removing member:', memberId);
  };

  const handleUpdateGroup = async (groupData: any) => {
    // Implementation for updating group
    console.log('Updating group:', groupData);
  };

  const handleGenerateReport = async () => {
    // Implementation for generating report
    console.log('Generating report');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">
              {language === 'ar' ? 'جاري التحميل...' : 'Loading dashboard...'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-8 text-center">
              <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-red-800">
                {language === 'ar' ? 'خطأ في الوصول' : 'Access Error'}
              </h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <div className="flex gap-4 justify-center">
                <Button onClick={() => navigate('/dashboard')}>
                  <Home className="h-4 w-4 mr-2" />
                  {language === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
                </Button>
                <Button variant="outline" onClick={loadDashboard}>
                  {language === 'ar' ? 'إعادة المحاولة' : 'Retry'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {userRole === 'super_admin' && dashboardData && (
        <SuperAdminDashboard
          dashboard={dashboardData as SuperAdminDashboardType}
          onCreateModule={handleCreateModule}
          onEditModule={handleEditModule}
          onDeleteModule={handleDeleteModule}
          onToggleModule={handleToggleModule}
          onAssignRole={handleAssignRole}
          onRevokeRole={handleRevokeRole}
        />
      )}

      {userRole === 'module_admin' && dashboardData && (
        <ModuleDashboard
          module={dashboardData as ModuleDashboardType}
          activities={[]} // Would be loaded from service
          notifications={[]} // Would be loaded from service
          onUpdateSettings={handleUpdateSettings}
          onCrossModuleConnect={handleCrossModuleConnect}
        />
      )}

      {userRole === 'group_manager' && dashboardData && (
        <GroupManagerDashboard
          dashboard={dashboardData as GroupManagerDashboardType}
          onInviteMember={handleInviteMember}
          onRemoveMember={handleRemoveMember}
          onUpdateGroup={handleUpdateGroup}
          onGenerateReport={handleGenerateReport}
        />
      )}
    </div>
  );
};

export default MultiLevelDashboard;
