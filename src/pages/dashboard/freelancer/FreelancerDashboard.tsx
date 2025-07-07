
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import FreelancerDashboard from '@/components/dashboard/FreelancerDashboard';
import { useLanguage } from '@/contexts/LanguageContext';

const FreelancerDashboardPage = () => {
  const { language } = useLanguage();
  const [stats, setStats] = useState({
    totalProjects: 15,
    activeProjects: 4,
    completedProjects: 11,
    totalEarnings: 25000,
    averageRating: 4.8,
    completionRate: 95,
    responseTime: '2h',
    clientSatisfaction: 96
  });

  const [projects, setProjects] = useState([
    {
      id: '1',
      title: language === 'ar' ? 'تطوير موقع تجاري' : 'E-commerce Website Development',
      client: language === 'ar' ? 'شركة التقنية المتقدمة' : 'Advanced Tech Solutions',
      description: language === 'ar' ? 'تطوير موقع تجارة إلكترونية متكامل' : 'Full-stack e-commerce platform development',
      budget: 5000,
      deadline: '2024-02-15',
      status: 'active' as const,
      progress: 65,
      category: 'web-development',
      skills: ['React', 'Node.js', 'MongoDB']
    },
    {
      id: '2',
      title: language === 'ar' ? 'تصميم هوية بصرية' : 'Brand Identity Design',
      client: language === 'ar' ? 'مؤسسة الإبداع' : 'Creative Enterprise',
      description: language === 'ar' ? 'تصميم هوية بصرية شاملة للعلامة التجارية' : 'Complete brand identity design package',
      budget: 3000,
      deadline: '2024-01-30',
      status: 'completed' as const,
      progress: 100,
      category: 'design',
      skills: ['Figma', 'Adobe Creative Suite', 'Branding']
    },
    {
      id: '3',
      title: language === 'ar' ? 'حملة تسويقية رقمية' : 'Digital Marketing Campaign',
      client: language === 'ar' ? 'شركة النمو' : 'Growth Company',
      description: language === 'ar' ? 'إدارة حملة تسويقية شاملة على وسائل التواصل' : 'Comprehensive social media marketing campaign',
      budget: 2500,
      deadline: '2024-03-01',
      status: 'pending' as const,
      progress: 25,
      category: 'marketing',
      skills: ['Social Media', 'SEO', 'Content Marketing']
    }
  ]);

  const handleUpdateProject = (projectId: string, updates: any) => {
    setProjects(prevProjects => 
      prevProjects.map(project => 
        project.id === projectId 
          ? { ...project, ...updates }
          : project
      )
    );
  };

  const handleApplyToProject = (projectId: string) => {
    console.log('Applied to project:', projectId);
    // إضافة منطق التقديم للمشروع
  };

  const handleWithdrawApplication = (projectId: string) => {
    console.log('Withdrew application from project:', projectId);
    // إضافة منطق سحب التقديم
  };

  return (
    <DashboardLayout role="freelancer">
      <FreelancerDashboard
        freelancerId="current-freelancer-id"
        stats={stats}
        projects={projects}
        onUpdateProject={handleUpdateProject}
        onApplyToProject={handleApplyToProject}
        onWithdrawApplication={handleWithdrawApplication}
      />
    </DashboardLayout>
  );
};

export default FreelancerDashboardPage;
