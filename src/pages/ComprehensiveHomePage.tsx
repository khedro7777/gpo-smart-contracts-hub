
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/layout/Header';
import GatewayPortal from '@/components/gateways/GatewayPortal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  TrendingUp, 
  Building2, 
  DollarSign,
  Factory,
  UserCheck,
  Users,
  Package,
  List,
  Scale,
  FileText,
  MessageSquare,
  ArrowRight,
  Globe,
  Shield,
  Zap,
  Award
} from 'lucide-react';
import { GatewayConfig, ActiveGroup } from '@/types/gateway';

const ComprehensiveHomePage = () => {
  const { language, direction } = useLanguage();

  // Sample active groups data for each portal
  const sampleGroups: Record<string, ActiveGroup[]> = {
    procurement: [
      {
        id: '1',
        name: language === 'ar' ? 'مجموعة شراء المعدات الطبية' : 'Medical Equipment Procurement Group',
        description: language === 'ar' ? 'شراء جماعي للمعدات الطبية بأسعار مخفضة' : 'Bulk purchase of medical equipment at reduced prices',
        currentPhase: 'recruitment',
        memberCount: 8,
        maxMembers: 15,
        status: 'seeking_members',
        gatewayType: 'procurement',
        pointsRequired: 100,
        kycRequired: true
      },
      {
        id: '2',
        name: language === 'ar' ? 'مجموعة شراء البرمجيات' : 'Software Licensing Group',
        description: language === 'ar' ? 'تراخيص البرمجيات للشركات الصغيرة' : 'Software licenses for small businesses',
        currentPhase: 'negotiation',
        memberCount: 12,
        maxMembers: 20,
        status: 'active',
        gatewayType: 'procurement',
        pointsRequired: 150
      }
    ],
    marketing: [
      {
        id: '3',
        name: language === 'ar' ? 'حملة التسويق الرقمي المشتركة' : 'Joint Digital Marketing Campaign',
        description: language === 'ar' ? 'حملة تسويقية مشتركة للشركات الناشئة' : 'Joint marketing campaign for startups',
        currentPhase: 'formation',
        memberCount: 5,
        maxMembers: 10,
        status: 'seeking_members',
        gatewayType: 'marketing',
        pointsRequired: 200
      }
    ],
    'company-formation': [
      {
        id: '4',
        name: language === 'ar' ? 'تأسيس شركة تقنية في دبي' : 'Tech Company Formation in Dubai',
        description: language === 'ar' ? 'تأسيس شركة تقنية مشتركة في دبي' : 'Joint tech company formation in Dubai',
        currentPhase: 'formation',
        memberCount: 3,
        maxMembers: 5,
        status: 'seeking_members',
        gatewayType: 'company_formation'
      }
    ]
  };

  const gateways: GatewayConfig[] = [
    {
      id: 'procurement',
      title: language === 'ar' ? 'الشراء التعاوني' : 'Cooperative Purchasing',
      description: language === 'ar' ? 'الشراء الجماعي مع اتفاقيات إطار للحصول على أسعار أفضل' : 'Aggregated procurement with framework agreements for better prices',
      icon: ShoppingCart,
      color: 'border-l-blue-500',
      href: '/gateways/procurement',
      requiresKyc: true,
      requiresPoints: true,
      tier: 'premium'
    },
    {
      id: 'marketing',
      title: language === 'ar' ? 'التسويق التعاوني' : 'Cooperative Marketing',
      description: language === 'ar' ? 'شراكات التسويق الاستراتيجي والحملات المشتركة' : 'Strategic marketing partnerships and joint campaigns',
      icon: TrendingUp,
      color: 'border-l-green-500',
      href: '/gateways/marketing',
      requiresKyc: true,
      requiresPoints: true,
      tier: 'basic'
    },
    {
      id: 'company-formation',
      title: language === 'ar' ? 'تأسيس الشركات' : 'Company Formation',
      description: language === 'ar' ? 'دخول السوق واختيار الولاية القضائية المناسبة' : 'Market entry and jurisdiction selection',
      icon: Building2,
      color: 'border-l-purple-500',
      href: '/gateways/company-formation',
      requiresKyc: false,
      requiresPoints: false,
      tier: 'enterprise'
    },
    {
      id: 'investment',
      title: language === 'ar' ? 'مجموعات الاستثمار' : 'Investment Groups',
      description: language === 'ar' ? 'الاستثمار التعاوني وإدارة الشركات المشتركة' : 'Collaborative investment and joint company management',
      icon: DollarSign,
      color: 'border-l-emerald-500',
      href: '/gateways/investment',
      requiresKyc: true,
      requiresPoints: true,
      tier: 'premium'
    },
    {
      id: 'suppliers',
      title: language === 'ar' ? 'الموردون' : 'Suppliers',
      description: language === 'ar' ? 'البحث عن الموردين والعناية الواجبة' : 'Supplier sourcing and due diligence',
      icon: Factory,
      color: 'border-l-red-500',
      href: '/gateways/suppliers',
      requiresKyc: true,
      requiresPoints: true,
      tier: 'premium'
    },
    {
      id: 'freelancer',
      title: language === 'ar' ? 'المستقلون' : 'Freelancers',
      description: language === 'ar' ? 'اقتصاد العمل الحر والاستشاري' : 'Freelance and advisory economy',
      icon: UserCheck,
      color: 'border-l-orange-500',
      href: '/gateways/freelancer',
      requiresKyc: false,
      requiresPoints: false,
      requiresMcp: true,
      tier: 'basic'
    },
    {
      id: 'freelancer-groups',
      title: language === 'ar' ? 'مجموعات المستقلين' : 'Freelancer Groups',
      description: language === 'ar' ? 'مجموعات تعاونية للمستقلين والخبراء' : 'Collaborative groups for freelancers and experts',
      icon: Users,
      color: 'border-l-cyan-500',
      href: '/gateways/freelancer-groups',
      requiresKyc: false,
      requiresPoints: false,
      requiresMcp: true,
      tier: 'basic'
    },
    {
      id: 'service-providers',
      title: language === 'ar' ? 'مقدمو الخدمات' : 'Service Providers',
      description: language === 'ar' ? 'منصة لمقدمي الخدمات المهنية' : 'Platform for professional service providers',
      icon: Package,
      color: 'border-l-indigo-500',
      href: '/gateways/service-providers',
      requiresKyc: false,
      requiresPoints: false,
      tier: 'free'
    },
    {
      id: 'product-listings',
      title: language === 'ar' ? 'قوائم المنتجات' : 'Product Listings',
      description: language === 'ar' ? 'عرض وتداول المنتجات والخدمات' : 'Product and service listings and trading',
      icon: List,
      color: 'border-l-pink-500',
      href: '/gateways/product-listings',
      requiresKyc: false,
      requiresPoints: false,
      tier: 'free'
    },
    {
      id: 'arbitration',
      title: language === 'ar' ? 'التحكيم والتوثيق' : 'Arbitration & Documentation',
      description: language === 'ar' ? 'حل النزاعات والأدلة الرقمية - ORDA' : 'Conflict resolution and digital evidence - ORDA',
      icon: Scale,
      color: 'border-l-amber-500',
      href: '/gateways/arbitration',
      requiresKyc: false,
      requiresPoints: false,
      tier: 'free'
    },
    {
      id: 'arbitration-requests',
      title: language === 'ar' ? 'طلبات التحكيم' : 'Arbitration Requests',
      description: language === 'ar' ? 'تقديم طلبات التحكيم وإدارة القضايا' : 'Submit arbitration requests and manage cases',
      icon: FileText,
      color: 'border-l-violet-500',
      href: '/gateways/arbitration-requests',
      requiresKyc: false,
      requiresPoints: false,
      tier: 'free'
    },
    {
      id: 'smart-negotiation',
      title: language === 'ar' ? 'حلول التفاوض الذكية' : 'Smart Negotiation Solutions',
      description: language === 'ar' ? 'أدوات التفاوض الذكية والوساطة' : 'Smart negotiation tools and mediation',
      icon: MessageSquare,
      color: 'border-l-teal-500',
      href: '/gateways/smart-negotiation',
      requiresKyc: false,
      requiresPoints: false,
      tier: 'free'
    }
  ];

  const stats = [
    {
      label: language === 'ar' ? 'مجموعات نشطة' : 'Active Groups',
      value: '2,547',
      icon: Users
    },
    {
      label: language === 'ar' ? 'النطاق العالمي' : 'Global Reach',
      value: '127',
      suffix: language === 'ar' ? 'دولة' : 'Countries',
      icon: Globe
    },
    {
      label: language === 'ar' ? 'معدل النجاح' : 'Success Rate',
      value: '94.2%',
      icon: Shield
    },
    {
      label: language === 'ar' ? 'الحجم الإجمالي' : 'Total Volume',
      value: '$2.4B',
      icon: TrendingUp
    }
  ];

  return (
    <div className={`min-h-screen bg-gray-50 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8">
            <Badge variant="outline" className="mb-4 text-white border-white">
              <Award className="h-4 w-4 mr-2" />
              {language === 'ar' ? 'معتمد ISO 44001 - قانون التجارة الدولي' : 'ISO 44001 Certified - International Commercial Law'}
            </Badge>
            <h1 className="text-5xl font-bold mb-6">
              {language === 'ar' ? 'منصة GPO الشاملة' : 'Comprehensive GPO Platform'}
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              {language === 'ar' 
                ? 'منصة التعاون التجاري المهنية للشراء الجماعي والتسويق التعاوني وتأسيس الشركات العالمية'
                : 'Professional business collaboration platform for collective purchasing, cooperative marketing, and global company formation'
              }
            </p>
            <Link to="/signup">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Zap className="mr-2 h-5 w-5" />
                {language === 'ar' ? 'ابدأ الآن' : 'Get Started'}
                <ArrowRight className={`h-5 w-5 ${direction === 'rtl' ? 'mr-2 rotate-180' : 'ml-2'}`} />
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-2">
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-2xl font-bold">
                  {stat.value}
                  {stat.suffix && <span className="text-sm opacity-80 ml-1">{stat.suffix}</span>}
                </div>
                <div className="text-sm opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Portals Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              {language === 'ar' ? 'البوابات الرئيسية (12 بوابة)' : 'Main Portals (12 Portals)'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {language === 'ar' 
                ? 'منظمة وفقاً للقانون التجاري الدولي (UNCITRAL, ICC, ISO 44001)'
                : 'Organized according to International Commercial Law (UNCITRAL, ICC, ISO 44001)'
              }
            </p>
          </div>

          <div className="space-y-16">
            {gateways.map((gateway, index) => (
              <GatewayPortal 
                key={index} 
                config={gateway}
                activeGroups={sampleGroups[gateway.id] || []}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'ar' ? 'مستعد لتحويل أعمالك؟' : 'Ready to Transform Your Business?'}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {language === 'ar' 
              ? 'انضم إلى آلاف الشركات التي تستفيد من التعاون الذكي للنجاح العالمي'
              : 'Join thousands of businesses leveraging smart collaboration for global success'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" variant="secondary" className="text-gray-900 hover:text-gray-900">
                {language === 'ar' ? 'ابدأ النسخة التجريبية' : 'Start Free Trial'}
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                {language === 'ar' ? 'تعرف أكثر' : 'Learn More'}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">
                {language === 'ar' ? 'منصة GPO' : 'GPO Platform'}
              </h3>
              <p className="text-gray-400 text-sm">
                {language === 'ar' 
                  ? 'منصة التعاون التجاري المهنية المعتمدة دولياً'
                  : 'Internationally certified professional business collaboration platform'
                }
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">
                {language === 'ar' ? 'روابط سريعة' : 'Quick Links'}
              </h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/about" className="hover:text-white">{language === 'ar' ? 'من نحن' : 'About Us'}</Link></li>
                <li><Link to="/how-it-works" className="hover:text-white">{language === 'ar' ? 'كيف تعمل' : 'How It Works'}</Link></li>
                <li><Link to="/support" className="hover:text-white">{language === 'ar' ? 'الدعم' : 'Support'}</Link></li>
                <li><Link to="/contact" className="hover:text-white">{language === 'ar' ? 'اتصل بنا' : 'Contact'}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">
                {language === 'ar' ? 'الدعم' : 'Support'}
              </h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/support" className="hover:text-white">{language === 'ar' ? 'مركز المساعدة' : 'Help Center'}</Link></li>
                <li><Link to="/contact" className="hover:text-white">{language === 'ar' ? 'اتصل بنا' : 'Contact Us'}</Link></li>
                <li><Link to="/tickets" className="hover:text-white">{language === 'ar' ? 'التذاكر' : 'Tickets'}</Link></li>
                <li><Link to="/chat" className="hover:text-white">{language === 'ar' ? 'الدردشة الآلية' : 'Chat Bot'}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">
                {language === 'ar' ? 'السياسات' : 'Policies'}
              </h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/privacy" className="hover:text-white">{language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}</Link></li>
                <li><Link to="/terms" className="hover:text-white">{language === 'ar' ? 'شروط الاستخدام' : 'Terms of Service'}</Link></li>
                <li><Link to="/sitemap" className="hover:text-white">{language === 'ar' ? 'خريطة الموقع' : 'Sitemap'}</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 GPO Platform. {language === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ComprehensiveHomePage;
