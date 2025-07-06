
import { 
  ShoppingCart, 
  Megaphone, 
  Building, 
  Briefcase, 
  TrendingUp 
} from 'lucide-react';
import { GatewayConfig } from '@/types/gateway';

export const gatewayConfigs: GatewayConfig[] = [
  {
    id: 'procurement',
    title: 'بوابة المشتريات',
    description: 'منصة للشراء الجماعي والحصول على أسعار أفضل',
    icon: ShoppingCart,
    color: 'border-l-blue-500',
    href: '/gateways/procurement',
    requiresKyc: true,
    requiresPoints: true,
    tier: 'premium'
  },
  {
    id: 'marketing',
    title: 'بوابة التسويق',
    description: 'تنسيق الحملات التسويقية المشتركة',
    icon: Megaphone,
    color: 'border-l-green-500',
    href: '/gateways/marketing',
    requiresPoints: true,
    tier: 'basic'
  },
  {
    id: 'company-formation',
    title: 'بوابة تأسيس الشركات',
    description: 'خدمات تأسيس وإدارة الشركات',
    icon: Building,
    color: 'border-l-purple-500',
    href: '/gateways/company-formation',
    requiresKyc: true,
    requiresMcp: true,
    tier: 'enterprise'
  },
  {
    id: 'freelancer',
    title: 'بوابة العمل الحر',
    description: 'منصة للمستقلين وأصحاب الأعمال',
    icon: Briefcase,
    color: 'border-l-orange-500',
    href: '/gateways/freelancer',
    tier: 'basic'
  },
  {
    id: 'investment',
    title: 'بوابة الاستثمار',
    description: 'فرص استثمارية وإدارة المحافظ',
    icon: TrendingUp,
    color: 'border-l-red-500',
    href: '/gateways/investment',
    requiresKyc: true,
    requiresPoints: true,
    tier: 'premium'
  }
];

// Mock data for active groups
export const mockActiveGroups = {
  procurement: [
    {
      id: '1',
      name: 'مجموعة شراء المعدات التقنية',
      description: 'شراء جماعي للحاسوب والمعدات التقنية',
      currentPhase: 'seeking_members',
      memberCount: 8,
      status: 'seeking_members',
      gatewayType: 'procurement',
      maxMembers: 20,
      pointsRequired: 50
    },
    {
      id: '2',
      name: 'مجموعة شراء المواد الغذائية',
      description: 'توريد المواد الغذائية بالجملة',
      currentPhase: 'negotiation',
      memberCount: 15,
      status: 'active',
      gatewayType: 'procurement',
      maxMembers: 25,
      pointsRequired: 100
    }
  ],
  marketing: [
    {
      id: '3',
      name: 'حملة التسويق الرقمي المشتركة',
      description: 'تنسيق حملات إعلانية مشتركة',
      currentPhase: 'active',
      memberCount: 12,
      status: 'active',
      gatewayType: 'marketing',
      maxMembers: 15,
      pointsRequired: 75
    }
  ],
  'company-formation': [
    {
      id: '4',
      name: 'مجموعة تأسيس الشركات التقنية',
      description: 'تأسيس شركات في القطاع التقني',
      currentPhase: 'formation',
      memberCount: 5,
      status: 'seeking_members',
      gatewayType: 'company-formation',
      maxMembers: 10,
      pointsRequired: 200
    }
  ],
  freelancer: [
    {
      id: '5',
      name: 'مجموعة المطورين المستقلين',
      description: 'شبكة المطورين للمشاريع المشتركة',
      currentPhase: 'recruitment',
      memberCount: 20,
      status: 'active',
      gatewayType: 'freelancer',
      maxMembers: 30,
      pointsRequired: 25
    }
  ],
  investment: [
    {
      id: '6',
      name: 'مجموعة الاستثمار في التكنولوجيا',
      description: 'استثمارات جماعية في الشركات التقنية',
      currentPhase: 'negotiation',
      memberCount: 7,
      status: 'active',
      gatewayType: 'investment',
      maxMembers: 12,
      pointsRequired: 500
    }
  ]
};
