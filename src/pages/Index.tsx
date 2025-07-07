
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            {language === 'ar' ? 'منصة GPO المتكاملة' : 'GPO Unified Platform'}
          </h1>
          <div className="flex justify-center gap-2 mb-6">
            <Button 
              variant={language === 'en' ? 'default' : 'outline'}
              onClick={() => setLanguage('en')}
            >
              English
            </Button>
            <Button 
              variant={language === 'ar' ? 'default' : 'outline'}
              onClick={() => setLanguage('ar')}
            >
              العربية
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>
                {language === 'ar' ? 'لوحة تحكم المستقل' : 'Freelancer Dashboard'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                {language === 'ar' 
                  ? 'إدارة المشاريع والعملاء والأرباح' 
                  : 'Manage projects, clients, and earnings'
                }
              </p>
              <Link to="/dashboard/freelancer">
                <Button className="w-full">
                  {language === 'ar' ? 'دخول' : 'Enter'}
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>
                {language === 'ar' ? 'لوحة تحكم المورد' : 'Supplier Dashboard'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                {language === 'ar' 
                  ? 'إدارة العروض والعقود والمجموعات' 
                  : 'Manage offers, contracts, and groups'
                }
              </p>
              <Link to="/dashboard/supplier">
                <Button className="w-full">
                  {language === 'ar' ? 'دخول' : 'Enter'}
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>
                {language === 'ar' ? 'إدارة المستقلين' : 'Freelancer Management'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                {language === 'ar' 
                  ? 'إدارة فريق المستقلين' 
                  : 'Manage freelancer teams'
                }
              </p>
              <Link to="/dashboard/freelancer-management">
                <Button className="w-full">
                  {language === 'ar' ? 'دخول' : 'Enter'}
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>
                {language === 'ar' ? 'لوحة المدير العام' : 'Super Admin Dashboard'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                {language === 'ar' 
                  ? 'إدارة النظام الكامل' 
                  : 'Complete system management'
                }
              </p>
              <Link to="/dashboard/multi-level/super-admin">
                <Button className="w-full">
                  {language === 'ar' ? 'دخول' : 'Enter'}
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>
                {language === 'ar' ? 'لوحة إدارة الوحدات' : 'Module Dashboard'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                {language === 'ar' 
                  ? 'إدارة وحدات النظام' 
                  : 'Manage system modules'
                }
              </p>
              <Link to="/dashboard/multi-level/module/procurement">
                <Button className="w-full">
                  {language === 'ar' ? 'دخول' : 'Enter'}
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>
                {language === 'ar' ? 'لوحة مدير المجموعة' : 'Group Manager Dashboard'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                {language === 'ar' 
                  ? 'إدارة المجموعات والأعضاء' 
                  : 'Manage groups and members'
                }
              </p>
              <Link to="/dashboard/multi-level/group-manager/group-1">
                <Button className="w-full">
                  {language === 'ar' ? 'دخول' : 'Enter'}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
