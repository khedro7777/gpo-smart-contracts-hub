
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useTranslation } from 'react-i18next';
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
  Paperclip,
  ChevronUp,
  ChevronDown,
  Minimize2,
  Maximize2
} from 'lucide-react';

const MCPIntelligenceHub = () => {
  const { i18n } = useTranslation();
  const [activeMode, setActiveMode] = useState<'manual' | 'ai' | 'ask'>('ai');
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const aiSuggestions = [
    {
      id: 1,
      title: i18n.language === 'ar' ? 'تحسين استراتيجية المشتريات' : 'Optimize procurement strategy',
      description: i18n.language === 'ar' ? 'تحليل أنماط الإنفاق الحالية واقتراح تحسينات' : 'Analyze current spending patterns and suggest improvements',
      category: 'procurement'
    },
    {
      id: 2,
      title: i18n.language === 'ar' ? 'تكوين ائتلاف الموردين' : 'Form supplier coalition',
      description: i18n.language === 'ar' ? 'العثور على مجموعات متوافقة لقوة الشراء بالجملة' : 'Find compatible groups for bulk purchasing power',
      category: 'collaboration'
    },
    {
      id: 3,
      title: i18n.language === 'ar' ? 'تقييم مخاطر العقود' : 'Contract risk assessment',
      description: i18n.language === 'ar' ? 'تقييم المخاطر القانونية والمالية في الاتفاقيات الحالية' : 'Evaluate legal and financial risks in current agreements',
      category: 'legal'
    },
    {
      id: 4,
      title: i18n.language === 'ar' ? 'تحليل اتجاهات السوق' : 'Market trend analysis',
      description: i18n.language === 'ar' ? 'الحصول على رؤى حول تسعير الصناعة وتوقعات الطلب' : 'Get insights on industry pricing and demand forecasts',
      category: 'analytics'
    }
  ];

  const quickActions = [
    {
      icon: <FileText className="h-4 w-4" />,
      label: i18n.language === 'ar' ? 'صياغة عقد' : 'Draft Contract',
      description: i18n.language === 'ar' ? 'إنشاء قوالب عقود بمعايير الأمم المتحدة' : 'Generate UN-standard contract templates'
    },
    {
      icon: <Users className="h-4 w-4" />,
      label: i18n.language === 'ar' ? 'العثور على شركاء' : 'Find Partners',
      description: i18n.language === 'ar' ? 'التطابق مع المجموعات التجارية المتوافقة' : 'Match with compatible business groups'
    },
    {
      icon: <TrendingUp className="h-4 w-4" />,
      label: i18n.language === 'ar' ? 'تحليل الأسعار' : 'Price Analysis',
      description: i18n.language === 'ar' ? 'مقارنة أسعار السوق والتفاوض على صفقات أفضل' : 'Compare market rates and negotiate better deals'
    },
    {
      icon: <Globe className="h-4 w-4" />,
      label: i18n.language === 'ar' ? 'التوسع العالمي' : 'Global Expansion',
      description: i18n.language === 'ar' ? 'استكشاف فرص السوق الدولية' : 'Explore international market opportunities'
    }
  ];

  const recentConversations = [
    {
      id: 1,
      title: i18n.language === 'ar' ? 'شراء المعدات الطبية' : 'Medical Equipment Procurement',
      timestamp: '2 hours ago',
      status: 'active'
    },
    {
      id: 2,
      title: i18n.language === 'ar' ? 'تفاوض ترخيص البرمجيات' : 'Software Licensing Negotiation',
      timestamp: '1 day ago',
      status: 'completed'
    },
    {
      id: 3,
      title: i18n.language === 'ar' ? 'ائتلاف مواد البناء' : 'Construction Materials Coalition',
      timestamp: '3 days ago',
      status: 'pending'
    }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // Implement voice recognition logic here
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          onClick={() => setIsMinimized(false)}
          className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
        >
          <Brain className="h-6 w-6 text-white" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-full max-w-sm sm:w-96 max-w-[calc(100vw-2rem)] z-40">
      <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg truncate">
                  {i18n.language === 'ar' ? 'ذكاء MCP' : 'MCP Intelligence'}
                </CardTitle>
                <CardDescription className="text-xs truncate">
                  {i18n.language === 'ar' ? 'مساعد الأعمال المدعوم بالذكاء الاصطناعي' : 'AI-powered business assistant'}
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0"
                onClick={() => setIsMinimized(true)}
              >
                <Minimize2 className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Settings className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Mode Selector */}
          <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
            {[
              { key: 'manual', label: i18n.language === 'ar' ? 'يدوي' : 'Manual', icon: <Settings className="h-3 w-3" /> },
              { key: 'ai', label: i18n.language === 'ar' ? 'ذكاء اصطناعي' : 'AI', icon: <Brain className="h-3 w-3" /> },
              { key: 'ask', label: i18n.language === 'ar' ? 'اسأل' : 'Ask', icon: <MessageSquare className="h-3 w-3" /> }
            ].map((mode) => (
              <Button
                key={mode.key}
                variant={activeMode === mode.key ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveMode(mode.key as any)}
                className="flex-1 h-7 text-xs gap-1"
              >
                {mode.icon}
                <span className="hidden sm:inline">{mode.label}</span>
              </Button>
            ))}
          </div>
        </CardHeader>

        <Collapsible open={!isCollapsed} onOpenChange={setIsCollapsed}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-full justify-between p-2">
              <span className="text-sm">
                {i18n.language === 'ar' ? 'المحتوى' : 'Content'}
              </span>
              {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <CardContent className="space-y-4 px-4 pb-4">
              {activeMode === 'ai' && (
                <div className="space-y-3">
                  <div className="text-sm font-medium">
                    {i18n.language === 'ar' ? 'اقتراحات الذكاء الاصطناعي' : 'AI Suggestions'}
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {aiSuggestions.map((suggestion) => (
                      <div
                        key={suggestion.id}
                        className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 truncate">{suggestion.title}</h4>
                            <p className="text-xs text-gray-600 mt-1 line-clamp-2">{suggestion.description}</p>
                          </div>
                          <Badge variant="outline" className="text-xs ml-2 flex-shrink-0">
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
                    {i18n.language === 'ar' ? 'إجراءات سريعة' : 'Quick Actions'}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {quickActions.map((action, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="h-auto p-3 flex flex-col items-start gap-1"
                      >
                        <div className="flex items-center gap-2 w-full">
                          {action.icon}
                          <span className="text-xs font-medium truncate">{action.label}</span>
                        </div>
                        <span className="text-xs text-gray-500 text-left line-clamp-2">{action.description}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {activeMode === 'ask' && (
                <div className="space-y-3">
                  <div className="text-sm font-medium">
                    {i18n.language === 'ar' ? 'المحادثات الأخيرة' : 'Recent Conversations'}
                  </div>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {recentConversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        className="p-2 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium truncate flex-1">{conversation.title}</span>
                          <Badge variant={conversation.status === 'active' ? 'default' : 'secondary'} className="text-xs ml-2 flex-shrink-0">
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
                <div className="flex items-end gap-2">
                  <div className="flex-1 relative">
                    <Textarea
                      placeholder={
                        i18n.language === 'ar' 
                          ? 'كيف يمكنني مساعدتك في عملك اليوم؟'
                          : 'How can I help you with your business today?'
                      }
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="min-h-[60px] resize-none pr-20 text-sm"
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
                    className="h-10 w-10 p-0 bg-blue-600 hover:bg-blue-700 flex-shrink-0"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>
                    {i18n.language === 'ar' ? 'مدعوم بـ GPO AI' : 'Powered by GPO AI'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Zap className="h-3 w-3" />
                    {i18n.language === 'ar' ? 'الوضع الذكي' : 'Smart Mode'}
                  </span>
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </div>
  );
};

export default MCPIntelligenceHub;
