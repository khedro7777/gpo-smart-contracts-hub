
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  ShoppingCart, 
  Megaphone, 
  Building2, 
  User, 
  TrendingUp, 
  Users, 
  Globe,
  Star,
  ArrowRight,
  DollarSign
} from 'lucide-react';

const GatewaysPage = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const gateways = [
    {
      id: 'procurement',
      title: language === 'ar' ? 'الشراء التعاوني' : 'Procurement Gateway',
      description: language === 'ar' 
        ? 'انضم لمجموعات الشراء التعاوني لتحقيق أسعار أفضل وتوفير التكاليف'
        : 'Join group purchasing to achieve better prices and cost savings',
      icon: ShoppingCart,
      color: 'bg-blue-500',
      features: [
        language === 'ar' ? 'توفير 15-30% في المتوسط' : 'Average 15-30% savings',
        language === 'ar' ? 'موردين معتمدين' : 'Verified suppliers',
        language === 'ar' ? 'شراء جماعي منظم' : 'Organized group buying'
      ],
      stats: {
        activeGroups: 24,
        totalSavings: '$2.4M',
        members: '1,200+'
      },
      path: '/gateways/procurement',
      comingSoon: false
    },
    {
      id: 'marketing',
      title: language === 'ar' ? 'التسويق التعاوني' : 'Marketing Gateway',
      description: language === 'ar'
        ? 'تعاون في الحملات التسويقية لتقليل التكاليف وزيادة الوصول'
        : 'Collaborate on marketing campaigns to reduce costs and amplify reach',
      icon: Megaphone,
      color: 'bg-orange-500',
      features: [
        language === 'ar' ? 'حملات مشتركة فعالة' : 'Effective joint campaigns',
        language === 'ar' ? 'وصول أوسع للجمهور' : 'Wider audience reach',
        language === 'ar' ? 'تكاليف مشتركة' : 'Shared campaign costs'
      ],
      stats: {
        activeCampaigns: 18,
        totalReach: '5.2M',
        partners: '800+'
      },
      path: '/gateways/marketing',
      comingSoon: false
    },
    {
      id: 'company_formation',
      title: language === 'ar' ? 'تأسيس الشركات' : 'Company Formation',
      description: language === 'ar'
        ? 'احصل على المساعدة في تأسيس شركتك في عدة دول مع خبراء قانونيين'
        : 'Get expert help establishing your company in multiple jurisdictions',
      icon: Building2,
      color: 'bg-purple-500',
      features: [
        language === 'ar' ? 'دعم متعدد الدول' : 'Multi-jurisdiction support',
        language === 'ar' ? 'خبراء قانونيين' : 'Legal experts',
        language === 'ar' ? 'عملية مبسطة' : 'Streamlined process'
      ],
      stats: {
        companiesFormed: 150,
        countries: 25,
        successRate: '98%'
      },
      path: '/gateways/company-formation',
      comingSoon: false
    },
    {
      id: 'freelancer',
      title: language === 'ar' ? 'بوابة المستقلين' : 'Freelancer Gateway',
      description: language === 'ar'
        ? 'تواصل مع المستقلين المعتمدين والخبراء لتنمية عملك'
        : 'Connect with verified freelancers and experts to grow your business',
      icon: User,
      color: 'bg-green-500',
      features: [
        language === 'ar' ? 'مستقلين معتمدين' : 'Verified freelancers',
        language === 'ar' ? 'تقييم MCP' : 'MCP assessment',
        language === 'ar' ? 'جودة مضمونة' : 'Quality guaranteed'
      ],
      stats: {
        freelancers: 450,
        projects: '2,100+',
        avgRating: '4.8/5'
      },
      path: '/gateways/freelancer',
      comingSoon: false
    }
  ];

  const handleGatewayClick = (gateway: typeof gateways[0]) => {
    if (!gateway.comingSoon) {
      navigate(gateway.path);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Globe className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              {language === 'ar' ? 'بوابات الخدمات' : 'Service Gateways'}
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'ar' 
              ? 'اكتشف مجموعة شاملة من الخدمات التعاونية المصممة لمساعدة الشركات على النمو والازدهار'
              : 'Discover a comprehensive suite of collaborative services designed to help businesses grow and thrive'
            }
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    {language === 'ar' ? 'إجمالي المشاريع' : 'Total Projects'}
                  </p>
                  <p className="text-2xl font-bold text-blue-600">2,500+</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    {language === 'ar' ? 'الأعضاء النشطون' : 'Active Members'}
                  </p>
                  <p className="text-2xl font-bold text-green-600">3,200+</p>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    {language === 'ar' ? 'إجمالي التوفير' : 'Total Savings'}
                  </p>
                  <p className="text-2xl font-bold text-purple-600">$8.2M</p>
                </div>
                <DollarSign className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    {language === 'ar' ? 'معدل الرضا' : 'Satisfaction Rate'}
                  </p>
                  <p className="text-2xl font-bold text-orange-600">4.9/5</p>
                </div>
                <Star className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gateway Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {gateways.map((gateway) => (
            <Card 
              key={gateway.id} 
              className={`hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 ${
                gateway.comingSoon ? 'opacity-75' : ''
              }`}
              onClick={() => handleGatewayClick(gateway)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${gateway.color}`}>
                      <gateway.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{gateway.title}</CardTitle>
                      {gateway.comingSoon && (
                        <Badge variant="secondary" className="mt-1">
                          {language === 'ar' ? 'قريباً' : 'Coming Soon'}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </div>
                <CardDescription className="text-base mt-3">
                  {gateway.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Features */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-gray-700">
                    {language === 'ar' ? 'المميزات الرئيسية:' : 'Key Features:'}
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {gateway.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                  {Object.entries(gateway.stats).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <p className="text-lg font-bold text-gray-900">{value}</p>
                      <p className="text-xs text-gray-500 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <div className="pt-4">
                  <Button 
                    className="w-full" 
                    disabled={gateway.comingSoon}
                    variant={gateway.comingSoon ? "outline" : "default"}
                  >
                    {gateway.comingSoon 
                      ? (language === 'ar' ? 'قريباً' : 'Coming Soon')
                      : (language === 'ar' ? 'استكشف الآن' : 'Explore Now')
                    }
                    {!gateway.comingSoon && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">
                {language === 'ar' ? 'هل أنت مستعد للبدء؟' : 'Ready to Get Started?'}
              </h2>
              <p className="text-lg mb-6 opacity-90">
                {language === 'ar'
                  ? 'انضم إلى آلاف الشركات التي تستفيد من خدماتنا التعاونية'
                  : 'Join thousands of businesses benefiting from our collaborative services'
                }
              </p>
              <div className="flex gap-4 justify-center">
                <Button size="lg" variant="secondary">
                  {language === 'ar' ? 'تصفح المجموعات' : 'Browse Groups'}
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  {language === 'ar' ? 'إنشاء مجموعة' : 'Create Group'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GatewaysPage;
