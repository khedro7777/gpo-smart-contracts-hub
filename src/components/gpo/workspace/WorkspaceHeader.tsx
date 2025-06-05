
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useTranslation } from 'react-i18next';
import { Globe, Zap, ChevronDown, ChevronUp, Settings, BarChart3 } from 'lucide-react';

const WorkspaceHeader: React.FC = () => {
  const { i18n } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 truncate">
            {i18n.language === 'ar' ? 'مساحة عمل GPO' : 'GPO Workspace'}
          </h1>
          <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
            {i18n.language === 'ar' 
              ? 'منصة التعاون التجاري المهني'
              : 'Professional business collaboration platform'
            }
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Badge variant="outline" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
            <Globe className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">
              {i18n.language === 'ar' ? 'العمليات العالمية' : 'Global Operations'}
            </span>
            <span className="sm:hidden">Global</span>
          </Badge>
          <Button className="bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm px-2 sm:px-4">
            <Zap className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">
              {i18n.language === 'ar' ? 'إجراءات سريعة' : 'Quick Actions'}
            </span>
            <span className="sm:hidden">Actions</span>
          </Button>
        </div>
      </div>

      {/* Expandable Quick Tools Section */}
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded} className="mt-4">
        <CollapsibleTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full sm:w-auto flex items-center gap-2"
          >
            <span className="text-sm">
              {i18n.language === 'ar' ? 'أدوات سريعة' : 'Quick Tools'}
            </span>
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Button variant="ghost" size="sm" className="flex flex-col items-center gap-2 h-auto py-3">
                <Settings className="h-5 w-5" />
                <span className="text-xs">
                  {i18n.language === 'ar' ? 'الإعدادات' : 'Settings'}
                </span>
              </Button>
              <Button variant="ghost" size="sm" className="flex flex-col items-center gap-2 h-auto py-3">
                <BarChart3 className="h-5 w-5" />
                <span className="text-xs">
                  {i18n.language === 'ar' ? 'التحليلات' : 'Analytics'}
                </span>
              </Button>
              <Button variant="ghost" size="sm" className="flex flex-col items-center gap-2 h-auto py-3">
                <Globe className="h-5 w-5" />
                <span className="text-xs">
                  {i18n.language === 'ar' ? 'الشبكة' : 'Network'}
                </span>
              </Button>
              <Button variant="ghost" size="sm" className="flex flex-col items-center gap-2 h-auto py-3">
                <Zap className="h-5 w-5" />
                <span className="text-xs">
                  {i18n.language === 'ar' ? 'الأتمتة' : 'Automation'}
                </span>
              </Button>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default WorkspaceHeader;
