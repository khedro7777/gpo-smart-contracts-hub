
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { GatewayService } from '@/services/GatewayService';
import { User, Star, Award, Clock, DollarSign, CheckCircle, Search, Filter } from 'lucide-react';

interface ProjectRequest {
  title: string;
  description: string;
  category: string;
  budget: number;
  timeline: string;
  skills: string[];
  priority: 'low' | 'medium' | 'high';
  projectType: 'fixed' | 'hourly';
}

const FreelancerGateway: React.FC = () => {
  const { t } = useTranslation(['common', 'dashboard']);
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('browse');
  const [selectedSkill, setSelectedSkill] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [projectRequest, setProjectRequest] = useState<ProjectRequest>({
    title: '',
    description: '',
    category: '',
    budget: 0,
    timeline: '',
    skills: [],
    priority: 'medium',
    projectType: 'fixed'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const freelancerCategories = [
    {
      id: 'development',
      name: t('Software Development'),
      icon: '💻',
      skills: ['React', 'Node.js', 'Python', 'Mobile Apps', 'AI/ML', 'Blockchain'],
      avgRate: '$50-150/hr',
      available: 45,
      description: t('Full-stack developers, mobile app developers, and AI specialists')
    },
    {
      id: 'design',
      name: t('Design & Creative'),
      icon: '🎨',
      skills: ['UI/UX Design', 'Graphic Design', 'Video Editing', 'Animation', 'Branding'],
      avgRate: '$40-120/hr',
      available: 32,
      description: t('Creative professionals for all your design needs')
    },
    {
      id: 'marketing',
      name: t('Digital Marketing'),
      icon: '📈',
      skills: ['SEO', 'Social Media', 'Content Marketing', 'PPC Advertising', 'Email Marketing'],
      avgRate: '$35-100/hr',
      available: 28,
      description: t('Marketing experts to grow your business online')
    },
    {
      id: 'business',
      name: t('Business Services'),
      icon: '📊',
      skills: ['Business Analysis', 'Project Management', 'Consulting', 'Strategy', 'Operations'],
      avgRate: '$60-200/hr',
      available: 23,
      description: t('Business consultants and strategic advisors')
    },
    {
      id: 'legal',
      name: t('Legal & Compliance'),
      icon: '⚖️',
      skills: ['Contract Review', 'Corporate Law', 'IP Law', 'Compliance', 'Legal Research'],
      avgRate: '$100-300/hr',
      available: 15,
      description: t('Legal professionals for business compliance and contracts')
    },
    {
      id: 'finance',
      name: t('Finance & Accounting'),
      icon: '💰',
      skills: ['Financial Analysis', 'Bookkeeping', 'Tax Preparation', 'Auditing', 'CFO Services'],
      avgRate: '$50-150/hr',
      available: 19,
      description: t('Financial experts to manage your business finances')
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
      skills: ['React', 'Node.js', 'AWS', 'Docker'],
      verified: true,
      responseTime: '2 hours',
      avatar: '👨‍💻',
      description: 'Experienced developer with 8+ years in web development',
      availability: 'Available'
    },
    {
      id: 2,
      name: 'Sarah Chen',
      title: 'UI/UX Designer',
      rating: 4.8,
      completedProjects: 89,
      hourlyRate: 70,
      skills: ['Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research'],
      verified: true,
      responseTime: '1 hour',
      avatar: '👩‍🎨',
      description: 'Award-winning designer focused on user-centered design',
      availability: 'Available'
    },
    {
      id: 3,
      name: 'Mohammed Al-Rashid',
      title: 'Digital Marketing Expert',
      rating: 4.9,
      completedProjects: 156,
      hourlyRate: 60,
      skills: ['SEO', 'Google Ads', 'Analytics', 'Content Strategy'],
      verified: true,
      responseTime: '3 hours',
      avatar: '👨‍💼',
      description: 'Marketing strategist with proven ROI improvements',
      availability: 'Busy until Dec 15'
    },
    {
      id: 4,
      name: 'Elena Rodriguez',
      title: 'Business Consultant',
      rating: 5.0,
      completedProjects: 73,
      hourlyRate: 120,
      skills: ['Strategy', 'Process Optimization', 'Change Management', 'Leadership'],
      verified: true,
      responseTime: '4 hours',
      avatar: '👩‍💼',
      description: 'Former McKinsey consultant specializing in operational excellence',
      availability: 'Available'
    }
  ];

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const request = await GatewayService.submitRequest('freelancer', projectRequest);
      if (request) {
        toast({
          title: t('Project Posted'),
          description: t('Your project has been posted successfully'),
        });
        // Reset form
        setProjectRequest({
          title: '',
          description: '',
          category: '',
          budget: 0,
          timeline: '',
          skills: [],
          priority: 'medium',
          projectType: 'fixed'
        });
      }
    } catch (error) {
      toast({
        title: t('Error'),
        description: t('Failed to post project'),
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredFreelancers = topFreelancers.filter(freelancer => {
    const matchesSearch = freelancer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         freelancer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         freelancer.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || 
                           freelancerCategories.find(cat => cat.id === categoryFilter)?.skills.some(skill => 
                             freelancer.skills.includes(skill)
                           );
    return matchesSearch && matchesCategory;
  });

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

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="browse">{t('Browse Freelancers')}</TabsTrigger>
            <TabsTrigger value="categories">{t('Categories')}</TabsTrigger>
            <TabsTrigger value="post-project">{t('Post Project')}</TabsTrigger>
            <TabsTrigger value="my-projects">{t('My Projects')}</TabsTrigger>
            <TabsTrigger value="assessment">{t('MCP Assessment')}</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            {/* Search and Filter */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder={t('Search freelancers by name, skills, or expertise...')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="w-full md:w-48">
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger>
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder={t('All Categories')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t('All Categories')}</SelectItem>
                        {freelancerCategories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Freelancer List */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredFreelancers.map((freelancer) => (
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
                      <div className="flex flex-col items-end gap-1">
                        {freelancer.verified && (
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            {t('Verified')}
                          </Badge>
                        )}
                        <Badge variant={freelancer.availability === 'Available' ? 'default' : 'secondary'}>
                          {freelancer.availability}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600">{freelancer.description}</p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{freelancer.rating}</span>
                        <span className="text-gray-500">({freelancer.completedProjects} {t('projects')})</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{freelancer.responseTime}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {freelancer.skills.slice(0, 4).map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {freelancer.skills.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{freelancer.skills.length - 4} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span className="font-semibold">${freelancer.hourlyRate}/hr</span>
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

            {filteredFreelancers.length === 0 && (
              <div className="text-center py-8">
                <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {t('No freelancers found')}
                </h3>
                <p className="text-gray-600">
                  {t('Try adjusting your search criteria or browse different categories')}
                </p>
              </div>
            )}
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
                    <p className="text-sm text-gray-600">{category.description}</p>
                    
                    <div className="flex flex-wrap gap-1">
                      {category.skills.slice(0, 4).map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {category.skills.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{category.skills.length - 4} more
                        </Badge>
                      )}
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

          <TabsContent value="post-project" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('Post a New Project')}</CardTitle>
                <CardDescription>
                  {t('Describe your project requirements and get proposals from qualified freelancers')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProjectSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="projectTitle">{t('Project Title')}</Label>
                      <Input
                        id="projectTitle"
                        placeholder={t('Enter a clear project title')}
                        value={projectRequest.title}
                        onChange={(e) => setProjectRequest(prev => ({ ...prev, title: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">{t('Category')}</Label>
                      <Select value={projectRequest.category} onValueChange={(value) => setProjectRequest(prev => ({ ...prev, category: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder={t('Select category')} />
                        </SelectTrigger>
                        <SelectContent>
                          {freelancerCategories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              <div className="flex items-center gap-2">
                                <span>{category.icon}</span>
                                <span>{category.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">{t('Project Description')}</Label>
                    <Textarea
                      id="description"
                      placeholder={t('Provide detailed project requirements, deliverables, and expectations')}
                      value={projectRequest.description}
                      onChange={(e) => setProjectRequest(prev => ({ ...prev, description: e.target.value }))}
                      rows={6}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="budget">{t('Budget')} ($)</Label>
                      <Input
                        id="budget"
                        type="number"
                        min="0"
                        value={projectRequest.budget}
                        onChange={(e) => setProjectRequest(prev => ({ ...prev, budget: parseFloat(e.target.value) }))}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timeline">{t('Timeline')}</Label>
                      <Input
                        id="timeline"
                        placeholder={t('e.g., 2-3 weeks')}
                        value={projectRequest.timeline}
                        onChange={(e) => setProjectRequest(prev => ({ ...prev, timeline: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="priority">{t('Priority')}</Label>
                      <Select value={projectRequest.priority} onValueChange={(value: any) => setProjectRequest(prev => ({ ...prev, priority: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">{t('Low')}</SelectItem>
                          <SelectItem value="medium">{t('Medium')}</SelectItem>
                          <SelectItem value="high">{t('High')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button type="submit" disabled={isSubmitting} className="flex-1">
                      {isSubmitting ? t('Posting...') : t('Post Project')}
                    </Button>
                    <Button type="button" variant="outline">
                      {t('Save as Draft')}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="my-projects">
            <Card>
              <CardHeader>
                <CardTitle>{t('My Projects')}</CardTitle>
                <CardDescription>
                  {t('Manage your posted projects and track progress')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">{t('No projects posted yet')}</p>
                </div>
              </CardContent>
            </Card>
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
