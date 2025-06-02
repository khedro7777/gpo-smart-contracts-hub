
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useLanguage } from '@/contexts/LanguageContext';
import { Bell, BellRing, Brain, TrendingUp, Users, AlertTriangle, CheckCircle } from 'lucide-react';

interface SmartNotification {
  id: string;
  type: 'ai_insight' | 'market_alert' | 'group_activity' | 'system' | 'recommendation';
  title: string;
  message: string;
  priority: 'high' | 'medium' | 'low';
  timestamp: Date;
  read: boolean;
  actionable: boolean;
  metadata?: any;
}

const SmartNotifications = () => {
  const { language } = useLanguage();
  const [notifications, setNotifications] = useState<SmartNotification[]>([]);
  const [settings, setSettings] = useState({
    aiInsights: true,
    marketAlerts: true,
    groupActivity: true,
    recommendations: true,
    realtime: true
  });

  useEffect(() => {
    loadSmartNotifications();
  }, []);

  const loadSmartNotifications = () => {
    const mockNotifications: SmartNotification[] = [
      {
        id: '1',
        type: 'ai_insight',
        title: language === 'en' ? 'AI Market Analysis Ready' : 'تحليل السوق بالذكاء الاصطناعي جاهز',
        message: language === 'en' 
          ? 'New market trends detected with 15% cost saving opportunity'
          : 'تم اكتشاف اتجاهات سوق جديدة مع فرصة توفير 15%',
        priority: 'high',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        read: false,
        actionable: true,
        metadata: { costSaving: 15, category: 'electronics' }
      },
      {
        id: '2',
        type: 'market_alert',
        title: language === 'en' ? 'Price Volatility Alert' : 'تنبيه تقلبات الأسعار',
        message: language === 'en'
          ? 'Significant price changes detected in your procurement categories'
          : 'تم اكتشاف تغييرات كبيرة في الأسعار في فئات الشراء الخاصة بك',
        priority: 'high',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        read: false,
        actionable: true,
        metadata: { priceChange: -8.5, trend: 'decreasing' }
      },
      {
        id: '3',
        type: 'recommendation',
        title: language === 'en' ? 'Smart Supplier Match' : 'مطابقة مورد ذكية',
        message: language === 'en'
          ? 'AI found 3 new suppliers matching your requirements with better terms'
          : 'وجد الذكاء الاصطناعي 3 موردين جدد يطابقون متطلباتك بشروط أفضل',
        priority: 'medium',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
        read: false,
        actionable: true,
        metadata: { suppliers: 3, avgImprovement: 12 }
      },
      {
        id: '4',
        type: 'group_activity',
        title: language === 'en' ? 'Group Voting Started' : 'بدأ التصويت في المجموعة',
        message: language === 'en'
          ? 'Tech Startup Collective has started voting on supplier selection'
          : 'بدأت مجموعة الشركات الناشئة التقنية التصويت على اختيار المورد',
        priority: 'medium',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
        read: true,
        actionable: true,
        metadata: { groupId: 'tech-startup', votingDeadline: '2024-01-15' }
      }
    ];

    setNotifications(mockNotifications);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'ai_insight':
        return <Brain className="h-5 w-5 text-purple-600" />;
      case 'market_alert':
        return <TrendingUp className="h-5 w-5 text-orange-600" />;
      case 'group_activity':
        return <Users className="h-5 w-5 text-blue-600" />;
      case 'recommendation':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      default:
        return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return language === 'en' ? `${minutes}m ago` : `منذ ${minutes} دقيقة`;
    } else if (hours < 24) {
      return language === 'en' ? `${hours}h ago` : `منذ ${hours} ساعة`;
    } else {
      return language === 'en' ? `${days}d ago` : `منذ ${days} يوم`;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <BellRing className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold">
            {language === 'en' ? 'Smart Notifications' : 'الإشعارات الذكية'}
          </h2>
          {unreadCount > 0 && (
            <Badge className="bg-red-100 text-red-800">
              {unreadCount} {language === 'en' ? 'unread' : 'غير مقروء'}
            </Badge>
          )}
        </div>
        <Button onClick={markAllAsRead} variant="outline">
          {language === 'en' ? 'Mark All Read' : 'تعيين الكل كمقروء'}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="h-5 w-5 mr-2 text-purple-600" />
            {language === 'en' ? 'Notification Settings' : 'إعدادات الإشعارات'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {language === 'en' ? 'AI Insights' : 'رؤى الذكاء الاصطناعي'}
              </span>
              <Switch 
                checked={settings.aiInsights}
                onCheckedChange={(checked) => setSettings({...settings, aiInsights: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {language === 'en' ? 'Market Alerts' : 'تنبيهات السوق'}
              </span>
              <Switch 
                checked={settings.marketAlerts}
                onCheckedChange={(checked) => setSettings({...settings, marketAlerts: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {language === 'en' ? 'Group Activity' : 'نشاط المجموعة'}
              </span>
              <Switch 
                checked={settings.groupActivity}
                onCheckedChange={(checked) => setSettings({...settings, groupActivity: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {language === 'en' ? 'AI Recommendations' : 'توصيات الذكاء الاصطناعي'}
              </span>
              <Switch 
                checked={settings.recommendations}
                onCheckedChange={(checked) => setSettings({...settings, recommendations: checked})}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {notifications.map((notification) => (
          <Card 
            key={notification.id} 
            className={`transition-all duration-200 hover:shadow-md ${
              !notification.read ? 'border-l-4 border-l-blue-500 bg-blue-50/30' : ''
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className={`font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                        {notification.title}
                      </h3>
                      <Badge className={getPriorityColor(notification.priority)} variant="outline">
                        {notification.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">
                        {formatTime(notification.timestamp)}
                      </span>
                      {notification.actionable && (
                        <Button size="sm" variant="outline">
                          {language === 'en' ? 'Take Action' : 'اتخاذ إجراء'}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                {!notification.read && (
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => markAsRead(notification.id)}
                  >
                    {language === 'en' ? 'Mark Read' : 'تعيين كمقروء'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SmartNotifications;
