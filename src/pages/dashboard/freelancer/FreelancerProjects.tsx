
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/utils/translations';

const FreelancerProjects = () => {
  const { language } = useLanguage();
  
  // Mock data for active projects
  const activeProjects = [
    {
      id: 1,
      title: language === 'en' ? 'Website Localization' : 'تعريب موقع إلكتروني',
      client: language === 'en' ? 'Tech Startup Collective' : 'مجموعة الشركات الناشئة التقنية',
      deadline: language === 'en' ? 'May 25, 2025' : '25 مايو 2025',
      status: language === 'en' ? 'In Progress' : 'قيد التنفيذ',
      budget: language === 'en' ? '$2,500' : '2,500 دولار',
    },
    {
      id: 2,
      title: language === 'en' ? 'Contract Review' : 'مراجعة عقد',
      client: language === 'en' ? 'Healthcare Procurement Alliance' : 'تحالف المشتريات الصحية',
      deadline: language === 'en' ? 'June 10, 2025' : '10 يونيو 2025',
      status: language === 'en' ? 'In Progress' : 'قيد التنفيذ',
      budget: language === 'en' ? '$1,800' : '1,800 دولار',
    },
  ];
  
  // Mock data for completed projects
  const completedProjects = [
    {
      id: 3,
      title: language === 'en' ? 'Legal Document Translation' : 'ترجمة مستند قانوني',
      client: language === 'en' ? 'Educational Institutions Group' : 'مجموعة المؤسسات التعليمية',
      completedDate: language === 'en' ? 'April 15, 2025' : '15 أبريل 2025',
      rating: '4.9/5',
      budget: language === 'en' ? '$3,200' : '3,200 دولار',
    },
    {
      id: 4,
      title: language === 'en' ? 'Technical Specification Review' : 'مراجعة المواصفات الفنية',
      client: language === 'en' ? 'Government Agencies Collective' : 'مجموعة الهيئات الحكومية',
      completedDate: language === 'en' ? 'March 28, 2025' : '28 مارس 2025',
      rating: '5.0/5',
      budget: language === 'en' ? '$2,750' : '2,750 دولار',
    },
  ];
  
  // Mock data for available opportunities
  const opportunities = [
    {
      id: 5,
      title: language === 'en' ? 'Technical Writer Needed' : 'مطلوب كاتب تقني',
      group: language === 'en' ? 'Software Solutions Group' : 'مجموعة حلول البرمجيات',
      postedDate: language === 'en' ? '2 days ago' : 'منذ يومين',
      budget: language === 'en' ? '$1,500 - $2,000' : '1,500 - 2,000 دولار',
      deadline: language === 'en' ? 'May 30, 2025' : '30 مايو 2025',
    },
    {
      id: 6,
      title: language === 'en' ? 'Contract Negotiator' : 'مفاوض عقود',
      group: language === 'en' ? 'Retail Alliance' : 'تحالف تجار التجزئة',
      postedDate: language === 'en' ? '1 week ago' : 'منذ أسبوع',
      budget: language === 'en' ? '$3,000 - $4,000' : '3,000 - 4,000 دولار',
      deadline: language === 'en' ? 'June 15, 2025' : '15 يونيو 2025',
    },
  ];
  
  const getStatusBadge = (status: string) => {
    if (status === 'In Progress' || status === 'قيد التنفيذ') {
      return <Badge className="bg-blue-100 text-blue-800">{status}</Badge>;
    } else if (status === 'Completed' || status === 'مكتمل') {
      return <Badge className="bg-green-100 text-green-800">{status}</Badge>;
    } else {
      return <Badge className="bg-yellow-100 text-yellow-800">{status}</Badge>;
    }
  };
  
  return (
    <DashboardLayout role="freelancer">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {t('myProjects', language)}
          </h2>
          <Button>
            {t('findProjects', language)}
          </Button>
        </div>
        
        <Tabs defaultValue="active">
          <TabsList>
            <TabsTrigger value="active">{t('activeProjects', language)}</TabsTrigger>
            <TabsTrigger value="completed">{t('completedProjects', language)}</TabsTrigger>
            <TabsTrigger value="opportunities">{t('opportunities', language)}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>{t('activeProjects', language)}</CardTitle>
                <CardDescription>
                  {t('currentProjectsDesc', language)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeProjects.map((project) => (
                    <div key={project.id} className="border rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{project.title}</h3>
                          <p className="text-sm text-gray-500">{project.client}</p>
                          <div className="mt-2 flex items-center gap-2">
                            <span className="text-sm text-gray-500">
                              {language === 'en' ? 'Deadline:' : 'الموعد النهائي:'} {project.deadline}
                            </span>
                            <span className="text-sm text-gray-500">
                              {language === 'en' ? 'Budget:' : 'الميزانية:'} {project.budget}
                            </span>
                          </div>
                        </div>
                        {getStatusBadge(project.status)}
                      </div>
                      <div className="mt-4 flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          {t('viewDetails', language)}
                        </Button>
                        <Button size="sm">
                          {t('updateProgress', language)}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="completed">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>{t('completedProjects', language)}</CardTitle>
                <CardDescription>
                  {t('completedProjectsDesc', language)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {completedProjects.map((project) => (
                    <div key={project.id} className="border rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{project.title}</h3>
                          <p className="text-sm text-gray-500">{project.client}</p>
                          <div className="mt-2 flex items-center gap-4">
                            <span className="text-sm text-gray-500">
                              {language === 'en' ? 'Completed:' : 'تم الإكمال:'} {project.completedDate}
                            </span>
                            <span className="text-sm text-gray-500">
                              {language === 'en' ? 'Budget:' : 'الميزانية:'} {project.budget}
                            </span>
                            <span className="text-sm font-medium text-green-600">
                              {language === 'en' ? 'Rating:' : 'التقييم:'} {project.rating}
                            </span>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          {language === 'en' ? 'Completed' : 'مكتمل'}
                        </Badge>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button variant="outline" size="sm">
                          {t('viewDetails', language)}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="opportunities">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>{t('opportunities', language)}</CardTitle>
                <CardDescription>
                  {t('opportunitiesDesc', language)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {opportunities.map((opportunity) => (
                    <div key={opportunity.id} className="border rounded-md p-4">
                      <div>
                        <h3 className="font-semibold">{opportunity.title}</h3>
                        <p className="text-sm text-gray-500">{opportunity.group}</p>
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <span className="text-sm text-gray-500">
                            {language === 'en' ? 'Posted:' : 'تم النشر:'} {opportunity.postedDate}
                          </span>
                          <span className="text-sm text-gray-500">
                            {language === 'en' ? 'Budget:' : 'الميزانية:'} {opportunity.budget}
                          </span>
                          <span className="text-sm text-red-500">
                            {language === 'en' ? 'Application Deadline:' : 'الموعد النهائي للتقديم:'} {opportunity.deadline}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          {t('viewDetails', language)}
                        </Button>
                        <Button size="sm">
                          {t('applyNow', language)}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default FreelancerProjects;
