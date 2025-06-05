
import React from 'react';
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import { FileText, TrendingUp, Users, Globe } from 'lucide-react';

interface MCPContentProps {
  activeMode: 'manual' | 'ai' | 'ask';
}

const MCPContent: React.FC<MCPContentProps> = ({ activeMode }) => {
  const { i18n } = useTranslation();

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

  return (
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
    </CardContent>
  );
};

export default MCPContent;
