
import React from 'react';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { Brain, Settings, Minimize2 } from 'lucide-react';

interface MCPHeaderProps {
  onMinimize: () => void;
}

const MCPHeader: React.FC<MCPHeaderProps> = ({ onMinimize }) => {
  const { i18n } = useTranslation();

  return (
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
            onClick={onMinimize}
          >
            <Minimize2 className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <Settings className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </CardHeader>
  );
};

export default MCPHeader;
