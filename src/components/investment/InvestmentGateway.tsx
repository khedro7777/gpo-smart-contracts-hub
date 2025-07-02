// ============================================
// 💰 INVESTMENT GATEWAY COMPONENT
// ============================================
// Purpose: Handles investment opportunities, company creation and management
// Used in: Investment dashboard, company formation flows
// Features: Create investments, manage shareholders, portfolio tracking
// Location: Investment gateway for collaborative business ventures
// ============================================

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslation } from 'react-i18next';
import { 
  TrendingUp, 
  Building2, 
  Users, 
  DollarSign, 
  PieChart,
  BarChart3,
  Target,
  Calendar,
  Globe,
  FileText,
  Award,
  Briefcase
} from 'lucide-react';

// ============================================
// 📊 TYPE DEFINITIONS
// ============================================

interface InvestmentOpportunity {
  id: string;
  title: string;
  description: string;
  industry: string;
  investmentRange: string;
  expectedReturns: string;
  timeline: string;
  riskLevel: 'low' | 'medium' | 'high';
  status: 'active' | 'funded' | 'closed';
  currentFunding: number;
  targetFunding: number;
  investors: number;
  country: string;
}

interface CompanyShare {
  id: string;
  companyName: string;
  sharePercentage: number;
  currentValue: number;
  investedAmount: number;
  profitLoss: number;
  status: 'active' | 'selling' | 'sold';
}

