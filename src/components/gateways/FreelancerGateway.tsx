
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Star, Award, Clock, DollarSign, CheckCircle } from 'lucide-react';

const FreelancerGateway: React.FC = () => {
  const { t } = useTranslation(['common', 'dashboard']);
  const [selectedSkill, setSelectedSkill] = useState<string>('');

  const freelancerCategories = [
    {
      id: 'development',
      name: t('Software Development'),
      icon: '💻',
      skills: ['React', 'Node.js', 'Python', 'Mobile Apps', 'AI/ML'],
      avgRate: '$50-150/hr',
      available: 45,
    },
    {
      id: 'design',
      name: t('Design & Creative'),
      icon: '🎨',
      skills: ['UI/UX Design', 'Graphic Design', 'Video Editing', 'Animation'],
      avgRate: '$40-120/hr',
      available: 32,
    },
    {
      id: 'marketing',
      name: t('Digital Marketing'),
      icon: '📈',
      skills: ['SEO', 'Social Media', 'Content Marketing', 'PPC Advertising'],
      avgRate: '$35-100/hr',
      available: 28,
    },
    {
      id: 'business',
      name: t('Business Services'),
      icon: '📊',
      skills: ['Business Analysis', 'Project Management', 'Consulting', 'Strategy'],
      avgRate: '$60-200/hr',
      available: 23,
    },
    {
      id: 'legal',
      name: t('Legal & Compliance'),
      icon: '⚖️',
      skills: ['Contract Review', 'Corporate Law', 'IP Law', 'Compliance'],
      avgRate: '$100-300/hr',
      available: 15,
    },
    {
      id: 'finance',
      name: t('Finance & Accounting'),
      icon: '💰',
      skills: ['Financial Analysis', 'Bookkeeping', 'Tax Preparation', 'Auditing'],
      avgRate: '$50-150/hr',
      available: 19,
    },
  ];

  const topFreelancers = [
    {
      id: 1,
      name: 'Ahmed Hassan',
      title: 'Senior Full-Stack Developer',
      rating: 4.9,
      completedProjects: 127,
      hourlyRate: 85,
      skills: ['React', 'Node.js', 'AWS'],
      verified: true,
      responseTime: '2 hours',
      avatar: '👨‍💻',
    },
    {
      id: 2,
      name: 'Sarah Chen',
      title: 'UI/UX Designer',
      rating: 4.8,
      completedProjects: 89,
      hourlyRate: 70,
      skills: ['Figma', 'Adobe Creative Suite', 'Prototyping'],
      verified: true,
      responseTime: '1 hour',
      avatar: '👩‍🎨',
    },
    {
      id: 3,
      name: 'Mohammed Al-Rashid',
      title: 'Digital Marketing Expert',
      rating: 4.9,
      completedProjects: 156,
      hourlyRate: 60,
      skills: ['SEO', 'Google Ads', 'Analytics'],
      verified: true,
      responseTime: '3 hours',
      avatar: '👨‍💼',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <User className="h-8 w-8 text-purple-600" />
            <h1 className="text-3xl font-bold">{t('Freelancer Gateway')}</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('Connect with verified freelancers and experts to help grow your business. All freelancers undergo MCP assessment.')}
          </p>
        </div>

        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="browse">{t('Browse Freelancers')}</TabsTrigger>
            <TabsTrigger value="categories">{t('Categories')}</TabsTrigger>
            <TabsTrigger value="assessment">{t('MCP Assessment')}</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topFreelancers.map((freelancer) => (
                <Card key={freelancer.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{freelancer.avatar}</div>
                        <div>
                          <CardTitle className="text-lg">{freelancer.name}</CardTitle>
                          <CardDescription>{freelancer.title}</CardDescription>
                        </div>
                      </div>
                      {freelancer.verified && (
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {t('Verified')}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{freelancer.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Award className="h-4 w-4" />
                        <span>{freelancer.completedProjects} {t('projects')}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {freelancer.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        <span>${freelancer.hourlyRate}/hr</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{freelancer.responseTime}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1" size="sm">
                        {t('Contact')}
                      </Button>
                      <Button variant="outline" size="sm">
                        {t('View Profile')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {freelancerCategories.map((category) => (
                <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <span className="text-2xl">{category.icon}</span>
                      <span>{category.name}</span>
                    </CardTitle>
                    <CardDescription>
                      {category.available} {t('freelancers available')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-1">
                      {category.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{t('Average Rate')}: {category.avgRate}</span>
                    </div>

                    <Button className="w-full" variant="outline">
                      {t('Browse')} {category.name}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="assessment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('MCP Freelancer Assessment')}</CardTitle>
                <CardDescription>
                  {t('Our Model Context Protocol ensures quality by assessing freelancer skills and credentials')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">{t('Assessment Components')}</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {t('Technical Skills Test')}
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {t('Portfolio Review')}
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {t('Certification Verification')}
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {t('Communication Assessment')}
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {t('Previous Work Validation')}
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold">{t('Quality Assurance')}</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        {t('Minimum 4.0 rating requirement')}
                      </li>
                      <li className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        {t('Continuous performance monitoring')}
                      </li>
                      <li className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        {t('Client feedback system')}
                      </li>
                      <li className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        {t('Regular skill updates')}
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t">
                  <Button>{t('Apply as Freelancer')}</Button>
                  <Button variant="outline">{t('Learn More About Assessment')}</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FreelancerGateway;
