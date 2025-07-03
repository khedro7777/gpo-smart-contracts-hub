/**
 * MCP Dashboard Page
 * Central hub for accessing all MCP (Model Context Protocol) services
 * Provides unified interface for Chart Server, Web Search, IPFS, Manim, Deep Wiki, and Ashra
 * Location: /dashboard/mcp
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// MCP Service interface for type safety
interface MCPService {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  icon: React.ReactNode;
  route: string;
  status: 'active' | 'maintenance' | 'offline';
  features: string[];
  featuresAr: string[];
}

const MCPDashboard: React.FC = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');

  // MCP Services configuration with comprehensive details
  const mcpServices: MCPService[] = [
    {
      id: 'chart-server',
      name: 'Chart Generator',
      nameAr: 'منشئ الرسوم البيانية',
      description: 'Generate beautiful charts and visualizations from your data',
      descriptionAr: 'إنشاء رسوم بيانية جميلة ومرئيات من بياناتك',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <path d="M9 9h6v6H9z"/>
          <path d="M21 15v4a2 2 0 0 1-2 2h-4"/>
          <path d="M21 9V5a2 2 0 0 0-2-2h-4"/>
          <path d="M3 9V5a2 2 0 0 1 2-2h4"/>
          <path d="M3 15v4a2 2 0 0 0 2 2h4"/>
        </svg>
      ),
      route: '/dashboard/mcp/chart-server',
      status: 'active',
      features: ['Bar Charts', 'Line Graphs', 'Pie Charts', 'Scatter Plots', 'Custom Styling'],
      featuresAr: ['الرسوم البيانية الشريطية', 'الرسوم الخطية', 'الرسوم الدائرية', 'رسوم التشتت', 'التصميم المخصص']
    },
    {
      id: 'web-search',
      name: 'Web Search',
      nameAr: 'البحث على الويب',
      description: 'Search the web without API keys and extract structured data',
      descriptionAr: 'البحث على الويب بدون مفاتيح API واستخراج البيانات المنظمة',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
      ),
      route: '/dashboard/mcp/web-search',
      status: 'active',
      features: ['Real-time Search', 'Data Extraction', 'Content Analysis', 'No API Keys Required'],
      featuresAr: ['البحث الفوري', 'استخراج البيانات', 'تحليل المحتوى', 'لا يتطلب مفاتيح API']
    },
    {
      id: 'ipfs',
      name: 'File Storage (IPFS)',
      nameAr: 'تخزين الملفات (IPFS)',
      description: 'Decentralized file storage and management using IPFS protocol',
      descriptionAr: 'تخزين وإدارة الملفات اللامركزية باستخدام بروتوكول IPFS',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
          <polyline points="14 2 14 8 20 8"/>
          <path d="M12 18v-6l-3-3 3-3v6"/>
        </svg>
      ),
      route: '/dashboard/mcp/ipfs',
      status: 'active',
      features: ['File Upload', 'Pin Management', 'Retrieval System', 'Metadata Tracking'],
      featuresAr: ['رفع الملفات', 'إدارة التثبيت', 'نظام الاسترجاع', 'تتبع البيانات الوصفية']
    },
    {
      id: 'manim',
      name: 'Video Generator',
      nameAr: 'منشئ الفيديو',
      description: 'Create educational animations and mathematical visualizations',
      descriptionAr: 'إنشاء رسوم متحركة تعليمية ومرئيات رياضية',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <polygon points="23 7 16 12 23 17 23 7"/>
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
        </svg>
      ),
      route: '/dashboard/mcp/manim',
      status: 'active',
      features: ['Math Animations', 'Code Visualization', 'Educational Content', 'Custom Styling'],
      featuresAr: ['الرسوم المتحركة الرياضية', 'تصور الكود', 'المحتوى التعليمي', 'التصميم المخصص']
    },
    {
      id: 'deep-wiki',
      name: 'Deep Wiki',
      nameAr: 'ويكي عميق',
      description: 'Comprehensive knowledge extraction and research assistance',
      descriptionAr: 'استخراج شامل للمعرفة ومساعدة البحث',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
        </svg>
      ),
      route: '/dashboard/mcp/deep-wiki',
      status: 'active',
      features: ['Deep Research', 'Knowledge Graphs', 'Source Verification', 'Export Options'],
      featuresAr: ['البحث العميق', 'خرائط المعرفة', 'التحقق من المصادر', 'خيارات التصدير']
    },
    {
      id: 'ashra',
      name: 'Code Analysis',
      nameAr: 'تحليل الكود',
      description: 'Comprehensive code quality, security, and performance analysis',
      descriptionAr: 'تحليل شامل لجودة الكود والأمان والأداء',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <polyline points="16 18 22 12 16 6"/>
          <polyline points="8 6 2 12 8 18"/>
        </svg>
      ),
      route: '/dashboard/mcp/ashra',
      status: 'active',
      features: ['Quality Analysis', 'Security Scan', 'Performance Check', 'Best Practices'],
      featuresAr: ['تحليل الجودة', 'فحص الأمان', 'فحص الأداء', 'أفضل الممارسات']
    }
  ];

  // Get service status color for UI indication
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'maintenance': return 'bg-yellow-500';
      case 'offline': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  // Get service status text
  const getStatusText = (status: string) => {
    if (language === 'ar') {
      switch (status) {
        case 'active': return 'نشط';
        case 'maintenance': return 'صيانة';
        case 'offline': return 'غير متصل';
        default: return 'غير معروف';
      }
    }
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Page Header with description */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          {language === 'ar' ? 'لوحة تحكم MCP' : 'MCP Dashboard'}
        </h1>
        <p className="text-muted-foreground">
          {language === 'ar' 
            ? 'الوصول إلى جميع خدمات بروتوكول السياق النموذجي (MCP) من مكان واحد'
            : 'Access all Model Context Protocol (MCP) services from one central location'}
        </p>
      </div>

      {/* Navigation Tabs for different views */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">
            {language === 'ar' ? 'نظرة عامة' : 'Overview'}
          </TabsTrigger>
          <TabsTrigger value="services">
            {language === 'ar' ? 'الخدمات' : 'Services'}
          </TabsTrigger>
          <TabsTrigger value="usage">
            {language === 'ar' ? 'الاستخدام' : 'Usage'}
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab - Quick stats and recent activity */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  {language === 'ar' ? 'إجمالي الخدمات' : 'Total Services'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mcpServices.length}</div>
                <p className="text-xs text-muted-foreground">
                  {language === 'ar' ? 'خدمات متاحة' : 'Available services'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  {language === 'ar' ? 'الخدمات النشطة' : 'Active Services'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {mcpServices.filter(s => s.status === 'active').length}
                </div>
                <p className="text-xs text-muted-foreground">
                  {language === 'ar' ? 'تعمل بشكل طبيعي' : 'Running normally'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  {language === 'ar' ? 'الاستخدام اليوم' : 'Usage Today'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">
                  {language === 'ar' ? 'طلب API' : 'API requests'}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Access Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mcpServices.slice(0, 6).map((service) => (
              <Card key={service.id} className="group hover:shadow-lg transition-shadow cursor-pointer">
                <Link to={service.route}>
                  <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                    <div className="text-primary mr-3">
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-base">
                        {language === 'ar' ? service.nameAr : service.name}
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(service.status)}`} />
                        <span className="text-xs text-muted-foreground">
                          {getStatusText(service.status)}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {language === 'ar' ? service.descriptionAr : service.description}
                    </p>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Services Tab - Detailed service listings */}
        <TabsContent value="services" className="space-y-6">
          <div className="space-y-4">
            {mcpServices.map((service) => (
              <Card key={service.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="text-primary">
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold">
                          {language === 'ar' ? service.nameAr : service.name}
                        </h3>
                        <Badge variant={service.status === 'active' ? 'default' : 'secondary'}>
                          {getStatusText(service.status)}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-3">
                        {language === 'ar' ? service.descriptionAr : service.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {(language === 'ar' ? service.featuresAr : service.features).map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-x-2">
                    <Button asChild>
                      <Link to={service.route}>
                        {language === 'ar' ? 'فتح' : 'Open'}
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Usage Tab - Analytics and usage statistics */}
        <TabsContent value="usage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'ar' ? 'إحصائيات الاستخدام' : 'Usage Statistics'}
              </CardTitle>
              <CardDescription>
                {language === 'ar' 
                  ? 'مراقبة استخدام خدمات MCP الخاصة بك'
                  : 'Monitor your MCP services usage'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mcpServices.map((service) => (
                  <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="text-primary">
                        {service.icon}
                      </div>
                      <div>
                        <h4 className="font-medium">
                          {language === 'ar' ? service.nameAr : service.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {language === 'ar' ? 'آخر استخدام: اليوم' : 'Last used: Today'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        {Math.floor(Math.random() * 20) + 5} {language === 'ar' ? 'طلب' : 'requests'}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {language === 'ar' ? 'هذا الأسبوع' : 'This week'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MCPDashboard;