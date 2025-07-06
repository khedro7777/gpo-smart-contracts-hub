
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  Bell,
  Wallet,
  ArrowRight
} from 'lucide-react';

interface MCPBoxProps {
  verificationStatus: 'verified' | 'pending' | 'restricted';
  pointsBalance: number;
  pendingRequests: number;
  notifications: number;
  activeGroups: number;
}

const MCPBox: React.FC<MCPBoxProps> = ({
  verificationStatus,
  pointsBalance,
  pendingRequests,
  notifications,
  activeGroups
}) => {
  const { language } = useLanguage();

  const getStatusColor = () => {
    switch (verificationStatus) {
      case 'verified': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'restricted': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = () => {
    switch (verificationStatus) {
      case 'verified': return CheckCircle;
      case 'pending': return Clock;
      case 'restricted': return AlertTriangle;
      default: return Clock;
    }
  };

  const getStatusText = () => {
    switch (verificationStatus) {
      case 'verified': return language === 'ar' ? 'موثق' : 'Verified';
      case 'pending': return language === 'ar' ? 'قيد المراجعة' : 'Pending';
      case 'restricted': return language === 'ar' ? 'مقيد' : 'Restricted';
      default: return language === 'ar' ? 'غير معروف' : 'Unknown';
    }
  };

  const StatusIcon = getStatusIcon();

  return (
    <Card className="w-full max-w-md bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span className="text-lg">
            {language === 'ar' ? 'صندوق MCP' : 'MCP Box'}
          </span>
          <Badge className={getStatusColor()}>
            <StatusIcon className="h-3 w-3 mr-1" />
            {getStatusText()}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Points Balance */}
        <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-blue-600" />
            <span className="font-medium">
              {language === 'ar' ? 'رصيد النقاط' : 'Points Balance'}
            </span>
          </div>
          <span className="text-xl font-bold text-blue-600">{pointsBalance}</span>
        </div>

        {/* Active Groups */}
        <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-green-600" />
            <span className="font-medium">
              {language === 'ar' ? 'المجموعات النشطة' : 'Active Groups'}
            </span>
          </div>
          <span className="text-xl font-bold text-green-600">{activeGroups}</span>
        </div>

        {/* Pending Requests */}
        <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-orange-600" />
            <span className="font-medium">
              {language === 'ar' ? 'الطلبات المعلقة' : 'Pending Requests'}
            </span>
          </div>
          <span className="text-xl font-bold text-orange-600">{pendingRequests}</span>
        </div>

        {/* Notifications */}
        {notifications > 0 && (
          <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-purple-600" />
              <span className="font-medium">
                {language === 'ar' ? 'الإشعارات' : 'Notifications'}
              </span>
            </div>
            <Badge variant="destructive">{notifications}</Badge>
          </div>
        )}

        {/* Quick Actions */}
        <div className="space-y-2">
          <Button className="w-full justify-between" variant="outline">
            <span>{language === 'ar' ? 'التفاوض والتصويت' : 'Negotiation & Voting'}</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
          
          <Button className="w-full justify-between" variant="outline">
            <span>{language === 'ar' ? 'الروابط السريعة' : 'Quick Links'}</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Status Message */}
        {verificationStatus === 'pending' && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              {language === 'ar' 
                ? 'حسابك قيد المراجعة. ستتمكن من الوصول الكامل بعد التحقق.'
                : 'Your account is under review. Full access will be granted after verification.'
              }
            </p>
          </div>
        )}

        {verificationStatus === 'restricted' && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">
              {language === 'ar' 
                ? 'حسابك مقيد. يرجى التواصل مع الدعم لحل المشكلة.'
                : 'Your account is restricted. Please contact support to resolve issues.'
              }
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MCPBox;
