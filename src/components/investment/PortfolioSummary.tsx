
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  DollarSign, 
  TrendingUp, 
  Award, 
  Briefcase,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

interface PortfolioStats {
  totalInvested: number;
  currentValue: number;
  totalProfit: number;
  activeInvestments: number;
  monthlyReturn: number;
  yearlyReturn: number;
}

interface PortfolioSummaryProps {
  stats: PortfolioStats;
}

const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({ stats }) => {
  const { language } = useLanguage();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  const summaryCards = [
    {
      title: language === 'ar' ? 'إجمالي المستثمر' : 'Total Invested',
      value: formatCurrency(stats.totalInvested),
      icon: DollarSign,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: language === 'ar' ? 'القيمة الحالية' : 'Current Value',
      value: formatCurrency(stats.currentValue),
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: language === 'ar' ? 'إجمالي الأرباح' : 'Total Profit',
      value: formatCurrency(stats.totalProfit),
      icon: Award,
      color: stats.totalProfit >= 0 ? 'text-green-600' : 'text-red-600',
      bgColor: stats.totalProfit >= 0 ? 'bg-green-50' : 'bg-red-50'
    },
    {
      title: language === 'ar' ? 'الاستثمارات النشطة' : 'Active Investments',
      value: stats.activeInvestments.toString(),
      icon: Briefcase,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{card.title}</p>
                  <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${card.bgColor}`}>
                  <card.icon className={`h-6 w-6 ${card.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            {language === 'ar' ? 'ملخص الأداء' : 'Performance Summary'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Monthly Return */}
            <div className="text-center p-4 border rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                {stats.monthlyReturn >= 0 ? (
                  <ArrowUp className="h-4 w-4 text-green-600" />
                ) : (
                  <ArrowDown className="h-4 w-4 text-red-600" />
                )}
                <span className={`font-semibold ${stats.monthlyReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatPercentage(stats.monthlyReturn)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {language === 'ar' ? 'العائد الشهري' : 'Monthly Return'}
              </p>
            </div>

            {/* Yearly Return */}
            <div className="text-center p-4 border rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                {stats.yearlyReturn >= 0 ? (
                  <ArrowUp className="h-4 w-4 text-green-600" />
                ) : (
                  <ArrowDown className="h-4 w-4 text-red-600" />
                )}
                <span className={`font-semibold ${stats.yearlyReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatPercentage(stats.yearlyReturn)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {language === 'ar' ? 'العائد السنوي' : 'Yearly Return'}
              </p>
            </div>

            {/* ROI */}
            <div className="text-center p-4 border rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Award className="h-4 w-4 text-blue-600" />
                <span className="font-semibold text-blue-600">
                  {formatPercentage(((stats.currentValue - stats.totalInvested) / stats.totalInvested) * 100)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {language === 'ar' ? 'العائد على الاستثمار' : 'Total ROI'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioSummary;
