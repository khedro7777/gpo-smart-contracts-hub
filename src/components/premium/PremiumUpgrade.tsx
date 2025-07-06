
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Crown, 
  Star, 
  Shield, 
  Zap, 
  Users, 
  BarChart3,
  Lock
} from 'lucide-react';

interface PremiumUpgradeProps {
  feature?: string;
  onUpgrade?: () => void;
}

const PremiumUpgrade: React.FC<PremiumUpgradeProps> = ({ 
  feature = 'this feature',
  onUpgrade 
}) => {
  const { language } = useLanguage();

  const plans = [
    {
      name: language === 'ar' ? 'الأساسي' : 'Basic',
      price: '$29',
      period: language === 'ar' ? '/شهر' : '/month',
      features: [
        language === 'ar' ? 'الوصول لجميع البوابات' : 'Access to all gateways',
        language === 'ar' ? 'إنشاء 5 مجموعات' : 'Create 5 groups',
        language === 'ar' ? 'دعم فني أساسي' : 'Basic support',
        language === 'ar' ? 'تحليلات محدودة' : 'Limited analytics'
      ],
      icon: Star,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      name: language === 'ar' ? 'المتميز' : 'Premium',
      price: '$79',
      period: language === 'ar' ? '/شهر' : '/month',
      features: [
        language === 'ar' ? 'جميع ميزات الأساسي' : 'All Basic features',
        language === 'ar' ? 'مجموعات غير محدودة' : 'Unlimited groups',
        language === 'ar' ? 'التحكيم المتقدم' : 'Advanced arbitration',
        language === 'ar' ? 'تحليلات متقدمة' : 'Advanced analytics',
        language === 'ar' ? 'أولوية الدعم' : 'Priority support'
      ],
      icon: Crown,
      color: 'text-gold-600',
      bgColor: 'bg-yellow-50',
      popular: true
    },
    {
      name: language === 'ar' ? 'المؤسسي' : 'Enterprise',
      price: '$199',
      period: language === 'ar' ? '/شهر' : '/month',
      features: [
        language === 'ar' ? 'جميع ميزات المتميز' : 'All Premium features',
        language === 'ar' ? 'حلول مخصصة' : 'Custom solutions',
        language === 'ar' ? 'مدير حساب مخصص' : 'Dedicated account manager',
        language === 'ar' ? 'تكامل API' : 'API integration',
        language === 'ar' ? 'دعم على مدار الساعة' : '24/7 support'
      ],
      icon: Shield,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Lock className="h-12 w-12 text-gray-400 mr-3" />
            <Crown className="h-16 w-16 text-yellow-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {language === 'ar' ? 'الترقية المطلوبة' : 'Upgrade Required'}
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            {language === 'ar' 
              ? `للوصول إلى ${feature}، يرجى الترقية إلى خطة مدفوعة`
              : `To access ${feature}, please upgrade to a premium plan`
            }
          </p>
          <p className="text-gray-500">
            {language === 'ar'
              ? 'اختر الخطة التي تناسب احتياجاتك'
              : 'Choose the plan that fits your needs'
            }
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'ring-2 ring-yellow-500 shadow-xl scale-105' : 'shadow-lg'}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white">
                  {language === 'ar' ? 'الأكثر شعبية' : 'Most Popular'}
                </Badge>
              )}
              <CardHeader className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${plan.bgColor} flex items-center justify-center`}>
                  <plan.icon className={`h-8 w-8 ${plan.color}`} />
                </div>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <div className="text-3xl font-bold text-gray-900 mt-2">
                  {plan.price}
                  <span className="text-lg font-normal text-gray-500">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Zap className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${plan.popular ? 'bg-yellow-500 hover:bg-yellow-600' : ''}`}
                  onClick={onUpgrade}
                >
                  {language === 'ar' ? 'اختر هذه الخطة' : 'Choose This Plan'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Comparison */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <BarChart3 className="h-5 w-5" />
              {language === 'ar' ? 'مقارنة الميزات' : 'Feature Comparison'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4 border rounded-lg">
                <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">
                  {language === 'ar' ? 'إدارة المجموعات' : 'Group Management'}
                </h3>
                <p className="text-sm text-gray-600">
                  {language === 'ar' ? 'إنشاء وإدارة مجموعات الشراء' : 'Create and manage purchasing groups'}
                </p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">
                  {language === 'ar' ? 'التحكيم المتقدم' : 'Advanced Arbitration'}
                </h3>
                <p className="text-sm text-gray-600">
                  {language === 'ar' ? 'خدمات تحكيم شاملة' : 'Comprehensive arbitration services'}
                </p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <BarChart3 className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">
                  {language === 'ar' ? 'التحليلات المتقدمة' : 'Advanced Analytics'}
                </h3>
                <p className="text-sm text-gray-600">
                  {language === 'ar' ? 'تقارير مفصلة وإحصائيات' : 'Detailed reports and statistics'}
                </p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Zap className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">
                  {language === 'ar' ? 'الدعم الفوري' : 'Priority Support'}
                </h3>
                <p className="text-sm text-gray-600">
                  {language === 'ar' ? 'دعم فني متقدم' : 'Advanced technical support'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PremiumUpgrade;
