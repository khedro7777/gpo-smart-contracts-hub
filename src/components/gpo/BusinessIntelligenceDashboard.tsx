
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  Target,
  DollarSign,
  Users,
  Building,
  Globe,
  Award,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

const BusinessIntelligenceDashboard = () => {
  const { language } = useLanguage();
  const [activeTimeframe, setActiveTimeframe] = useState('monthly');

  const performanceMetrics = [
    {
      title: language === 'en' ? 'Cost Savings Achieved' : 'التوفير المحقق في التكاليف',
      value: '$2.4M',
      percentage: 18.5,
      trend: 'up',
      icon: <DollarSign className="h-5 w-5" />,
      color: 'text-green-600'
    },
    {
      title: language === 'en' ? 'Partnership Efficiency' : 'كفاءة الشراكات',
      value: '94.2%',
      percentage: 5.2,
      trend: 'up',
      icon: <Users className="h-5 w-5" />,
      color: 'text-blue-600'
    },
    {
      title: language === 'en' ? 'Contract Success Rate' : 'معدل نجاح العقود',
      value: '96.8%',
      percentage: 2.1,
      trend: 'up',
      icon: <CheckCircle className="h-5 w-5" />,
      color: 'text-purple-600'
    },
    {
      title: language === 'en' ? 'Market Expansion' : 'التوسع في السوق',
      value: '15 Markets',
      percentage: 25.0,
      trend: 'up',
      icon: <Globe className="h-5 w-5" />,
      color: 'text-orange-600'
    }
  ];

  const industryBenchmarks = [
    {
      sector: language === 'en' ? 'Technology' : 'التكنولوجيا',
      performance: 92,
      benchmark: 78,
      volume: '$1.2M'
    },
    {
      sector: language === 'en' ? 'Healthcare' : 'الرعاية الصحية',
      performance: 88,
      benchmark: 82,
      volume: '$850K'
    },
    {
      sector: language === 'en' ? 'Manufacturing' : 'التصنيع',
      performance: 94,
      benchmark: 75,
      volume: '$2.1M'
    },
    {
      sector: language === 'en' ? 'Financial Services' : 'الخدمات المالية',
      performance: 89,
      benchmark: 80,
      volume: '$950K'
    }
  ];

  const riskAssessment = [
    {
      category: language === 'en' ? 'Supplier Concentration' : 'تركز الموردين',
      level: 'Medium',
      score: 65,
      impact: language === 'en' ? 'Moderate supply chain risk' : 'مخاطر متوسطة في سلسلة التوريد'
    },
    {
      category: language === 'en' ? 'Market Volatility' : 'تقلبات السوق',
      level: 'Low',
      score: 25,
      impact: language === 'en' ? 'Stable pricing environment' : 'بيئة تسعير مستقرة'
    },
    {
      category: language === 'en' ? 'Regulatory Changes' : 'التغييرات التنظيمية',
      level: 'High',
      score: 85,
      impact: language === 'en' ? 'New compliance requirements' : 'متطلبات امتثال جديدة'
    }
  ];

  const strategicRecommendations = [
    {
      title: language === 'en' ? 'Diversify Supplier Base' : 'تنويع قاعدة الموردين',
      priority: 'High',
      timeline: '2-3 months',
      impact: language === 'en' ? 'Reduce supply chain risk by 30%' : 'تقليل مخاطر سلسلة التوريد بنسبة 30%'
    },
    {
      title: language === 'en' ? 'Expand Digital Procurement' : 'توسيع المشتريات الرقمية',
      priority: 'Medium',
      timeline: '4-6 months',
      impact: language === 'en' ? 'Increase efficiency by 25%' : 'زيادة الكفاءة بنسبة 25%'
    },
    {
      title: language === 'en' ? 'Implement AI Analytics' : 'تطبيق تحليلات الذكاء الاصطناعي',
      priority: 'High',
      timeline: '1-2 months',
      impact: language === 'en' ? 'Improve decision accuracy by 40%' : 'تحسين دقة القرار بنسبة 40%'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  <p className={`text-sm font-medium ${metric.color}`}>
                    +{metric.percentage}% vs last period
                  </p>
                </div>
                <div className={`p-3 rounded-full bg-gray-100 ${metric.color}`}>
                  {metric.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTimeframe} onValueChange={setActiveTimeframe} className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="weekly">
              {language === 'en' ? 'Weekly' : 'أسبوعي'}
            </TabsTrigger>
            <TabsTrigger value="monthly">
              {language === 'en' ? 'Monthly' : 'شهري'}
            </TabsTrigger>
            <TabsTrigger value="quarterly">
              {language === 'en' ? 'Quarterly' : 'ربع سنوي'}
            </TabsTrigger>
            <TabsTrigger value="yearly">
              {language === 'en' ? 'Yearly' : 'سنوي'}
            </TabsTrigger>
          </TabsList>
          
          <Button variant="outline" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            {language === 'en' ? 'Export Report' : 'تصدير التقرير'}
          </Button>
        </div>

        <TabsContent value={activeTimeframe} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Industry Benchmarks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  {language === 'en' ? 'Industry Benchmarks' : 'معايير الصناعة'}
                </CardTitle>
                <CardDescription>
                  {language === 'en' 
                    ? 'Performance comparison against industry standards'
                    : 'مقارنة الأداء مع المعايير الصناعية'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {industryBenchmarks.map((benchmark, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{benchmark.sector}</span>
                        <span className="text-sm text-gray-600">{benchmark.volume}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Performance: {benchmark.performance}%</span>
                          <span>Benchmark: {benchmark.benchmark}%</span>
                        </div>
                        <div className="relative">
                          <Progress value={benchmark.benchmark} className="h-2 bg-gray-200" />
                          <Progress 
                            value={benchmark.performance} 
                            className="h-2 absolute top-0 bg-gradient-to-r from-green-500 to-blue-500" 
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Risk Assessment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  {language === 'en' ? 'Risk Assessment' : 'تقييم المخاطر'}
                </CardTitle>
                <CardDescription>
                  {language === 'en' 
                    ? 'Harvard Business School risk methodology'
                    : 'منهجية تقييم المخاطر من كلية هارفارد للأعمال'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {riskAssessment.map((risk, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{risk.category}</span>
                        <Badge 
                          variant={risk.level === 'High' ? 'destructive' : risk.level === 'Medium' ? 'default' : 'secondary'}
                        >
                          {risk.level}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <Progress value={risk.score} className="h-2" />
                        <p className="text-sm text-gray-600">{risk.impact}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Strategic Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                {language === 'en' ? 'Strategic Recommendations' : 'التوصيات الاستراتيجية'}
              </CardTitle>
              <CardDescription>
                {language === 'en' 
                  ? 'AI-powered insights based on WTO trade standards'
                  : 'رؤى مدعومة بالذكاء الاصطناعي مبنية على معايير منظمة التجارة العالمية'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {strategicRecommendations.map((recommendation, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-medium text-gray-900">{recommendation.title}</h4>
                      <Badge variant={recommendation.priority === 'High' ? 'destructive' : 'default'}>
                        {recommendation.priority}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{recommendation.timeline}</span>
                      </div>
                      <p className="text-sm text-gray-700">{recommendation.impact}</p>
                      <Button size="sm" variant="outline" className="w-full mt-3">
                        {language === 'en' ? 'View Details' : 'عرض التفاصيل'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BusinessIntelligenceDashboard;