const InvestmentGateway: React.FC = () => {
  const { i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('opportunities');
  const [showCreateForm, setShowCreateForm] = useState(false);

  // ============================================
  // 🏢 SAMPLE INVESTMENT OPPORTUNITIES DATA
  // ============================================
  const investmentOpportunities: InvestmentOpportunity[] = [
    {
      id: '1',
      title: i18n.language === 'ar' ? 'شركة تقنية ناشئة للذكاء الاصطناعي' : 'AI Tech Startup',
      description: i18n.language === 'ar' 
        ? 'تطوير حلول ذكية للأعمال باستخدام الذكاء الاصطناعي'
        : 'Developing smart business solutions using artificial intelligence',
      industry: i18n.language === 'ar' ? 'التقنية' : 'Technology',
      investmentRange: '$50K - $500K',
      expectedReturns: '25-40%',
      timeline: '2-3 years',
      riskLevel: 'medium',
      status: 'active',
      currentFunding: 750000,
      targetFunding: 2000000,
      investors: 12,
      country: 'UAE'
    },
    {
      id: '2', 
      title: i18n.language === 'ar' ? 'شركة التجارة الإلكترونية' : 'E-commerce Platform',
      description: i18n.language === 'ar'
        ? 'منصة تجارة إلكترونية للمنتجات المحلية'
        : 'E-commerce platform for local products',
      industry: i18n.language === 'ar' ? 'التجارة' : 'Commerce',
      investmentRange: '$100K - $1M',
      expectedReturns: '15-30%',
      timeline: '1-2 years',
      riskLevel: 'low',
      status: 'active',
      currentFunding: 1200000,
      targetFunding: 3000000,
      investors: 25,
      country: 'Saudi Arabia'
    }
  ];

  // ============================================
  // 📈 SAMPLE PORTFOLIO DATA
  // ============================================
  const portfolioShares: CompanyShare[] = [
    {
      id: '1',
      companyName: i18n.language === 'ar' ? 'تك فيوتشر' : 'TechFuture Inc.',
      sharePercentage: 15,
      currentValue: 180000,
      investedAmount: 150000,
      profitLoss: 30000,
      status: 'active'
    },
    {
      id: '2',
      companyName: i18n.language === 'ar' ? 'إيكوم سولوشنز' : 'EcomSolutions Ltd.',
      sharePercentage: 8,
      currentValue: 95000,
      investedAmount: 80000,
      profitLoss: 15000,
      status: 'active'
    }
  ];

  // ============================================
  // 🎨 UTILITY FUNCTIONS
  // ============================================
  
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'funded': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // ============================================
  // 🎯 RENDER COMPONENTS
  // ============================================

  const renderOpportunities = () => (
    <div className="space-y-6">
      {/* Create Investment Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">
          {i18n.language === 'ar' ? 'الفرص الاستثمارية' : 'Investment Opportunities'}
        </h3>
        <Button onClick={() => setShowCreateForm(true)}>
          <Building2 className="h-4 w-4 mr-2" />
          {i18n.language === 'ar' ? 'إنشاء فرصة استثمارية' : 'Create Investment'}
        </Button>
      </div>

      {/* Opportunities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {investmentOpportunities.map((opportunity) => (
          <Card key={opportunity.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg mb-2">{opportunity.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{opportunity.description}</p>
                </div>
                <Badge className={getStatusColor(opportunity.status)}>
                  {opportunity.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>{formatCurrency(opportunity.currentFunding)}</span>
                    <span>{formatCurrency(opportunity.targetFunding)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${(opportunity.currentFunding / opportunity.targetFunding) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Investment Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-green-600" />
                    <span>{opportunity.expectedReturns}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span>{opportunity.timeline}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-purple-600" />
                    <span>{opportunity.investors} investors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-orange-600" />
                    <span>{opportunity.country}</span>
                  </div>
                </div>

                {/* Risk and Investment Range */}
                <div className="flex justify-between items-center">
                  <Badge className={getRiskColor(opportunity.riskLevel)}>
                    {opportunity.riskLevel} risk
                  </Badge>
                  <span className="font-semibold">{opportunity.investmentRange}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    {i18n.language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                  </Button>
                  <Button className="flex-1">
                    {i18n.language === 'ar' ? 'استثمر الآن' : 'Invest Now'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderPortfolio = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">
        {i18n.language === 'ar' ? 'محفظتي الاستثمارية' : 'My Investment Portfolio'}
      </h3>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Invested</p>
                <p className="text-2xl font-bold">{formatCurrency(230000)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Value</p>
                <p className="text-2xl font-bold">{formatCurrency(275000)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Profit</p>
                <p className="text-2xl font-bold text-green-600">+{formatCurrency(45000)}</p>
              </div>
              <Award className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Companies</p>
                <p className="text-2xl font-bold">{portfolioShares.length}</p>
              </div>
              <Briefcase className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Holdings */}
      <div className="grid grid-cols-1 gap-4">
        {portfolioShares.map((share) => (
          <Card key={share.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold text-lg mb-2">{share.companyName}</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Share</p>
                      <p className="font-semibold">{share.sharePercentage}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Invested</p>
                      <p className="font-semibold">{formatCurrency(share.investedAmount)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Current Value</p>
                      <p className="font-semibold">{formatCurrency(share.currentValue)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">P&L</p>
                      <p className={`font-semibold ${share.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {share.profitLoss >= 0 ? '+' : ''}{formatCurrency(share.profitLoss)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    {i18n.language === 'ar' ? 'عرض' : 'View'}
                  </Button>
                  <Button variant="outline" size="sm">
                    {i18n.language === 'ar' ? 'بيع' : 'Sell'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-blue-600" />
            {i18n.language === 'ar' ? 'بوابة الاستثمار' : 'Investment Gateway'}
          </h1>
          <p className="text-gray-600">
            {i18n.language === 'ar' 
              ? 'إنشاء وإدارة الفرص الاستثمارية والشراكات التجارية'
              : 'Create and manage investment opportunities and business partnerships'
            }
          </p>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="opportunities">
              {i18n.language === 'ar' ? 'الفرص الاستثمارية' : 'Investment Opportunities'}
            </TabsTrigger>
            <TabsTrigger value="portfolio">
              {i18n.language === 'ar' ? 'محفظتي' : 'My Portfolio'}
            </TabsTrigger>
            <TabsTrigger value="analytics">
              {i18n.language === 'ar' ? 'التحليلات' : 'Analytics'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="opportunities">
            {renderOpportunities()}
          </TabsContent>

          <TabsContent value="portfolio">
            {renderPortfolio()}
          </TabsContent>

          <TabsContent value="analytics">
            <div className="text-center py-12">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {i18n.language === 'ar' ? 'التحليلات قادمة قريباً' : 'Analytics Coming Soon'}
              </h3>
              <p className="text-gray-600">
                {i18n.language === 'ar' 
                  ? 'تحليلات مفصلة لأداء الاستثمارات والعوائد'
                  : 'Detailed analytics for investment performance and returns'
                }
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default InvestmentGateway;