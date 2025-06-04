
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/utils/translations';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import GPOMachine from '@/components/GPOMachine';
import { 
  ShoppingCart, 
  Users, 
  Building2, 
  UserCheck, 
  Factory, 
  Scale,
  ArrowRight,
  Globe,
  TrendingUp,
  Shield,
  Zap
} from 'lucide-react';

const Index = () => {
  const { language, direction } = useLanguage();

  const gateways = [
    {
      id: 'group_buying',
      title: language === 'en' ? 'Group Buying' : 'الشراء التعاوني',
      description: language === 'en' ? 'Aggregated Procurement with Framework Agreements' : 'الشراء الجماعي باتفاقيات إطار',
      icon: ShoppingCart,
      color: 'bg-blue-500',
      href: '/dashboard/client/groups',
      framework: language === 'en' ? 'Framework Agreements' : 'اتفاقيات إطار',
      standard: 'ISO 44001'
    },
    {
      id: 'cooperative_marketing',
      title: language === 'en' ? 'Cooperative Marketing' : 'التسويق التعاوني',
      description: language === 'en' ? 'Strategic Marketing Partnerships' : 'شراكات التسويق الاستراتيجي',
      icon: TrendingUp,
      color: 'bg-green-500',
      href: '/dashboard/client/groups',
      framework: language === 'en' ? 'LOIs - MOUs' : 'خطابات نوايا - مذكرات تفاهم',
      standard: 'WTO'
    },
    {
      id: 'company_formation',
      title: language === 'en' ? 'Company Formation' : 'تأسيس الشركات',
      description: language === 'en' ? 'Market Entry & Jurisdiction Selection' : 'دخول السوق واختيار الولاية القضائية',
      icon: Building2,
      color: 'bg-purple-500',
      href: '/services/company-incorporation',
      framework: language === 'en' ? 'Companies Act + Delaware + GAFI' : 'قانون الشركات + ديلاوير + هيئة الاستثمار',
      standard: 'Harvard Business'
    },
    {
      id: 'freelancers',
      title: language === 'en' ? 'Freelancers' : 'المستقلون',
      description: language === 'en' ? 'Freelance & Advisory Economy' : 'اقتصاد العمل الحر والاستشاري',
      icon: UserCheck,
      color: 'bg-orange-500',
      href: '/dashboard/freelancer-management',
      framework: language === 'en' ? 'SLA + Time-based Contracts' : 'اتفاقيات مستوى خدمة + عقود زمنية',
      standard: 'MCP Assessment'
    },
    {
      id: 'suppliers',
      title: language === 'en' ? 'Suppliers' : 'الموردون',
      description: language === 'en' ? 'Supplier Sourcing & Due Diligence' : 'البحث عن الموردين والعناية الواجبة',
      icon: Factory,
      color: 'bg-red-500',
      href: '/dashboard/supplier',
      framework: language === 'en' ? 'RFQs + ITT' : 'طلبات عروض أسعار + دعوات للعطاء',
      standard: 'KYC - Vendor Due Diligence'
    },
    {
      id: 'arbitration',
      title: language === 'en' ? 'Arbitration & Documentation' : 'التحكيم والتوثيق',
      description: language === 'en' ? 'Conflict Resolution & Digital Evidence' : 'حل النزاعات والأدلة الرقمية',
      icon: Scale,
      color: 'bg-indigo-500',
      href: '/services/arbitration',
      framework: language === 'en' ? 'ORDA + UNCITRAL + IPFS' : 'ORDA + أونسيترال + IPFS',
      standard: 'ICC International'
    }
  ];

  const stats = [
    {
      label: language === 'en' ? 'Active Groups' : 'مجموعات نشطة',
      value: '2,547',
      icon: Users
    },
    {
      label: language === 'en' ? 'Global Reach' : 'النطاق العالمي',
      value: '127',
      suffix: language === 'en' ? 'Countries' : 'دولة',
      icon: Globe
    },
    {
      label: language === 'en' ? 'Success Rate' : 'معدل النجاح',
      value: '94.2%',
      icon: Shield
    },
    {
      label: language === 'en' ? 'Total Volume' : 'الحجم الإجمالي',
      value: '$2.4B',
      icon: TrendingUp
    }
  ];

  return (
    <Layout>
      <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-white ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
        
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl text-center">
            <div className="mb-8">
              <Badge variant="outline" className="mb-4 text-gpo-blue border-gpo-blue">
                {language === 'en' ? 'Harvard Business School Methodology' : 'منهجية كلية هارفارد للأعمال'}
              </Badge>
              <h1 className="text-5xl font-bold mb-6 text-gray-900">
                {language === 'en' ? 'Unified Smart Collaboration Hub' : 'مركز التعاون الذكي الموحد'}
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                {language === 'en' 
                  ? 'Professional business collaboration platform for collective purchasing, cooperative marketing, and global company formation using international trade standards.' 
                  : 'منصة تعاون الأعمال المهنية للشراء الجماعي والتسويق التعاوني وتأسيس الشركات العالمية باستخدام معايير التجارة الدولية.'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/workspace">
                  <Button size="lg" className="bg-gpo-blue hover:bg-gpo-blue/90 text-white">
                    <Zap className="mr-2 h-5 w-5" />
                    {language === 'en' ? 'Enter Workspace' : 'دخول مساحة العمل'}
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button variant="outline" size="lg">
                    {language === 'en' ? 'Get Started' : 'ابدأ الآن'}
                    <ArrowRight className={`h-5 w-5 ${direction === 'rtl' ? 'mr-2 rotate-180' : 'ml-2'}`} />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <stat.icon className="h-8 w-8 text-gpo-blue" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {stat.value}
                    {stat.suffix && <span className="text-sm text-gray-600 ml-1">{stat.suffix}</span>}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gateways Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">
                {language === 'en' ? 'Professional Business Gateways' : 'بوابات الأعمال المهنية'}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {language === 'en' 
                  ? 'Structured according to Harvard Business School methodologies and WTO trade rules'
                  : 'منظمة وفقاً لمنهجيات كلية هارفارد للأعمال وقواعد التجارة العالمية'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gateways.map((gateway) => (
                <Link key={gateway.id} to={gateway.href}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 border-l-4 border-l-transparent hover:border-l-gpo-blue group">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-lg ${gateway.color} text-white group-hover:scale-110 transition-transform`}>
                          <gateway.icon className="h-6 w-6" />
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {gateway.standard}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg group-hover:text-gpo-blue transition-colors">
                        {gateway.title}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {gateway.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xs text-gray-500 mb-2">
                        {language === 'en' ? 'Legal Framework:' : 'الإطار القانوني:'}
                      </div>
                      <div className="text-sm font-medium text-gray-700">
                        {gateway.framework}
                      </div>
                      <div className="mt-4 flex items-center text-gpo-blue text-sm font-medium">
                        {language === 'en' ? 'Explore' : 'استكشف'}
                        <ArrowRight className={`h-4 w-4 ${direction === 'rtl' ? 'mr-1 rotate-180' : 'ml-1'} group-hover:translate-x-1 transition-transform`} />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Active Groups Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">
                {language === 'en' ? 'Active Opportunities' : 'الفرص النشطة'}
              </h2>
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'Join active groups or discover new collaboration opportunities'
                  : 'انضم إلى المجموعات النشطة أو اكتشف فرص تعاون جديدة'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-blue-500" />
                    {language === 'en' ? 'Looking for Members' : 'تبحث عن أعضاء'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600 mb-2">247</div>
                  <p className="text-sm text-gray-600">
                    {language === 'en' ? 'Groups seeking new members' : 'مجموعات تبحث عن أعضاء جدد'}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Factory className="h-5 w-5 mr-2 text-red-500" />
                    {language === 'en' ? 'Need Suppliers' : 'تحتاج موردين'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600 mb-2">156</div>
                  <p className="text-sm text-gray-600">
                    {language === 'en' ? 'Active RFQ processes' : 'عمليات طلب عروض نشطة'}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <UserCheck className="h-5 w-5 mr-2 text-orange-500" />
                    {language === 'en' ? 'Seeking Freelancers' : 'تبحث عن مستقلين'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600 mb-2">89</div>
                  <p className="text-sm text-gray-600">
                    {language === 'en' ? 'Projects requiring expertise' : 'مشاريع تتطلب خبرة'}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-8">
              <Link to="/dashboard/client/groups">
                <Button variant="outline">
                  {language === 'en' ? 'View All Opportunities' : 'عرض جميع الفرص'}
                  <ArrowRight className={`h-4 w-4 ${direction === 'rtl' ? 'mr-2 rotate-180' : 'ml-2'}`} />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-4 bg-gradient-to-r from-gpo-blue to-purple-600 text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-4">
              {language === 'en' ? 'Ready to Transform Your Business?' : 'مستعد لتحويل أعمالك؟'}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {language === 'en' 
                ? 'Join thousands of businesses leveraging smart collaboration for global success'
                : 'انضم إلى آلاف الشركات التي تستفيد من التعاون الذكي للنجاح العالمي'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" variant="secondary">
                  {language === 'en' ? 'Start Free Trial' : 'ابدأ النسخة التجريبية'}
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gpo-blue">
                  {language === 'en' ? 'Learn More' : 'تعرف أكثر'}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* MCP Box */}
        <GPOMachine />
      </div>
    </Layout>
  );
};

export default Index;
