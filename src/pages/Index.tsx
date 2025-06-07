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
  Zap,
  Bot,
  MessageSquare,
  FileText
} from 'lucide-react';

const Index = () => {
  const { language } = useLanguage();

  return (
    <Layout>
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
              <Link to="/modern-workspace">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
                  <Bot className="mr-2 h-5 w-5" />
                  {language === 'en' ? 'AI Workspace' : 'مساحة العمل الذكية'}
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="outline" size="lg" className="text-gray-900 hover:text-gray-900 border-gray-300 hover:bg-gray-50">
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

      {/* AI Assistant Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              {language === 'en' ? 'Intelligent Business Assistant' : 'المساعد الذكي للأعمال'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {language === 'en' 
                ? 'AI-powered tools for automated procurement, smart negotiations, and business intelligence'
                : 'أدوات ذكية للمشتريات الآلية والمفاوضات الذكية وذكاء الأعمال'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="text-center">
              <CardHeader>
                <MessageSquare className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>{language === 'en' ? 'Auto Mode' : 'الوضع التلقائي'}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  {language === 'en' 
                    ? 'Automated procurement and supplier management'
                    : 'إدارة المشتريات والموردين بشكل تلقائي'
                  }
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <Bot className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>{language === 'en' ? 'AI Mode' : 'الوضع الذكي'}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  {language === 'en' 
                    ? 'AI-powered insights and recommendations'
                    : 'رؤى وتوصيات مدعومة بالذكاء الاصطناعي'
                  }
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>{language === 'en' ? 'Manual Mode' : 'الوضع اليدوي'}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  {language === 'en' 
                    ? 'Full control over business processes'
                    : 'تحكم كامل في العمليات التجارية'
                  }
                </p>
              </CardContent>
            </Card>
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
              <Button variant="outline" className="text-gray-900 hover:text-gray-900 border-gray-300 hover:bg-gray-50">
                {language === 'en' ? 'View All Opportunities' : 'عرض جميع الفرص'}
                <ArrowRight className={`h-4 w-4 ${direction === 'rtl' ? 'mr-2 rotate-180' : 'ml-2'}`} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {language === 'en' ? 'Our Services' : 'خدماتنا'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'en' 
                ? 'Comprehensive business solutions including traditional and blockchain-based contract management'
                : 'حلول الأعمال الشاملة بما في ذلك إدارة العقود التقليدية والقائمة على البلوك تشين'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              icon={<FileText className="h-8 w-8" />}
              title={language === 'en' ? 'Contract Management' : 'إدارة العقود'}
              description={language === 'en' 
                ? 'Traditional and Web3 contract formation with legal compliance'
                : 'تشكيل العقود التقليدية و Web3 مع الامتثال القانوني'
              }
              link="/contracts"
            />
            
            <ServiceCard
              icon={<Building2 className="h-8 w-8" />}
              title={language === 'en' ? 'Company Formation' : 'تأسيس الشركات'}
              description={language === 'en' 
                ? 'Multi-jurisdiction company incorporation services'
                : 'خدمات تأسيس الشركات متعددة الاختصاصات'
              }
              link="/services/company-incorporation"
            />

            {/* ... keep existing service cards */}
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
              <Button size="lg" variant="secondary" className="text-gray-900 hover:text-gray-900">
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
    </Layout>
  );
};

export default Index;
