
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Brain, 
  MessageSquare, 
  Zap, 
  FileText, 
  TrendingUp, 
  Users, 
  Globe,
  Settings,
  Send,
  Mic,
  Paperclip
} from 'lucide-react';

const MCPIntelligenceHub = () => {
  const { language } = useLanguage();
  const [activeMode, setActiveMode] = useState<'manual' | 'ai' | 'ask'>('ai');
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);

  const aiSuggestions = [
    {
      id: 1,
      title: language === 'en' ? 'Optimize procurement strategy' : 'تحسين استراتيجية المشتريات',
      description: language === 'en' ? 'Analyze current spending patterns and suggest improvements' : 'تحليل أنماط الإنفاق الحالية واقتراح تحسينات',
      category: 'procurement'
    },
    {
      id: 2,
      title: language === 'en' ? 'Form supplier coalition' : 'تكوين ائتلاف الموردين',
      description: language === 'en' ? 'Find compatible groups for bulk purchasing power' : 'العثور على مجموعات متوافقة لقوة الشراء بالجملة',
      category: 'collaboration'
    },
    {
      id: 3,
      title: language === 'en' ? 'Contract risk assessment' : 'تقييم مخاطر العقود',
      description: language === 'en' ? 'Evaluate legal and financial risks in current agreements' : 'تقييم المخاطر القانونية والمالية في الاتفاقيات الحالية',
      category: 'legal'
    },
    {
      id: 4,
      title: language === 'en' ? 'Market trend analysis' : 'تحليل اتجاهات السوق',
      description: language === 'en' ? 'Get insights on industry pricing and demand forecasts' : 'الحصول على رؤى حول تسعير الصناعة وتوقعات الطلب',
      category: 'analytics'
    }
  ];

  const quickActions = [
    {
      icon: <FileText className="h-4 w-4" />,
      label: language === 'en' ? 'Draft Contract' : 'صياغة عقد',
      description: language === 'en' ? 'Generate UN-standard contract templates' : 'إنشاء قوالب عقود بمعايير الأمم المتحدة'
    },
    {
      icon: <Users className="h-4 w-4" />,
      label: language === 'en' ? 'Find Partners' : 'العثور على شركاء',
      description: language === 'en' ? 'Match with compatible business groups' : 'التطابق مع المجموعات التجارية المتوافقة'
    },
    {
      icon: <TrendingUp className="h-4 w-4" />,
      label: language === 'en' ? 'Price Analysis' : 'تحليل الأسعار',
      description: language === 'en' ? 'Compare market rates and negotiate better deals' : 'مقارنة أسعار السوق والتفاوض على صفقات أفضل'
    },
    {
      icon: <Globe className="h-4 w-4" />,
      label: language === 'en' ? 'Global Expansion' : 'التوسع العالمي',
      description: language === 'en' ? 'Explore international market opportunities' : 'استكشاف فرص السوق الدولية'
    }
  ];

  const recentConversations = [
    {
      id: 1,
      title: language === 'en' ? 'Medical Equipment Procurement' : 'شراء المعدات الطبية',
      timestamp: '2 hours ago',
      status: 'active'
    },
    {
      id: 2,
      title: language === 'en' ? 'Software Licensing Negotiation' : 'تفاوض ترخيص البرمجيات',
      timestamp: '1 day ago',
      status: 'completed'
    },
    {
      id: 3,
      title: language === 'en' ? 'Construction Materials Coalition' : 'ائتلاف مواد البناء',
      timestamp: '3 days ago',
      status: 'pending'
    }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle message sending logic here
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // Implement voice recognition logic here
  };

  return (
    <div className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-2rem)] z-40">
      <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="h-4 w-4 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">
                  {language === 'en' ? 'MCP Intelligence' : 'ذكاء MCP'}
                </CardTitle>
                <CardDescription className="text-xs">
                  {language === 'en' ? 'AI-powered business assistant' : 'مساعد الأعمال المدعوم بالذكاء الاصطناعي'}
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Settings className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Mode Selector */}
          <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
            {[
              { key: 'manual', label: language === 'en' ? 'Manual' : 'يدوي', icon: <Settings className="h-3 w-3" /> },
              { key: 'ai', label: language === 'en' ? 'AI' : 'ذكاء اصطناعي', icon: <Brain className="h-3 w-3" /> },
              { key: 'ask', label: language === 'en' ? 'Ask' : 'اسأل', icon: <MessageSquare className="h-3 w-3" /> }
            ].map((mode) => (
              <Button
                key={mode.key}
                variant={activeMode === mode.key ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveMode(mode.key as any)}
                className="flex-1 h-7 text-xs gap-1"
              >
                {mode.icon}
                {mode.label}
              </Button>
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {activeMode === 'ai' && (
            <div className="space-y-3">
              <div className="text-sm font-medium">
                {language === 'en' ? 'AI Suggestions' : 'اقتراحات الذكاء الاصطناعي'}
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {aiSuggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">{suggestion.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">{suggestion.description}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {suggestion.category}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeMode === 'manual' && (
            <div className="space-y-3">
              <div className="text-sm font-medium">
                {language === 'en' ? 'Quick Actions' : 'إجراءات سريعة'}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="h-auto p-3 flex flex-col items-start gap-1"
                  >
                    <div className="flex items-center gap-2 w-full">
                      {action.icon}
                      <span className="text-xs font-medium">{action.label}</span>
                    </div>
                    <span className="text-xs text-gray-500 text-left">{action.description}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {activeMode === 'ask' && (
            <div className="space-y-3">
              <div className="text-sm font-medium">
                {language === 'en' ? 'Recent Conversations' : 'المحادثات الأخيرة'}
              </div>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {recentConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className="p-2 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{conversation.title}</span>
                      <Badge variant={conversation.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                        {conversation.status}
                      </Badge>
                    </div>
                    <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <Textarea
                  placeholder={
                    language === 'en' 
                      ? 'How can I help you with your business today?'
                      : 'كيف يمكنني مساعدتك في عملك اليوم؟'
                  }
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-[60px] resize-none pr-20"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <div className="absolute bottom-2 right-2 flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={handleVoiceInput}
                  >
                    <Mic className={`h-3 w-3 ${isListening ? 'text-red-500' : 'text-gray-500'}`} />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Paperclip className="h-3 w-3 text-gray-500" />
                  </Button>
                </div>
              </div>
              <Button 
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="self-end h-10 w-10 p-0 bg-gpo-blue hover:bg-gpo-blue/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>
                {language === 'en' ? 'Powered by GPO AI' : 'مدعوم بـ GPO AI'}
              </span>
              <span className="flex items-center gap-1">
                <Zap className="h-3 w-3" />
                {language === 'en' ? 'Smart Mode' : 'الوضع الذكي'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MCPIntelligenceHub;
