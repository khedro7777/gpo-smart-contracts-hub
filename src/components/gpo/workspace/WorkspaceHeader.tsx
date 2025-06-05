
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import { Globe, Zap } from 'lucide-react';

const WorkspaceHeader: React.FC = () => {
  const { i18n } = useTranslation();

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
    </div>
  );
};

export default WorkspaceHeader;
