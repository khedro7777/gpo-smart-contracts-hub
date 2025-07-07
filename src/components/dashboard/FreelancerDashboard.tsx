
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Briefcase, 
  Clock, 
  DollarSign, 
  Star, 
  TrendingUp,
  Users,
  FileText,
  Calendar,
  Target,
  Award,
  MessageSquare,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

interface FreelancerProject {
  id: string;
  title: string;
  client: string;
  description: string;
  budget: number;
  deadline: string;
  status: 'active' | 'completed' | 'pending' | 'cancelled';
  progress: number;
  category: string;
  skills: string[];
}

interface FreelancerStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalEarnings: number;
  averageRating: number;
  completionRate: number;
  responseTime: string;
  clientSatisfaction: number;
}

interface FreelancerDashboardProps {
  freelancerId: string;
  stats: FreelancerStats;
  projects: FreelancerProject[];
  onUpdateProject: (projectId: string, updates: any) => void;
  onApplyToProject: (projectId: string) => void;
  onWithdrawApplication: (projectId: string) => void;
}

const FreelancerDashboard: React.FC<FreelancerDashboardProps> = ({
  freelancerId,
  stats,
  projects,
  onUpdateProject,
  onApplyToProject,
  onWithdrawApplication
}) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedProject, setSelectedProject] = useState<FreelancerProject | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Clock className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <AlertCircle className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const activeProjects = projects.filter(p => p.status === 'active');
  const completedProjects = projects.filter(p => p.status === 'completed');
  const pendingProjects = projects.filter(p => p.status === 'pending');

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {language === 'ar' ? 'لوحة تحكم المستقل' : 'Freelancer Dashboard'}
          </h1>
          <p className="text-gray-600 mt-1">
            {language === 'ar' ? 'إدارة مشاريعك والعملاء' : 'Manage your projects and clients'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Star className="h-3 w-3" />
            {stats.averageRating.toFixed(1)}
          </Badge>
          <Button>
            {language === 'ar' ? 'عرض الملف الشخصي' : 'View Profile'}
          </Button>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'ar' ? 'المشاريع النشطة' : 'Active Projects'}
                </p>
                <p className="text-2xl font-bold text-blue-600">{stats.activeProjects}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'ar' ? 'إجمالي الأرباح' : 'Total Earnings'}
                </p>
                <p className="text-2xl font-bold text-green-600">${stats.totalEarnings.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'ar' ? 'معدل الإنجاز' : 'Completion Rate'}
                </p>
                <p className="text-2xl font-bold text-purple-600">{stats.completionRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'ar' ? 'رضا العملاء' : 'Client Satisfaction'}
                </p>
                <p className="text-2xl font-bold text-orange-600">{stats.clientSatisfaction}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">
            {language === 'ar' ? 'نظرة عامة' : 'Overview'}
          </TabsTrigger>
          <TabsTrigger value="active">
            {language === 'ar' ? 'المشاريع النشطة' : 'Active Projects'}
          </TabsTrigger>
          <TabsTrigger value="completed">
            {language === 'ar' ? 'المشاريع المكتملة' : 'Completed'}
          </TabsTrigger>
          <TabsTrigger value="opportunities">
            {language === 'ar' ? 'الفرص' : 'Opportunities'}
          </TabsTrigger>
          <TabsTrigger value="analytics">
            {language === 'ar' ? 'التحليلات' : 'Analytics'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  {language === 'ar' ? 'الأداء الشهري' : 'Monthly Performance'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>{language === 'ar' ? 'المشاريع المكتملة' : 'Projects Completed'}</span>
                    <Badge variant="outline">{stats.completedProjects}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{language === 'ar' ? 'وقت الاستجابة' : 'Response Time'}</span>
                    <Badge variant="outline">{stats.responseTime}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{language === 'ar' ? 'التقييم المتوسط' : 'Average Rating'}</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>{stats.averageRating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'ar' ? 'المشاريع الأخيرة' : 'Recent Projects'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {activeProjects.slice(0, 3).map((project) => (
                    <div key={project.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{project.title}</p>
                        <p className="text-sm text-gray-600">{project.client}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className={getStatusColor(project.status)} variant="outline">
                            {getStatusIcon(project.status)}
                            <span className="ml-1">{project.status}</span>
                          </Badge>
                          <span className="text-sm text-gray-500">${project.budget}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4">
            {activeProjects.map((project) => (
              <Card key={project.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {project.client}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          ${project.budget.toLocaleString()}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {project.deadline}
                        </div>
                      </div>
                    </div>
                    <Badge className={getStatusColor(project.status)}>
                      {getStatusIcon(project.status)}
                      <span className="ml-1">{project.status}</span>
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{language === 'ar' ? 'التقدم' : 'Progress'}</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex gap-1">
                      {project.skills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {language === 'ar' ? 'رسالة' : 'Message'}
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={() => onUpdateProject(project.id, { progress: project.progress + 10 })}
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        {language === 'ar' ? 'تحديث' : 'Update'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4">
            {completedProjects.map((project) => (
              <Card key={project.id} className="opacity-90">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {project.client}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          ${project.budget.toLocaleString()}
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
                          {language === 'ar' ? 'مكتمل' : 'Completed'}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm ml-1">4.8</span>
                      </div>
                      <Badge variant="outline" className="text-green-700 border-green-200">
                        {language === 'ar' ? 'مكتمل' : 'Completed'}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex gap-1">
                      {project.skills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      {language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'ar' ? 'الفرص المتاحة' : 'Available Opportunities'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  {language === 'ar' 
                    ? 'لا توجد فرص جديدة متاحة حالياً' 
                    : 'No new opportunities available at the moment'
                  }
                </p>
                <Button className="mt-4">
                  {language === 'ar' ? 'تصفح المشاريع' : 'Browse Projects'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{language === 'ar' ? 'مقاييس الأداء' : 'Performance Metrics'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{language === 'ar' ? 'معدل نجاح المشاريع' : 'Project Success Rate'}</span>
                    <span className="font-semibold">{stats.completionRate}%</span>
                  </div>
                  <Progress value={stats.completionRate} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{language === 'ar' ? 'رضا العملاء' : 'Client Satisfaction'}</span>
                    <span className="font-semibold">{stats.clientSatisfaction}%</span>
                  </div>
                  <Progress value={stats.clientSatisfaction} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{language === 'ar' ? 'التقييم المتوسط' : 'Average Rating'}</span>
                    <span className="font-semibold">{stats.averageRating.toFixed(1)}/5</span>
                  </div>
                  <Progress value={(stats.averageRating / 5) * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{language === 'ar' ? 'الإحصائيات المالية' : 'Financial Statistics'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{language === 'ar' ? 'إجمالي الأرباح' : 'Total Earnings'}</span>
                    <span className="font-semibold">${stats.totalEarnings.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{language === 'ar' ? 'متوسط قيمة المشروع' : 'Average Project Value'}</span>
                    <span className="font-semibold">${Math.round(stats.totalEarnings / stats.totalProjects).toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{language === 'ar' ? 'الأرباح الشهرية' : 'Monthly Earnings'}</span>
                    <span className="font-semibold">${Math.round(stats.totalEarnings / 12).toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FreelancerDashboard;
