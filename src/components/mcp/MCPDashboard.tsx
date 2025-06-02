
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { mcpService } from '@/services/mcpService';
import { Brain, Zap, TrendingUp, Shield, Users, Target } from 'lucide-react';

const MCPDashboard = () => {
  const { language } = useLanguage();
  const [analytics, setAnalytics] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMCPData();
  }, []);

  const loadMCPData = async () => {
    setLoading(true);
    try {
      // Simulate MCP data loading
      const marketAnalysis = await mcpService.handleMessage({
        id: 'market-analysis',
        type: 'request',
        method: 'tools/call',
        params: { name: 'analyze_market', arguments: {} }
      });

      const procurementOptimization = await mcpService.handleMessage({
        id: 'procurement-opt',
        type: 'request',
        method: 'tools/call',
        params: { name: 'optimize_procurement', arguments: {} }
      });

      setAnalytics({
        market: marketAnalysis.result,
        procurement: procurementOptimization.result
      });

      setRecommendations([
        {
          id: 1,
          type: 'cost-saving',
          title: language === 'en' ? 'Cost Optimization Opportunity' : 'فرصة تحسين التكلفة',
          description: language === 'en' ? 'Potential 15% savings through bulk purchasing' : 'توفير محتمل 15% من خلال الشراء بالجملة',
          impact: 'high',
          priority: 1
        },
        {
          id: 2,
          type: 'supplier',
          title: language === 'en' ? 'New Supplier Match' : 'مورد جديد مطابق',
          description: language === 'en' ? 'High-rated supplier available for your category' : 'مورد عالي التقييم متاح لفئتك',
          impact: 'medium',
          priority: 2
        },
        {
          id: 3,
          type: 'risk',
          title: language === 'en' ? 'Risk Alert' : 'تنبيه مخاطر',
          description: language === 'en' ? 'Market volatility detected in key category' : 'تم اكتشاف تقلبات السوق في فئة رئيسية',
          impact: 'high',
          priority: 1
        }
      ]);
    } catch (error) {
      console.error('Error loading MCP data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'cost-saving': return <TrendingUp className="h-5 w-5 text-green-600" />;
      case 'supplier': return <Users className="h-5 w-5 text-blue-600" />;
      case 'risk': return <Shield className="h-5 w-5 text-red-600" />;
      default: return <Target className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            {language === 'en' ? 'AI-Powered Insights' : 'رؤى مدعومة بالذكاء الاصطناعي'}
          </h2>
          <p className="text-gray-600 mt-2">
            {language === 'en' 
              ? 'Smart recommendations and market analysis through MCP'
              : 'توصيات ذكية وتحليل السوق من خلال بروتوكول MCP'
            }
          </p>
        </div>
        <Button onClick={loadMCPData} disabled={loading}>
          <Brain className="h-4 w-4 mr-2" />
          {loading 
            ? (language === 'en' ? 'Analyzing...' : 'جاري التحليل...')
            : (language === 'en' ? 'Refresh Insights' : 'تحديث الرؤى')
          }
        </Button>
      </div>

      <Tabs defaultValue="recommendations" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="recommendations">
            {language === 'en' ? 'Recommendations' : 'التوصيات'}
          </TabsTrigger>
          <TabsTrigger value="analytics">
            {language === 'en' ? 'Analytics' : 'التحليلات'}
          </TabsTrigger>
          <TabsTrigger value="predictions">
            {language === 'en' ? 'Predictions' : 'التنبؤات'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recommendations" className="space-y-4">
          <div className="grid gap-4">
            {recommendations.map((rec) => (
              <Card key={rec.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      {getTypeIcon(rec.type)}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{rec.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">{rec.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getImpactColor(rec.impact)}>
                        {rec.impact}
                      </Badge>
                      <Badge variant="outline">
                        {language === 'en' ? `Priority ${rec.priority}` : `أولوية ${rec.priority}`}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                  {language === 'en' ? 'Market Analysis' : 'تحليل السوق'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {analytics?.market && (
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {language === 'en' ? 'Market Trends' : 'اتجاهات السوق'}
                      </h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                        {analytics.market.marketTrends?.map((trend: string, index: number) => (
                          <li key={index}>{trend}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {language === 'en' ? 'Price Analysis' : 'تحليل الأسعار'}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {language === 'en' ? 'Trend: ' : 'الاتجاه: '}{analytics.market.priceFluctuations?.trend}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-purple-600" />
                  {language === 'en' ? 'Optimization Results' : 'نتائج التحسين'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {analytics?.procurement && (
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">
                        {language === 'en' ? 'Cost Savings' : 'توفير التكلفة'}
                      </span>
                      <span className="font-medium text-green-600">
                        {analytics.procurement.costSavings}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">
                        {language === 'en' ? 'Time Reduction' : 'توفير الوقت'}
                      </span>
                      <span className="font-medium text-blue-600">
                        {analytics.procurement.timeReduction}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">
                        {language === 'en' ? 'Quality Improvement' : 'تحسين الجودة'}
                      </span>
                      <span className="font-medium text-purple-600">
                        {analytics.procurement.qualityImprovement}%
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="predictions">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-orange-600" />
                {language === 'en' ? 'Demand Forecasting' : 'توقع الطلب'}
              </CardTitle>
              <CardDescription>
                {language === 'en' 
                  ? 'AI-powered predictions for procurement planning'
                  : 'تنبؤات مدعومة بالذكاء الاصطناعي لتخطيط المشتريات'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900">
                    {language === 'en' ? 'Next Month' : 'الشهر القادم'}
                  </h4>
                  <p className="text-2xl font-bold text-blue-600 mt-2">120</p>
                  <p className="text-sm text-blue-700">
                    {language === 'en' ? 'units' : 'وحدة'}
                  </p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-900">
                    {language === 'en' ? 'Next Quarter' : 'الربع القادم'}
                  </h4>
                  <p className="text-2xl font-bold text-green-600 mt-2">350</p>
                  <p className="text-sm text-green-700">
                    {language === 'en' ? 'units' : 'وحدة'}
                  </p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-medium text-purple-900">
                    {language === 'en' ? 'Confidence' : 'الثقة'}
                  </h4>
                  <p className="text-2xl font-bold text-purple-600 mt-2">85%</p>
                  <p className="text-sm text-purple-700">
                    {language === 'en' ? 'accuracy' : 'دقة'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MCPDashboard;
