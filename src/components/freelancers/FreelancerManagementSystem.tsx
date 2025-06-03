
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  User, 
  Star, 
  Clock, 
  DollarSign, 
  Award, 
  MessageSquare, 
  FileText, 
  Search,
  Filter,
  Plus,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Users,
  Briefcase,
  Calendar,
  Target
} from 'lucide-react';

const FreelancerManagementSystem = () => {
  const { language } = useLanguage();
  const [freelancers, setFreelancers] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadFreelancersData();
    loadProjectsData();
  }, []);

  const loadFreelancersData = () => {
    setFreelancers([
      {
        id: 1,
        name: language === 'en' ? 'Ahmed Hassan' : 'أحمد حسن',
        avatar: '/api/placeholder/40/40',
        category: 'web-dev',
        rating: 4.8,
        hourlyRate: 35,
        totalEarnings: 12500,
        projectsCompleted: 23,
        skills: ['React', 'Node.js', 'Python', 'MongoDB'],
        availability: 'available',
        responseTime: '2h',
        successRate: 96,
        location: language === 'en' ? 'Cairo, Egypt' : 'القاهرة، مصر',
        languages: ['Arabic', 'English'],
        joinDate: '2023-01-15',
        lastActive: '2 hours ago'
      },
      {
        id: 2,
        name: language === 'en' ? 'Sarah Miller' : 'سارة ميلر',
        avatar: '/api/placeholder/40/40',
        category: 'design',
        rating: 4.9,
        hourlyRate: 45,
        totalEarnings: 18200,
        projectsCompleted: 31,
        skills: ['UI/UX', 'Figma', 'Adobe Creative Suite', 'Prototyping'],
        availability: 'busy',
        responseTime: '1h',
        successRate: 98,
        location: language === 'en' ? 'London, UK' : 'لندن، المملكة المتحدة',
        languages: ['English', 'French'],
        joinDate: '2022-08-20',
        lastActive: '30 minutes ago'
      },
      {
        id: 3,
        name: language === 'en' ? 'Mohammed Al-Ahmad' : 'محمد الأحمد',
        avatar: '/api/placeholder/40/40',
        category: 'marketing',
        rating: 4.7,
        hourlyRate: 30,
        totalEarnings: 9800,
        projectsCompleted: 18,
        skills: ['Digital Marketing', 'SEO', 'Social Media', 'Content Writing'],
        availability: 'available',
        responseTime: '3h',
        successRate: 94,
        location: language === 'en' ? 'Dubai, UAE' : 'دبي، الإمارات',
        languages: ['Arabic', 'English'],
        joinDate: '2023-03-10',
        lastActive: '1 hour ago'
      }
    ]);
  };

  const loadProjectsData = () => {
    setProjects([
      {
        id: 1,
        title: language === 'en' ? 'E-commerce Platform Development' : 'تطوير منصة التجارة الإلكترونية',
        client: language === 'en' ? 'Tech Solutions Inc.' : 'شركة الحلول التقنية',
        freelancer: language === 'en' ? 'Ahmed Hassan' : 'أحمد حسن',
        budget: 2500,
        status: 'in-progress',
        progress: 65,
        deadline: '2024-02-15',
        category: 'web-dev',
        description: language === 'en' 
          ? 'Full-stack e-commerce platform with React frontend and Node.js backend'
          : 'منصة تجارة إلكترونية كاملة مع واجهة React وخلفية Node.js'
      },
      {
        id: 2,
        title: language === 'en' ? 'Brand Identity Design' : 'تصميم الهوية التجارية',
        client: language === 'en' ? 'StartupX' : 'شركة StartupX',
        freelancer: language === 'en' ? 'Sarah Miller' : 'سارة ميلر',
        budget: 1800,
        status: 'completed',
        progress: 100,
        deadline: '2024-01-20',
        category: 'design',
        description: language === 'en' 
          ? 'Complete brand identity including logo, color palette, and brand guidelines'
          : 'هوية تجارية كاملة تشمل الشعار ولوحة الألوان وإرشادات العلامة التجارية'
      }
    ]);
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-yellow-100 text-yellow-800';
      case 'offline': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'web-dev': return <Briefcase className="h-4 w-4" />;
      case 'design': return <Award className="h-4 w-4" />;
      case 'marketing': return <TrendingUp className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  const filteredFreelancers = freelancers.filter(freelancer => {
    const matchesSearch = freelancer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         freelancer.skills.some((skill: string) => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = filterCategory === 'all' || freelancer.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <Users className="h-8 w-8 mr-3 text-blue-600" />
            {language === 'en' ? 'Freelancer Management' : 'إدارة المستقلين'}
          </h2>
          <p className="text-gray-600 mt-2">
            {language === 'en' 
              ? 'Manage freelancers, track projects, and optimize collaboration'
              : 'إدارة المستقلين وتتبع المشاريع وتحسين التعاون'
            }
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          {language === 'en' ? 'Add Freelancer' : 'إضافة مستقل'}
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{language === 'en' ? 'Active Freelancers' : 'المستقلون النشطون'}</p>
                <p className="text-2xl font-bold text-blue-600">127</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{language === 'en' ? 'Active Projects' : 'المشاريع النشطة'}</p>
                <p className="text-2xl font-bold text-green-600">43</p>
              </div>
              <Briefcase className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{language === 'en' ? 'Total Earnings' : 'إجمالي الأرباح'}</p>
                <p className="text-2xl font-bold text-purple-600">$485K</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{language === 'en' ? 'Avg. Rating' : 'متوسط التقييم'}</p>
                <p className="text-2xl font-bold text-yellow-600">4.8</p>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="freelancers" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="freelancers">
            {language === 'en' ? 'Freelancers' : 'المستقلون'}
          </TabsTrigger>
          <TabsTrigger value="projects">
            {language === 'en' ? 'Projects' : 'المشاريع'}
          </TabsTrigger>
          <TabsTrigger value="analytics">
            {language === 'en' ? 'Analytics' : 'التحليلات'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="freelancers" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder={language === 'en' ? 'Search freelancers by name or skills...' : 'البحث في المستقلين بالاسم أو المهارات...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder={language === 'en' ? 'Filter by category' : 'تصفية حسب الفئة'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{language === 'en' ? 'All Categories' : 'جميع الفئات'}</SelectItem>
                <SelectItem value="web-dev">{language === 'en' ? 'Web Development' : 'تطوير المواقع'}</SelectItem>
                <SelectItem value="design">{language === 'en' ? 'Design' : 'التصميم'}</SelectItem>
                <SelectItem value="marketing">{language === 'en' ? 'Marketing' : 'التسويق'}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Freelancers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFreelancers.map((freelancer) => (
              <Card key={freelancer.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={freelancer.avatar} />
                        <AvatarFallback>{freelancer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg">{freelancer.name}</h3>
                        <div className="flex items-center space-x-1">
                          {getCategoryIcon(freelancer.category)}
                          <span className="text-sm text-gray-600">
                            {freelancer.category === 'web-dev' ? (language === 'en' ? 'Web Developer' : 'مطور مواقع') :
                             freelancer.category === 'design' ? (language === 'en' ? 'Designer' : 'مصمم') :
                             freelancer.category === 'marketing' ? (language === 'en' ? 'Marketer' : 'مسوق') : freelancer.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge className={getAvailabilityColor(freelancer.availability)}>
                      {freelancer.availability === 'available' ? (language === 'en' ? 'Available' : 'متاح') :
                       freelancer.availability === 'busy' ? (language === 'en' ? 'Busy' : 'مشغول') :
                       language === 'en' ? 'Offline' : 'غير متصل'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="font-medium">{freelancer.rating}</span>
                      <span className="text-sm text-gray-600">({freelancer.projectsCompleted} {language === 'en' ? 'projects' : 'مشروع'})</span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${freelancer.hourlyRate}/hr</p>
                      <p className="text-sm text-gray-600">${freelancer.totalEarnings.toLocaleString()} {language === 'en' ? 'earned' : 'مُحصّل'}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{language === 'en' ? 'Success Rate' : 'معدل النجاح'}</span>
                      <span>{freelancer.successRate}%</span>
                    </div>
                    <Progress value={freelancer.successRate} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">{language === 'en' ? 'Top Skills:' : 'المهارات الرئيسية:'}</p>
                    <div className="flex flex-wrap gap-1">
                      {freelancer.skills.slice(0, 3).map((skill: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {freelancer.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{freelancer.skills.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {language === 'en' ? 'Message' : 'رسالة'}
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <User className="h-4 w-4 mr-1" />
                      {language === 'en' ? 'View Profile' : 'عرض الملف'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <div className="grid gap-4">
            {projects.map((project) => (
              <Card key={project.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {project.freelancer}
                        </div>
                        <div className="flex items-center">
                          <Briefcase className="h-4 w-4 mr-1" />
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
                      {project.status === 'completed' ? (language === 'en' ? 'Completed' : 'مكتمل') :
                       project.status === 'in-progress' ? (language === 'en' ? 'In Progress' : 'قيد التنفيذ') :
                       project.status === 'pending' ? (language === 'en' ? 'Pending' : 'في انتظار') :
                       language === 'en' ? 'Cancelled' : 'ملغي'}
                    </Badge>
                  </div>
                  
                  {project.status !== 'completed' && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{language === 'en' ? 'Progress' : 'التقدم'}</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Performance Metrics' : 'مقاييس الأداء'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{language === 'en' ? 'Project Success Rate' : 'معدل نجاح المشاريع'}</span>
                    <span className="font-semibold">94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{language === 'en' ? 'On-Time Delivery' : 'التسليم في الوقت المحدد'}</span>
                    <span className="font-semibold">87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{language === 'en' ? 'Client Satisfaction' : 'رضا العملاء'}</span>
                    <span className="font-semibold">96%</span>
                  </div>
                  <Progress value={96} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Category Distribution' : 'توزيع الفئات'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{language === 'en' ? 'Web Development' : 'تطوير المواقع'}</span>
                    <span className="font-semibold">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{language === 'en' ? 'Design' : 'التصميم'}</span>
                    <span className="font-semibold">30%</span>
                  </div>
                  <Progress value={30} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{language === 'en' ? 'Marketing' : 'التسويق'}</span>
                    <span className="font-semibold">25%</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FreelancerManagementSystem;
