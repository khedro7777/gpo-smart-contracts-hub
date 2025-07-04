
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Users, 
  UserCheck, 
  UserX, 
  AlertTriangle, 
  FileText, 
  Settings,
  Clock,
  Shield
} from 'lucide-react';

interface AdminPanelProps {
  groupId: string;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ groupId }) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('requests');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            {language === 'ar' ? 'لوحة تحكم المشرف' : 'Admin Panel'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="requests" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {language === 'ar' ? 'الطلبات' : 'Requests'}
              </TabsTrigger>
              <TabsTrigger value="members" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                {language === 'ar' ? 'الأعضاء' : 'Members'}
              </TabsTrigger>
              <TabsTrigger value="complaints" className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                {language === 'ar' ? 'الشكاوى' : 'Complaints'}
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                {language === 'ar' ? 'الإعدادات' : 'Settings'}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="requests" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    {language === 'ar' ? 'طلبات الانضمام المعلقة' : 'Pending Join Requests'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">
                      {language === 'ar' 
                        ? 'لا توجد طلبات انضمام معلقة'
                        : 'No pending join requests'
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="members" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    {language === 'ar' ? 'إدارة الأعضاء' : 'Member Management'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">
                      {language === 'ar' 
                        ? 'نظام إدارة الأعضاء قيد التطوير'
                        : 'Member management system under development'
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="complaints" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    {language === 'ar' ? 'الشكاوى والمنازعات' : 'Complaints & Disputes'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">
                      {language === 'ar' 
                        ? 'لا توجد شكاوى مفتوحة'
                        : 'No open complaints'
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      {language === 'ar' ? 'إعدادات المجموعة' : 'Group Settings'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        {language === 'ar' ? 'تغيير المرحلة' : 'Change Phase'}
                      </span>
                      <Button variant="outline" size="sm">
                        {language === 'ar' ? 'تحديث' : 'Update'}
                      </Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        {language === 'ar' ? 'تجميد المجموعة' : 'Freeze Group'}
                      </span>
                      <Button variant="outline" size="sm">
                        {language === 'ar' ? 'تجميد' : 'Freeze'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      {language === 'ar' ? 'التقارير' : 'Reports'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      {language === 'ar' ? 'تقرير الأنشطة' : 'Activity Report'}
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      {language === 'ar' ? 'تقرير الأعضاء' : 'Members Report'}
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      {language === 'ar' ? 'تقرير التصويت' : 'Voting Report'}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPanel;
