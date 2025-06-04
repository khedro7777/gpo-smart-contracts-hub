
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Users, Briefcase, Package } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const RoleSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  
  const roles = [
    {
      id: 'client',
      title: i18n.language === 'ar' ? 'عميل' : 'Client',
      description: i18n.language === 'ar' 
        ? 'انضم أو أنشئ مجموعات للشراء الجماعي.'
        : 'Join or create groups for collective purchasing.',
      icon: <Users className="h-8 w-8 sm:h-9 sm:w-9" />
    },
    {
      id: 'freelancer',
      title: i18n.language === 'ar' ? 'مستقل' : 'Freelancer',
      description: i18n.language === 'ar' 
        ? 'قدم مهاراتك وخدماتك للمجموعات أو الأفراد.'
        : 'Offer your skills and services to groups or individuals.',
      icon: <Briefcase className="h-8 w-8 sm:h-9 sm:w-9" />
    },
    {
      id: 'supplier',
      title: i18n.language === 'ar' ? 'مورد' : 'Supplier',
      description: i18n.language === 'ar' 
        ? 'قم بتوريد المنتجات للمجموعات واستلام طلبات العروض.'
        : 'Supply products to groups and receive RFQ.',
      icon: <Package className="h-8 w-8 sm:h-9 sm:w-9" />
    }
  ];

  const handleRoleSelect = async (roleId: string) => {
    try {
      // Simulate role selection logic
      console.log('Selected role:', roleId);
      
      toast({
        title: i18n.language === 'ar' ? 'تم اختيار الدور' : 'Role Selected',
        description: i18n.language === 'ar' 
          ? `تم اختيار دور ${roles.find(r => r.id === roleId)?.title}`
          : `Selected role: ${roles.find(r => r.id === roleId)?.title}`,
      });

      // Navigate to appropriate dashboard
      navigate(`/dashboard/${roleId}`);
    } catch (error) {
      toast({
        title: i18n.language === 'ar' ? 'خطأ' : 'Error',
        description: i18n.language === 'ar' ? 'فشل في اختيار الدور' : 'Failed to select role',
        variant: 'destructive',
      });
    }
  };
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
      {roles.map((role) => (
        <Card 
          key={role.id} 
          className="cursor-pointer hover:shadow-lg transition-all border-2 hover:border-blue-500 active:scale-95"
          onClick={() => handleRoleSelect(role.id)}
        >
          <CardHeader className="text-center pb-2 sm:pb-4">
            <div className="flex justify-center mb-3 sm:mb-4 text-blue-600">
              {role.icon}
            </div>
            <CardTitle className="text-lg sm:text-xl">{role.title}</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <CardDescription className="text-center text-sm sm:text-base leading-relaxed">
              {role.description}
            </CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RoleSelector;
