
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';
import { 
  TrendingUp, 
  BarChart3
} from 'lucide-react';
import InvestmentOpportunityCard from './InvestmentOpportunityCard';
import PortfolioSummary from './PortfolioSummary';
import CreateInvestmentModal from './CreateInvestmentModal';
import PremiumGate from '@/components/premium/PremiumGate';

const InvestmentGateway: React.FC = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('opportunities');

  // Sample data - in real app, this would come from API
  const [investmentOpportunities, setInvestmentOpportunities] = useState([
    {
      id: '1',
      title: language === 'ar' ? 'شركة تقنية ناشئة للذكاء الاصطناعي' : 'AI Tech Startup',
      description: language === 'ar' 
        ? 'تطوير حلول ذكية للأعمال باستخدام الذكاء الاصطناعي'
        : 'Developing smart business solutions using artificial intelligence',
      industry: language === 'ar' ? 'التقنية' : 'Technology',
      investmentRange: '$50K - $500K',
      expectedReturns: '25-40%',
      timeline: '2-3 years',
      riskLevel: 'medium' as const,
      status: 'active' as const,
      currentFunding: 750000,
      targetFunding: 2000000,
      investors: 12,
      country: 'UAE'
    },
    {
      id: '2', 
      title: language === 'ar' ? 'شركة التجارة الإلكترونية' : 'E-commerce Platform',
      description: language === 'ar'
        ? 'منصة تجارة إلكترونية للمنتجات المحلية'
        : 'E-commerce platform for local products',
      industry: language === 'ar' ? 'التجارة' : 'Commerce',
      investmentRange: '$100K - $1M',
      expectedReturns: '15-30%',
      timeline: '1-2 years',
      riskLevel: 'low' as const,
      status: 'active' as const,
      currentFunding: 1200000,
      targetFunding: 3000000,
      investors: 25,
      country: 'Saudi Arabia'
    }
  ]);

  const portfolioStats = {
    totalInvested: 230000,
    currentValue: 275000,
    totalProfit: 45000,
    activeInvestments: 2,
    monthlyReturn: 3.2,
    yearlyReturn: 19.6
  };

  const handleCreateInvestment = (data: any) => {
    const newInvestment = {
      ...data,
      id: Date.now().toString(),
      currentFunding: 0,
      investors: 0,
      status: 'active' as const
    };
    setInvestmentOpportunities(prev => [newInvestment, ...prev]);
    toast({
      title: language === 'ar' ? 'تم إنشاء الفرصة بنجاح' : 'Investment opportunity created successfully',
      description: language === 'ar' ? 'سيتم مراجعة الفرصة من قبل الإدارة' : 'The opportunity will be reviewed by administrators'
    });
  };

  const handleInvest = (id: string) => {
    toast({
      title: language === 'ar' ? 'جاري معالجة الاستثمار' : 'Processing investment',
      description: language === 'ar' ? 'سيتم تحويلك لصفحة الدفع' : 'You will be redirected to payment page'
    });
  };

  const handleViewDetails = (id: string) => {
    toast({
      title: language === 'ar' ? 'عرض تفاصيل الاستثمار' : 'Viewing investment details',
      description: language === 'ar' ? 'سيتم فتح صفحة التفاصيل' : 'Details page will open'
    });
  };

  return (
    <PremiumGate feature={language === 'ar' ? 'بوابة الاستثمار' : 'Investment Gateway'}>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              {language === 'ar' ? 'بوابة الاستثمار' : 'Investment Gateway'}
            </h1>
            <p className="text-gray-600">
              {language === 'ar' 
                ? 'إنشاء وإدارة الفرص الاستثمارية والشراكات التجارية'
                : 'Create and manage investment opportunities and business partnerships'
              }
            </p>
          </div>

          {/* Navigation Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="opportunities">
                {language === 'ar' ? 'الفرص الاستثمارية' : 'Investment Opportunities'}
              </TabsTrigger>
              <TabsTrigger value="portfolio">
                {language === 'ar' ? 'محفظتي' : 'My Portfolio'}
              </TabsTrigger>
              <TabsTrigger value="analytics">
                {language === 'ar' ? 'التحليلات' : 'Analytics'}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="opportunities">
              <div className="space-y-6">
                {/* Create Investment Button */}
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">
                    {language === 'ar' ? 'الفرص الاستثمارية' : 'Investment Opportunities'}
                  </h3>
                  <CreateInvestmentModal onCreateInvestment={handleCreateInvestment} />
                </div>

                {/* Opportunities Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {investmentOpportunities.map((opportunity) => (
                    <InvestmentOpportunityCard
                      key={opportunity.id}
                      opportunity={opportunity}
                      onInvest={handleInvest}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="portfolio">
              <PortfolioSummary stats={portfolioStats} />
            </TabsContent>

            <TabsContent value="analytics">
              <div className="text-center py-12">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {language === 'ar' ? 'التحليلات قادمة قريباً' : 'Analytics Coming Soon'}
                </h3>
                <p className="text-gray-600">
                  {language === 'ar' 
                    ? 'تحليلات مفصلة لأداء الاستثمارات والعوائد'
                    : 'Detailed analytics for investment performance and returns'
                  }
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PremiumGate>
  );
};

export default InvestmentGateway;
