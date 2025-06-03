
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { mcpService } from '@/services/mcpService';
import { 
  Brain, 
  Zap, 
  TrendingUp, 
  Shield, 
  Users, 
  Target, 
  MessageSquare,
  BarChart3,
  Settings,
  Bot,
  FileText,
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react';

const EnhancedMCPDashboard = () => {
  const { language } = useLanguage();
  const [analytics, setAnalytics] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeAgents, setActiveAgents] = useState<any[]>([]);

  useEffect(() => {
    loadMCPData();
    initializeAgents();
  }, []);

  const loadMCPData = async () => {
    setLoading(true);
    try {
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

      const riskAssessment = await mcpService.handleMessage({
        id: 'risk-assessment',
        type: 'request',
        method: 'tools/call',
        params: { name: 'assess_risks', arguments: {} }
      });

      setAnalytics({
        market: marketAnalysis.result,
        procurement: procurementOptimization.result,
        risk: riskAssessment.result || { score: 85, factors: ['Market volatility', 'Supplier reliability'] }
      });

      setRecommendations([
        {
          id: 1,
          type: 'cost-saving',
          title: language === 'en' ? 'Smart Procurement Opportunity' : 'فرصة شراء ذكي',
          description: language === 'en' ? 'AI detected 18% savings through bulk purchasing with 3 similar groups' : 'الذكاء الاصطناعي اكتشف توفير 18% من خلال الشراء الجماعي مع 3 مجموعات مشابهة',
          impact: 'high',
          priority: 1,
          progress: 65,
          action: 'join_group'
        },
        {
          id: 2,
          type: 'supplier',
          title: language === 'en' ? 'New Premium Supplier Available' : 'مورد متميز جديد متاح',
          description: language === 'en' ? 'High-rated supplier with 4.9/5 rating offers exclusive deals for your category' : 'مورد عالي التقييم بتقييم 4.9/5 يقدم عروض حصرية لفئتك',
          impact: 'medium',
          priority: 2,
          progress: 90,
          action: 'contact_supplier'
        },
        {
          id: 3,
          type: 'negotiation',
          title: language === 'en' ? 'Contract Negotiation Assistant' : 'مساعد تفاوض العقود',
          description: language === 'en' ? 'AI can help optimize contract terms based on market data' : 'الذكاء الاصطناعي يمكنه مساعدتك في تحسين شروط العقد بناءً على بيانات السوق',
          impact: 'high',
          priority: 1,
          progress: 30,
          action: 'start_negotiation'
        }
      ]);
    } catch (error) {
      console.error('Error loading MCP data:', error);
    } finally {
      setLoading(false);
    }
  };

  const initializeAgents = () => {
    setActiveAgents([
      {
        id: 'procurement',
        name: language === 'en' ? 'Procurement Agent' : 'وكيل المشتريات',
        status: 'active',
        efficiency: 94,
        tasksCompleted: 156,
        icon: <Target className="h-5 w-5" />
      },
      {
        id: 'negotiation',
        name: language === 'en' ? 'Negotiation Assistant' : 'مساعد التفاوض',
        status: 'busy',
        efficiency: 89,
        tasksCompleted: 87,
        icon: <MessageSquare className="h-5 w-5" />
      },
      {
        id: 'market',
        name: language === 'en' ? 'Market Analyzer' : 'محلل السوق',
        status: 'active',
        efficiency: 97,
        tasksCompleted: 203,
        icon: <BarChart3 className="h-5 w-5" />
      }
    ]);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: newMessage,
      timestamp: new Date()
    };

    setChatHistory(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: language === 'en' 
          ? 'I understand your request. Let me analyze the current market conditions and provide you with the best recommendations.'
          : 'أفهم طلبك. دعني أحلل ظروف السوق الحالية وأقدم لك أفضل التوصيات.',
        timestamp: new Date()
      };
      setChatHistory(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'cost-saving': return <TrendingUp className="h-5 w-5 text-green-600" />;
      case 'supplier': return <Users className="h-5 w-5 text-blue-600" />;
      case 'negotiation': return <MessageSquare className="h-5 w-5 text-purple-600" />;
      case 'risk': return <Shield className="h-5 w-5 text-red-600" />;
      default: return <Target className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-yellow-100 text-yellow-800';
      case 'idle': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <Brain className="h-8 w-8 mr-3 text-blue-600" />
            {language === 'en' ? 'AI-Powered GPO Assistant' : 'مساعد GPO المدعوم بالذكاء الاصطناعي'}
          </h2>
          <p className="text-gray-600 mt-2">
            {language === 'en' 
              ? 'Smart insights, automated negotiations, and intelligent procurement recommendations'
              : 'رؤى ذكية، مفاوضات آلية، وتوصيات مشتريات ذكية'
            }
          </p>
        </div>
        <Button onClick={loadMCPData} disabled={loading}>
          <Zap className="h-4 w-4 mr-2" />
          {loading 
            ? (language === 'en' ? 'Processing...' : 'جاري المعالجة...')
            : (language === 'en' ? 'Refresh Insights' : 'تحديث الرؤى')
          }
        </Button>
      </div>

      {/* AI Agents Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {activeAgents.map((agent) => (
          <Card key={agent.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {agent.icon}
                  <h3 className="font-semibold text-sm">{agent.name}</h3>
                </div>
                <Badge className={getStatusColor(agent.status)}>
                  {agent.status}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-600">
                  <span>{language === 'en' ? 'Efficiency' : 'الكفاءة'}</span>
                  <span>{agent.efficiency}%</span>
                </div>
                <Progress value={agent.efficiency} className="h-2" />
                <div className="text-xs text-gray-500">
                  {language === 'en' ? `${agent.tasksCompleted} tasks completed` : `${agent.tasksCompleted} مهمة مكتملة`}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="recommendations" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="recommendations">
            {language === 'en' ? 'Smart Recommendations' : 'التوصيات الذكية'}
          </TabsTrigger>
          <TabsTrigger value="chat">
            {language === 'en' ? 'AI Assistant' : 'المساعد الذكي'}
          </TabsTrigger>
          <TabsTrigger value="analytics">
            {language === 'en' ? 'Deep Analytics' : 'التحليلات المتعمقة'}
          </TabsTrigger>
          <TabsTrigger value="automation">
            {language === 'en' ? 'Automation' : 'الأتمتة'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recommendations" className="space-y-4">
          <div className="grid gap-4">
            {recommendations.map((rec) => (
              <Card key={rec.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3">
                      {getTypeIcon(rec.type)}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{rec.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{rec.description}</p>
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
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{language === 'en' ? 'Implementation Progress' : 'تقدم التنفيذ'}</span>
                      <span>{rec.progress}%</span>
                    </div>
                    <Progress value={rec.progress} className="h-2" />
                    <div className="flex justify-end">
                      <Button size="sm" className="mt-2">
                        {language === 'en' ? 'Take Action' : 'اتخاذ إجراء'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="chat" className="space-y-4">
          <Card className="h-96">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bot className="h-5 w-5 mr-2 text-blue-600" />
                {language === 'en' ? 'AI Procurement Assistant' : 'مساعد المشتريات الذكي'}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col h-full">
              <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                {chatHistory.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs px-4 py-2 rounded-lg ${
                      message.type === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-75 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex space-x-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={language === 'en' ? 'Ask about procurement, suppliers, or market insights...' : 'اسأل عن المشتريات أو الموردين أو رؤى السوق...'}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button onClick={handleSendMessage}>
                  {language === 'en' ? 'Send' : 'إرسال'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                  {language === 'en' ? 'Market Intelligence' : 'ذكاء السوق'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {analytics?.market && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-900">
                          {language === 'en' ? 'Market Growth' : 'نمو السوق'}
                        </h4>
                        <p className="text-2xl font-bold text-blue-600 mt-1">+12%</p>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <h4 className="font-medium text-green-900">
                          {language === 'en' ? 'Price Stability' : 'استقرار الأسعار'}
                        </h4>
                        <p className="text-2xl font-bold text-green-600 mt-1">85%</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        {language === 'en' ? 'Key Trends' : 'الاتجاهات الرئيسية'}
                      </h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        <li>{language === 'en' ? 'Increased demand for bulk purchasing' : 'زيادة الطلب على الشراء بالجملة'}</li>
                        <li>{language === 'en' ? 'Sustainability becoming priority' : 'الاستدامة تصبح أولوية'}</li>
                        <li>{language === 'en' ? 'Digital procurement adoption rising' : 'ارتفاع اعتماد المشتريات الرقمية'}</li>
                      </ul>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-red-600" />
                  {language === 'en' ? 'Risk Assessment' : 'تقييم المخاطر'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      {language === 'en' ? 'Overall Risk Score' : 'نقاط المخاطر الإجمالية'}
                    </span>
                    <Badge className="bg-yellow-100 text-yellow-800">
                      {analytics?.risk?.score || 85}/100
                    </Badge>
                  </div>
                  <Progress value={analytics?.risk?.score || 85} className="h-3" />
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      {language === 'en' ? 'Risk Factors' : 'عوامل الخطر'}
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                        <div className="flex items-center">
                          <AlertTriangle className="h-4 w-4 text-yellow-600 mr-2" />
                          <span className="text-sm text-yellow-800">
                            {language === 'en' ? 'Market Volatility' : 'تقلبات السوق'}
                          </span>
                        </div>
                        <span className="text-xs text-yellow-600">Medium</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                          <span className="text-sm text-green-800">
                            {language === 'en' ? 'Supplier Reliability' : 'موثوقية المورد'}
                          </span>
                        </div>
                        <span className="text-xs text-green-600">Low</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="automation">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Settings className="h-5 w-5 mr-2 text-purple-600" />
                  {language === 'en' ? 'Auto-Negotiation' : 'التفاوض الآلي'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  {language === 'en' 
                    ? 'AI handles initial contract negotiations automatically'
                    : 'الذكاء الاصطناعي يتولى المفاوضات الأولية للعقود تلقائياً'
                  }
                </p>
                <Button size="sm" className="w-full">
                  {language === 'en' ? 'Configure Rules' : 'تكوين القواعد'}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Clock className="h-5 w-5 mr-2 text-orange-600" />
                  {language === 'en' ? 'Smart Scheduling' : 'الجدولة الذكية'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  {language === 'en' 
                    ? 'Automatically schedule meetings and follow-ups'
                    : 'جدولة الاجتماعات والمتابعات تلقائياً'
                  }
                </p>
                <Button size="sm" className="w-full">
                  {language === 'en' ? 'Set Preferences' : 'تعيين التفضيلات'}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  {language === 'en' ? 'Document Processing' : 'معالجة المستندات'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  {language === 'en' 
                    ? 'AI extracts and analyzes contract terms automatically'
                    : 'الذكاء الاصطناعي يستخرج ويحلل شروط العقود تلقائياً'
                  }
                </p>
                <Button size="sm" className="w-full">
                  {language === 'en' ? 'Upload Documents' : 'رفع المستندات'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedMCPDashboard;
