
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, Brain, Target, DollarSign } from 'lucide-react';

const PredictiveAnalytics = () => {
  const { language } = useLanguage();
  const [forecastData, setForecastData] = useState<any[]>([]);
  const [marketTrends, setMarketTrends] = useState<any[]>([]);
  const [riskAnalysis, setRiskAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPredictiveData();
  }, []);

  const loadPredictiveData = async () => {
    setLoading(true);
    
    // Mock predictive data
    setTimeout(() => {
      setForecastData([
        { month: 'Jan', demand: 120, supply: 110, price: 95 },
        { month: 'Feb', demand: 135, supply: 125, price: 98 },
        { month: 'Mar', demand: 150, supply: 140, price: 102 },
        { month: 'Apr', demand: 168, supply: 155, price: 105 },
        { month: 'May', demand: 185, supply: 170, price: 108 },
        { month: 'Jun', demand: 200, supply: 180, price: 112 }
      ]);

      setMarketTrends([
        { category: 'Technology', growth: 15.2, risk: 'low' },
        { category: 'Healthcare', growth: 8.7, risk: 'medium' },
        { category: 'Manufacturing', growth: 12.1, risk: 'low' },
        { category: 'Energy', growth: -2.3, risk: 'high' },
        { category: 'Food & Beverage', growth: 6.8, risk: 'medium' }
      ]);

      setRiskAnalysis({
        overall: 'medium',
        factors: [
          { name: 'Market Volatility', impact: 'medium', probability: 65 },
          { name: 'Supply Chain Disruption', impact: 'high', probability: 25 },
          { name: 'Currency Fluctuation', impact: 'low', probability: 80 },
          { name: 'Regulatory Changes', impact: 'medium', probability: 40 }
        ]
      });

      setLoading(false);
    }, 1000);
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrendIcon = (growth: number) => {
    return growth > 0 ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            {language === 'en' ? 'Predictive Analytics' : 'التحليلات التنبؤية'}
          </h2>
          <p className="text-gray-600 mt-2">
            {language === 'en' 
              ? 'AI-powered forecasting and market intelligence'
              : 'التنبؤ المدعوم بالذكاء الاصطناعي وذكاء السوق'
            }
          </p>
        </div>
        <Button onClick={loadPredictiveData} disabled={loading}>
          <Brain className="h-4 w-4 mr-2" />
          {loading 
            ? (language === 'en' ? 'Analyzing...' : 'جاري التحليل...')
            : (language === 'en' ? 'Refresh Analysis' : 'تحديث التحليل')
          }
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Demand Forecast */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-5 w-5 mr-2 text-blue-600" />
              {language === 'en' ? 'Demand & Supply Forecast' : 'توقع العرض والطلب'}
            </CardTitle>
            <CardDescription>
              {language === 'en' 
                ? '6-month predictive analysis with 85% accuracy'
                : 'تحليل تنبؤي لـ 6 أشهر بدقة 85%'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="demand" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  name={language === 'en' ? 'Demand' : 'الطلب'}
                />
                <Line 
                  type="monotone" 
                  dataKey="supply" 
                  stroke="#82ca9d" 
                  strokeWidth={2}
                  name={language === 'en' ? 'Supply' : 'العرض'}
                />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#ffc658" 
                  strokeWidth={2}
                  name={language === 'en' ? 'Price Index' : 'مؤشر السعر'}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Market Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
              {language === 'en' ? 'Market Growth Trends' : 'اتجاهات نمو السوق'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {marketTrends.map((trend, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getTrendIcon(trend.growth)}
                    <span className="font-medium">{trend.category}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`font-bold ${trend.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {trend.growth > 0 ? '+' : ''}{trend.growth}%
                    </span>
                    <Badge className={getRiskColor(trend.risk)}>
                      {trend.risk}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Risk Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-orange-600" />
              {language === 'en' ? 'Risk Assessment' : 'تقييم المخاطر'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {riskAnalysis && (
              <div className="space-y-4">
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <h3 className="font-medium text-yellow-900">
                    {language === 'en' ? 'Overall Risk Level' : 'مستوى المخاطر الإجمالي'}
                  </h3>
                  <Badge className={`mt-2 ${getRiskColor(riskAnalysis.overall)}`}>
                    {riskAnalysis.overall.toUpperCase()}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">
                    {language === 'en' ? 'Risk Factors' : 'عوامل المخاطر'}
                  </h4>
                  {riskAnalysis.factors.map((factor: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm font-medium">{factor.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">{factor.probability}%</span>
                        <Badge className={getRiskColor(factor.impact)} variant="outline">
                          {factor.impact}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Insights and Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="h-5 w-5 mr-2 text-purple-600" />
            {language === 'en' ? 'AI Insights & Recommendations' : 'رؤى وتوصيات الذكاء الاصطناعي'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <DollarSign className="h-5 w-5 text-blue-600" />
                <h4 className="font-medium text-blue-900">
                  {language === 'en' ? 'Cost Optimization' : 'تحسين التكلفة'}
                </h4>
              </div>
              <p className="text-sm text-blue-700">
                {language === 'en' 
                  ? 'Potential 18% savings by adjusting procurement timing'
                  : 'توفير محتمل 18% بتعديل توقيت المشتريات'
                }
              </p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="h-5 w-5 text-green-600" />
                <h4 className="font-medium text-green-900">
                  {language === 'en' ? 'Demand Planning' : 'تخطيط الطلب'}
                </h4>
              </div>
              <p className="text-sm text-green-700">
                {language === 'en' 
                  ? 'Increase inventory by 15% in Q2 to meet projected demand'
                  : 'زيادة المخزون بنسبة 15% في الربع الثاني لتلبية الطلب المتوقع'
                }
              </p>
            </div>
            
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <h4 className="font-medium text-orange-900">
                  {language === 'en' ? 'Risk Mitigation' : 'تخفيف المخاطر'}
                </h4>
              </div>
              <p className="text-sm text-orange-700">
                {language === 'en' 
                  ? 'Diversify suppliers in Energy sector to reduce risk exposure'
                  : 'تنويع الموردين في قطاع الطاقة لتقليل التعرض للمخاطر'
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictiveAnalytics;
