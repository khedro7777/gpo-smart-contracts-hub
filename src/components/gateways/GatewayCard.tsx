
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePremium } from '@/hooks/usePremium';
import { Link } from 'react-router-dom';
import { GatewayConfig } from '@/types/gateway';

interface GatewayCardProps {
  config: GatewayConfig;
  activeGroupsCount: number;
}

const GatewayCard: React.FC<GatewayCardProps> = ({ config, activeGroupsCount }) => {
  const { language } = useLanguage();
  const { checkAccess } = usePremium();
  
  const hasAccess = checkAccess(config.tier);
  const Icon = config.icon;

  return (
    <Card className={`border-l-4 ${config.color} hover:shadow-lg transition-shadow ${!hasAccess ? 'opacity-60' : ''}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg ${config.color.replace('border-l-', 'bg-').replace('-500', '-100')} text-white`}>
              <Icon className="h-8 w-8" />
            </div>
            <div>
              <CardTitle className="text-xl">{config.title}</CardTitle>
              <p className="text-gray-600 mt-1">{config.description}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {config.requiresKyc && (
              <Badge variant="outline" className="text-orange-600">
                {language === 'ar' ? 'يتطلب KYC' : 'KYC Required'}
              </Badge>
            )}
            {config.requiresPoints && (
              <Badge variant="outline" className="text-blue-600">
                {language === 'ar' ? 'يتطلب نقاط' : 'Points Required'}
              </Badge>
            )}
            {config.requiresMcp && (
              <Badge variant="outline" className="text-green-600">
                {language === 'ar' ? 'اختبار MCP' : 'MCP Exam'}
              </Badge>
            )}
            <Badge variant="secondary">
              {config.tier.toUpperCase()}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {activeGroupsCount} {language === 'ar' ? 'مجموعة نشطة' : 'Active Groups'}
          </div>
          {hasAccess ? (
            <Link to={config.href}>
              <Button>
                {language === 'ar' ? 'دخول البوابة' : 'Enter Portal'}
              </Button>
            </Link>
          ) : (
            <Button disabled variant="outline">
              {language === 'ar' ? 'يتطلب ترقية' : 'Upgrade Required'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GatewayCard;
