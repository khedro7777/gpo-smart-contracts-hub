
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/utils/translations';
import { useNavigate } from 'react-router-dom';

const RoleSelector: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  const roles = [
    {
      id: 'client',
      title: t('client', language),
      description: language === 'en' 
        ? 'Join or create groups for collective purchasing.'
        : 'انضم أو أنشئ مجموعات للشراء الجماعي.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
      )
    },
    {
      id: 'freelancer',
      title: t('freelancer', language),
      description: language === 'en' 
        ? 'Offer your skills and services to groups or individuals.'
        : 'قدم مهاراتك وخدماتك للمجموعات أو الأفراد.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-briefcase"><rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
      )
    },
    {
      id: 'supplier',
      title: t('supplier', language),
      description: language === 'en' 
        ? 'Supply products to groups and receive RFQ.'
        : 'قم بتوريد المنتجات للمجموعات واستلام طلبات العروض.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-package"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
      )
    }
  ];

  const handleRoleSelect = (roleId: string) => {
    navigate(`/dashboard/${roleId}`);
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {roles.map((role) => (
        <Card 
          key={role.id} 
          className="cursor-pointer hover:shadow-md transition-all border-2 hover:border-gpo-blue"
          onClick={() => handleRoleSelect(role.id)}
        >
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4 text-gpo-blue">
              {role.icon}
            </div>
            <CardTitle>{role.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center">
              {role.description}
            </CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RoleSelector;
