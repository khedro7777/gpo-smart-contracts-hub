
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { portals } from '@/config/portals';
import { Portal, PortalDashboard as PortalDashboardType } from '@/types/portals';
import PortalDashboard from '@/components/portals/PortalDashboard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

const PortalDashboardPage = () => {
  const { portalId } = useParams<{ portalId: string }>();
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  const [portal, setPortal] = useState<Portal | null>(null);
  const [dashboardData, setDashboardData] = useState<PortalDashboardType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (portalId) {
      const foundPortal = portals.find(p => p.id === portalId);
      if (foundPortal) {
        setPortal(foundPortal);
        // Mock dashboard data
        setDashboardData({
          portalId: foundPortal.id,
          stats: {
            totalUsers: Math.floor(Math.random() * 5000) + 500,
            activeUsers: Math.floor(Math.random() * 2000) + 200,
            totalTransactions: Math.floor(Math.random() * 10000) + 1000,
            revenue: Math.floor(Math.random() * 100000) + 10000,
            growthRate: Math.floor(Math.random() * 50) + 10,
            averageRating: (Math.random() * 2 + 3).toFixed(1) as any
          },
          recentActivity: [
            {
              id: '1',
              userId: 'user-1',
              userName: 'أحمد محمد',
              action: 'انضم إلى مجموعة شراء جديدة',
              timestamp: new Date().toISOString(),
              details: {}
            },
            {
              id: '2',
              userId: 'user-2',
              userName: 'فاطمة أحمد',
              action: 'أكمل معاملة بقيمة 1500 ريال',
              timestamp: new Date(Date.now() - 3600000).toISOString(),
              details: {}
            }
          ],
          notifications: [
            {
              id: '1',
              type: 'info',
              title: 'إشعار جديد',
              message: 'يوجد طلبات جديدة تحتاج للمراجعة',
              timestamp: new Date().toISOString(),
              isRead: false
            }
          ],
          settings: {
            isPublic: true,
            autoApproval: false,
            requiresModeration: true,
            maxParticipants: 100,
            commissionRate: 5,
            allowCrossPortal: true
          }
        });
      }
      setLoading(false);
    }
  }, [portalId]);

  const handleUpdateSettings = (settings: any) => {
    console.log('Updating settings:', settings);
    // Implementation for updating settings
  };

  const handleToggleFeature = (featureId: string) => {
    console.log('Toggling feature:', featureId);
    // Implementation for toggling features
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">
              {language === 'ar' ? 'جاري التحميل...' : 'Loading...'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!portal || !dashboardData) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-8 text-center">
              <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-red-800">
                {language === 'ar' ? 'بوابة غير موجودة' : 'Portal Not Found'}
              </h3>
              <p className="text-gray-600 mb-4">
                {language === 'ar' 
                  ? 'البوابة المطلوبة غير موجودة أو غير متاحة حالياً'
                  : 'The requested portal does not exist or is not available'
                }
              </p>
              <Button onClick={() => navigate('/portals')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                {language === 'ar' ? 'العودة للبوابات' : 'Back to Portals'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PortalDashboard
        portal={portal}
        dashboard={dashboardData}
        onUpdateSettings={handleUpdateSettings}
        onToggleFeature={handleToggleFeature}
      />
    </div>
  );
};

export default PortalDashboardPage;
